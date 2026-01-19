import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { handler } from '../SelfApi/routes/get-settings.js';

describe('get-settings route handler', () => {
    beforeEach(() => {
        // Spy on the real fs.promises.readFile
        vi.spyOn(fs.promises, 'readFile');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should read configs.json and return it', async () => {
        const mockConfig = { some: 'config' };
        fs.promises.readFile.mockResolvedValue(JSON.stringify(mockConfig));

        const result = await handler({}, {}, null, null, null);

        expect(fs.promises.readFile).toHaveBeenCalled();
        expect(result).toEqual(mockConfig);
    });
});
