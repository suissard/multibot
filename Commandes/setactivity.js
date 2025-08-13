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
