import { describe, it, expect } from 'vitest';
import MatchNotifierValidator from '../../Modules/MatchNotifier/validatorClass';

describe('MatchNotifierValidator', () => {
    it('should pass with a valid configuration', () => {
        const validConfig = {
            notifRoleId: {},
            competitions: {},
            cronSchedule: '*/30 * * * *',
            notifMessage: 'message',
            casterStatFormUrl: 'url',
            maximumMatchDuration: 4,
            maximumNumberOfHoursToRetrieveFutureMatches: 4
        };
        const validator = new MatchNotifierValidator(validConfig);
        validator.validate();
        expect(validator.isValid()).toBe(true);
    });

    it('should pass if notifMessage is missing (optional)', () => {
        const validConfig = {
            notifRoleId: {},
            competitions: {},
            cronSchedule: '*/30 * * * *',
            // notifMessage is missing
            casterStatFormUrl: 'url',
            maximumMatchDuration: 4,
            maximumNumberOfHoursToRetrieveFutureMatches: 4
        };
        const validator = new MatchNotifierValidator(validConfig);
        validator.validate();
        expect(validator.isValid()).toBe(true);
    });

    it('should fail if a required property is missing', () => {
        const invalidConfig = {
            notifRoleId: {},
            competitions: {},
            cronSchedule: '*/30 * * * *',
            notifMessage: 'message',
            casterStatFormUrl: 'url',
            maximumMatchDuration: 4,
            // maximumNumberOfHoursToRetrieveFutureMatches is missing
        };
        const validator = new MatchNotifierValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors().missing).toContain('maximumNumberOfHoursToRetrieveFutureMatches');
    });

    it('should fail if a property has the wrong type', () => {
        const invalidConfig = {
            notifRoleId: {},
            competitions: {},
            cronSchedule: '*/30 * * * *',
            notifMessage: 'message',
            casterStatFormUrl: 'url',
            maximumMatchDuration: '4', // should be a number
            maximumNumberOfHoursToRetrieveFutureMatches: 4
        };
        const validator = new MatchNotifierValidator(invalidConfig);
        validator.validate();
        expect(validator.isValid()).toBe(false);
        expect(validator.getErrors().invalid).toContain("Property 'maximumMatchDuration' must be of type 'number'");
    });
});
