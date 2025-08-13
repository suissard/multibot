const Event = require('../../Class/Event.js');
const BOTS = require('../../Class/BOTS.js');

/**
 * Evenement permettant de gerer les messages mis a jour dans un shareChannel
 */
class ShareEventUpdate extends Event {
    static id = 'shareEventUpdate';
    static listener = 'messageUpdate';

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