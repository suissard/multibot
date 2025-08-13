module.exports = {
    path: '/discord/authurl',
    method: 'get',
    /**
     * Gère la requête pour obtenir l'URL d'autorisation OAuth2 de Discord.
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     * @param {any} bot - (Non utilisé) L'instance du bot.
     * @param {any} user - (Non utilisé) L'utilisateur authentifié.
     * @param {import('../Api')} app - L'instance de l'API principale, utilisée pour obtenir l'URL.
     */
    handler: (req, res, bot, user, app) => {
        res.send(app.getDiscordAuthUrl());
    },
};