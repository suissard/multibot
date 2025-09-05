const Commande = require('../Class/Command.js');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class Message extends Commande {
    static id = 'setactivity';
    static devBoss = true;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'change le status du bot';
    static help = true;
    static arguments = [
        {
            type: 'STRING',
            name: 'status',
            description: 'Status a mettre',
            required: true,
        },
        {
            type: 'STRING',
            name: 'type',
            description: 'Type de status a mettre',
            required: false,
        },
    ];
    static test = [];

    static narrative = `
- Cette commande permet de changer le message d'activité (le statut "Joue à...") du bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot (\`devBoss = true\`).

- **Fonctionnement :**
    1.  La commande prend un argument \`status\` (texte) qui est le message à afficher.
    2.  Elle appelle la méthode \`setActivity()\` sur l'objet \`user\` du bot, en lui passant le texte du statut.
    3.  Elle retourne ensuite un message confirmant que le statut a été mis à jour.
    4.  Note : Un argument \`type\` existe mais n'est pas actuellement utilisé dans le code. La fonctionnalité pour changer le type d'activité (Streaming, Watching, etc.) est présente en commentaire mais n'est pas active.
`;

    /**
     * Exécute la commande pour changer l'activité du bot.
     * @param {object} args - Les arguments de la commande.
     * @param {string} args.status - Le texte de l'activité à afficher.
     * @param {string} [args.type] - Le type d'activité (non implémenté actuellement).
     * @returns {Promise<string>} Un message de confirmation.
     */
    async methode(args = {}) {
        this.bot.user.setActivity(args.status);
        // TODO permettre d'autres activités
        // this.bot.user.setActivity(args.status, { name : args.status, type: args.status ||"STREAMING", url: "https://playallforone.com/event" });

        return 'Status mis a jour : ' + args.status;
    }
};
