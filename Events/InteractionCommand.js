const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class InteractionCommand extends Event {
    static id = 'InteractionCommand';
    static listener = 'interactionCreate';

    handleEvent(interaction) {
        try {
            if (interaction.isCommand()) BOTS.Commands.handleInteractionCommand(this.bot, interaction);
        } catch (err) {
            this.handleError(err);
        }
    }
};

