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
                description: event.description,
                active: event.active,
                intents: event.intents,
                options: event.options,
                config: event.config
            };
        });
        return listEvents;
    },
};
