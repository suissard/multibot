import { describe, it, expect } from 'vitest';
import SecretaryValidator from '../../Modules/Secretary/validatorClass';

describe('SecretaryValidator', () => {
    it('should pass with a valid configuration', () => {
        const validConfig = {
            suppRole: [],
            notifKeywords: 'SOS',
            secretaryRoleId: [],
            secretaryCategorieId: []
        };
        const validator = new SecretaryValidator(validConfig);
        validator.validate();
        expect(validator.isValid()).toBe(true);
    });

    it('should fail if a required property is missing', () => {
        const invalidConfig = {
            suppRole: [],
            notifKeywords: 'SOS',
            secretaryRoleId: [],
            // secretaryCategorieId is missing
        };
        const validator = new SecretaryValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors()).toContain('Missing property: secretaryCategorieId');
    });

    it('should fail if a property has the wrong type', () => {
        const invalidConfig = {
            suppRole: [],
            notifKeywords: 123, // should be a string
            secretaryRoleId: [],
            secretaryCategorieId: []
        };
        const validator = new SecretaryValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors()).toContain("Property 'notifKeywords' must be of type 'string'");
    });
});
