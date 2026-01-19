import { describe, it, expect, vi } from 'vitest';
const { handler } = require('../SelfApi/routes/get-user.js');

describe('get-user route handler', () => {
    it('should return 401 if user is not authenticated (user arg is null)', () => {
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

        handler({}, res, null, null, null);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not authenticated' });
    });

    it('should return user info if authenticated', () => {
        const user = {
            id: '123',
            username: 'User',
            discriminator: '0000',
            avatar: 'avatarId'
        };
        const res = {};

        const result = handler({}, res, null, user, null);

        expect(result).toEqual({
            user: {
                id: '123',
                username: 'User',
                discriminator: '0000',
                avatar: 'avatarId'
            }
        });
    });
});
