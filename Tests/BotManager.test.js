import BotManager from "../Class/BotManager.js";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock des dépendances
vi.mock('../Class/Bot.js', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      login: vi.fn().mockResolvedValue('Logged in'),
      restart: vi.fn(),
      checkAccess: vi.fn().mockResolvedValue(true),
      log: vi.fn(),
      error: vi.fn(),
    }))
  };
});
vi.mock('../Class/CommandManager.js');
vi.mock('../Class/Command.js');
vi.mock('../Class/EventManager.js');
vi.mock('../Class/Event.js');
vi.mock('../Class/EmoteMessageManager.js');
vi.mock('../SelfApi/Api.js');


describe("BotManager Class", () => {
  let botManager;

  beforeEach(() => {
    botManager = new BotManager();
  });

  it("devrait être une instance de Map", () => {
    expect(botManager).toBeInstanceOf(Map);
  });

  it("devrait initialiser les gestionnaires", () => {
    expect(botManager.Commands).toBeDefined();
    expect(botManager.Events).toBeDefined();
    expect(botManager.EmoteMessages).toBeDefined();
  });

  it("devrait avoir un émetteur d'événements", () => {
    expect(botManager.event).toBeDefined();
  });

});
