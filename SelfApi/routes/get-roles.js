module.exports = {
    path: '/roles',
    method: 'get',
    /**
     * Gère la requête pour obtenir la liste des roles du bot (depuis le serveur home).
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     * @param {import('../../Class/Bot')} bot - L'instance du bot.
     */
    handler: (req, res, bot, user, app) => {
        if (!bot) return res.status(404).json({ message: 'Bot non trouvé' });

        const guildId = req.query.guild_id || bot.home;
        const guild = bot.guilds.cache.get(guildId);

        if (!guild) {
            app.warn(`Guild not found in cache for ID: ${guildId}.`, 'GET_ROLES');
            return [];
        }

        const roles = guild.roles.cache
            .map(r => ({
                id: r.id,
                name: r.name,
                color: r.color,
                position: r.position,
                permissions: r.permissions.bitfield.toString()
            }))
            .sort((a, b) => b.position - a.position); // Sort by position descending (highest role first)

        return roles;
    },
};
