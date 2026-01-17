import { describe, it, expect, vi } from 'vitest';
import GeminiService from '../services/geminiService.js';

describe('GeminiService', () => {
    it('should construct the prompt correctly', () => {
        const service = new GeminiService('dummy-key');
        const history = [
            { role: 'Utilisateur', content: 'Bonjour' },
            { role: 'Organisateur', content: 'Salut' }
        ];

        const prompt = service.constructPrompt(history);

        expect(prompt).toContain('Tu es un organisateur de compétition');
        expect(prompt).toContain('Historique de la conversation:');
        expect(prompt).toContain('Utilisateur: Bonjour');
        expect(prompt).toContain('Organisateur: Salut');
    });

    it('should format individual messages correctly', () => {
        const service = new GeminiService('dummy-key');
        const msg = { role: 'User', content: 'Hello', timeAgo: '[il y a 2m]' };
        expect(service.formatMessage(msg)).toBe('User [il y a 2m]: Hello');
    });

    it('should format message without timeAgo correctly', () => {
        const service = new GeminiService('dummy-key');
        const msg = { role: 'User', content: 'Hello' };
        expect(service.formatMessage(msg)).toBe('User: Hello');
    });

    it('should format history correctly', () => {
        const service = new GeminiService('dummy-key');
        const history = [
            { role: 'A', content: '1', timeAgo: '[il y a 1m]' },
            { role: 'B', content: '2' }
        ];
        expect(service.formatHistory(history)).toBe('A [il y a 1m]: 1\nB: 2');
    });
});
