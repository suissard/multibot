module.exports = class ModuleConfigValidator {
    constructor(config, moduleName) {
        this.config = config;
        this.moduleName = moduleName;
        this.errors = [];
    }

    validate() {
        throw new Error('The validate method must be implemented by the child class');
    }

    hasProperty(property) {
        if (this.config[property] === undefined) {
            this.errors.push(`Missing property: ${property}`);
            return false;
        }
        return true;
    }

    isType(property, type) {
        if (this.hasProperty(property)) {
            if (typeof this.config[property] !== type) {
                this.errors.push(`Property '${property}' must be of type '${type}'`);
                return false;
            }
            return true;
        }
        return false;
    }

    isArray(property) {
        if (this.hasProperty(property)) {
            if (!Array.isArray(this.config[property])) {
                this.errors.push(`Property '${property}' must be an array`);
                return false;
            }
            return true;
        }
        return false;
    }

    isObject(property) {
        if (this.hasProperty(property)) {
            if (typeof this.config[property] !== 'object' || this.config[property] === null) {
                this.errors.push(`Property '${property}' must be an object`);
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
        return this.errors.length === 0;
    }
}
