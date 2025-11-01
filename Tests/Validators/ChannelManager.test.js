import { describe, it, expect } from 'vitest';
import ChannelManagerValidator from '../../Modules/ChannelManager/validatorClass';

describe('ChannelManagerValidator', () => {
    it('should pass with a valid configuration', () => {
        const validConfig = {
            userLimit: 10,
            cronSchedule: '*/30 * * * *',
            maximumMatchDuration: -1,
            maximumNumberOfHoursToRetrieveFutureMatches: -1
        };
        const validator = new ChannelManagerValidator(validConfig);
        validator.validate();
        expect(validator.isValid()).toBe(true);
    });

    it('should fail if a required property is missing', () => {
        const invalidConfig = {
            userLimit: 10,
            cronSchedule: '*/30 * * * *',
            maximumMatchDuration: -1,
            // maximumNumberOfHoursToRetrieveFutureMatches is missing
        };
        const validator = new ChannelManagerValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors()).toContain('Missing property: maximumNumberOfHoursToRetrieveFutureMatches');
    });

    it('should fail if a property has the wrong type', () => {
        const invalidConfig = {
            userLimit: '10', // should be a number
            cronSchedule: '*/30 * * * *',
            maximumMatchDuration: -1,
            maximumNumberOfHoursToRetrieveFutureMatches: -1
        };
        const validator = new ChannelManagerValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors()).toContain("Property 'userLimit' must be of type 'number'");
    });
});
