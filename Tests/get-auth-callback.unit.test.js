import { describe, it, expect, vi } from 'vitest';
const { handler } = require('../SelfApi/routes/get-auth-callback.js');

describe('get-auth-callback route handler', () => {
    it('should call app.createUser with req and res', async () => {
        const req = { query: { code: '123' } };
        const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };
        const app = { createUser: vi.fn() };
        const bot = {};
        const user = {};

        await handler(req, res, bot, user, app);

        expect(app.createUser).toHaveBeenCalledWith(req, res);
    });
});
