module.exports = {
    path: '/users',
    method: 'get',
    /**
     * Gère la requête pour obtenir la liste des utilisateurs de la guilde principale du bot.
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     * @param {import('../../Class/Bot')} bot - L'instance du bot.
     */
    handler: async (req, res, bot) => {
        if (!bot) return res.status(404).json({ message: 'Bot non trouvé' });
        
        const guildId = bot.home;
        const guild = bot.guilds.cache.get(guildId);
        
        if (!guild) {
             return res.json([]);
        }

        try {
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
            
            res.json(users);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
        }
    },
};
