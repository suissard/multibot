import { describe, it, expect, vi, beforeAll } from 'vitest';
import Discord from 'discord.js';

let changeDiscordRole;

// Mocks et setup d'environnement
beforeAll(async () => {
    vi.resetModules();
    process.env.STRAPI_URL = 'http://localhost:1337';
    process.env.STRAPI_TOKEN = 'dummy_token';
    vi.doMock('suissard-strapi-client', () => ({
        StrapiApi: class { constructor() { } },
        StrapiCollections: class { },
        StrapiObject: class { }
    }));

    const utils = await import('../Modules/AutoRole/utils/utils.js');
    changeDiscordRole = utils.changeDiscordRole;
});

// Mock Configuration
const mockChallengesRolesId = {
    ALL: 'ReadingRole',
    captain: 'CaptainRole',
    competitions: {
        'challengeA': {
            player: {
                'Division 1': 'RoleDiv1',
            }
        },
        'challengeB': {
            player: {
                'Division 2': 'RoleDiv2',
            }
        }
    },
};

// Roles ID that the bot considers "managed" by this module
const mockRolesCompetId = ['ReadingRole', 'CaptainRole', 'RoleDiv1', 'RoleDiv2', 'OtherRole'];

const mockGuild = {
    roles: {
        cache: {
            get: vi.fn((id) => ({ id, name: `RoleName_${id}` })),
        },
    },
    client: {
        error: vi.fn(console.error),
    }
};

describe('AutoRole Multi-Division Scenarios', () => {

    it('should assign roles from multiple teams in different divisions', async () => {
        // User is in Team A (Div 1) and Team B (Div 2)
        const mockOlympeMemberId = 'userOlympeId';

        const discordUser = {
            id: 'discordId',
            nickname: 'Player',
            user: { username: 'Player', tag: 'Player#1234' },
            roles: {
                cache: new Discord.Collection(),
                add: vi.fn(),
                remove: vi.fn(),
                find: vi.fn(),
            }
        };

        const teamA = {
            name: 'Team A',
            members: [{ user: { id: mockOlympeMemberId, thirdparties: { discord: { discordID: 'discordId' } } }, roles: [], tags: { gameRoles: ['player'] } }],
            membersLent: [],
            segments: [{ challengeID: 'challengeA', name: 'Division 1' }]
        };

        const teamB = {
            name: 'Team B',
            members: [{ user: { id: mockOlympeMemberId, thirdparties: { discord: { discordID: 'discordId' } } }, roles: [], tags: { gameRoles: ['player'] } }],
            membersLent: [],
            segments: [{ challengeID: 'challengeB', name: 'Division 2' }]
        };

        // Mock the "RoleToAdd" from Olympe cache for each team context
        mockGuild.client.olympe = {
            users: {
                'discordId': {
                    'Team A': { roles: ['player'] },
                    'Team B': { roles: ['player'] }
                }
            }
        };

        const teams = [teamA, teamB];

        await changeDiscordRole(
            mockOlympeMemberId,
            mockGuild,
            discordUser,
            teams,
            mockChallengesRolesId,
            mockRolesCompetId
        );

        // Verification
        // The user should have:
        // - ReadingRole (ALL)
        // - RoleDiv1 (from Team A)
        // - RoleDiv2 (from Team B)

        const addedRolesCalls = discordUser.roles.add.mock.calls;
        // roles.add is called with an array of role IDs
        // expectation: one call with all roles, or multiple calls. 
        // purely based on utils.js implementation: await discordUser.roles.add(roleIdToAdd); where roleIdToAdd is an array.

        expect(addedRolesCalls.length).toBeGreaterThan(0);
        const addedRoles = addedRolesCalls[0][0]; // First argument of first call

        expect(addedRoles).toContain('ReadingRole');
        expect(addedRoles).toContain('RoleDiv1');
        expect(addedRoles).toContain('RoleDiv2');
    });

    it('should remove roles from divisions the user is no longer part of', async () => {
        // User WAS in Div 1 and Div 2, but now only in Div 1.
        // Discord User currently has RoleDiv1 and RoleDiv2.
        const mockOlympeMemberId = 'userOlympeId';

        const discordUser = {
            id: 'discordId',
            nickname: 'Player',
            user: { username: 'Player', tag: 'Player#1234' },
            roles: {
                cache: new Discord.Collection(),
                add: vi.fn(),
                remove: vi.fn(),
                find: vi.fn((fn) => {
                    // Mock find to return true if we check for roles the user "has"
                    // return fn({id: 'RoleDiv1'}) || fn({id: 'RoleDiv2'})
                    return false;
                }),
            }
        };

        // Populate cache with existing roles
        discordUser.roles.cache.set('RoleDiv1', { id: 'RoleDiv1' });
        discordUser.roles.cache.set('RoleDiv2', { id: 'RoleDiv2' });
        discordUser.roles.cache.set('ReadingRole', { id: 'ReadingRole' });

        const teamA = {
            name: 'Team A',
            members: [{ user: { id: mockOlympeMemberId, thirdparties: { discord: { discordID: 'discordId' } } }, roles: [], tags: { gameRoles: ['player'] } }],
            membersLent: [],
            segments: [{ challengeID: 'challengeA', name: 'Division 1' }]
        };

        // User is ONLY in Team A now.
        const teams = [teamA];

        mockGuild.client.olympe = {
            users: {
                'discordId': {
                    'Team A': { roles: ['player'] }
                }
            }
        };

        await changeDiscordRole(
            mockOlympeMemberId,
            mockGuild,
            discordUser,
            teams,
            mockChallengesRolesId,
            mockRolesCompetId
        );

        // Expect removal of RoleDiv2
        const removedRolesCalls = discordUser.roles.remove.mock.calls;
        expect(removedRolesCalls.length).toBeGreaterThan(0);
        const removedRoles = removedRolesCalls[0][0];

        expect(removedRoles).toContain('RoleDiv2');
        // Should NOT remove RoleDiv1 or ReadingRole
        expect(removedRoles).not.toContain('RoleDiv1');
        expect(removedRoles).not.toContain('ReadingRole');
    });
});
