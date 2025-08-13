const Event = require('../../Class/Event.js');
const BOTS = require('../../Class/BOTS.js');

/**
 * Evenement permettant de gerer les messages mis a jour dans un shareChannel
 */
class ShareEventUpdate extends Event {
    static id = 'shareEventUpdate';
    static listener = 'messageUpdate';

    /**
     * Gère l'événement `messageUpdate` pour les salons partagés.
     * Si un message partagé est mis à jour, cette fonction propage la mise à jour
     * à toutes les copies du message dans les autres salons.
     * @param {import('discord.js').Message} oldMessage - L'ancien message.
     * @param {import('discord.js').Message} newMessage - Le nouveau message.
     */
    handleEvent(oldMessage, newMessage) {
        try {
            if (oldMessage.author?.bot) return;
            let shareChannels = BOTS.ShareChannels.get('all').get(oldMessage.channel.id);
            if (!shareChannels) return;
            let shareMessage = shareChannels.getMessage(oldMessage.id);
            if (shareMessage) shareMessage.updateTarget(newMessage.content);
        } catch (err) {
            this.handleError(err);
        }
    }
}

module.exports = ShareEventUpdate;