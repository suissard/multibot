const ModuleConfigValidator = require('../ModuleConfigValidator');

module.exports = class VocalDuplicateValidator extends ModuleConfigValidator {
    constructor(config) {
        super(config, 'VocalDuplicate');
    }

    validate() {
        this.isArray('guilds');
    }
}
