
import { describe, it, expect, vi, beforeEach } from 'vitest';
import getConversations from '../../SelfApi/routes/get-secretary-conversations.js';
import getMessages from '../../SelfApi/routes/get-secretary-messages.js';

// Mock discord.js
vi.mock('discord.js', () => ({
    PermissionsBitField: {
        Flags: {
            ViewChannel: 1024
        }
    }
}));

describe('Secretary Route Permissions', () => {
    let mockBot;
    let mockReq;
    let mockRes;
    let mockUser;
    let mockGuild;
    let mockMember;
    let mockChannel;

    beforeEach(() => {
        mockUser = { id: 'user123' };
        mockReq = { params: {} };
        mockRes = {};

        mockMember = {
            id: 'user123'
        };

        mockChannel = {
            id: 'channel1',
            name: '✅-user-999',
            type: 0,
            permissionsFor: vi.fn(),
            guild: {
                members: { fetch: vi.fn() }
            },
            messages: { fetch: vi.fn() },
            createdTimestamp: 1000
        };

        const mockCollection = new Map([['channel1', mockChannel]]);
        mockCollection.filter = fn => {
            const filtered = new Map();
            for (const [key, val] of mockCollection) {
                if (fn(val)) filtered.set(key, val);
            }
            return filtered;
        };

        mockGuild = {
            id: 'guild1',
            members: {
                fetch: vi.fn()
            },
            channels: {
                cache: mockCollection,
                fetch: vi.fn()
            }
        };

        mockBot = {
            modules: {
                Secretary: {
                    secretary: [{ guild: mockGuild }]
                }
            },
            channels: {
                cache: new Map([['channel1', mockChannel]]),
                fetch: vi.fn() // Used in get-secretary-messages via fetch or cache? Code uses cache.get
            },
            users: {
                cache: new Map(),
                fetch: vi.fn()
            },
            user: { id: 'bot_id' }
        };
    });

    describe('GET /secretary/conversations', () => {
        it('should return channel if user has ViewChannel permission', async () => {
            mockGuild.members.fetch.mockResolvedValue(mockMember);
            mockChannel.permissionsFor.mockReturnValue({ has: () => true });

            const result = await getConversations.handler(mockReq, mockRes, mockBot, mockUser);
            expect(result).toHaveLength(1);
            expect(result[0].channelId).toBe('channel1');
        });

        it('should not return channel if user lacks ViewChannel permission', async () => {
            mockGuild.members.fetch.mockResolvedValue(mockMember);
            mockChannel.permissionsFor.mockReturnValue({ has: () => false });

            const result = await getConversations.handler(mockReq, mockRes, mockBot, mockUser);
            expect(result).toHaveLength(0);
        });

        it('should skip guild if user is not a member', async () => {
            mockGuild.members.fetch.mockRejectedValue(new Error('Unknown Member'));

            const result = await getConversations.handler(mockReq, mockRes, mockBot, mockUser);
            expect(result).toHaveLength(0);
        });
    });

    describe('GET /secretary/conversations/:channelId', () => {
        beforeEach(() => {
            mockReq.params.channelId = 'channel1';
            mockBot.users.fetch.mockResolvedValue({
                createDM: vi.fn().mockResolvedValue({
                    messages: {
                        fetch: vi.fn().mockResolvedValue(new Map())
                    }
                })
            });
        });

        it('should return messages if user has ViewChannel permission', async () => {
            mockChannel.guild.members.fetch.mockResolvedValue(mockMember);
            mockChannel.permissionsFor.mockReturnValue({ has: () => true });

            const result = await getMessages.handler(mockReq, mockRes, mockBot, mockUser);
            expect(result).toBeDefined();
        });

        it('should throw 403 if user lacks ViewChannel permission', async () => {
            mockChannel.guild.members.fetch.mockResolvedValue(mockMember);
            mockChannel.permissionsFor.mockReturnValue({ has: () => false });

            await expect(getMessages.handler(mockReq, mockRes, mockBot, mockUser))
                .rejects.toMatchObject({ status: 403, message: 'Missing permissions to view this channel' });
        });

        it('should throw 403 if user is not in guild', async () => {
            mockChannel.guild.members.fetch.mockRejectedValue(new Error('Unknown Member'));

            await expect(getMessages.handler(mockReq, mockRes, mockBot, mockUser))
                .rejects.toMatchObject({ status: 403 });
        });
    });
});
