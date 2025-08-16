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
            try {
                const moduleDirs = await fs.promises.readdir(modulesPath, { withFileTypes: true });
                const modules = moduleDirs
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => ({ id: dirent.name, name: dirent.name }));
                return res.json(modules);
            } catch (error) {
                console.error("Error reading modules directory:", error);
                return res.status(500).json({ message: "Error reading modules directory" });
            }
        }

        const modulePath = path.join(modulesPath, moduleId);
        const dataTestPath = path.join(modulePath, 'DataTest');

        if (!dataId) {
            // /modules/:moduleId/test-data - List all test data for a module
            try {
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

                return res.json(testData);
            } catch (error) {
                console.error(`Error reading test data for module ${moduleId}:`, error);
                return res.status(500).json({ message: `Error reading test data for module ${moduleId}` });
            }
        }

        // /modules/:moduleId/test-data/:dataId - Get a specific test data item
        try {
            const filePath = path.join(dataTestPath, `${dataId}.json`);
            const fileContent = await fs.promises.readFile(filePath, 'utf-8');
            return res.json(JSON.parse(fileContent));
        } catch (error) {
            console.error(`Error reading test data item ${dataId} for module ${moduleId}:`, error);
            return res.status(404).json({ message: `Test data item ${dataId} not found for module ${moduleId}` });
        }
    },
};
