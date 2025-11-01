const ModuleConfigValidator = require('../ModuleConfigValidator');

module.exports = class ChannelManagerValidator extends ModuleConfigValidator {
    constructor(config) {
        super(config, 'ChannelManager');
    }

    validate() {
        this.isType('userLimit', 'number');
        this.isType('cronSchedule', 'string');
        this.isType('maximumMatchDuration', 'number');
        this.isType('maximumNumberOfHoursToRetrieveFutureMatches', 'number');
    }
}
