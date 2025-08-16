const fs = require('fs').promises;
const path = require('path');

const configsPath = path.join(__dirname, '..', '..', 'configs.json');

module.exports = {
    path: '/settings',
    method: 'PUT',
    handler: async (request, reply) => {
        try {
            const newConfigs = JSON.stringify(request.body, null, 4);
            await fs.writeFile(configsPath, newConfigs, 'utf8');
            reply.send({ success: true });
        } catch (error) {
            console.error('Error writing configs.json:', error);
            reply.status(500).send({ error: 'Failed to save settings' });
        }
    }
};
