const Event = require('../Class/Event.js');

module.exports = class StartingLog extends Event {
    static id = 'startingLog';
    static listener = 'ready';

    /**
     * Gère l'événement 'ready' pour afficher un message de démarrage dans la console.
     * Indique que le bot est prêt et affiche le nombre de serveurs et d'utilisateurs qu'il dessert.
     */
    handleEvent() {
        try {
            console.log(
                `🤖 [${this.bot.name}] ready avec ${this.bot.guilds.cache.size} guildes pour ${this.bot.users.cache.size} utilisateurs`,
            );
        } catch (err) {
            this.handleError(err);
        }
    }
};
