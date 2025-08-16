import { describe, it, expect, vi } from 'vitest';
import ShareMessage from '../../Modules/ShareChannel/ShareMessage.js';

// Mock BOTS dependency
vi.mock('../../Class/BOTS.js', () => ({
    default: {
        ShareChannels: new Map(),
    }
}));

describe('ShareMessage', () => {

    // Mock message object for the constructor
    const createMockMessage = (content) => ({
        id: 'msg1',
        createdTimestamp: Date.now(),
        content: content,
        channel: { id: 'channel1' },
        guild: { id: 'guild1' },
    });

    it('should be a class', () => {
        expect(typeof ShareMessage).toBe('function');
    });

    describe('constructor', () => {
        it('should initialize correctly and call extractInfo', () => {
            const mockMessage = createMockMessage('LFP 3k4 scrim now EU');
            const shareMessage = new ShareMessage(mockMessage, 'game', 'categorie');

            expect(shareMessage.id).toBe('msg1');
            expect(shareMessage.game).toBe('game');
            expect(shareMessage.categorie).toBe('categorie');
            expect(shareMessage.infos).toBeDefined();
            expect(shareMessage.infos.elo).toBe('3k4');
        });
    });

    describe('extractInfo', () => {
        const testCases = [
            {
                description: 'should extract all info correctly',
                content: 'LFP scrim 3k4 now at 21h cest on EU server',
                expected: { elo: '3k4', date: 'now', heure: '21h', fuseau: 'cest', server: 'EU' }
            },
            {
                description: 'should handle various ELO formats',
                content: 'Need one player, 4000+ sr',
                expected: { elo: '4000', date: undefined, heure: undefined, fuseau: undefined, server: undefined }
            },
            {
                description: 'should handle "k" ELO format',
                content: 'Looking for a 2k player',
                expected: { elo: '2k', date: undefined, heure: undefined, fuseau: undefined, server: undefined }
            },
            {
                description: 'should extract various date formats',
                content: 'Scrim tomorrow at 8pm',
                expected: { elo: undefined, date: 'tomorrow', heure: '8pm', fuseau: undefined, server: undefined }
            },
            {
                description: 'should extract various time formats',
                content: 'We play at 19:30 on NA',
                expected: { elo: undefined, date: undefined, heure: '19:30', fuseau: undefined, server: 'NA' }
            },
            {
                description: 'should handle messages with no info',
                content: 'Hello everyone',
                expected: { elo: undefined, date: undefined, heure: undefined, fuseau: undefined, server: undefined }
            },
            {
                description: 'should be case-insensitive',
                content: 'lfp scrim NOW 2K CeSt nA',
                expected: { elo: '2K', date: 'NOW', heure: undefined, fuseau: 'CeSt', server: 'nA' }
            }
        ];

        testCases.forEach(({ description, content, expected }) => {
            it(description, () => {
                const mockMessage = createMockMessage(content);
                const shareMessage = new ShareMessage(mockMessage, 'game', 'categorie');
                const infos = shareMessage.extractInfo();
                expect(infos).toEqual(expected);
            });
        });
    });
});
