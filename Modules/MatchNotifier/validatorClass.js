const ModuleConfigValidator = require('../ModuleConfigValidator');

module.exports = class MatchNotifierValidator extends ModuleConfigValidator {
    constructor(config) {
        super(config, 'MatchNotifier');
    }

    validate() {
        this.isObject('notifRoleId');
        this.isObject('competitions');
        this.isType('cronSchedule', 'string');
        this.isType('notifMessage', 'string');
        this.isType('casterStatFormUrl', 'string');
        this.isType('maximumMatchDuration', 'number');
        this.isType('maximumNumberOfHoursToRetrieveFutureMatches', 'number');
    }
}
