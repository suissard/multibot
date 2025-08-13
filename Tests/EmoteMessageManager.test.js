import EmoteMessageManager from "../Class/EmoteMessageManager.js";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock EmoteMessage
const mockEmoteMessageInstance = {
    set: vi.fn().mockResolvedValue(true),
    handleMessageReactionAdd: vi.fn(),
    handleMessageReactionRemove: vi.fn(),
    getID: () => 'mock-id-1',
    getType: () => 'emotemessages',
    getCollection: () => ({}),
    channel: { Channel: 'channel-1' },
    message: { Message: 'message-1' },
};

vi.mock('../Class/EmoteMessage.js', () => ({
    default: vi.fn().mockImplementation(() => mockEmoteMessageInstance)
}));

// Mock DataBase
vi.mock('../Class/DataBase', () => ({
    default: {
        collections: {
            emotemessages: {
                list: vi.fn().mockResolvedValue([]),
                create: vi.fn().mockResolvedValue(mockEmoteMessageInstance)
            }
        }
    }
}));


describe.skip("EmoteMessageManager Class", () => {
    let emoteMessageManager;
    let mockBots;

    beforeEach(() => {
        // This creates a circular reference similar to the real implementation
        // where bots.EmoteMessages points to the manager instance.
        mockBots = {};
        emoteMessageManager = new EmoteMessageManager(mockBots);
        mockBots.EmoteMessages = emoteMessageManager;
        vi.clearAllMocks();
    });

    it("devrait pouvoir ajouter et récupérer un EmoteMessage", () => {
        emoteMessageManager.add("test-id", mockEmoteMessageInstance);
        expect(emoteMessageManager.get("test-id")).toBe(mockEmoteMessageInstance);
    });

    it("devrait appeler handleMessageReactionAdd sur le bon EmoteMessage", () => {
        emoteMessageManager.add("channel-1-message-1", mockEmoteMessageInstance);
        const reaction = { message: { channel: { id: 'channel-1' }, id: 'message-1' } };
        const user = { bot: false };

        emoteMessageManager.handleMessageReactionAdd(reaction, user);

        expect(mockEmoteMessageInstance.handleMessageReactionAdd).toHaveBeenCalledWith(reaction, user);
    });

    it("ne devrait rien faire si l'utilisateur est un bot", () => {
        const reaction = { message: { channel: { id: 'channel-1' }, id: 'message-1' } };
        const user = { bot: true };

        emoteMessageManager.handleMessageReactionAdd(reaction, user);

        expect(mockEmoteMessageInstance.handleMessageReactionAdd).not.toHaveBeenCalled();
    });

    it("devrait charger tous les EmoteMessages depuis la base de données", async () => {
        const mockEmoteMessageData = {
            ...mockEmoteMessageInstance,
        };
        const listMock = vi.mocked(require('../Class/DataBase').default.collections.emotemessages.list);
        listMock.mockResolvedValueOnce([mockEmoteMessageData]);

        const setEmoteMessageSpy = vi.spyOn(emoteMessageManager, 'setEmoteMessage');

        await emoteMessageManager.setAllEmoteMessages();

        expect(listMock).toHaveBeenCalled();
        // This needs a small delay to allow the promise chain to resolve
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(setEmoteMessageSpy).toHaveBeenCalledWith(mockEmoteMessageData);
    });

    it("devrait créer un EmoteMessage", async () => {
        const createMock = vi.mocked(require('../Class/DataBase').default.collections.emotemessages.create);
        const setEmoteMessageSpy = vi.spyOn(emoteMessageManager, 'setEmoteMessage');
        const body = { name: 'new emote message' };

        await emoteMessageManager.create(body);

        expect(createMock).toHaveBeenCalledWith(body);
        expect(setEmoteMessageSpy).toHaveBeenCalledWith(mockEmoteMessageInstance);
    });
});
