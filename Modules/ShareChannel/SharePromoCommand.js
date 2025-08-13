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
