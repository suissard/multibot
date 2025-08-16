const fs = require('fs');
const path = require('path');

module.exports = {
    path: /^\/modules\/([^\/]+)\/test-data\/([^\/]+)$/,
    method: 'put',
    handler: async (req, res) => {
        const [, moduleId, dataId] = req.path.match(/^\/modules\/([^\/]+)\/test-data\/([^\/]+)$/);
        const modulePath = path.join(__dirname, '../../Modules', moduleId);
        const dataTestPath = path.join(modulePath, 'DataTest');
        const filePath = path.join(dataTestPath, `${dataId}.json`);

        try {
            // Check if the file exists
            await fs.promises.access(filePath);

            // Write the updated data to the file
            await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2));

            res.json({ message: 'Data updated successfully' });
        } catch (error) {
            if (error.code === 'ENOENT') {
                return res.status(404).json({ message: `Test data item ${dataId} not found for module ${moduleId}` });
            }
            console.error(`Error updating test data item ${dataId} for module ${moduleId}:`, error);
            return res.status(500).json({ message: `Error updating test data item ${dataId} for module ${moduleId}` });
        }
    },
};
