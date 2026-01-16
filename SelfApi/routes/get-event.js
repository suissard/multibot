const BOTS = require('../../Class/BOTS.js');

/**
 * Route to get information about an event.
 */
module.exports = {
    path: /\/events\/.*/,
    method: 'get',
    /**
     * Handles the request to get information about events.
     * If an event name is provided in the URL, it returns the details of that event.
     * Otherwise, it returns a list of all registered events.
     * @param {import('express').Request} req - The Express request object.
     * @param {import('express').Response} res - The Express response object.
     */
    handler: (req, res) => {
        const eventName = req.params.eventName;
        if (!eventName) {
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
            return listEvents;
        }

        const event = BOTS.Events.get(eventName);
        if (!event) throw { message: `Event ${eventName} not found`, status: 404 };

        return {
            name: event.name,
            description: event.description,
            active: event.active,
            intents: event.intents,
            options: event.options,
            config: event.config
        };
    },
};
