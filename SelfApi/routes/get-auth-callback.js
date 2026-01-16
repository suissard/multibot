module.exports = {
    path: '/auth/callback',
    method: 'get',
    /**
     * Gère le callback d'authentification OAuth2.
     * Appelle createUser pour échanger le code contre un token.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {*} bot
     * @param {*} user
     * @param {import('../Api')} app
     */
    handler: async (req, res, bot, user, app) => {
        await app.createUser(req, res);
    },
};
