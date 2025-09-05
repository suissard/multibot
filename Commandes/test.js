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

    static narrative = `
- Cette commande est un outil de développement conçu pour tester la manière dont le bot reçoit et interprète différents types d'arguments de commandes slash.
- Elle accepte une large gamme de types d'arguments : texte, entier, booléen, utilisateur, salon, rôle, mention, et pièce jointe.

- **Fonctionnement :**
    1.  Lorsqu'elle est exécutée, la commande reçoit un objet \`args\` contenant toutes les valeurs des arguments fournis par l'utilisateur.
    2.  Elle convertit cet objet \`args\` en une chaîne de caractères au format JSON.
    3.  Elle retourne une réponse qui inclut le texte "test OK" suivi de la chaîne JSON des arguments, formatée dans un bloc de code pour une lecture facile.
    4.  Cela permet à un développeur de vérifier rapidement que tous les types de données sont correctement reçus et formatés.
`;

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
