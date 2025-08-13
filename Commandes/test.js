const Commande = require('../Class/Command.js');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class Message extends Commande {
    static id = 'test';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Test une commande ou serie de commandes';
    static help = true;
    static arguments = [
        {
            type: 'STRING',
            name: 'string',
            description: 'un texte',
            required: false,
        },
        {
            type: 'INTEGER',
            name: 'integer',
            description: 'un chiffre',
            required: false,
        },
        {
            type: 'BOOLEAN',
            name: 'boolean',
            description: 'un boolean',
            required: false,
        },
        {
            type: 'USER',
            name: 'user',
            description: 'un utilisateur',
            required: false,
        },
        {
            type: 'CHANNEL',
            name: 'channel',
            description: 'un channel',
            required: false,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'un role',
            required: false,
        },
        {
            type: 'MENTIONABLE',
            name: 'mentionable',
            description: 'une mention',
            required: false,
        },
        {
            type: 'ATTACHMENT',
            name: 'attachement',
            description: 'une piece jointe',
            required: false,
        },
    ];
    static test = [];

    /**
     * Exécute la commande de test.
     * Cette commande est conçue pour tester la réception de différents types d'arguments.
     * Elle retourne les arguments reçus sous forme de chaîne JSON.
     * @param {object} args - Les arguments de la commande.
     * @returns {Promise<string>} Une chaîne de caractères contenant "test OK" et les arguments en format JSON.
     */
    async methode(args = {}) {

        return 'test OK\n```json\n' + JSON.stringify(args);
        +'\n```';
    }
};
