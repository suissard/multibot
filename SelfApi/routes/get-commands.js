// const BOTS = require('../../Class/BOTS.js');

/**
 * Route permettant d'obtenir les informations au sujet d'une commande
 */
module.exports = {
    path: /\/commands*.*/,
    method: 'get',
    /**
     * Gère la requête pour obtenir des informations sur les commandes.
     * Si un ID de commande est fourni dans l'URL, renvoie les détails de cette commande.
     * Sinon, renvoie une liste de toutes les commandes enregistrées.
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     */
    handler: (req, res, bot, user, app) => {
        const cmdId = req._parsedUrl.pathname.replace('/commands', '').replace('/', '');
        if (!cmdId) {
            const listCmd = Array.from(app.BOTS.Commands.__commands).map(([id, cmd]) => {
                return {
                    id: cmd.id,
                    name: cmd.id,
                    devBoss: cmd.devBoss,
                    home: cmd.home,
                    userPermissions: cmd.userPermissions,
                    botPermissions: cmd.botPermissions,
                    description: cmd.description,
                    help: cmd.help,
                    narrative: cmd.narrative,
                    howTo: cmd.howTo,
                    arguments: cmd.arguments,
                };
            });
            return listCmd;
        }
        // const cmdId = req.query.cmd_id;
        const cmd = app.BOTS.Commands.get(cmdId);
        if (!cmd) throw { message: `Commande ${cmdId} introuvable`, status: 404 };

        return {
            id: cmd.id,
            name: cmd.id,
            devBoss: cmd.devBoss,
            home: cmd.home,
            userPermissions: cmd.userPermissions,
            botPermissions: cmd.botPermissions,
            description: cmd.description,
            help: cmd.help,
            narrative: cmd.narrative,
            howTo: cmd.howTo,
            arguments: cmd.arguments,
        };
    },
};
