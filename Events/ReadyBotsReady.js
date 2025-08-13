const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

let botReady = 0;

module.exports = class BotsReady extends Event {
    static id = 'botsReady';
    static listener = 'ready';

    handleEvent() {
        try {
            botReady++;
            if (botReady == BOTS.size) BOTS.event.emit('botsReady');
        } catch (err) {
            this.handleError(err);
        }
    }
};
