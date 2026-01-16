import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import fs from 'fs';

describe('get-modules route handler', () => {
    let handler;

    beforeAll(async () => {
        process.env.STRAPI_URL = 'http://localhost';
        process.env.STRAPI_TOKEN = 'dummy';
        const module = await import('../SelfApi/routes/get-modules.js');
        handler = module.handler;
    });

    beforeEach(() => {
        vi.spyOn(fs.promises, 'readdir');
        vi.spyOn(fs.promises, 'readFile');
        vi.spyOn(fs.promises, 'access');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return list of modules when no parameters provided', async () => {
        const req = { path: '/modules', match: (regex) => req.path.match(regex) };

        fs.promises.readdir.mockResolvedValue([
            { name: 'Module1', isDirectory: () => true },
            { name: 'file.txt', isDirectory: () => false },
            { name: 'Module2', isDirectory: () => true }
        ]);

        const result = await handler(req, {}, null, null, null);

        expect(result).toEqual([
            { id: 'Module1', name: 'Module1' },
            { id: 'Module2', name: 'Module2' }
        ]);
        expect(fs.promises.readdir).toHaveBeenCalled();
    });

    it('should return list of test data for a module', async () => {
        const req = { path: '/modules/Module1/test-data', match: (regex) => req.path.match(regex) };

        fs.promises.readdir.mockResolvedValue(['data1.json', 'data2.json', 'other.txt']);
        fs.promises.readFile.mockResolvedValue('{"foo":"bar"}');

        const result = await handler(req, {}, null, null, null);

        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty('id', 'data1');
        expect(result[0]).toHaveProperty('foo', 'bar');
    });

    it('should return specific test data item', async () => {
        const req = { path: '/modules/Module1/test-data/data1', match: (regex) => req.path.match(regex) };

        fs.promises.access.mockResolvedValue();
        fs.promises.readFile.mockResolvedValue('{"id":"data1", "val": 123}');

        const result = await handler(req, {}, null, null, null);

        expect(result).toEqual({ id: 'data1', val: 123 });
    });

    it('should throw if test data file does not exist', async () => {
        const req = { path: '/modules/Module1/test-data/unknown', match: (regex) => req.path.match(regex) };

        fs.promises.access.mockRejectedValue(new Error('no access'));

        await expect(handler(req, {}, null, null, null)).rejects.toThrow(/not found/);
    });
});
