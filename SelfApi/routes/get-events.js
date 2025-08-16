const BOTS = require('../../Class/BOTS.js');

/**
 * Route to get information about all events.
 */
module.exports = {
    path: '/events',
    method: 'get',
    /**
     * Handles the request to get information about events.
     * @param {import('express').Request} req - The Express request object.
     * @param {import('express').Response} res - The Express response object.
     */
    handler: (req, res) => {
        const listEvents = Array.from(BOTS.Events.__events).map(([name, event]) => {
            return {
                name: event.name,
                description: event.description,
                active: event.active,
                intents: event.intents,
                options: event.options,
                config: event.config
            };
        });
        return res.json(listEvents);
    },
};
