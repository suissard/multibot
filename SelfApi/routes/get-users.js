module.exports = {
    path: '/users',
    method: 'get',
    /**
     * Gère la requête pour obtenir la liste des utilisateurs de la guilde principale du bot.
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     * @param {import('../../Class/Bot')} bot - L'instance du bot.
     */
    handler: async (req, res, bot, user, app) => {
        if (!bot) return res.status(404).json({ message: 'Bot non trouvé' });

        const guildId = req.query.guild_id || bot.home;
        const guild = bot.guilds.cache.get(guildId);

        if (!guild) {
            return [];
        }

        // Fetch members (cache might be incomplete for large guilds)
        const members = await guild.members.fetch();
        const users = members.map(m => ({
            id: m.id,
            username: m.user.username,
            discriminator: m.user.discriminator,
            avatar: m.user.displayAvatarURL(),
            displayName: m.displayName,
            bot: m.user.bot
        }));

        return users;
    },
};
