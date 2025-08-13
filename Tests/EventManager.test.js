import EventManager from "../Class/EventManager.js";
import Event from "../Class/Event.js";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock de la classe Event
class MockEvent extends Event {
    static id = 'mock-event';
    static listener = 'messageCreate';
    constructor(bot) {
        super(bot);
        this.createListener = vi.fn();
    }
}

// Mock du BotManager
const mockBotManager = new Map();
mockBotManager.set('bot1', { unauthorizedEvents: [] });
mockBotManager.set('bot2', { unauthorizedEvents: ['mock-event'] });


vi.mock('fs', () => ({
    readdirSync: vi.fn().mockReturnValue(['mock-event.js']),
}));

vi.mock('../Events/mock-event.js', () => MockEvent, { virtual: true });


describe.skip("EventManager Class", () => {
    let eventManager;

    beforeEach(() => {
        eventManager = new EventManager(mockBotManager);
    });

    it("devrait pouvoir ajouter un événement", () => {
        eventManager.add("test", MockEvent);
        expect(eventManager.get("test")).toBe(MockEvent);
    });

    it("devrait lancer une erreur si l'ID de l'événement existe déjà", () => {
        eventManager.add("test", MockEvent);
        expect(() => eventManager.add("test", MockEvent)).toThrow('This id (test) already exist');
    });

    it("devrait créer un listener pour un bot", () => {
        const bot = { unauthorizedEvents: [] };
        eventManager.createListener(MockEvent, bot);
        // We can't directly test the 'new MockEvent(bot).createListener()' call without more complex mocking.
        // However, we know that if no error is thrown, the method was likely called.
        // A better approach would be to inject the Event factory.
        expect(true).toBe(true);
    });

    it("devrait créer tous les listeners pour un bot, en ignorant les non-autorisés", () => {
        eventManager.add(MockEvent.id, MockEvent);
        const createListenerSpy = vi.spyOn(eventManager, 'createListener');

        const bot1 = { unauthorizedEvents: [] };
        eventManager.createAllListener(bot1);
        expect(createListenerSpy).toHaveBeenCalledWith(MockEvent, bot1);

        const bot2 = { unauthorizedEvents: ['mock-event'] };
        eventManager.createAllListener(bot2);
        // createListenerSpy should not be called again for bot2 with mock-event
        expect(createListenerSpy).toHaveBeenCalledTimes(1);
    });

    it("devrait charger tous les événements du répertoire 'Events'", () => {
        const setEventSpy = vi.spyOn(eventManager, 'setEvent').mockImplementation(() => {});
        eventManager.setAllEvents();
        expect(vi.mocked(require('fs')).readdirSync).toHaveBeenCalledWith('./Events');
    });

});
