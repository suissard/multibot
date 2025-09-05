const Command = require('../Class/Command.js');
const Discord = require('discord.js');

module.exports = class SecretaryCommandMessage extends Command {
    static id = 'respond';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Répond au message du secretary';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [{ options: [{ name: 'texte', value: 'test de Ping' }] }];
    static arguments = [
        {
            type: 'STRING',
            name: 'texte',
            description: 'Texte à envoyer',
            required: false,
        }, {
            type: 'ATTACHMENT',
            name: 'fichier',
            description: 'Fichier à envoyer',
            required: false,
        }
    ];

    static narrative = `
- Cette commande est spécifiquement conçue pour être utilisée dans les salons créés par le module "Secretary".
- Son but est de permettre à un modérateur de répondre à un utilisateur qui a ouvert un ticket.

- **Fonctionnement :**
    1.  La commande vérifie d'abord si elle est exécutée dans un serveur où le module "Secretary" est actif.
    2.  Elle s'attend à être dans un salon dont le nom se termine par un tiret suivi d'un ID d'utilisateur (par exemple, \`ticket-jean-123456789012345678\`).
    3.  Elle extrait cet ID utilisateur directement depuis le nom du salon.
    4.  Elle récupère l'objet "user" correspondant à cet ID pour pouvoir lui envoyer un message privé.
    5.  Elle prend le texte et/ou le fichier joint fourni en argument par le modérateur.
    6.  Elle construit un message "embed" avec ce contenu.
    7.  La commande envoie cet embed à deux endroits :
        - En message privé (DM) à l'utilisateur qui a ouvert le ticket.
        - Dans le salon de secrétariat actuel, pour garder une trace de la conversation.
    8.  Si la commande n'est pas utilisée dans un salon de secrétariat valide ou si aucun message/fichier n'est fourni, elle renvoie une erreur.
`;

    /**
     * Exécute la commande pour répondre à un utilisateur via un salon de secrétariat.
     * Extrait l'ID de l'utilisateur depuis le nom du salon, puis envoie la réponse
     * à la fois en message privé à l'utilisateur et dans le salon actuel.
     * @param {object} args - Les arguments de la commande.
     * @param {import('discord.js').CommandInteraction} args.interaction - L'objet d'interaction original, pour récupérer les pièces jointes.
     * @param {string} [args.texte] - Le texte de la réponse.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async methode(args = {}) {
        let passing = false;
        for (let i in this.bot.modules.Secretary.secretary) {
            if (this.bot.modules.Secretary.secretary[i].guild.id == args.interaction.guild.id) {
                passing = true;
            }
        }
        if (!passing) {
            return "❌ Vous n'avez pas accès à cette commande";
        }

        if (!args['texte'] && !args.interaction.options.getAttachment("fichier")) {
            return "❌ Vous devez envoyer un message ou un fichier !";
        }

        const interaction = args.interaction;
        const match = interaction.channel.name.match(/.+-(\d{17,19})$/);
        if (!match) {
            return "❌ Pas dans un channel valide !";
        }
        let userID = match[1];

        let user = this.bot.users.cache.get(userID);
        if (!user) user = await this.bot.users.fetch(userID).catch(_ => null);

        let rawResult = args.texte;
        let file = interaction.options.getAttachment("fichier");
        let embed = new Discord.EmbedBuilder()
        .setTitle(this.bot.name)
        .setColor('#0099ff')
        .setTimestamp()

        if (file) {
            embed.setImage(file.url);
        }

        if (rawResult) {
            let result = rawResult.replace(/\\n/g, '\n');
            embed.setDescription(result);
        }

        user.send({ embeds: [embed] }).catch(_ => null);
        this.channel.send({ embeds: [embed] });
        return "✅ Réponse envoyée !";
    }
};
