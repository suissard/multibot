import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChannelType } from 'discord.js';
import { getActiveMatches, syncMemberPermissions, resetMatchCache } from '../../Modules/ChannelManager/utils/channelManagement.js';

describe('ChannelManager Reactive Logic (Integrated)', () => {
    let bot, guild, member;

    beforeEach(() => {
        vi.restoreAllMocks();
        resetMatchCache();
        
        bot = {
            name: 'TestBot',
            olympe: {
                api: {
                    matchs: {
                        list: vi.fn(),
                        get: vi.fn()
                    },
                    teams: {
                        get: vi.fn()
                    }
                }
            },
            modules: {
                ChannelManager: {
                    maximumNumberOfHoursToRetrieveFutureMatches: 2,
                    maximumMatchDuration: 2
                },
                AutoRole: {
                    roleIds: { competitions: {} },
                    guilds: {
                        'guild-id': {
                            specialRoles: { caster: { id: 'caster-role-id' } }
                        }
                    }
                }
            }
        };

        guild = {
            id: 'guild-id',
            client: bot,
            roles: {
                cache: {
                    get: vi.fn().mockReturnValue({ id: 'some-role' })
                }
            },
            channels: {
                cache: {
                    filter: vi.fn().mockReturnValue({
                        find: vi.fn(),
                        size: 0
                    }),
                    find: vi.fn()
                },
                create: vi.fn()
            }
        };

        member = { id: 'user-123', guild };
    });

    describe('getActiveMatches', () => {
        it('should return matches soon or recently ended', async () => {
            const now = Math.floor(Date.now() / 1000);
            const matches = [
                { id: 'soon', matchDate: now + 3600 },
                { id: 'recent', matchDate: now - 3600 }
            ];

            bot.olympe.api.matchs.list.mockImplementation(({ scheduled }) => {
                if (scheduled === 'future') return Promise.resolve([matches[0]]);
                if (scheduled === 'past') return Promise.resolve([matches[1]]);
                return Promise.resolve([]);
            });

            const result = await getActiveMatches(bot);
            expect(result).toHaveLength(2);
            expect(bot.olympe.api.matchs.list).toHaveBeenCalledTimes(2); // once for future, once for past
        });

        it('should use cache for subsequent calls within duration', async () => {
            bot.modules.ChannelManager.matchCacheDuration = 1; // 1 hour
            const now = Math.floor(Date.now() / 1000);
            const matches = [
                { id: 'soon', matchDate: now + 3600 },
                { id: 'recent', matchDate: now - 3600 }
            ];

            bot.olympe.api.matchs.list.mockImplementation(({ scheduled }) => {
                if (scheduled === 'future') return Promise.resolve([matches[0]]);
                if (scheduled === 'past') return Promise.resolve([matches[1]]);
                return Promise.resolve([]);
            });

            // First call (cache miss)
            await getActiveMatches(bot);
            const initialCallCount = bot.olympe.api.matchs.list.mock.calls.length;

            // Second call (cache hit)
            await getActiveMatches(bot);
            expect(bot.olympe.api.matchs.list).toHaveBeenCalledTimes(initialCallCount);
        });

        it('should refresh cache after expiration', async () => {
            vi.useFakeTimers();
            bot.modules.ChannelManager.matchCacheDuration = 1; // 1 hour
            const now = Math.floor(Date.now() / 1000);
            const matches = [
                { id: 'soon', matchDate: now + 3600 },
                { id: 'recent', matchDate: now - 3600 }
            ];

            bot.olympe.api.matchs.list.mockImplementation(({ scheduled }) => {
                if (scheduled === 'future') return Promise.resolve([matches[0]]);
                if (scheduled === 'past') return Promise.resolve([matches[1]]);
                return Promise.resolve([]);
            });

            // First call
            await getActiveMatches(bot);
            const firstCallCount = bot.olympe.api.matchs.list.mock.calls.length;

            // Advance time by 2 hours
            vi.advanceTimersByTime(2 * 60 * 60 * 1000);

            // Second call after expiration
            await getActiveMatches(bot);
            expect(bot.olympe.api.matchs.list.mock.calls.length).toBeGreaterThan(firstCallCount);
            
            vi.useRealTimers();
        });
    });

    describe('syncMemberPermissions', () => {
        it('should grant access to member in team', async () => {
            const match = {
                id: 'm1',
                matchDate: Math.floor(Date.now() / 1000) + 3600,
                team1: { name: 'TeamA' },
                team2: { name: 'TeamB' },
                segment: { name: 'DivA', challengeID: 'chall-1' },
                casters: []
            };

            const voiceChannel = {
                name: 'TeamA - 12h00',
                client: bot,
                guild: guild,
                permissionOverwrites: { create: vi.fn().mockResolvedValue({}) }
            };
            const textChannel = {
                name: 'teama_teamb_12h00',
                client: bot,
                guild: guild,
                permissionOverwrites: { create: vi.fn().mockResolvedValue({}) }
            };

            const category = {
                id: 'cat-1',
                guild: guild,
                client: bot,
                children: {
                    cache: { find: vi.fn() },
                    create: vi.fn().mockResolvedValue({ 
                        id: 'grad-1', 
                        client: bot,
                        guild: guild,
                        permissionOverwrites: { set: vi.fn() } 
                    })
                }
            };

            // Setup AutoRole mocks
            bot.modules.AutoRole.roleIds.competitions = {
                'chall-1': {
                    player: { 'DivA': 'div-role-id' }
                }
            };

            // Setup API mocks
            bot.olympe.api.matchs.list.mockResolvedValue([match]);
            bot.olympe.api.matchs.get.mockResolvedValue(match);
            bot.olympe.api.teams.get.mockImplementation(async (name) => {
                if (name === 'TeamA') return { 
                    name: 'TeamA', 
                    members: [{ user: { thirdparties: { discord: { discordID: 'user-123' } } } }],
                    membersLent: []
                };
                return { name: 'TeamB', members: [], membersLent: [] };
            });

            // Setup Discord mocks
            guild.channels.create.mockResolvedValue(category);
            guild.channels.cache.filter.mockReturnValue({
                find: vi.fn().mockReturnValue(category),
                size: 1
            });
            
            let findCount = 0;
            guild.channels.cache.find.mockImplementation(() => {
                findCount++;
                if (findCount === 1) return voiceChannel;
                if (findCount === 2) return textChannel;
                return null;
            });

            await syncMemberPermissions(bot, member, guild);

            expect(voiceChannel.permissionOverwrites.create).toHaveBeenCalled();
            expect(textChannel.permissionOverwrites.create).toHaveBeenCalled();
        });
    });
});
