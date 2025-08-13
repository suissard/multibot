import Command from "../Class/Command.js";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock Bot
const mockBot = {
    ownerId: 'owner-id',
    guilds: {
        cache: {
            get: vi.fn().mockReturnValue({ name: 'Test Guild' })
        }
    }
};

class TestCommand extends Command {
    static id = "test";
    static description = "A test command";
    static userPermissions = [];
    static botPermissions = [];

    methode(args) {
        return "Hello from test command";
    }
}

describe.skip("Command Class", () => {
    let command;
    let mockMessage;

    beforeEach(() => {
        command = new TestCommand(mockBot);
        mockMessage = {
            guild: { id: 'guild-id' },
            channel: {
                sendTyping: vi.fn(),
                send: vi.fn().mockResolvedValue({})
            },
            author: { id: 'user-id', username: 'test-user' },
            member: {
                permissions: {
                    has: vi.fn().mockReturnValue(true)
                },
                user: {
                    id: 'user-id',
                    discriminator: '1234'
                }
            },
            react: vi.fn().mockResolvedValue({}),
            user: { id: 'user-id', username: 'test-user' },
        };
        command.setCommunicationData(mockMessage.guild, mockMessage.channel, mockMessage.author, mockMessage.member);
    });

    it("devrait initialiser les propriétés de la commande", () => {
        expect(command.id).toBe("test");
        expect(command.description).toBe("A test command");
        expect(command.bot).toBe(mockBot);
    });

    it("devrait appeler la méthode 'methode' lors de l'appel de handleMessage", async () => {
        const methodeSpy = vi.spyOn(command, 'methode');
        await command.handleMessage(mockMessage);
        expect(methodeSpy).toHaveBeenCalled();
    });

    it("devrait vérifier les permissions de l'utilisateur", () => {
        expect(command.checkPermission(mockMessage.member, mockMessage.guild)).toBe(true);
    });

    it("devrait lancer une erreur si les permissions de l'utilisateur sont insuffisantes", () => {
        mockMessage.member.permissions.has.mockReturnValue(false);
        command.userPermissions = ['ADMINISTRATOR'];
        expect(() => command.checkPermission(mockMessage.member, mockMessage.guild)).toThrow('Permissions insuffisantes');
    });

});
