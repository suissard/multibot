const Event = require('../Class/Event.js');

module.exports = class DebugEvent extends Event {
    static id = 'debug';
    static listener = 'debug';

    /**
     * Gère l'événement 'debug' de discord.js.
     * Affiche les informations de débogage dans la console.
     * @param {string} debug - L'information de débogage fournie par l'événement.
     */
    handleEvent(debug) {
        try {
            console.info(debug);
        } catch (err) {
            this.handleError(err);
        }
    }
};

