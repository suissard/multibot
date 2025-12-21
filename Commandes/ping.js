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

    static narrative = `
- La commande répond simplement "Pong".
- Si un argument 'user' est fourni, elle mentionne l'utilisateur.
- Si un argument 'texte' est fourni, elle ajoute le texte à la réponse.
`;

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
        const { interaction } = args;

        if (interaction) {
            const latency = Date.now() - interaction.createdTimestamp;
            result += ` 🏓 (${latency}ms)`;
        }

        if (args.user) result += ' <@' + args.user + '>';
        if (args.texte) result += ` ${args.texte}`;
        return result;
    }
};
