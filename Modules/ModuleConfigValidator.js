module.exports = class ModuleConfigValidator {
    constructor(config, moduleName) {
        this.config = config;
        this.moduleName = moduleName;
        this.errors = {
            missing: [],
            invalid: []
        };
    }

    validate() {
        throw new Error('The validate method must be implemented by the child class');
    }

    hasProperty(property) {
        if (this.config[property] === undefined) {
            this.errors.missing.push(property);
            return false;
        }
        return true;
    }

    isType(property, type) {
        if (this.hasProperty(property)) {
            if (typeof this.config[property] !== type) {
                this.errors.invalid.push(`Property '${property}' must be of type '${type}'`);
                return false;
            }
            return true;
        }
        return false;
    }

    isArray(property) {
        if (this.hasProperty(property)) {
            if (!Array.isArray(this.config[property])) {
                this.errors.invalid.push(`Property '${property}' must be an array`);
                return false;
            }
            return true;
        }
        return false;
    }

    isObject(property) {
        if (this.hasProperty(property)) {
            if (typeof this.config[property] !== 'object' || this.config[property] === null) {
                this.errors.invalid.push(`Property '${property}' must be an object`);
                return false;
            }
            return true;
        }
        return false;
    }

    getErrors() {
        return this.errors;
    }

    isValid() {
        return this.errors.missing.length === 0 && this.errors.invalid.length === 0;
    }

    getCleanedConfig() {
        const allowed = this.getAllowedKeys();
        if (allowed) {
            return this.filterConfig(allowed);
        }
        return this.config;
    }

    getAllowedKeys() {
        return null;
    }

    filterConfig(allowedKeys) {
        const cleaned = {};
        for (const key of allowedKeys) {
            if (this.config[key] !== undefined) {
                cleaned[key] = this.config[key];
            }
        }
        return cleaned;
    }
}
