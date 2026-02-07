const Command = require('../../Class/Command.js');
const Discord = require('discord.js');

module.exports = class SecretarySort extends Command {
    static id = 'secretarysort';
    static devBoss = false;
    static home = false;
    static userPermissions = ['ManageChannels'];
    static botPermissions = ['ManageChannels'];
    static description = 'Trie les tickets du secrétariat (❌ Priority)';
    static help = true;
    static check = true;
    static howTo = 'PREFIXCMD';
    static arguments = [
        {
            type: 'STRING',
            name: 'type',
            description: 'Type de tri (date par défaut)',
            required: false,
            choices: [
                { name: 'Alphabétique', value: 'alpha' },
                { name: 'Dernier Message', value: 'date' }
            ]
        }
    ];

    static narrative = `
- Cette commande réorganise les salons dans TOUTES les catégories de secrétariat.
- **Attention** : Les salons peuvent changer de catégorie pour respecter la limite de 50 salons.
- Règle de tri :
    1. **Priorité Haute** : Les salons dont le nom commence par '❌' (Message utilisateur sans réponse).
    2. **Priorité Basse** : Les autres salons.
    3. **Ordre Secondaire** :
        - **Alphabétique** : A-Z
        - **Dernier Message** : Du plus ancien au plus récent
`;

    async methode(args = {}) {
        const { interaction } = args;
        const sortType = interaction.options.getString('type') || 'date';

        await interaction.deferReply();
        await this.constructor.sort(interaction.guild, interaction, sortType);
    }

    /**
     * Sorts the secretary channels.
     * @param {Discord.Guild} guild - The guild to sort.
     * @param {Discord.CommandInteraction} [interaction] - Optional interaction for replies.
     * @param {string} [sortType='date'] - Sort type: 'alpha' or 'date'.
     */
    static async sort(guild, interaction = null, sortType = 'date') {
        try {
            // 1. Config & Target Discovery
            // Access bot from guild.client since we are in a static context or passed guild
            const bot = guild.client;
            // Access modules. Assuming bot.modules is accessible.
            const secretaryConfig = bot.modules?.Secretary?.secretary;

            if (!secretaryConfig?.length) {
                throw new Error("❌ Module Secrétariat inactif ou non configuré.");
            }



            const notify = async (content) => {
                // Use standard command feedback if interaction exists
                if (interaction) await this.sendFeedback(content);
                // Fallback to log if running in background (Event mode)
                else bot.log(content, 'SecretarySort');
            };

            const guildSettings = secretaryConfig.filter(c => c.guild.id === guild.id);
            if (!guildSettings.length) {
                throw new Error("❌ Aucun secrétariat configuré ici.");
            }

            const targetBases = guildSettings.map(c => c.name);
            const allSecretaryCategories = [];

            // Ensure channels are fetched
            if (guild.channels.cache.size < guild.channelCount) await guild.channels.fetch();

            const allChannels = guild.channels.cache;
            const addedCatIds = new Set();
            let parentCategory = null; // To deduce permissions for new categories

            // Find all related categories
            for (const baseName of targetBases) {
                for (const [id, channel] of allChannels) {
                    if (channel.type !== Discord.ChannelType.GuildCategory) continue;

                    if (channel.name === baseName || logoLikeMatch(channel.name, baseName)) {
                        if (!addedCatIds.has(channel.id)) {
                            allSecretaryCategories.push(channel);
                            addedCatIds.add(channel.id);
                            // Store one as a template for permissions/position
                            if (!parentCategory) parentCategory = channel;
                        }
                    }
                }
            }

            if (allSecretaryCategories.length === 0) {
                throw new Error("❌ Aucune catégorie secrétariat trouvée.");
            }

            // Sort categories by name to fill them in order (Secretary, Secretary - 1, etc.)
            // Assuming "BaseName" comes before "BaseName - 1"
            allSecretaryCategories.sort((a, b) => a.name.localeCompare(b.name));

            // 2. Gather ALL Text/Announcement Channels
            let globalChannels = [];
            for (const cat of allSecretaryCategories) {
                const kids = cat.children.cache.filter(c =>
                    c.type === Discord.ChannelType.GuildText ||
                    c.type === Discord.ChannelType.GuildAnnouncement ||
                    c.type === Discord.ChannelType.GuildNews // For older djs compatibility if needed, though usually one is enough
                );
                globalChannels.push(...kids.values());
            }

            // 2b. ALSO Gather channels from any existing "Secretary Swap Buffer" to rescue them!
            const existingBuffers = guild.channels.cache.filter(c =>
                c.type === Discord.ChannelType.GuildCategory &&
                c.name.startsWith('Secretary Swap Buffer')
            );

            for (const [id, buf] of existingBuffers) {
                // CAPTURE ALL CHANNELS, whatever the type, to rescue them!
                const kids = buf.children.cache;
                globalChannels.push(...kids.values());
                await notify(`🔎 Récupération de ${kids.size} salons errants dans ${buf.name}...`);
            }

            // 2c. ALSO Gather "Root Orphans" (Channels at the root that look like secretary tickets)
            // Pattern: Optional status emoji + name + separator + ID (digits)
            // Regex: /^(?:[✅❌🛑⚠️]\s*)?.*-\d{15,20}$/
            const orphanRegex = /^(?:[✅❌🛑⚠️]\s*)?.*-\d{15,20}$/;

            const rootOrphans = guild.channels.cache.filter(c =>
                c.parentId === null &&
                (c.type === Discord.ChannelType.GuildText || c.type === Discord.ChannelType.GuildAnnouncement) &&
                orphanRegex.test(c.name)
            );

            if (rootOrphans.size > 0) {
                globalChannels.push(...rootOrphans.values());
                await notify(`🔎 Récupération de ${rootOrphans.size} salons orphelins (Root)...`);
            }

            await notify(`🔄 Analyse de ${globalChannels.length} salons dans ${allSecretaryCategories.length} catégories... (Tri Global)`);

            // 3. Global Sort
            globalChannels.sort((a, b) => {
                const aIsPriority = a.name.startsWith('❌');
                const bIsPriority = b.name.startsWith('❌');

                if (aIsPriority && !bIsPriority) return -1;
                if (!aIsPriority && bIsPriority) return 1;

                if (sortType === 'date') {
                    const aTime = a.lastMessageId ? Discord.SnowflakeUtil.timestampFrom(a.lastMessageId) : 0;
                    const bTime = b.lastMessageId ? Discord.SnowflakeUtil.timestampFrom(b.lastMessageId) : 0;
                    return bTime - aTime; // Descending (Newest first)
                } else {
                    return a.name.localeCompare(b.name);
                }
            });

            // 4. Ensure Capacity & Create Categories
            // Reduced to 45 to allow a 5-channel buffer for hidden channels/permissions/race conditions
            const MAX = 45;
            const neededCategories = Math.ceil(globalChannels.length / MAX) || 1;

            // Create extra categories if needed
            while (allSecretaryCategories.length < neededCategories) {
                const newIndex = allSecretaryCategories.length;
                // Assuming first category name is the base.
                // If we have mixed bases, this might be tricky. Let's use the first identified category's name base.
                const baseName = targetBases[0]; // Simplification
                const newName = `${baseName} - ${newIndex}`;

                await notify(`🔨 Création de la catégorie '${newName}' (Manque de place)...`);

                const newCat = await guild.channels.create({
                    name: newName,
                    type: Discord.ChannelType.GuildCategory,
                    position: parentCategory ? parentCategory.position + newIndex : 0,
                    permissionOverwrites: parentCategory ? parentCategory.permissionOverwrites.cache : []
                });

                allSecretaryCategories.push(newCat);
            }

            // 5. Global Distribution with Buffer
            // We use a temporary buffer category to handle swaps if categories are full
            let bufferCategories = [];
            const getBuffer = async () => {
                // Find a buffer with space
                let availableBuffer = bufferCategories.find(b => b.children.cache.size < 50);
                if (availableBuffer) return availableBuffer;

                // Create new buffer
                const newBuffer = await guild.channels.create({
                    name: `Secretary Swap Buffer ${bufferCategories.length + 1}`,
                    type: Discord.ChannelType.GuildCategory,
                    permissionOverwrites: [{ id: guild.id, deny: ['ViewChannel'] }]
                });
                bufferCategories.push(newBuffer);
                return newBuffer;
            };

            let moves = 0;

            for (let i = 0; i < globalChannels.length; i++) {
                const channel = globalChannels[i];
                const targetCatIndex = Math.floor(i / MAX);
                const targetCat = allSecretaryCategories[targetCatIndex];

                // Progress Update
                if (i % 20 === 0) {
                    await notify(`🔄 Réorganisation... ${i}/${globalChannels.length} (Moves: ${moves})`);
                }

                if (channel.parentId !== targetCat.id) {
                    // Check if target is full
                    if (targetCat.children.cache.size >= MAX) {
                        // EVICT an alien channel to Buffer

                        // Refined Logic for Victim:
                        // Pick a child that is NOT in the slice of channels we are currently filling aimed at this cat.
                        // We must not evict channels we just placed in this run.

                        const currentCatStart = targetCatIndex * MAX;
                        const protectedIds = new Set(globalChannels.slice(currentCatStart, i).map(c => c.id));

                        const victim = targetCat.children.cache.find(c => !protectedIds.has(c.id));

                        if (victim) {

                            // Check buffer size! (Limit 50)
                            // We now have dynamic buffers, so just asking for getBuffer() will give us a valid one with space.
                            const buf = await getBuffer();

                            if (buf.children.cache.size >= 50) {
                                // Should not happen with new logic, but safety check
                                bot.error("Secretary Buffer Full despite dynamic creation!", 'SecretarySort');
                            }

                            await victim.setParent(buf, { lockPermissions: false });
                        }
                    }

                    // Now move channel to target
                    try {
                        await channel.setParent(targetCat, { lockPermissions: false });
                        moves++;
                    } catch (e) {
                        bot.error(`Failed to move ${channel.name} to ${targetCat.name}: ${e}`, 'SecretarySort');
                    }
                }
            }

            // 6. Cleanup & Sort Positions
            // 6. Cleanup & Sort Positions
            // Systematic Cleanup: Find ALL categories named 'Secretary Swap Buffer' (current or old) and delete them.
            // This ensures self-healing from previous crashes.

            const allBufferCategories = guild.channels.cache.filter(c =>
                c.type === Discord.ChannelType.GuildCategory &&
                c.name.startsWith('Secretary Swap Buffer')
            );

            for (const [id, buf] of allBufferCategories) {
                if (buf.children.cache.size > 0) {
                    bot.error(`⛔ Buffer ${buf.name} still has ${buf.children.cache.size} channels! Rescuing them...`, 'SecretarySort');

                    // Rescue Strategy: Move to the last active secretary category
                    // If no category exists (weird), we can't do much, but we have strict checks before.
                    const rescueCat = allSecretaryCategories[allSecretaryCategories.length - 1];

                    if (rescueCat) {
                        const orphans = buf.children.cache;
                        for (const [oid, orphan] of orphans) {
                            try {
                                await orphan.setParent(rescueCat, { lockPermissions: false });
                                bot.log(`🚑 Rescued channel ${orphan.name} from ${buf.name} -> ${rescueCat.name}`, 'SecretarySort');
                            } catch (e) {
                                bot.error(`❌ FAILED to rescue ${orphan.name}: ${e}`, 'SecretarySort');
                            }
                        }
                    }
                }

                // Double check before delete (it should be empty now unless rescue failed)
                if (buf.children.cache.size === 0) {
                    try {
                        await buf.delete();
                        bot.log(`🗑️ Deleted buffer: ${buf.name}`, 'SecretarySort');
                    } catch (e) {
                        bot.error(`❌ Failed to delete buffer ${buf.name}: ${e}`, 'SecretarySort');
                    }
                } else {
                    bot.error(`❌ Could not delete ${buf.name}, still contains channels after rescue attempt.`, 'SecretarySort');
                }
            }

            // Internal Position Sort
            await notify("🔄 Finalisation du tri (Positions)...");

            for (let cIdx = 0; cIdx < allSecretaryCategories.length; cIdx++) {
                const cat = allSecretaryCategories[cIdx];
                // Channels belonging here
                const slice = globalChannels.slice(cIdx * MAX, (cIdx + 1) * MAX);
                if (slice.length === 0) continue;

                // Sync positions
                const updates = slice.map((ch, idx) => ({
                    channel: ch.id,
                    position: idx
                }));

                try {
                    await guild.channels.setPositions(updates);
                } catch (e) {
                    bot.error(`Position sync failed: ${e}`, 'SecretarySort');
                }
            }



            await notify(`✅ **Tri Global Terminé !**\n${globalChannels.length} salons réorganisés dans ${allSecretaryCategories.length} catégories.\n(${moves} déplacements effectués).`);

        } catch (e) {
            bot.error(e, 'SecretarySort');
            await notify(`❌ Erreur critique : ${e.message}`);
        }
    }
};

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function logoLikeMatch(targetName, baseName) {
    if (targetName === baseName) return true;
    const regex = new RegExp(`^${escapeRegExp(baseName)} - \\d+$`);
    return regex.test(targetName);
}
