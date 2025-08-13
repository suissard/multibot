const Event = require('../Class/Event.js');

module.exports = class ErrorEvent extends Event {
    static id = 'error';
    static listener = 'error';

    handleEvent(error) {
        try {
            console.error(error);
        } catch (err) {
            this.handleError(err);
        }
    }
};
