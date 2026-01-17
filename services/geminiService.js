const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Service pour interagir avec l'API Google Gemini
 */
class GeminiService {
    constructor(apiKey) {
        if (!apiKey) {
            console.warn('GeminiService: API Key is missing. Suggestions will not work.');
            return;
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    /**
     * Génère une suggestion de réponse pour le secrétariat
     * @param {Array<{role: string, content: string}>} history - Historique des messages
     * @param {Object} [options] - Configuration spécifique (apiKey, model, temperature)
     * @returns {Promise<string>} La suggestion de réponse
     */
    async generateResponse(history, options = {}) {
        let model = this.model;

        // Use custom API key if provided
        if (options.apiKey) {
            const tempGenAI = new GoogleGenerativeAI(options.apiKey);
            // Use custom model or default to gemini-pro
            model = tempGenAI.getGenerativeModel({ model: options.model || 'gemini-pro' });
        } else if (options.model && this.genAI) {
            // Use custom model with default key
            model = this.genAI.getGenerativeModel({ model: options.model });
        }

        if (!model) {
            throw new Error('Gemini API not configured');
        }

        const prompt = `
        Tu es un assistant virtuel serviable pour un secrétariat de bot Discord.
        Le bot est principalement dédié à la gestion et au support de la compétition e-sport "Overwatch AllForOne".
        
        Ton but est de suggérer une réponse pertinente a la suite de la conversation suivante.
        Utilise le contexte de la compétition e-sport "Overwatch AllForOne" pour orienter tes réponses si pertinent.
        La réponse doit être concise, avec de l'humour, des emojis et prête a etre envoyée.
        Note: "Utilisateur" est la personne qui pose des questions ou demande de l'aide. "Organisateur" représente les réponses précédentes du staff/bot.
        
        Historique de la conversation:
        ${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
        
        Suggestion de réponse:`;

        try {
            const generationConfig = {};
            if (options.temperature !== undefined) {
                generationConfig.temperature = parseFloat(options.temperature);
            }

            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig
            });
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw new Error('Failed to generate suggestion: ' + error.message);
        }
    }
}

module.exports = GeminiService;
