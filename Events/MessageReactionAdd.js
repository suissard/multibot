const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class CheckCommand extends Event {
    static id = 'MessageReactionAdd';
    static listener = 'messageReactionAdd';

    handleEvent(reaction, user) {
        try {
            BOTS.EmoteMessages.handleMessageReactionAdd(reaction, user); //XEKKO C'est el manager qui gere les evenements

        } catch (err) {
            this.handleError(err, reaction.message.channel);
        }
    }
};
