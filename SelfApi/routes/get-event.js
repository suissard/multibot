const EventSchemas = require('../utils/eventSchemas.js');

/**
 * Route to get information about an event.
 */
module.exports = {
    path: '/events/:eventName',
    method: 'get',
    /**
     * Handles the request to get information about events.
     * @param {import('express').Request} req - The Express request object.
     * @param {import('express').Response} res - The Express response object.
     * @param {*} bot
     * @param {*} user
     * @param {import('../Api')} app - SelfApi instance containing BOTS
     */
    handler: (req, res, bot, user, app) => {
        const eventName = req.params.eventName;
        const BOTS = app.BOTS;

        if (!eventName) {
            // Should not happen with this route path, use /events route for list
            return [];
        }

        let event = BOTS.Events.get(eventName);

        // If not found in loaded events, check if it's a standard known event
        if (!event) {
            if (EventSchemas[eventName]) {
                event = {
                    name: eventName,
                    description: 'Standard Discord Event',
                    active: true,
                    intents: [],
                    options: {},
                    config: {}
                };
            } else {
                throw { message: `Event ${eventName} not found`, status: 404 };
            }
        }

        return {
            name: event.name,
            description: event.description,
            active: event.active,
            intents: event.intents,
            options: event.options,
            config: event.config,
            template: EventSchemas[eventName] || EventSchemas.default
        };
    },
};
