module.exports = {
    path: '/guilds',
    method: 'get',
    /**
     * Get list of guilds the bot is in.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('../../Class/Bot')} bot
     */
    handler: (req, res, bot) => {
        if (!bot) return res.status(404).json({ message: 'Bot non trouvé' });

        const guilds = bot.guilds.cache.map(g => ({
            id: g.id,
            name: g.name,
            icon: g.iconURL(),
            memberCount: g.memberCount
        }));

        return guilds;
    },
};
