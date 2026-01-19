import { describe, it, expect, vi } from 'vitest';
const { handler } = require('../SelfApi/routes/get-channels.js');

describe('get-channels route handler', () => {
    it('should return text channels for the home guild', () => {
        const req = {};
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const user = {};
        const app = { warn: vi.fn() };

        const guildId = 'homeGuildId';
        const mockChannels = [
            { id: 'c1', name: 'general', type: 0 }, // Text
            { id: 'c2', name: 'voice', type: 2 },   // Voice
            { id: 'c3', name: 'rules', type: 0 }    // Text
        ];

        const mockGuild = {
            channels: {
                cache: mockChannels
            }
        };
        // Mock filter and map since we provided a plain array but code expects collection-like behavior
        // Actually code uses .filter().map(). Array has these methods.
        // BUT code uses djs Collection usually. Array.filter returns Array.
        // Let's verify if array methods are sufficient or if we need to mock Collection.
        // The code does: guild.channels.cache.filter(...).map(...)
        // If cache is Array, it works.

        const bot = {
            home: guildId,
            guilds: {
                cache: {
                    get: vi.fn().mockReturnValue(mockGuild)
                }
            }
        };

        const result = handler(req, res, bot, user, app);

        expect(bot.guilds.cache.get).toHaveBeenCalledWith(guildId);
        expect(result).toHaveLength(2);
        expect(result).toEqual([
            { id: 'c1', name: 'general', type: 0 },
            { id: 'c3', name: 'rules', type: 0 }
        ]);
    });

    it('should return 404 if bot is not provided', () => {
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        handler({}, res, null, {}, {});
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Bot non trouvé' });
    });

    it('should return empty array and warn if guild not found', () => {
        const bot = {
            home: 'unknown',
            guilds: {
                cache: {
                    get: vi.fn().mockReturnValue(undefined)
                }
            }
        };
        const app = { warn: vi.fn() };

        const result = handler({}, {}, bot, {}, app);

        expect(result).toEqual([]);
        expect(app.warn).toHaveBeenCalled();
    });
});
