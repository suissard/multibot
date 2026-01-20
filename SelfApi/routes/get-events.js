const EventSchemas = require('../utils/eventSchemas.js');

module.exports = {
    path: '/events',
    method: 'get',
    /**
     * Handles the request to get information about events.
     * @param {import('express').Request} req - The Express request object.
     * @param {import('express').Response} res - The Express response object.
     * @param {*} bot
     * @param {*} user
     * @param {import('../Api')} app
     */
    handler: (req, res, bot, user, app) => {
        if (!app.BOTS?.Events?.__events) {
            return [];
        }
        const listEvents = Array.from(app.BOTS.Events.__events).map(([name, event]) => {
            return {
                name: event.name,
                description: event.description || 'Custom Event',
                active: event.active,
                intents: event.intents,
                options: event.options,
                config: event.config
            };
        });

        // Add standard events if they are not already in the list
        const standardEvents = Object.keys(EventSchemas).filter(key => key !== 'default' && key !== 'Secretary' && !listEvents.find(e => e.name === key));

        standardEvents.forEach(stdEvent => {
            listEvents.push({
                name: stdEvent,
                description: 'Standard Discord Event',
                active: true, // Assuming innate events are always active if listened to, strictly speaking we'd need to check listeners but let's assume available for trigger.
                intents: [],
                options: {},
                config: {},
                isStandard: true
            });
        });

        // Also add Secretary explicitly if we want it to show up as a "Virtual" event
        if (!listEvents.find(e => e.name === 'Secretary')) {
            listEvents.push({
                name: 'Secretary',
                description: 'Virtual Event for Secretary Module',
                active: true,
                intents: [],
                options: {},
                config: {},
                isStandard: false
            });
        }

        return listEvents;
    },
};
