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

    it('should trigger processFromOlympeTeamId when teamIDs provided', () => {
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

        const result = handler(req, res, null, null, app);

        expect(utils.processFromOlympeTeamId).toHaveBeenCalled();
        expect(result).toEqual({ message: 'Data received' });
    });

    it('should trigger processFromOlympeUserId when userIDs provided', () => {
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

        handler(req, {}, null, null, app);

        expect(utils.processFromOlympeUserId).toHaveBeenCalledWith(['user1'], expect.anything());
    });
});
