const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class InteractionCommand extends Event {
    static id = 'InteractionCommand';
    static listener = 'interactionCreate';

    /**
     * Gère l'événement `interactionCreate` pour les commandes slash.
     * Si l'interaction est une commande, elle est transmise au CommandManager pour être traitée.
     * @param {import('discord.js').Interaction} interaction - L'interaction reçue.
     */
    handleEvent(interaction) {
        try {
            if (interaction.isCommand()) BOTS.Commands.handleInteractionCommand(this.bot, interaction);
        } catch (err) {
            this.handleError(err);
        }
    }
};

