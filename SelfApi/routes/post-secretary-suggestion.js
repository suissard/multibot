const GeminiService = require('../../services/geminiService');

// Initialize service lazily or statically if env is ready. 
// Ideally should be injected or initialized in main App but here we instantiate it.
const geminiService = new GeminiService(process.env.GEMINI_API_KEY);

/**
 * Route pour obtenir une suggestion de réponse via Gemini
 */
module.exports = {
    method: 'POST',
    path: '/secretary/suggestion',
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('../../Class/Bot')} bot
     */
    handler: async (req, res, bot) => {
        const { messages, config } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw { message: 'Valid messages history required', status: 400 };
        }

        // Format history for the service
        // Assuming messages are ordered [oldest, ..., newest]
        const context = messages.slice(-50).map(msg => ({
            role: msg.author.bot ? 'Organisateur' : 'Utilisateur',
            content: msg.content
        }));

        try {
            const suggestion = await geminiService.generateResponse(context, config);
            return { suggestion };
        } catch (e) {
            throw { message: e.message, status: 500 };
        }
    }
};
