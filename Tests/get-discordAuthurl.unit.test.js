import { describe, it, expect, vi } from 'vitest';
const { handler } = require('../SelfApi/routes/get-discordAuthurl.js');

describe('get-discordAuthurl route handler', () => {
    it('should return the discord auth url from app', () => {
        const req = {};
        const res = {};
        const bot = {};
        const user = {};
        const app = {
            getDiscordAuthUrl: vi.fn().mockReturnValue('http://discord.com/oauth2/...')
        };

        const result = handler(req, res, bot, user, app);

        expect(app.getDiscordAuthUrl).toHaveBeenCalled();
        expect(result).toBe('http://discord.com/oauth2/...');
    });
});
