import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import postSecretarySuggestion from '../SelfApi/routes/post-secretary-suggestion.js';

// Mock request and response
const mockReq = (body) => ({
    body
});

const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    res.send = vi.fn().mockReturnValue(res);
    return res;
};

// Load API Key
let apiKey;
try {
    const keyPath = path.resolve(__dirname, 'geminiApiKey.json');
    const keyContent = fs.readFileSync(keyPath, 'utf8');
    // Remove potential extra characters if the user paste format is weird (e.g. quotes or trailing dot)
    apiKey = keyContent.replace(/"/g, '').replace(/\.$/, '').trim();
} catch (e) {
    console.warn("Skipping real API call tests: No API key found at Tests/geminiApiKey.json");
}

describe('POST /secretary/suggestion', () => {
    it('should throw error if messages are missing', async () => {
        const req = mockReq({});
        const res = mockRes();

        await expect(postSecretarySuggestion.handler(req, res)).rejects.toMatchObject({
            status: 400,
            message: 'Valid messages history required'
        });
    });

    it('should generate a suggestion with valid messages and API key', async () => {
        if (!apiKey) {
            console.warn('Skipping test requiring API key');
            return;
        }

        const messages = [
            { author: { bot: false }, content: "Bonjour, j'ai un problème avec mon serveur." },
            { author: { bot: false }, content: "Est-ce que vous pouvez m'aider ?" }
        ];

        const req = mockReq({
            messages,
            config: {
                apiKey: apiKey,
                model: 'gemini-flash-latest',
                temperature: 0.7
            }
        });
        const res = mockRes();

        const result = await postSecretarySuggestion.handler(req, res);

        expect(result).toHaveProperty('suggestion');
        expect(typeof result.suggestion).toBe('string');
        console.log('Generated Suggestion:', result.suggestion);
    });

    it('should handle API errors gracefully', async () => {
        const messages = [{ author: { bot: false }, content: "Test" }];
        // Invalid key to trigger error
        const req = mockReq({
            messages,
            config: { apiKey: 'INVALID_KEY' }
        });
        const res = mockRes();

        // Expect it to fail with status 500
        await expect(postSecretarySuggestion.handler(req, res)).rejects.toMatchObject({
            status: 500
        });
    });
});
