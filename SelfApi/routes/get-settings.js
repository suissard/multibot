const fs = require('fs').promises;
const path = require('path');

const configsPath = path.join(__dirname, '..', '..', 'configs.json');

module.exports = {
    path: '/settings',
    method: 'GET',
    handler: async (request, reply) => {
        try {
            const configsData = await fs.readFile(configsPath, 'utf8');
            const configs = JSON.parse(configsData);
            reply.send(configs);
        } catch (error) {
            console.error('Error reading configs.json:', error);
            reply.status(500).send({ error: 'Failed to load settings' });
        }
    }
};
