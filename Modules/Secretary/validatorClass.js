const ModuleConfigValidator = require('../ModuleConfigValidator');

module.exports = class SecretaryValidator extends ModuleConfigValidator {
    constructor(config) {
        super(config, 'Secretary');
    }

    validate() {
        this.isArray('suppRole');
        this.isType('notifKeywords', 'string');
        this.isArray('secretaryRoleId');
        this.isArray('secretaryCategorieId');
    }
}
