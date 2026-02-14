const fs = require('fs').promises;
const path = require('path');
const DATAS = require('../../Class/DataBase');
const configsPath = path.join(__dirname, '..', '..', 'configs.json');

module.exports = {
    method: 'GET',
    path: '/module-settings',
    handler: async (req, res, bot, user, app) => {
        const { bot_id, module_id } = req.query;

        if (!bot_id || !module_id) {
            throw new Error("Missing bot_id or module_id");
        }

        const mode = process.env.BOT_MODE || 'PROD';
        let botData;

        if (mode === 'PROD') {
            if (DATAS.collections.botsdatas && DATAS.collections.botsdatas.cache) {
                const strapiObj = DATAS.collections.botsdatas.cache.get(bot_id);
                if (strapiObj) {
                    botData = strapiObj; // StrapiObject acts like the data object mostly
                }
            }
        } else {
            // DEV
            const fileContent = await fs.readFile(configsPath, 'utf8');
            const configs = JSON.parse(fileContent);
            if (configs.botsData) {
                // Determine ID type. configs.json uses numbers sometimes? 
                // Let's assume ID match.
                botData = configs.botsData.find(b => String(b.id) === String(bot_id));
            }
        }

        if (!botData) {
            throw new Error("Bot not found");
        }

        const modules = botData.modules || {};
        return modules[module_id] || {};
    },
};
