const ModuleConfigValidator = require('../ModuleConfigValidator');

module.exports = class OlympeValidator extends ModuleConfigValidator {
    constructor(config) {
        super(config, 'Olympe');
    }

    validate() {
        this.isObject('olympeAuth');
        this.isType('olympeDomain', 'string');
        this.isType('organization', 'string');
    }

    getAllowedKeys() {
        return [
            'olympeAuth',
            'olympeDomain',
            'organization',
            'olympeMods' // Optional
        ];
    }
}
