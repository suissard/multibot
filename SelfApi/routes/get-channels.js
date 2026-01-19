module.exports = {
    path: '/channels',
    method: 'get',
    /**
     * Gère la requête pour obtenir la liste des channels du bot (depuis le serveur home).
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     * @param {import('../../Class/Bot')} bot - L'instance du bot.
     */
    handler: (req, res, bot, user, app) => {
        if (!bot) return res.status(404).json({ message: 'Bot non trouvé' });

        const guildId = bot.home;
        const guild = bot.guilds.cache.get(guildId);

        if (!guild) {
            app.warn(`Guild not found in cache for ID: ${guildId}.`, 'GET_CHANNELS');
            return [];
        }

        // Filter text channels
        const channels = guild.channels.cache
            .filter(c => c.type === 0) // 0 is GUILD_TEXT (in v13/v14 depending on version, check discord.js version)
            // Or better use string checking 'GUILD_TEXT' if using newer djs, but integer 0 is standard for text.
            // Wait, djs v14 uses ChannelType.GuildText = 0.
            // Let's assume standard text channels.
            .map(c => ({
                id: c.id,
                name: c.name,
                type: c.type
            }));

        return channels;
    },
};
