const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class CheckCommand extends Event {
    static id = 'checkCommand';
    static listener = 'messageCreate';

    /**
     * Gère l'événement `messageCreate` pour les commandes textuelles (basées sur un préfixe).
     * Si le message commence par le préfixe du bot, il est transmis au CommandManager pour être traité.
     * @param {import('discord.js').Message} message - Le message créé.
     */
    handleEvent(message) {
        try {
            if (message.content.startsWith(this.bot.prefix))
                BOTS.Commands.handleMessageCommand(this.bot, message);
        } catch (err) {
            this.handleError(err, message.channel);
        }
    }
};