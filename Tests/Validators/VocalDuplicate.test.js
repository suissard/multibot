import { describe, it, expect } from 'vitest';
import VocalDuplicateValidator from '../../Modules/VocalDuplicate/validatorClass';

describe('VocalDuplicateValidator', () => {
    it('should pass with a valid configuration', () => {
        const validConfig = {
            guilds: []
        };
        const validator = new VocalDuplicateValidator(validConfig);
        validator.validate();
        expect(validator.isValid()).toBe(true);
    });

    it('should fail if a required property is missing', () => {
        const invalidConfig = {
            // guilds is missing
        };
        const validator = new VocalDuplicateValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors()).toContain('Missing property: guilds');
    });

    it('should fail if a property has the wrong type', () => {
        const invalidConfig = {
            guilds: {} // should be an array
        };
        const validator = new VocalDuplicateValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors()).toContain("Property 'guilds' must be an array");
    });
});
