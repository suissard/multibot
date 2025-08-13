const Command = require('../Class/Command.js');

module.exports = class Ping extends Command {
    static id = 'ping';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Répond pong';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [{ options: [{ name: 'texte', value: 'test de Ping' }] }];
    static arguments = [
        {
            type: 'STRING',
            name: 'texte',
            description: 'Texte à envoyer',
            required: false,
        },
        {
            type: 'USER',
            name: 'user',
            description: 'Mentionner un user à ping',
            required: false,
        },
    ];

    /**
     * Exécute la commande ping.
     * Répond "Pong" et peut inclure un texte ou mentionner un utilisateur si fourni en argument.
     * @param {object} args - Les arguments de la commande.
     * @param {string} [args.user] - L'ID de l'utilisateur à mentionner.
     * @param {string} [args.texte] - Le texte à inclure dans la réponse.
     * @returns {string} La réponse de la commande.
     */
    methode(args = {}) {
        let result = 'Pong';
        if (args.user) result += ' <@' + args.user + '>';
        if (args.texte) result += ` ${args.texte}`;
        return result;
    }
};
