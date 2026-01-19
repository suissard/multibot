import { describe, it, expect, vi } from 'vitest';
const { handler } = require('../SelfApi/routes/get-bots.js');

describe('get-bots route handler', () => {
    it('should return a list of bots', async () => {
        const req = {};
        const res = {};
        const bot = {};
        const user = {};

        const bot1 = {
            user: { username: 'BotOne', displayAvatarURL: () => 'url1' }
        };
        const bot2 = {
            data: { name: 'BotTwo' }
            // no user object
        };

        const botsMap = new Map();
        botsMap.set('id1', bot1);
        botsMap.set('id2', bot2);

        const app = { BOTS: botsMap };

        const result = await handler(req, res, bot, user, app);

        expect(result).toHaveLength(2);
        expect(result).toEqual([
            { id: 'id1', name: 'BotOne', avatar: 'url1' },
            { id: 'id2', name: 'BotTwo', avatar: null }
        ]);
    });
});
