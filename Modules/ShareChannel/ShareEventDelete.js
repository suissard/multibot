const Event = require('../../Class/Event.js');
const BOTS = require('../../Class/BOTS.js');

/**
 * Evenement permettant de gerer les messages supprimé dans un shareChannel
 */
class ShareEventDelete extends Event {
    static id = 'shareEventDelete';
    static listener = 'messageDelete';

    /**
     * Gère l'événement `messageDelete` pour les salons partagés.
     * Si un message partagé est supprimé, cette fonction supprime toutes les
     * copies du message dans les autres salons.
     * @param {import('discord.js').Message} message - Le message qui a été supprimé.
     */
    handleEvent(message) {
        try {
            if (message.author?.bot) return;
            let shareChannels = BOTS.ShareChannels.get('all').get(message.channel.id);
            if (!shareChannels) return;
            let shareMessage = shareChannels.getMessage(message.id);
            if (shareMessage) shareMessage.resetTargets();
            message.channel.send('Message en cours de suppression ...').then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 10000);
            });
        } catch (err) {
            this.handleError(err);
        }
    }
}

module.exports = ShareEventDelete;
