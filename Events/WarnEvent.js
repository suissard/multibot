const Event = require('../Class/Event.js');

module.exports = class WarnEvent extends Event {
    static id = 'warn';
    static listener = 'warn';
    static description = 'Affiche les avertissements de discord.js.';
    static narrative = "Cet événement écoute l'événement `warn` de discord.js et affiche les avertissements reçus dans la console.";

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