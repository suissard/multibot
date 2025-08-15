const Bot = require('../../Class/Bot');
const BOTS = require('../../Class/BOTS.js');

module.exports = {
    path: /\/commands/,
    method: 'post',
    /**
     * Gère la requête pour exécuter une commande via l'API.
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     * @param {import('../../Class/Bot')} bot - L'instance du bot sur laquelle exécuter la commande.
     * @param {import('discord.js').User} user - L'utilisateur authentifié qui exécute la commande.
     */
    handler: async (req, res, bot, user, app) => {
        const cmdId = req._parsedUrl.pathname.replace('/commands', '').replace('/', '');

        // Verifier l'authenticité de l'utilisateur
        const result = await BOTS.Commands.handleApiRequestCommand(bot, req, res, cmdId, user, app);
        // comparer ses droit discord et ceux requis pour la commande

        // executer la commande
        res.json({ result });
    },
};
