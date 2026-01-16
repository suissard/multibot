import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { handler } from '../SelfApi/routes/put-module-test-data.js';

describe('put-module-test-data route handler', () => {
    beforeEach(() => {
        vi.spyOn(fs.promises, 'access').mockResolvedValue(); // Default successful access
        vi.spyOn(fs.promises, 'writeFile').mockResolvedValue();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should write data to file if file exists', async () => {
        const req = {
            path: '/modules/Mod1/test-data/data1',
            body: { foo: 'bar' }
        };

        fs.promises.access.mockResolvedValue();
        fs.promises.writeFile.mockResolvedValue();

        const result = await handler(req, {}, null, null, null);

        expect(fs.promises.access).toHaveBeenCalled();
        expect(fs.promises.writeFile).toHaveBeenCalled();
        expect(result).toEqual({ message: 'Data updated successfully' });
    });

    it('should throw if file does not exist', async () => {
        const req = {
            path: '/modules/Mod1/test-data/data1',
            body: {}
        };
        fs.promises.access.mockRejectedValue(new Error('no access'));

        await expect(handler(req, {}, null, null, null)).rejects.toThrow();
    });
});
