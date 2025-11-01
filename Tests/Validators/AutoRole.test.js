import { describe, it, expect } from 'vitest';
import AutoRoleValidator from '../../Modules/AutoRole/validatorClass';

describe('AutoRoleValidator', () => {
    it('should pass with a valid configuration', () => {
        const validConfig = {
            guilds: {},
            roleIds: {},
            olympeAuth: {},
            everyXhours: 1,
            orgaRoleIds: [],
            olympeDomain: 'prod.api.olympe.xyz',
            organization: 'www.playallforone.com'
        };
        const validator = new AutoRoleValidator(validConfig);
        validator.validate();
        expect(validator.isValid()).toBe(true);
    });

    it('should fail if a required property is missing', () => {
        const invalidConfig = {
            guilds: {},
            roleIds: {},
            olympeAuth: {},
            everyXhours: 1,
            orgaRoleIds: [],
            olympeDomain: 'prod.api.olympe.xyz',
            // organization is missing
        };
        const validator = new AutoRoleValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors()).toContain('Missing property: organization');
    });

    it('should fail if a property has the wrong type', () => {
        const invalidConfig = {
            guilds: {},
            roleIds: {},
            olympeAuth: {},
            everyXhours: '1', // should be a number
            orgaRoleIds: [],
            olympeDomain: 'prod.api.olympe.xyz',
            organization: 'www.playallforone.com'
        };
        const validator = new AutoRoleValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors()).toContain("Property 'everyXhours' must be of type 'number'");
    });
});
