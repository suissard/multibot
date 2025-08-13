import Bot from "../Class/Bot.js";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { StrapiObject } from "suissard-strapi-client"; // Assurez-vous que c'est importé correctement
import BOTS from "./TestBot.js"

// Mock des objets et méthodes nécessaires pour les tests
const mockStrapiObject = new StrapiObject("test-bot-id", "botdatas",{
  name: "TestBot",
  ownerId: "test-owner-id",
  home: "test-home-id",
  devMode: true,
  token: "test-token",
  prefix: "!",
  admin: ["test-admin-id"],
  activity: "Test Activity",
  modules: {},
  unauthorizedEvents: ["testEvent1"],
  unauthorizedCommands: ["testCommand1"],
  commandInDev: ["testCommandInDev"],
});

const mockStrapiObject2 = new StrapiObject("test-bot-id", "botdatas",{
  ownerId: "test-owner-id",
  home: "test-home-id",
  devMode: true,
  token: "test-token",
  prefix: "!",
  admin: ["test-admin-id"],
  activity: "Test Activity",
  modules: {},
  unauthorizedEvents: ["testEvent1"],
  unauthorizedCommands: ["testCommand1"],
  commandInDev: ["testCommandInDev"],
});

describe("Bot Class", () => {
  let bot;

  beforeEach(() => {
    // Mock de la connexion Discord pour éviter les appels réels à l'API Discord
    vi.spyOn(Bot.prototype, "login").mockImplementation(() => Promise.resolve("Logged in"));
    
    bot = new Bot(mockStrapiObject, BOTS);
  });

  it("devrait initialiser le bot avec les propriétés correctes", () => {
    expect(bot.id).toBe("test-bot-id");
    expect(bot.name).toBe("TestBot");
    expect(bot.ownerId).toBe("test-owner-id");
    expect(bot.home).toBe("test-home-id");
    expect(bot.devMode).toBe(true);
    expect(bot.prefix).toBe("!");
    expect(bot.admin).toContain("test-owner-id");
    expect(bot.admin).toContain("test-admin-id");
    expect(bot.activity).toBe("Test Activity");
    expect(bot.modules).toEqual({});
    expect(bot.unauthorizedEvents).toContain("testEvent1");
    expect(bot.unauthorizedCommands).toContain("testCommand1");
    expect(bot.commandInDev).toContain("testCommandInDev");
  });

  it("devrait lancer une erreur si une propriété obligatoire est manquante", () => {
    expect(() => {
      new Bot(
        mockStrapiObject2
        , BOTS);
    }).toThrow("Un name doit être déclaré");
  });

  it("devrait appeler login() avec le token correct lors de l'initialisation", () => {
    expect(Bot.prototype.login).toHaveBeenCalledWith("test-token");
  });

  it("devrait redémarrer le bot en appelant BOTS.restart avec l'ID correct", () => {
    const restartMock = vi.spyOn(BOTS, "restart").mockImplementation(() => {});

    bot.restart();

    expect(restartMock).toHaveBeenCalledWith("test-bot-id");
  });

  describe("checkAccess", () => {
    it("devrait retourner false si aucun guildId ou channelId n'est fourni", async () => {
      await expect(bot.checkAccess()).rejects.toThrow("Il faut au moins indiquer un guildId ou un channelId");
    });

    it("devrait retourner false si la guild ou le channel n'existe pas", async () => {
      const guildMock = vi.spyOn(bot.guilds.cache, "get").mockReturnValue(undefined);
      await expect(bot.checkAccess("invalidGuildId")).resolves.toBe(false);
      guildMock.mockRestore();
    });

    it("devrait retourner un objet avec guild et channel si guildId et channelId existent", async () => {
      const mockGuild = { id: "test-guild-id" };
      const mockChannel = { id: "test-channel-id", guild: mockGuild };
      vi.spyOn(bot.guilds.cache, "get").mockReturnValue(mockGuild);
      vi.spyOn(bot.channels.cache, "get").mockReturnValue(mockChannel);

      const result = await bot.checkAccess("test-guild-id", "test-channel-id");

      expect(result).toEqual({ guild: mockGuild, channel: mockChannel });
    });
  });
});
