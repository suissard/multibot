const BOTS = require('../../Class/BOTS.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    path: /^\/modules(\/([^\/]+)(\/test-data(\/([^\/]+))?)?)?$/,
    method: 'get',
    handler: async (req, res, bot, user, app) => {
        const [, , moduleId, , dataId] = req.path.match(/^\/modules(\/([^\/]+)(\/test-data(\/([^\/]+))?)?)?$/);

        const modulesPath = path.join(__dirname, '../../Modules');

        if (!moduleId) {
            // /modules - List all modules
            const moduleDirs = await fs.promises.readdir(modulesPath, { withFileTypes: true });
            const modules = moduleDirs
                .filter(dirent => dirent.isDirectory())
                .map(dirent => ({ id: dirent.name, name: dirent.name }));
            return modules;
        }

        const modulePath = path.join(modulesPath, moduleId);
        const dataTestPath = path.join(modulePath, 'DataTest');

        if (!dataId) {
            // /modules/:moduleId/test-data - List all test data for a module
            const dataFiles = await fs.promises.readdir(dataTestPath);
            const jsonDataFiles = dataFiles.filter(file => file.endsWith('.json'));

            const testData = await Promise.all(jsonDataFiles.map(async file => {
                const filePath = path.join(dataTestPath, file);
                const fileContent = await fs.promises.readFile(filePath, 'utf-8');
                return {
                    id: path.basename(file, '.json'),
                    ...JSON.parse(fileContent)
                };
            }));

            return testData;
        }

        // /modules/:moduleId/test-data/:dataId - Get a specific test data item
        const filePath = path.join(dataTestPath, `${dataId}.json`);
        // If file doesn't exist, fs.promises.readFile will throw an error, which Route.js will catch.
        // If we want a 404 specifically for file not found, we might rely on the auto error handler or check existence.
        // For simplicity and matching user request "retire les try catch inutile", we let it bubble up.
        // However, the original code had a 404 message. 
        // Route.js sends 500 on error. If 404 is desired for business logic (file not found), we can check explicitly.

        try {
            await fs.promises.access(filePath);
        } catch {
            // File doesn't exist
            const err = new Error(`Test data item ${dataId} not found for module ${moduleId}`);
            err.status = 404; // Route.js doesn't use this yet but good practice.
            // Actually Route.js sends 500 unless we change it.
            // But the user asked to remove "useless" try-catch.
            throw err;
        }

        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    },
};
