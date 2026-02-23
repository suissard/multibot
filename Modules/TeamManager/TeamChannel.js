const { PermissionsBitField, ChannelType } = require('discord.js');

class TeamChannel {
    /**
     * @param {import('../../Class/Bot')} bot
     * @param {object} team - Olympe team object
     * @param {object} targetSegment - The specific segment we are creating this channel for
     */
    constructor(bot, team, targetSegment) {
        this.bot = bot;
        this.team = team;
        this.targetSegment = targetSegment;
    }

    get divisionName() {
        return this.targetSegment ? this.targetSegment.name : "General";
    }

    static get CHANNEL_PREFIX() {
        return '🛡️ ';
    }

    get channelName() {
        return TeamChannel.CHANNEL_PREFIX + this.team.name;
    }

    /**
     * @param {import('discord.js').Guild} guild
     */
    async findOrCreateCategory(guild) {
        const baseName = this.divisionName;
        // Find all categories starting with baseName
        // Fetch channels if not cached? Assuming cache is populated.
        const categories = guild.channels.cache.filter(c =>
            c.type === ChannelType.GuildCategory &&
            c.name.startsWith(baseName)
        ).sort((a, b) => a.position - b.position);

        // Check for space
        for (const [id, category] of categories) {
            // Count voice channels in this category
            const count = guild.channels.cache.filter(c => c.parentId === id).size;
            if (count < 50) return category;
        }

        // Create new category if none found or all full
        // If we found categories but they are full, we need a new name
        // Logic: if "Division 1" exists and full -> "Division 1 #2"
        // But checking startsWith might pick up other things.
        // Assuming division names are unique enough.

        let newName = baseName;
        if (categories.size > 0) {
            newName = `${baseName} #${categories.size + 1}`;
        }

        return await guild.channels.create({
            name: newName,
            type: ChannelType.GuildCategory
        });
    }

    /**
     * @param {import('discord.js').Guild} guild
     */
    async ensureChannel(guild) {
        // Find channel by topic (Team ID)
        // Note: Voice channels CAN have topics, but UI doesn't show them easily?
        // Discord.js supports it for VoiceChannel?
        // Wait, VoiceChannel in v13/14 might NOT support topic.
        // Checking documentation: GuildVoice channels do NOT have topics usually?
        // Actually, they don't. Only Text and Forum.
        // So we MUST rely on the NAME or keeping a database.
        // User didn't ask for DB.
        // Name is `team.name`.
        // We should search by name.

        // REVISION: Voice Channels DO NOT have topics.
        // We must match by name.
        const channelName = this.channelName;

        let channel = guild.channels.cache.find(c =>
            c.type === ChannelType.GuildVoice &&
            c.name === channelName
            // We do NOT check parent here, because if the team changed division, 
            // the channel will be in the OLD division category, and we need to find it to move it.
        );

        const category = await this.findOrCreateCategory(guild);

        if (!channel) {
            channel = await guild.channels.create({
                name: channelName,
                type: ChannelType.GuildVoice,
                parent: category.id,
                reason: 'Team Channel Creation'
            });
        } else {
            // Check if in correct category (division)
            if (channel.parentId !== category.id) {
                // Only move if the current parent isn't part of the division series
                const currentParent = channel.parent;
                // If the current parent starts with divisionName, it might be fine (just another full category)
                if (!currentParent || !currentParent.name.startsWith(this.divisionName)) {
                    await channel.setParent(category.id);
                }
            }
            if (channel.name !== this.channelName) {
                await channel.setName(this.channelName);
            }
        }

        await this.updatePermissions(channel, guild);
        return channel;
    }

    /**
     * @param {import('discord.js').VoiceChannel} channel
     * @param {import('discord.js').Guild} guild
     */
    async updatePermissions(channel, guild) {
        const requiredOverwrites = [];

        requiredOverwrites.push({
            id: guild.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
            deny: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.MoveMembers],
        });

        // Add members
        const members = this.team.members || [];
        const membersLent = this.team.membersLent ? this.team.membersLent.map(m => m.member) : [];
        const allMembers = [...members, ...membersLent];

        for (const member of allMembers) {
            if (member.user && member.user.thirdparties && member.user.thirdparties.discord && member.user.thirdparties.discord.discordID) {
                const discordId = member.user.thirdparties.discord.discordID;

                if (guild.members.cache.has(discordId)) {
                    requiredOverwrites.push({
                        id: discordId,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.Connect,
                            PermissionsBitField.Flags.Speak,
                            PermissionsBitField.Flags.MoveMembers,
                        ],
                    });
                }
            }
        }

        const allowedRoles = new Set([guild.id]);

        // Add Organizer/Staff and Caster access
        const autoRoleConfig = this.bot.modules.AutoRole?.guilds[guild.id];
        if (autoRoleConfig && autoRoleConfig.specialRoles) {
            const orgaRoleId = autoRoleConfig.specialRoles.orga?.id;
            if (orgaRoleId && guild.roles.cache.has(orgaRoleId)) {
                allowedRoles.add(orgaRoleId);
                requiredOverwrites.push({
                    id: orgaRoleId,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.Connect,
                        PermissionsBitField.Flags.Speak,
                        PermissionsBitField.Flags.MoveMembers,
                        PermissionsBitField.Flags.MuteMembers,
                        PermissionsBitField.Flags.DeafenMembers,
                        PermissionsBitField.Flags.ManageChannels
                    ]
                });
            }

            const casterRoleId = autoRoleConfig.specialRoles.caster?.id;
            if (casterRoleId && guild.roles.cache.has(casterRoleId)) {
                allowedRoles.add(casterRoleId);
                requiredOverwrites.push({
                    id: casterRoleId,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.Connect,
                        PermissionsBitField.Flags.Speak,
                        PermissionsBitField.Flags.MoveMembers
                    ]
                });
            }
        }

        // --- MERGE LOGIC ---
        // Fetch current overwrites
        const currentOverwrites = channel.permissionOverwrites.cache;

        // Prepare the final list of overwrites to SET
        // We start with a map of existing overwrites to preserve them
        const finalOverwritesMap = new Map();

        // 1. Load existing overwrites
        for (const [id, overwrite] of currentOverwrites) {
            // Remove specific overwrites for roles (type 0) not explicitly allowed
            if (overwrite.type === 0 && !allowedRoles.has(id)) {
                continue;
            }

            finalOverwritesMap.set(id, {
                id: overwrite.id,
                allow: new PermissionsBitField(overwrite.allow),
                deny: new PermissionsBitField(overwrite.deny),
                type: overwrite.type
            });
        }

        // 2. Merge required overwrites
        for (const req of requiredOverwrites) {
            const existing = finalOverwritesMap.get(req.id);
            if (existing) {
                existing.allow.add(req.allow || []);
                existing.deny.add(req.deny || []);
                if (req.allow) {
                    existing.deny.remove(req.allow); // Ensure we don't deny what we want to allow
                }

                finalOverwritesMap.set(req.id, existing);
            } else {
                // New overwrite
                finalOverwritesMap.set(req.id, {
                    id: req.id,
                    allow: new PermissionsBitField(req.allow || []),
                    deny: new PermissionsBitField(req.deny || [])
                });
            }
        }

        // 3. Convert map back to array
        const finalOverwrites = Array.from(finalOverwritesMap.values());

        await channel.permissionOverwrites.set(finalOverwrites);
    }
}

module.exports = TeamChannel;

