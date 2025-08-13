const Bot = require('../../Class/Bot');
const BOTS = require('../../Class/BOTS.js');

module.exports = {
    path: /\/commands/,
    method: 'post',
    /**
     *
     * @param {*} req
     * @param {*} res
     * @param {Bot} bot
     * @param {*} user
     * @param {*} app
     */
    handler: async (req, res, bot, user, app) => {
        const cmdId = req._parsedUrl.pathname.replace('/commands', '').replace('/', '');

        // Verifier l'authenticité de l'utilisateur
        const result = await BOTS.Commands.handleApiRequestCommand(bot, req, res, cmdId, user);
        // comparer ses droit discord et ceux requis pour la commande

        // executer la commande
        res.json({ result });
    },
};
