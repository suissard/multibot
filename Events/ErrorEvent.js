const Event = require('../Class/Event.js');

module.exports = class ErrorEvent extends Event {
    static id = 'error';
    static listener = 'error';
    static description = 'Affiche les erreurs de discord.js.';
    static narrative = "Cet événement écoute l'événement `error` de discord.js et affiche les erreurs reçues dans la console. C'est un outil essentiel pour la surveillance des erreurs du bot.";

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
