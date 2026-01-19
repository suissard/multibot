import { describe, it, expect, vi } from 'vitest';
const { handler } = require('../SelfApi/routes/get-roles.js');

describe('get-roles route handler', () => {
    it('should return roles sorted by position descending', () => {
        const guildId = 'guild123';
        const mockRoles = [
            { id: 'r1', name: 'Role 1', position: 1, color: 0, permissions: { bitfield: { toString: () => '0' } } },
            { id: 'r2', name: 'Role 2', position: 10, color: 0xFF0000, permissions: { bitfield: { toString: () => '8' } } },
            { id: 'r3', name: 'Role 3', position: 5, color: 0x00FF00, permissions: { bitfield: { toString: () => '0' } } }
        ];

        const mockBot = {
            home: guildId,
            guilds: {
                cache: {
                    get: vi.fn().mockReturnValue({
                        roles: {
                            cache: mockRoles
                        }
                    })
                }
            }
        };

        const req = {};
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        const result = handler(req, res, mockBot);

        expect(mockBot.guilds.cache.get).toHaveBeenCalledWith(guildId);
        expect(result).toEqual([
            { id: 'r2', name: 'Role 2', position: 10, color: 16711680, permissions: '8' },
            { id: 'r3', name: 'Role 3', position: 5, color: 65280, permissions: '0' },
            { id: 'r1', name: 'Role 1', position: 1, color: 0, permissions: '0' }
        ]);
    });

    it('should return 404 if bot is not provided', () => {
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        handler({}, res, null);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Bot non trouvé' });
    });

    it('should return empty array if guild is not found', () => {
        const mockBot = {
            home: 'guild123',
            guilds: {
                cache: {
                    get: vi.fn().mockReturnValue(undefined)
                }
            }
        };
        const mockApp = {
            warn: vi.fn()
        };
        const res = {
            json: vi.fn()
        };

        const result = handler({}, res, mockBot, null, mockApp);

        expect(mockApp.warn).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});
