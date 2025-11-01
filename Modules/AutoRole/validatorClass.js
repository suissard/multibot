const ModuleConfigValidator = require('../ModuleConfigValidator');

module.exports = class AutoRoleValidator extends ModuleConfigValidator {
    constructor(config) {
        super(config, 'AutoRole');
    }

    validate() {
        this.isObject('guilds');
        this.isObject('roleIds');
        this.isObject('olympeAuth');
        this.isType('everyXhours', 'number');
        this.isArray('orgaRoleIds');
        this.isType('olympeDomain', 'string');
        this.isType('organization', 'string');
    }
}
