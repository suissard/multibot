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

    methode(args = {}) {
        let result = 'Pong';
        if (args.user) result += ' <@' + args.user + '>';
        if (args.texte) result += ` ${args.texte}`;
        return result;
    }
};
