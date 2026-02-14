const fs = require('fs').promises;
const path = require('path');

module.exports = {
    method: 'GET',
    path: '/module-descriptions',
    handler: async (req, res, bot, user, app) => {
        const modulesPath = path.join(__dirname, '..', '..', 'Modules');
        const descriptions = {};

        console.log('[API] /module-descriptions called');
        try {
            const modules = await fs.readdir(modulesPath, { withFileTypes: true });

            for (const dirent of modules) {
                if (dirent.isDirectory()) {
                    const moduleName = dirent.name;
                    const descPath = path.join(modulesPath, moduleName, 'configDescription.js');

                    try {
                        await fs.access(descPath);
                        // Using require to load the js file content
                        // Since it's a backend file, we can require it dynamically.
                        // However, caching might be an issue if we edit it without restarting.
                        // For descriptions, it's fine.
                        const desc = require(descPath);
                        descriptions[moduleName] = desc;
                    } catch (e) {
                        // File does not exist, skip
                    }
                }
            }

            return descriptions;

        } catch (e) {
            console.error("Error loading module descriptions:", e);
            throw new Error("Failed to load module descriptions");
        }
    },
};
