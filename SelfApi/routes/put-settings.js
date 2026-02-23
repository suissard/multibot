const fs = require('fs').promises;
const path = require('path');

const configsPath = path.join(__dirname, '..', '..', 'configs.json');

const configsApiApi = path.join(__dirname, '..', '..', 'configsApi.json');
const DATAS = require('../../Class/DataBase');

module.exports = {
    path: '/settings',
    method: 'PUT',
    handler: async (request, res, bot, user, app) => {
        const file = request.query.file || 'bot';

        if (file === 'api') {
            const newConfigs = JSON.stringify(request.body, null, 4);
            await fs.writeFile(configsApiApi, newConfigs, 'utf8');
            return { success: true };
        } else {
            const mode = process.env.BOT_MODE || 'PROD';

            if (mode === 'PROD') {
                // In PROD, update Strapi
                const updates = request.body; // Expecting an array of bot objects
                if (!Array.isArray(updates)) {
                    throw new Error("Body must be an array of bot objects for file=bot");
                }

                // We iterate over the updates and update the cache/database
                // Assuming the body contains the full object for each bot
                for (const botData of updates) {
                    if (!botData.id) continue;

                    // Get existing object from cache
                    const existing = DATAS.collections.botsdatas.cache.get(botData.id);
                    if (existing) {
                        // Update properties
                        Object.assign(existing, botData);
                        // Save to Strapi
                        await existing.save();
                    } else {
                        // Handle new bot creation if needed? 
                        // For now, let's assume we only update existing ones or maybe creating new ones is out of scope for this simple editor?
                        // If generic DataEditor allows creating, we might need create logic.
                        // But StrapiObject usually needs to be instantiated.
                        // valid for now: only update existing
                    }
                }
                return { success: true };

            } else {
                // In DEV, update configs.json
                const currentFileContent = await fs.readFile(configsPath, 'utf8');
                const currentConfig = JSON.parse(currentFileContent);

                currentConfig.botsData = request.body;

                const newConfigs = JSON.stringify(currentConfig, null, 4);
                await fs.writeFile(configsPath, newConfigs, 'utf8');
                return { success: true };
            }
        }
    }
};
