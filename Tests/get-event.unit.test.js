import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Set env vars
process.env.STRAPI_URL = 'http://localhost';
process.env.STRAPI_TOKEN = 'dummy';

// Require Real BOTS
const BOTS = require('../Class/BOTS.js');

describe('get-event route handler', () => {
    let handler;

    beforeAll(async () => {
        const module = await import('../SelfApi/routes/get-event.js');
        handler = module.handler;
    });

    beforeEach(() => {
        vi.restoreAllMocks();
        // Check if BOTS has Events property we can manipulate
        if (BOTS && BOTS.Events && BOTS.Events.__events) {
            BOTS.Events.__events.clear();
        }
        if (BOTS && BOTS.Events) {
            vi.spyOn(BOTS.Events, 'get');
        }
    });

    it('should return a list of all events if no eventName param', () => {
        // Manipulate real singleton state
        if (!BOTS.Events.__events) throw new Error('BOTS.Events.__events not available');
        BOTS.Events.__events.set('event1', { name: 'event1', description: 'desc1', active: true });
        BOTS.Events.__events.set('event2', { name: 'event2', description: 'desc2', active: false });

        const req = { params: {} };
        const res = {};

        const result = handler(req, res);

        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty('name', 'event1');
    });

    it('should return specific event details if eventName provided', () => {
        BOTS.Events.__events.set('event1', { name: 'event1', description: 'desc1' });

        const req = { params: { eventName: 'event1' } };
        const res = {};

        const result = handler(req, res);

        expect(BOTS.Events.get).toHaveBeenCalledWith('event1');
        expect(result).toHaveProperty('name', 'event1');
    });

    it('should throw 404 if event not found', () => {
        const req = { params: { eventName: 'unknown' } };

        try {
            handler(req, {});
        } catch (e) {
            expect(e).toStrictEqual({ message: 'Event unknown not found', status: 404 });
            return;
        }
        throw new Error('Should have thrown');
    });
});
