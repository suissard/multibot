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
        try {
            await app.createUser(req, res);
        } catch (e) {
            console.error('Error in auth callback:', e);
            res.status(500).send({ message: e.message });
        }
    },
};
