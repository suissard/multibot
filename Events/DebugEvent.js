const Event = require('../Class/Event.js');

module.exports = class DebugEvent extends Event {
    static id = 'debug';
    static listener = 'debug';

    handleEvent(debug) {
        try {
            console.info(debug);
        } catch (err) {
            this.handleError(err);
        }
    }
};

