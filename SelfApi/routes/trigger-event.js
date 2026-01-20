const { hydratePayload } = require('../utils/eventHydrator');

module.exports = {
    path: '/events/trigger',
    method: 'post',
    /**
     * Trigger a Discord event on the bot.
     * @param {import('express').Request} req - Express request
     * @param {import('express').Response} res - Express response
     * @param {import('../../Class/Bot')} bot - Bot instance
     */
    handler: async (req, res, bot) => {
        try {
            const eventName = req.body.eventName;
            const payload = req.body.payload || {};

            if (!eventName) {
                return res.status(400).json({ message: 'eventName is required' });
            }

            // Assuming req.user exists from authentication middleware, or default to 'Unknown User'
            const user = req.user;
            const requester = user ? `${user.username} (${user.id})` : 'Unknown User';

            // Assuming bot has a log method, or bot.app.log if 'app' is a property of bot
            // If bot.log doesn't exist, this might need adjustment based on the actual bot structure.
            if (bot.log) {
                bot.log(`Event '${eventName}' triggered by ${requester}`, 'API_TRIGGER');
                bot.log(`Payload: ${JSON.stringify(payload)}`, 'API_TRIGGER');
            } else if (bot.app && bot.app.log) { // Fallback if bot has an 'app' property with a log method
                bot.app.log(`Event '${eventName}' triggered by ${requester}`, 'API_TRIGGER');
                bot.app.log(`Payload: ${JSON.stringify(payload)}`, 'API_TRIGGER');
            } else {
                console.log(`API_TRIGGER: Event '${eventName}' triggered by ${requester}`);
                console.log(`API_TRIGGER: Payload: ${JSON.stringify(payload)}`);
            }


            // Hydrate payload to get real Discord objects if possible
            const args = await hydratePayload(bot, eventName, payload || []);

            // Emit the event
            // Note: This emits to the client, so all listeners (including our own modules) will receive it.
            bot.emit(eventName, ...args);

            res.send({
                success: true,
                message: `Event ${eventName} triggered`,
                hydratedArgsSummary: args.map(arg => arg?.constructor?.name || typeof arg)
            });

        } catch (error) {
            console.error('Error triggering event:', error);
            res.status(500).send({ message: 'Internal Server Error', error: error.message });
        }
    },
};
