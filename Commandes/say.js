const Commande = require('../Class/Command.js');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = class Say extends Commande {
    static id = 'say';
    static devBoss = false;
    static home = true;
    static userPermissions = ['Administrator'];
    static botPermissions = [];
    static description = 'Fait parler le bot.';
    static help = true;
    static howTo = 'La commande prend en argument un texte et un argument optionnel pourrai être un channel et un autre pourrait une piece jointe';
    static arguments = [
        {
            type: 'STRING',
            name: 'texte',
            description: 'Message à envoyer',
            required: true,
        },
        {
            type: 'CHANNEL',
            name: 'channel',
            description: 'Channel où envoyer le message',
            required: false,
        },
        {
            type: 'ATTACHMENT',
            name: 'piecejointe',
            description: 'Pièce jointe à envoyer',
            required: false,
        },
    ];

    static narrative = `
- Cette commande permet de faire parler le bot dans un channel.
- Elle nécessite la permission "Administrateur" (\`Administrator\`) pour être utilisée.
- La commande peut être utilisée uniquement dans le discord considéré comme home.
- Le bot se contentera d'écrire le texte dans le channel indiqué avec la piece jointe fournit
`;

    static test = [
        {
            config: {
                botID: '1',
                guildID: '595557812051116052',
                userID: '244419544825856000',
                channelID: '668412501301657620',
            },
            options: [
                { name: 'texte', value: 'Ceci est un test' },
            ],
        },
    ];

    /**
     * Exécute la commande pour faire parler le bot.
     * @param {object} args - Les arguments de la commande.
     * @param {string} args.texte - Le contenu du message à envoyer.
     * @param {string} [args.channel] - L'ID du channel où envoyer le message.
     * @param {string} [args.piecejointe] - L'URL de la pièce jointe à envoyer.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async methode(args = {}) {
        const channel = args.channel ? this.guild.channels.cache.get(args.channel) : this.channel;

        if (!channel) {
            return "❌ Le channel n'a pas été trouvé.";
        }

        const messageOptions = {
            content: args.texte,
        };

        if (args.piecejointe) {
            messageOptions.files = [args.piecejointe];
        }

        try {
            await channel.send(messageOptions);
            return "✅ Message envoyé !";
        } catch (error) {
            console.error(error);
            return "❌ Une erreur est survenue lors de l'envoi du message. Vérifiez que j'ai les permissions nécessaires pour parler dans ce channel.";
        }
    }
};