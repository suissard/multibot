const Event = require('../Class/Event.js');

module.exports = class WarnEvent extends Event {
    static id = 'warn';
    static listener = 'warn';

    handleEvent(warn) {
        try {
            console.warn(warn);
        } catch (err) {
            this.handleError(err);
        }
    }
};