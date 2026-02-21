const ModuleConfigValidator = require('../ModuleConfigValidator');

module.exports = class TeamManagerValidator extends ModuleConfigValidator {
    constructor(config) {
        super(config, 'TeamManager');
    }

    validate() {
        // No config required for now
    }

    getAllowedKeys() {
        return [];
    }
}
