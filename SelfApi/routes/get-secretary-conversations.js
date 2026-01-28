
/**
 * Route permettant de récupérer la liste des conversations de secrétariat actives
 */
module.exports = {
    method: 'GET',
    path: '/secretary/conversations',
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('../../Class/Bot')} bot
     */
    handler: async (req, res, bot, user) => {
        if (!bot.modules.Secretary || !bot.modules.Secretary.secretary) {
            throw { message: 'Secretary module not configured or active', status: 503 };
        }

        const conversations = [];
        const secretaryGuilds = bot.modules.Secretary.secretary;
        const { PermissionsBitField } = require('discord.js');

        for (const serv of secretaryGuilds) {
            // secretary guild object has a .guild property which is the Discord.Guild
            const guild = serv.guild;
            if (!guild) continue;

            const member = await guild.members.fetch(user.id).catch(() => null);
            if (!member) continue; // User not in guild, cannot see channels

            const channels = guild.channels.cache.filter(c => {
                const hasPerm = c.permissionsFor(member).has(PermissionsBitField.Flags.ViewChannel);
                return hasPerm &&
                    c.type === 0 && // 0 is GuildText
                    (c.name.startsWith('❌') || c.name.startsWith('✅')) && // Pattern from Secretary.js
                    c.name.match(/-[0-9]+$/) // Checks for ID suffix
            });

            const usersToFetch = new Set();
            const channelUserMap = [];

            for (const [id, channel] of channels) {
                const parts = channel.name.split('-');
                const userId = parts.pop();

                // Keep track of which channel maps to which user ID
                channelUserMap.push({
                    channel,
                    userId,
                    guild
                });

                if (!bot.users.cache.has(userId)) {
                    usersToFetch.add(userId);
                }
            }

            // Fetch missing users
            if (usersToFetch.size > 0) {
                await Promise.allSettled(Array.from(usersToFetch).map(id => bot.users.fetch(id)));
            }

            for (const { channel, userId, guild } of channelUserMap) {
                const parts = channel.name.split('-');
                parts.pop(); // Remove ID
                const userNamePart = parts.join('-').substring(1); // Remove emoji

                const user = bot.users.cache.get(userId);

                conversations.push({
                    channelId: channel.id,
                    channelName: channel.name,
                    guildId: guild.id,
                    userId: userId,
                    username: user ? user.username : userNamePart,
                    avatar: user ? user.displayAvatarURL() : null,
                    lastMessageTimestamp: channel.lastMessageId ? channel.createdTimestamp : null
                });
            }
        }

        return conversations;
    }
};
