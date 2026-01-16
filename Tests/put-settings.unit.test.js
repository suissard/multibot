import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { handler } from '../SelfApi/routes/put-settings.js';

describe('put-settings route handler', () => {
    beforeEach(() => {
        vi.spyOn(fs.promises, 'writeFile').mockResolvedValue();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should write settings to config file', async () => {
        const req = { body: { key: 'value' } };

        const result = await handler(req, {}, null, null, null);

        expect(fs.promises.writeFile).toHaveBeenCalled();
        expect(result).toEqual({ success: true });
    });
});
