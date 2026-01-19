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
     * Formate un message individuel pour l'historique
     * @param {{role: string, content: string}} message 
     * @returns {string} Message formaté (ex: "Utilisateur: [il y a 2h] Bonjour")
     */
    /**
     * Formate un message individuel pour l'historique
     * @param {{role: string, content: string, timeAgo: string}} message 
     * @returns {string} Message formaté (ex: "Utilisateur [il y a 2h]: Bonjour")
     */
    formatMessage(message) {
        // Handle legacy format or missing timeAgo
        const timeInfo = message.timeAgo ? ` ${message.timeAgo}` : '';
        return `${message.role}${timeInfo}: ${message.content}`;
    }

    /**
     * Formate l'historique complet pour le prompt
     * @param {Array<{role: string, content: string}>} history 
     * @returns {string} Historique formaté en chaîne de caractères
     */
    formatHistory(history) {
        return history.map(msg => this.formatMessage(msg)).join('\n');
    }

    /**
     * Construit le prompt pour l'API Gemini
     * @param {Array<{role: string, content: string}>} history 
     * @returns {string} Le prompt formaté
     */
    constructPrompt(history) {
        return `
        Tu es un organisateur de compétition de la compétition e-sport "Overwatch AllForOne", et tu gères un secrétariat sur Discord.
        .
        
        Tu réponds de manière pertinente a la suite de la conversation suivante.
        La réponse doit être concise, avec de l'humour, des emojis.
        
        Note: "Utilisateur" est la personne qui pose des questions ou demande de l'aide. "Organisateur" représente les réponses précédentes du staff/bot.
        
        Historique de la conversation:
        ${this.formatHistory(history)}`;
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

        const prompt = this.constructPrompt(history);

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
