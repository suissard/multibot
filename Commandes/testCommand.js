const Commande = require('../Class/Command.js');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class Message extends Commande {
    static id = 'testCommand';
    static devBoss = true;
    static home = false;
    static userPermissions = ['BanMembers'];
    static botPermissions = [];
    static description =
        'Test une commande ou serie de commandes';
    static help = true;
    static arguments = [
        {
            type: 'STRING',
            name: 'nom_de_commande',
            description: 'Nom de la commande a tester',
            required: false,
        }, {
            type: 'STRING',
            name: 'noms_des_commandes',
            description: 'Noms des commandes a tester, séparées par un espace',
            required: false,
        },

    ];
    static test = [];

    /**
     * Exécute la commande de test pour d'autres commandes.
     * Peut tester une seule commande ou une liste de commandes.
     * @param {object} args - Les arguments de la commande.
     * @param {string} [args.nom_de_commande] - Le nom de la commande unique à tester.
     * @param {string} [args.noms_des_commandes] - Une chaîne contenant les noms de plusieurs commandes à tester, séparés par des espaces.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async methode(args = {}) {
        if (args.nom_de_commande) {
            if (this.checkCommand(args.nom_de_commande)) await this.launchTestProcess(args.nom_de_commande);
            else return `La commande \`\`${args.nom_de_commande}\`\` n'existe pas ou n'as pas de test intégré`;
            return `La commande \`\`${args.nom_de_commande}\`\` a été testée`;
        } else if (args.noms_des_commandes) {
            let commandsNames = args.noms_des_commandes.split(/ +/);
            for (let i in commandsNames) {
                let commandName = commandsNames[i];
                if (this.checkCommand(commandName)) await this.launchTestProcess(commandName);
                else return `La commande \`\`${commandName}\`\` n'existe pas ou n'as pas de test intégré`;
            }
            return `Commandes \`\`${commandsNames.join('``, ``')}\`\` ont été testées`;

        }
        return '❌ Veuillez indiquer une ou plusieurs commandes a tester';

    }

    /**
     * Vérifie si une commande existe et si elle a un protocole de test défini.
     * @param {string} commandName - Le nom de la commande à vérifier.
     * @returns {boolean} `true` si la commande est testable, sinon `false`.
     */
    checkCommand(commandName) {
        let command = BOTS.Commands.__commands.get(commandName);
        if (!command) return false;
        return command.test.length ? true : false;
    }

    /**
     * Lance le processus de test pour une commande spécifiée.
     * @param {string} commandName - Le nom de la commande à tester.
     * @returns {Promise<any>} Le résultat du processus de test de la commande.
     */
    launchTestProcess(commandName) {
        let bot = this.bot;
        let Command = BOTS.Commands.__commands.get(commandName);

        let cmd = new Command(bot);
        let botID = bot.id,
            userID = this.user.id,
            channelID = this.channel.id;
        return cmd.testProcess(botID, userID, channelID);
    }
};
