const Event = require('../Class/Event.js');

module.exports = class StartingLog extends Event {
    static id = 'startingLog';
    static listener = 'ready';

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
