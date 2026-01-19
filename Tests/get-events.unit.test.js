import { describe, it, expect, vi } from 'vitest';
const { handler } = require('../SelfApi/routes/get-events.js');

describe('get-events route handler', () => {
    it('should return empty array if app.BOTS.Events is missing', () => {
        const app = { BOTS: {} };
        const result = handler({}, {}, null, null, app);
        expect(result).toEqual([]);
    });

    it('should return formatted list of events', () => {
        const mockEventsMap = new Map();
        mockEventsMap.set('event1', { name: 'event1', description: 'desc1', active: true });

        const app = {
            BOTS: {
                Events: {
                    __events: mockEventsMap
                }
            }
        };

        const result = handler({}, {}, null, null, app);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            name: 'event1',
            description: 'desc1',
            active: true,
            intents: undefined,
            options: undefined,
            config: undefined
        });
    });
});
