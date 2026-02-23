const ModuleConfigValidator = require('../ModuleConfigValidator');

module.exports = class AutoRoleValidator extends ModuleConfigValidator {
    constructor(config) {
        super(config, 'AutoRole');
    }

    validate() {
        this.isObject('guilds');
        this.isObject('roleIds');
        this.isType('everyXhours', 'number');
    }

    getAllowedKeys() {
        return [
            'guilds',
            'roleIds',
            'everyXhours',
        ];
    }
}
