const fs = require('fs').promises;
const path = require('path');

const configsPath = path.join(__dirname, '..', '..', 'configs.json');

module.exports = {
    path: '/settings',
    method: 'GET',
    handler: async (request, res, bot, user, app) => {
        const configsData = await fs.readFile(configsPath, 'utf8');
        return JSON.parse(configsData);
    }
};
