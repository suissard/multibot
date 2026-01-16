const fs = require('fs').promises;
const path = require('path');

const configsPath = path.join(__dirname, '..', '..', 'configs.json');

module.exports = {
    path: '/settings',
    method: 'PUT',
    handler: async (request, res, bot, user, app) => {
        const newConfigs = JSON.stringify(request.body, null, 4);
        await fs.writeFile(configsPath, newConfigs, 'utf8');
        return { success: true };
    }
};
