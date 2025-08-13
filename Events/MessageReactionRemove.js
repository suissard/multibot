const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class CheckCommand extends Event {
    static id = 'MessageReactionRemove';
    static listener = 'messageReactionRemove';

    handleEvent(reaction, user) {
        try {
            BOTS.EmoteMessages.handleMessageReactionRemove(reaction, user);

        } catch (err) {
            this.handleError(err, reaction.message.channel);
        }
    }
};
