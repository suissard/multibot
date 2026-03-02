const GeminiService = require('../../services/geminiService');
const { formatConversation } = require('../../utils/conversationFormatter');

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

        // Format history using the dedicated utility
        const context = formatConversation(messages);

        // Use custom Webhook URL if defined
        const aiWebhookUrl = bot.modules.Secretary && bot.modules.Secretary.aiSuggestionUrl;
        if (aiWebhookUrl) {
            try {
                // The frontend context usually contains multiple messages. Wait for a userId from frontend logic if needed, 
                // but the webhook expects 'sessionId' (the user) and 'text' (the message). 
                // We'll pass the full formatted context as 'text' and a dummy 'sessionId' or extract it.
                // Assuming messages[0] has author ID if required.
                const firstUserMessage = messages.find(m => m.author && !m.author.bot);
                const sessionId = firstUserMessage ? firstUserMessage.author.id : 'unknown';

                const response = await fetch(aiWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sessionId: sessionId,
                        text: context
                    })
                });

                const textOutput = await response.text();
                let suggestion = textOutput;
                try {
                    const parsed = JSON.parse(textOutput);
                    suggestion = parsed.suggestion || parsed.text || parsed.reply || ((parsed.output && typeof parsed.output === 'string') ? parsed.output : textOutput);
                } catch (e) {
                    // Fallback to raw text
                }

                if (suggestion && suggestion.trim().length > 0) {
                    return { suggestion };
                }
            } catch (err) {
                console.error("Erreur lors de l'appel webhook IA depuis le Dashboard:", err);
                // Fallback to gemini if the request fails
            }
        }

        try {
            const suggestion = await geminiService.generateResponse(context, config);
            return { suggestion };
        } catch (e) {
            throw { message: e.message, status: 500 };
        }
    }
};
