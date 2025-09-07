const Event = require('../Class/Event.js');

module.exports = class DebugEvent extends Event {
    static id = 'debug';
    static listener = 'debug';
    static description = 'Affiche les informations de débogage de discord.js.';
    static narrative = "Cet événement écoute l'événement `debug` de discord.js et affiche simplement les informations reçues dans la console. C'est un outil de bas niveau pour le débogage.";

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

