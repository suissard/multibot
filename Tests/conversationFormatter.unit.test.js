import { describe, it, expect } from 'vitest';
import { formatConversation } from '../utils/conversationFormatter.js';
import { formatTimeAgo } from '../utils/conversationFormatter.js';

describe('conversationFormatter', () => {
    it('should extract author from embed title and content from description', () => {
        const messages = [{
            author: { bot: true },
            content: "",
            timestamp: Date.now(),
            embeds: [{
                title: "suissard",
                description: "TU repodn completemetn a coté de la plaque"
            }]
        }];

        const formatted = formatConversation(messages);

        expect(formatted[0].role).toBe('suissard');
        expect(formatted[0].content).toBe('TU repodn completemetn a coté de la plaque');
        expect(formatted[0].content).not.toContain('[Embed Content');
    });

    it('should extract author from embed author.name', () => {
        const messages = [{
            author: { bot: true },
            content: "",
            timestamp: Date.now(),
            embeds: [{
                author: { name: "suissard (via Dashboard)" },
                description: "Salut !"
            }]
        }];

        const formatted = formatConversation(messages);

        // Should simplify name? User asked to standard format.
        // If author is "suissard (via Dashboard)", maybe keeping it is fine, 
        // or stripping " (via Dashboard)" is better.
        // For now let's expect the full name or just verify it's used as role.
        expect(formatted[0].role).toContain('suissard');
        expect(formatted[0].content).toBe('Salut !');
    });

    it('should fallback to default role if no embed title/author', () => {
        const messages = [{
            author: { bot: true }, // Organizer
            content: "",
            timestamp: Date.now(),
            embeds: [{
                description: "Just a description"
            }]
        }];
        const formatted = formatConversation(messages);
        expect(formatted[0].role).toBe('Organisateur');
        expect(formatted[0].content).toContain('Just a description');
    });
});
