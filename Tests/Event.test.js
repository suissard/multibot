import Event from "../Class/Event.js";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock de la classe Bot
const mockBot = {
    on: vi.fn(),
    prependListener: vi.fn(),
    error: vi.fn(),
};

class TestEvent extends Event {
    static id = "test-event";
    static listener = "messageCreate";

    async handleEvent() {
        // Mock implementation
    }
}

describe.skip("Event Class", () => {
    let event;

    beforeEach(() => {
        event = new TestEvent(mockBot);
    });

    it("devrait initialiser les propriétés de l'événement", () => {
        expect(event.id).toBe("test-event");
        expect(event.listener).toBe("messageCreate");
        expect(event.bot).toBe(mockBot);
    });

    it("devrait appeler la méthode 'on' du bot lors de la création du listener", () => {
        event.createListener();
        expect(mockBot.on).toHaveBeenCalledWith("messageCreate", expect.any(Function));
    });

    it("devrait appeler la méthode 'prependListener' du bot", () => {
        event.prependListener();
        expect(mockBot.prependListener).toHaveBeenCalledWith("messageCreate", expect.any(Function));
    });

    it("devrait lancer une erreur si handleEvent n'est pas surchargée", async () => {
        class BadEvent extends Event {
            static id = "bad-event";
            static listener = "test";
        }
        const badEvent = new BadEvent(mockBot);
        await expect(badEvent.handleEvent()).rejects.toThrow('La fonction d\'evenements "handleEvent" de bad-event n\'as pas été surchargée');
    });

    it("devrait appeler bot.error lors de la gestion d'une erreur", () => {
        const error = new Error("Test error");
        event.handleError(error);
        expect(mockBot.error).toHaveBeenCalledWith(error, "Event - messageCreate - test-event");
    });
});
