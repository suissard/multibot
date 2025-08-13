const Event = require('../Class/Event.js');

module.exports = class WarnEvent extends Event {
    static id = 'warn';
    static listener = 'warn';

    /**
     * Gère l'événement 'warn' de discord.js.
     * Affiche l'avertissement dans la console.
     * @param {string} warn - L'information d'avertissement fournie par l'événement.
     */
    handleEvent(warn) {
        try {
            console.warn(warn);
        } catch (err) {
            this.handleError(err);
        }
    }
};