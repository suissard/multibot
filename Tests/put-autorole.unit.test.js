import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

describe('put-autorole route handler', () => {
    let handler;
    let utils;
    let Bot;

    beforeAll(async () => {
        // Set env vars to prevent DB invalid config crash
        process.env.STRAPI_URL = 'http://localhost';
        process.env.STRAPI_TOKEN = 'dummy';

        // Dynamic import/require after env vars set
        utils = require('../Modules/AutoRole/utils/utils.js');
        Bot = require('../Class/Bot.js');

        // Dynamic import of route
        const module = await import('../SelfApi/routes/put-autorole.js');
        handler = module.handler;
    });

    beforeEach(() => {
        vi.restoreAllMocks();
        // Spy on utils methods
        if (utils) {
            vi.spyOn(utils, 'processFromOlympeTeamId').mockImplementation(() => { });
            vi.spyOn(utils, 'processFromOlympeUserId').mockImplementation(() => { });
        }
    });

    it('should trigger processFromOlympeTeamId when teamIDs provided', async () => {
        const req = {
            body: {
                organization: 'org1',
                teamIDs: ['team1']
            }
        };
        const res = {};
        const app = {
            debug: vi.fn(),
            warn: vi.fn(),
            BOTS: new Map([
                ['bot1', { modules: { AutoRole: { organization: 'org1' } } }],
                ['bot2', { modules: { AutoRole: { organization: 'org2' } } }]
            ])
        };

        const result = await handler(req, res, null, null, app);

        expect(utils.processFromOlympeTeamId).toHaveBeenCalled();
        expect(result).toEqual({ message: 'Data received' });
    });

    it('should trigger processFromOlympeUserId when userIDs provided', async () => {
        const req = {
            body: {
                organization: 'org1',
                userIDs: ['user1']
            }
        };
        const app = {
            debug: vi.fn(),
            warn: vi.fn(),
            BOTS: new Map([
                ['bot1', { modules: { AutoRole: { organization: 'org1' } } }]
            ])
        };

        await handler(req, {}, null, null, app);

        expect(utils.processFromOlympeUserId).toHaveBeenCalledWith(['user1'], expect.anything());
    });

    it('should deduce bot from x-domain and log', async () => {
        const req = {
            body: {
                organization: 'org1', // might be ignored in log now, we use x-domain or domain variable
                teamIDs: ['team1']
            },
            headers: {
                'x-domain': 'org1'
            }
        };
        const channelMock = {
            send: vi.fn().mockResolvedValue(true)
        };
        const botMock = {
            modules: { AutoRole: { organization: 'org1' } },
            channels: {
                fetch: vi.fn().mockResolvedValue(channelMock)
            },
            home: 'guild1',
            guilds: { cache: { get: () => ({ members: { cache: { get: () => null } } }) } }
        };
        const app = {
            debug: vi.fn(),
            warn: vi.fn(),
            error: vi.fn(),
            autoRoleLogChannelId: '12345',
            BOTS: new Map([['bot1', botMock]])
        };

        await handler(req, {}, null, null, app);

        expect(botMock.channels.fetch).toHaveBeenCalledWith('12345');
        expect(channelMock.send).toHaveBeenCalled();
        expect(channelMock.send.mock.calls[0][0]).toContain('Organization: org1');
    });

    it('should fallback to autoRoleLogBotId if deduction fails', async () => {
        const req = {
            body: {
                organization: 'org1',
                teamIDs: ['team1']
            },
            headers: {} // No x-domain
        };
        const channelMock = {
            send: vi.fn().mockResolvedValue(true)
        };
        const botMock = {
            modules: { AutoRole: { organization: 'org1' } },
            channels: {
                fetch: vi.fn().mockResolvedValue(channelMock)
            },
            home: 'guild1',
            guilds: { cache: { get: () => ({ members: { cache: { get: () => null } } }) } }
        };
        const app = {
            debug: vi.fn(),
            warn: vi.fn(),
            error: vi.fn(),
            autoRoleLogChannelId: '12345',
            autoRoleLogBotId: 'bot1',
            BOTS: new Map([['bot1', botMock]])
        };

        await handler(req, {}, null, null, app);

        expect(botMock.channels.fetch).toHaveBeenCalledWith('12345');
        expect(channelMock.send).toHaveBeenCalled();
    });
});
