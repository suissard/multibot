import { describe, it, expect, vi } from 'vitest';
const { handler } = require('../SelfApi/routes/get-users.js');

describe('get-users route handler', () => {
    it('should return 404 if bot not found', async () => {
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        await handler({}, res, null, null, null);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Bot non trouvé' });
    });

    it('should return empty array if guild not found', async () => {
        const bot = {
            home: 'guildId',
            guilds: {
                cache: { get: vi.fn().mockReturnValue(undefined) }
            }
        };

        const result = await handler({}, {}, bot, null, null);

        expect(result).toEqual([]);
    });

    it('should return list of users from guild members', async () => {
        const mockMembers = new Map();
        const member1 = {
            id: 'm1',
            displayName: 'Member One',
            user: {
                username: 'member1',
                discriminator: '1111',
                displayAvatarURL: () => 'url1',
                bot: false
            }
        };
        mockMembers.set('m1', member1);

        // .fetch() returns a Promise resolving to a Collection (Map-like)
        // The code uses: const members = await guild.members.fetch(); 
        // then members.map().
        // If fetch returns Collection, it has map method.
        // If we mock fetch to return Array, map works too.
        // But code is `members.map` so map must exist on resolved value.
        // Array has map.

        const bot = {
            home: 'guildId',
            guilds: {
                cache: {
                    get: vi.fn().mockReturnValue({
                        members: {
                            fetch: vi.fn().mockResolvedValue([member1])
                        }
                    })
                }
            }
        };

        const result = await handler({}, {}, bot, null, null);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            id: 'm1',
            username: 'member1',
            discriminator: '1111',
            avatar: 'url1',
            displayName: 'Member One',
            bot: false
        });
    });
});
