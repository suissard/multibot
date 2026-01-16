const fs = require('fs');
const path = require('path');

module.exports = {
    path: /^\/modules\/([^\/]+)\/test-data\/([^\/]+)$/,
    method: 'put',
    handler: async (req, res, bot, user, app) => {
        const [, moduleId, dataId] = req.path.match(/^\/modules\/([^\/]+)\/test-data\/([^\/]+)$/);
        const modulePath = path.join(__dirname, '../../Modules', moduleId);
        const dataTestPath = path.join(modulePath, 'DataTest');
        const filePath = path.join(dataTestPath, `${dataId}.json`);

        // Check if the file exists
        await fs.promises.access(filePath);

        // Write the updated data to the file
        await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2));

        return { message: 'Data updated successfully' };
    },
};
