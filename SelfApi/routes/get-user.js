
/**
 * Route permettant d'obtenir les informations de l'utilisateur connecté
 */
module.exports = {
    path: '/user',
    method: 'get',
    /**
     * Gère la requête pour obtenir les informations de l'utilisateur.
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     * @param {import('../../Class/Bot')} bot - L'instance du bot.
     * @param {import('discord.js').User} user - L'utilisateur authentifié.
     * @param {import('../Api')} app - L'instance de l'API.
     */
    handler: (req, res, bot, user, app) => {
        if (!user) {
             return res.status(401).json({ message: 'User not authenticated' });
        }

        const userData = {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
        };
        
        res.json({ user: userData });
    },
};
