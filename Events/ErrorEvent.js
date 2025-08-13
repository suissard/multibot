const Event = require('../Class/Event.js');

module.exports = class ErrorEvent extends Event {
    static id = 'error';
    static listener = 'error';

    /**
     * Gère l'événement 'error' de discord.js.
     * Affiche l'erreur dans la console.
     * @param {Error} error - L'objet Erreur fourni par l'événement.
     */
    handleEvent(error) {
        try {
            console.error(error);
        } catch (err) {
            this.handleError(err);
        }
    }
};
