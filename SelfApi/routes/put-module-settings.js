const fs = require('fs').promises;
const path = require('path');
const DATAS = require('../../Class/DataBase');
const configsPath = path.join(__dirname, '..', '..', 'configs.json');

module.exports = {
    method: 'PUT',
    path: '/module-settings',
    handler: async (req, res, bot, user, app) => {
        const { bot_id, module_id } = req.query;
        const newConfig = req.body;

        if (!bot_id || !module_id) {
            throw new Error("Missing bot_id or module_id");
        }

        const mode = process.env.BOT_MODE || 'PROD';

        if (mode === 'PROD') {
            if (DATAS.collections.botsdatas && DATAS.collections.botsdatas.cache) {
                const strapiObj = DATAS.collections.botsdatas.cache.get(bot_id);
                if (strapiObj) {
                    // Check if modules object exists
                    if (!strapiObj.modules) strapiObj.modules = {};

                    // VALIDATION
                    const validatorPath = path.join(__dirname, '..', '..', 'Modules', module_id, 'validatorClass.js');
                    let configToSave = newConfig;

                    try {
                        // Check if validator exists
                        await fs.access(validatorPath);
                        const ValidatorClass = require(validatorPath);
                        const validator = new ValidatorClass(newConfig);

                        validator.validate();

                        if (!validator.isValid()) {
                            throw new Error(`Invalid configuration for ${module_id}: ` + JSON.stringify(validator.getErrors()));
                        }

                        // Clean data (remove useless properties)
                        configToSave = validator.getCleanedConfig();

                    } catch (e) {
                        // If file doesn't exist, we skip validation (or maybe strictly require it?) 
                        // For now, only validate if validator exists.
                        if (e.code !== 'ENOENT') {
                            throw e; // Re-throw validation errors or other fs errors
                        }
                    }

                    // Update specific module
                    strapiObj.modules[module_id] = configToSave;

                    // Save
                    await strapiObj.update({ modules: strapiObj.modules });
                    return { success: true };
                } else {
                    throw new Error("Bot not found in PROD cache");
                }
            }
        } else {
            // DEV
            const fileContent = await fs.readFile(configsPath, 'utf8');
            const configs = JSON.parse(fileContent);

            if (configs.botsData) {
                const botIndex = configs.botsData.findIndex(b => String(b.id) === String(bot_id));
                if (botIndex !== -1) {
                    if (!configs.botsData[botIndex].modules) configs.botsData[botIndex].modules = {};

                    configs.botsData[botIndex].modules[module_id] = newConfig;

                    await fs.writeFile(configsPath, JSON.stringify(configs, null, 4), 'utf8');
                    return { success: true };
                } else {
                    throw new Error("Bot not found in configs.json");
                }
            }
        }

        throw new Error("Operation failed");
    },
};
