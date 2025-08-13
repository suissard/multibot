import EmoteMessage from "../Class/EmoteMessage.js";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock StrapiObject
vi.mock('suissard-strapi-client', () => ({
    StrapiObject: class StrapiObject {
        constructor(id, type, data) {
            this.id = id;
            this.type = type;
            Object.assign(this, data);
        }
        getID() { return this.id; }
    }
}));

// Mocks for discord.js objects
const mockRole = { id: 'role-123', name: 'Test Role' };
const mockGuild = {
    id: 'guild-123',
    name: 'Test Guild',
    roles: { cache: { get: vi.fn().mockReturnValue(mockRole) } },
    emojis: { cache: { get: vi.fn() } }
};
const mockChannel = { id: 'channel-123', guild: mockGuild };
const mockMessage = {
    id: 'message-123',
    guild: mockGuild,
    channel: mockChannel,
    react: vi.fn().mockResolvedValue(true),
    client: { user: { id: 'bot-id-1' } }
};
const mockBot = {
    id: 'bot-id-1',
    home: 'guild-123',
    user: { id: 'bot-id-1' },
    checkAccess: vi.fn().mockResolvedValue({
        guild: mockGuild,
        channel: mockChannel,
        message: mockMessage
    })
};

// Mock BotManager
const mockBotManager = {
    checkBotsAccess: vi.fn().mockResolvedValue([
        { bot: mockBot, guild: mockGuild, channel: mockChannel, message: mockMessage }
    ])
};


describe.skip("EmoteMessage Class", () => {
    let emoteMessage;
    const emoteData = {
        guild: { Guild: 'guild-123' },
        channel: { Channel: 'channel-123' },
        message: { Message: 'message-123' },
        emotes: { '👍': 'ROLE:role-123' }
    };

    beforeEach(() => {
        emoteMessage = new EmoteMessage('emote-msg-1', 'emotemessages', emoteData, null, mockBotManager);
    });

    it("devrait initialiser les propriétés de l'EmoteMessage", () => {
        expect(emoteMessage.getID()).toBe('emote-msg-1');
        expect(emoteMessage.bots).toBe(mockBotManager);
    });

    it("devrait s'initialiser correctement avec la méthode set", async () => {
        const result = await emoteMessage.set();
        expect(result).toBe(true);
        expect(mockBotManager.checkBotsAccess).toHaveBeenCalledWith('guild-123', 'channel-123', 'message-123');
        expect(mockMessage.react).toHaveBeenCalledWith('👍');
    });

    it("devrait retourner false si l'initialisation échoue", async () => {
        mockBotManager.checkBotsAccess.mockResolvedValueOnce([]); // No bot has access
        const result = await emoteMessage.set();
        expect(result).toBe(false);
    });

    it("devrait vérifier si un message correspond", () => {
        emoteMessage.guild = { id: 'guild-123' };
        emoteMessage.channel = { id: 'channel-123' };
        const matchingMessage = { guild: { id: 'guild-123' }, channel: { id: 'channel-123' } };
        const nonMatchingMessage = { guild: { id: 'guild-456' }, channel: { id: 'channel-789' } };

        expect(emoteMessage.check(matchingMessage)).toBe(emoteMessage);
        expect(emoteMessage.check(nonMatchingMessage)).toBe(false);
    });
});
