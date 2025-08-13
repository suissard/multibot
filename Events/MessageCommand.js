const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class CheckCommand extends Event {
    static id = 'checkCommand';
    static listener = 'messageCreate';

    handleEvent(message) {
        try {
            if (message.content.startsWith(this.bot.prefix))
                BOTS.Commands.handleMessageCommand(this.bot, message);
        } catch (err) {
            this.handleError(err, message.channel);
        }
    }
};