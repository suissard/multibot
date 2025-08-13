const Event = require('../../Class/Event.js');
const BOTS = require('../../Class/BOTS.js');


/**
 * Evenement permettant de gerer les messages envoyés dans un shareChannel
 */
class ShareEvent extends Event {
    static id = 'shareEvent';
    static listener = 'messageCreate';

    handleEvent(message) {
        try {
            let shareChannels = BOTS.ShareChannels.get('all').get(message.channel.id);
            if (shareChannels) shareChannels.handleMessage(message);
        } catch (err) {
            this.handleError(err);
        }
    }
}

module.exports = ShareEvent;