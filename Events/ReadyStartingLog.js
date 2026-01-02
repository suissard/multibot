const Event = require('../Class/Event.js');

module.exports = class StartingLog extends Event {
    static id = 'startingLog';
    static listener = 'clientReady';
    static description = 'Affiche un message de démarrage dans la console.';
    static narrative = "Cet événement écoute l'événement `clientReady` et affiche un message dans la console indiquant que le bot est prêt, ainsi que le nombre de serveurs et d'utilisateurs qu'il dessert.";

    /**
     * Gère l'événement 'clientReady' pour afficher un message de démarrage dans la console.
     * Indique que le bot est prêt et affiche le nombre de serveurs et d'utilisateurs qu'il dessert.
     */
    handleEvent() {
        try {
            console.log(
                `🤖 [${this.bot.name}] ready avec ${this.bot.guilds.cache.size} guildes pour ${this.bot.users.cache.size} utilisateurs`,
            );
            const commandCount = this.bot.BOTS.Commands.getAll().size - this.bot.unauthorizedCommands.length;
            const eventCount = this.bot.BOTS.Events.getAll().size - this.bot.unauthorizedEvents.length;
            const moduleNames = Object.keys(this.bot.modules).join(', ');
            console.log(
                `    [${this.bot.name}] Commandes : ${commandCount} | Events : ${eventCount} | Modules : ${moduleNames}`,
            );
            this.bot.user.setActivity(this.bot.activity);
        } catch (err) {
            this.handleError(err);
        }
    }
};
