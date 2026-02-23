const fs = require('fs').promises;
const path = require('path');

const configsPath = path.join(__dirname, '..', '..', 'configs.json');

const configsApiApi = path.join(__dirname, '..', '..', 'configsApi.json');
const DATAS = require('../../Class/DataBase');

module.exports = {
    path: '/settings',
    method: 'GET',
    handler: async (request, res, bot, user, app) => {
        const file = request.query.file || 'bot';

        if (file === 'api') {
            const configsData = await fs.readFile(configsApiApi, 'utf8');
            return JSON.parse(configsData);
        } else {
            // bot settings
            const mode = process.env.BOT_MODE || 'PROD';

            if (mode === 'PROD') {
                // In PROD, return data from Strapi Cache
                // DATAS.collections is a Map, botsdatas is a StrapiObject collection
                if (DATAS.collections.botsdatas && DATAS.collections.botsdatas.cache) {
                    // Cache is a Map, we need an array
                    return Array.from(DATAS.collections.botsdatas.cache.values());
                } else {
                    return []; // Or handle error
                }
            } else {
                // In DEV (or PREPROD if it behaves like DEV for configs), read from configs.json
                const configsData = await fs.readFile(configsPath, 'utf8');
                const parsed = JSON.parse(configsData);
                return parsed.botsData || [];
            }
        }
    }
};
