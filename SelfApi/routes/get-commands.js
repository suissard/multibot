const BOTS = require('../../Class/BOTS.js');

/**
 * Route permettant d'obtenir les informations au sujet d'une commande
 */
module.exports = {
    path: /\/commands*.*/,
    method: 'get',
    handler: (req, res, bot, user, app) => {
        const cmdId = req._parsedUrl.pathname.replace('/commands', '').replace('/', '');
        if (!cmdId) {
            const listCmd = Array.from(BOTS.Commands.__commands).map(([id, cmd]) => {
                return {
                    id: cmd.id,
                    devBoss: cmd.devBoss,
                    home: cmd.home,
                    userPermissions: cmd.userPermissions,
                    botPermissions: cmd.botPermissions,
                    description: cmd.description,
                    help: cmd.help,
                    arguments: cmd.arguments,
                };
            });
            return res.json(listCmd);
        }
        // const cmdId = req.query.cmd_id;
        const cmd = BOTS.Commands.get(cmdId);
        if (!cmd) throw { message: `Commande ${cmdId} introuvable`, status: 404 };

        res.json({
            id: cmd.id,
            devBoss: cmd.devBoss,
            home: cmd.home,
            userPermissions: cmd.userPermissions,
            botPermissions: cmd.botPermissions,
            description: cmd.description,
            help: cmd.help,
            arguments: cmd.arguments,
        });
    },
};
