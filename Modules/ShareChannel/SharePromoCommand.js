const Command = require('../../Class/Command.js');
const BOTS = require('../../Class/BOTS.js');
const MultiBotMessageEmbed = require('../../Tools/MultiBotMessageEmbed');

/**
 * Commande de gestion des shareChannel
 */
class SalonCommand extends Command {
    static id = 'sharepromo';
    static devBoss = false;
    static home = true;
    static userPermissions = ['ADMINISTRATOR'];
    static botPermissions = [];
    static description = 'Partager un message format embed sur ce salon partagé';
    static help = true;
    static howTo = '';
    static test = [];
    static arguments = [
        {
            type: 'STRING',
            name: 'texte',
            description: 'Message à envoyer',
            required: true,
        },
        {
            type: 'STRING',
            name: 'imageurl',
            description: 'Ajouter une URL d\'image au message',
            required: false,
        },
    ];

    static narrative = `
- Cette commande permet d'envoyer un message promotionnel (un "embed") à tous les salons faisant partie du même groupe de partage que le salon actuel.
- Elle nécessite la permission "Administrateur" (\`ADMINISTRATOR\`).

- **Arguments :**
    - \`texte\` (requis) : Le contenu principal du message. Les séquences spéciales comme \`%%\` sont converties en sauts de ligne.
    - \`imageurl\` (optionnel) : L'URL d'une image à inclure dans le message.

- **Fonctionnement :**
    1.  La commande vérifie si le salon actuel fait bien partie d'un groupe de partage.
    2.  Si c'est le cas, elle identifie le groupe et construit un message "embed" avec le texte et l'image fournis.
    3.  Elle parcourt ensuite la liste de tous les salons de ce groupe.
    4.  Elle envoie l'embed dans chaque salon du groupe, propageant ainsi le message sur tous les serveurs connectés.
    5.  Une barre de chargement est affichée pendant le processus d'envoi.
    6.  Si le salon actuel n'est pas un salon partagé, elle renvoie un message d'erreur.
`;

    /**
     * Exécute la commande pour envoyer un message promotionnel à un groupe de partage.
     * Le message est envoyé sous forme d'embed et peut contenir une image.
     * @param {object} args - Les arguments de la commande.
     * @param {string} args.texte - Le texte du message promotionnel.
     * @param {string} [args.imageurl] - L'URL d'une image à inclure dans l'embed.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async methode(args = {}) {
        try {
            let texte = args.texte.replace(/%%/g, '\n '); //pour repérer les souhaits de sauts de ligne
            let shareChannel = BOTS.ShareChannels.get('all').get(this.channel.id);

            if (shareChannel) {
                shareChannel = BOTS.ShareChannels.get(shareChannel.id);
                let embed = new MultiBotMessageEmbed()
                    .setDescription(texte)
                    .setImage(args.imageurl);

                await this.loading(shareChannel._channels, async (channel) => {
                    try {
                        await channel.send(embed);
                    } catch (e) {
                        console.error(`ShareChannel ${channel.id}`, `Erreur majeur\n` + err.stack);
                    }
                });
                return `Message envoyé dans ${shareChannel._channels} salon de ${shareChannel.id}`;
            } else return 'Ce salon n\'est pas dans le système de salon partagée';
        } catch (err) {
            this.handleError(err);
        }
    }
}

module.exports = SalonCommand;
