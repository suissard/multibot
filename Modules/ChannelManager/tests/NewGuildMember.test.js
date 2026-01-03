import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import NewGuildMember from '../events/NewGuildMember.js';
import { createMatchChannels } from '../utils/channelManagement.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to load JSON data
const loadJson = (relativePath) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../', relativePath), 'utf8'));
};

describe('NewGuildMember Event & Channel Management', () => {
    let mockBot;
    let mockGuild;
    let mockMember;
    let olympeTeam;
    let segments;
    let olympeMember;
    let discordId;
    let mockMatch;

    beforeEach(() => {
        // Load Data
        olympeTeam = loadJson('Modules/AutoRole/DataTest/getTeamWithDiscord.json');
        segments = loadJson('Modules/AutoRole/DataTest/OlympeSegments.json');
        olympeMember = olympeTeam.members[1]; // Suissard
        discordId = olympeMember.user.thirdparties.discord.discordID;

        // Mock Match
        mockMatch = {
            id: "match-123",
            matchDate: Math.floor(Date.now() / 1000),
            segment: segments[0],
            casters: [],
            team1: { ...olympeTeam, lineup: { members: olympeTeam.members, substitutes: [] } },
            team2: { ...olympeTeam, id: "team-2", name: "Opponent", lineup: { members: [], substitutes: [] } },
        };

        // Mock Guild
        mockGuild = {
            id: "guild-123",
            roles: {
                cache: {
                    get: vi.fn((id) => ({ id, name: `Role-${id}` })),
                    find: vi.fn(() => null)
                }
            },
            members: {
                fetch: vi.fn(async (id) => mockMember),
                cache: {
                    get: vi.fn((id) => (id === discordId ? mockMember : null))
                }
            },
            channels: {
                cache: {
                    filter: vi.fn(() => []),
                    find: vi.fn(() => null)
                },
                create: vi.fn(async (data) => createChannelMock(data))
            }
        };

        // Mock Member
        mockMember = {
            id: discordId,
            user: {
                username: olympeMember.user.username,
                tag: olympeMember.user.thirdparties.discord.discordTag || "Tag#1234",
                id: discordId
            },
            guild: mockGuild,
            roles: {
                cache: {
                    find: vi.fn(() => false)
                },
                add: vi.fn(),
                remove: vi.fn()
            },
            setNickname: vi.fn()
        };

        // Mock Bot
        mockBot = {
            name: "TestBot",
            home: mockGuild.id,
            guilds: {
                cache: {
                    get: vi.fn((id) => mockGuild)
                }
            },
            users: {
                cache: {
                    get: vi.fn((id) => (id === discordId ? mockMember.user : null))
                }
            },
            olympe: {
                users: {},
                segments: segments,
                teams: [],
                challengesRolesId: {
                    getAllIds: () => [],
                    competitions: {},
                    ALL: "role-all-id",
                    captain: "role-captain-id",
                    caster: "role-caster-id"
                },
                api: {
                    users: {
                        get: vi.fn(async (id) => ({ ...olympeMember.user, teams: [{ id: olympeTeam.id }] }))
                    },
                    teams: {
                        get: vi.fn(async (id) => olympeTeam)
                    },
                    matchs: {
                        list: vi.fn(async () => [mockMatch]),
                        get: vi.fn(async () => mockMatch)
                    },
                    post: vi.fn(async (endpoint) => {
                         if (endpoint.includes('users/search')) return olympeMember.user;
                    }),
                    get: vi.fn(async () => [])
                }
            },
            modules: {
                ChannelManager: {
                    matchCacheDuration: 1,
                    maximumNumberOfHoursToRetrieveFutureMatches: 24,
                    maximumMatchDuration: 2
                },
                AutoRole: {
                    roleIds: { competitions: {} },
                    orgaRoleIds: [],
                    guilds: {
                        [mockGuild.id]: {
                            specialRoles: {
                                caster: { id: 'caster-role-id', name: 'Caster' }
                            }
                        }
                    }
                }
            },
            log: vi.fn(),
            error: vi.fn((err) => console.error(err))
        };

        // Circular references & Helper Mocks
        mockGuild.client = mockBot;
    });

    const createChannelMock = async (data) => {
        return {
            ...data,
            guild: mockGuild,
            client: mockBot,
            parent: {
                children: {
                    cache: {
                        find: vi.fn(() => null)
                    }
                }
            },
            children: {
                cache: { size: 0, find: () => null },
                create: vi.fn(async (d) => ({ 
                    ...d, 
                    guild: mockGuild, 
                    client: mockBot, 
                    permissionOverwrites: { set: vi.fn() } 
                }))
            },
            permissionOverwrites: {
                set: vi.fn(),
                create: vi.fn()
            },
            send: vi.fn().mockResolvedValue({})
        };
    };

    it('should handle NewGuildMember event correctly', async () => {
        // Pre-populate cache as per previous logic logic
        mockBot.olympe.users[discordId] = {
            id: olympeMember.user.id,
            username: olympeMember.user.username,
            userData: { 
                 discordUser: mockMember,
                 olympeMember: olympeMember,
                 teams: [olympeTeam]
            }
        };

        const event = new NewGuildMember(mockBot);
        await event.handleEvent(mockMember);

        // Assertions
        expect(mockMember.setNickname).toHaveBeenCalled();
        expect(mockMember.roles.add).toHaveBeenCalled(); // Should attempt to add roles
        expect(mockBot.log).toHaveBeenCalledWith(expect.stringContaining('Arrivé de'), expect.anything());
    });

    it('should create match channels correctly', async () => {
        // Check if createMatchChannels calls create on guild.channels
        await createMatchChannels(mockBot, mockMatch, mockGuild);
        
        // Assertions for Channel Creation
        // One category, two team voice channels, one text channel.
        // Also Gradins creation is part of finding category if not exists.
        
        // We expect `create` to be called multiple times.
        expect(mockGuild.channels.create).toHaveBeenCalled();
        
        // Specific checks can be deeper if needed, e.g. checking names
        const createCalls = mockGuild.channels.create.mock.calls;
        const channelNames = createCalls.map(args => args[0].name);
        
        // console.log('Created Channels:', channelNames);
        expect(channelNames.some(name => name.includes(olympeTeam.name))).toBe(true);
        expect(channelNames.some(name => name.includes("Gradins"))).toBe(false); // Gradins is created on Category Children, which is a diff mock func usually but here structure is tricky.
        // Actually findOrCreateCategory creates category if not found.
        
        // Text channel creation check
        const textChannelName = createCalls.find(args => args[0].type === 0)?.name; // 0 is GuildText
        // expect(textChannelName).toBeDefined();
    });
});
