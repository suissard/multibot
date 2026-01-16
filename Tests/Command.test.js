import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";

let Command, TestCommand;

beforeAll(async () => {
    vi.resetModules();
    process.env.STRAPI_URL = 'http://localhost:1337';
    process.env.STRAPI_TOKEN = 'dummy_token';

    vi.doMock('suissard-strapi-client', () => ({
        StrapiApi: class { constructor() { } },
        StrapiCollections: class { },
        StrapiObject: class { }
    }));

    const module = await import("../Class/Command.js");
    Command = module.default;

    TestCommand = class extends Command {
        static id = "test";
        static description = "A test command";
        static userPermissions = [];
        static botPermissions = [];

        methode(args) {
            return "Hello from test command";
        }
    }
});

// Mock Bot
const mockBot = {
    ownerId: 'owner-id',
    log: vi.fn(),
    guilds: {
        cache: {
            get: vi.fn().mockReturnValue({ name: 'Test Guild' })
        }
    }
};


describe("Command Class", () => {
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
