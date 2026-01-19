import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import path from 'path';

// Internal mocks using doMock to ensure isolation 
// (We still mock internal deps like routes to avoid loading the whole app graph)
const selfApiDir = path.resolve(__dirname, '../SelfApi');
const classDir = path.resolve(__dirname, '../Class');

describe('SelfApi Unit Tests (White-box with Dependency Injection)', () => {
    let SelfApi;
    let api;

    // Mocks passed via DI
    let mockExpress;
    let mockBcrypt;
    let mockFetch;
    let mockBots; // Declare variable here

    let appMock;

    beforeAll(async () => {
        vi.resetModules();

        // 1. Set environment variables required by DataBase/index.js
        process.env.STRAPI_URL = 'http://localhost:1337';
        process.env.STRAPI_TOKEN = 'dummy_token';

        // 2. Mock external dependencies of DataBase/index.js to avoid connection attempts
        vi.doMock('suissard-strapi-client', () => ({
            StrapiApi: class {
                constructor() { }
            }
        }));

        // Mock routes and transformer to keep SelfApi isolated
        vi.doMock(path.join(selfApiDir, 'routes/index.js'), () => ({
            routes: [],
            createAllRoutes: vi.fn()
        }));

        vi.doMock(path.join(selfApiDir, 'discord-object-transformer.js'), () => ({
            transformApiArgsToDiscordObjects: vi.fn()
        }));

        // Dynamically import module under test
        const module = await import('../SelfApi/Api.js');
        SelfApi = module.default;
    });

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup Express Mock
        const use = vi.fn();
        const listen = vi.fn((port, host, cb) => {
            if (cb) cb();
            return { close: vi.fn() };
        });

        appMock = { use, listen }; // The app instance

        // The express() function mock
        mockExpress = vi.fn(() => appMock);

        // express.Router() mock
        mockExpress.Router = vi.fn(() => ({
            route: vi.fn(() => ({
                get: vi.fn(),
                post: vi.fn(),
                put: vi.fn(),
                delete: vi.fn(),
            })),
            use: vi.fn(),
        }));


        // Setup Bcrypt Mock
        mockBcrypt = {
            genSaltSync: vi.fn(() => 'salt'),
            hash: vi.fn(async (data) => `hashed_${data}`),
        };

        // Setup Fetch Mock
        mockFetch = vi.fn();

        // Configs
        const mockDiscord = {
            clientId: 'clientId',
            clientSecret: 'clientSecret',
            redirectUrl: 'http://localhost/callback',
            scope: ['scope1'],
        };
        const mockConfigs = { token: 'apiToken', hostname: 'localhost', port: 3000 };
        mockBots = new Map(); // Assign to outer variable

        // Instantiate with DI
        api = new SelfApi(
            mockConfigs,
            mockDiscord,
            mockBots,
            12,
            {
                express: mockExpress,
                bcrypt: mockBcrypt,
                fetch: mockFetch
            }
        );
    });

    it('should initialize correctly but not start server immediately', () => {
        expect(api.token).toBe('apiToken');
        expect(mockExpress).toHaveBeenCalled();

        // Since we injected the mock, checking the mock's tracking
        expect(appMock.listen).not.toHaveBeenCalled();
    });

    it('should start the server when start() is called', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

        api.start();

        expect(appMock.listen).toHaveBeenCalledWith(3000, 'localhost', expect.any(Function));
        consoleSpy.mockRestore();
    });

    it('should generate a valid Discord Auth URL', () => {
        const url = api.getDiscordAuthUrl();
        expect(url).toContain('client_id=clientId');
        expect(url).toContain('redirect_uri=http://localhost/callback');
    });

    it('should hash password using injected bcrypt', async () => {
        const hash = await api.hashPassword('myPassword');
        expect(mockBcrypt.hash).toHaveBeenCalledWith('myPassword', 'salt');
        expect(hash).toBe('hashed_myPassword');
    });

    describe('createUser', () => {
        it('should throw error if request already has a token', async () => {
            // We can mock internal methods of api instance as well for unit testing specific logic
            api.getHashFromTokenRequest = vi.fn().mockResolvedValue('existingHash');

            await expect(api.createUser({}, {})).rejects.toThrow('Votre requete contient déjà un token');
        });

        it('should create user successfully', async () => {
            api.getHashFromTokenRequest = vi.fn().mockResolvedValue(false);
            api.getDiscordCodeFromRequest = vi.fn().mockReturnValue('discordCode');
            // Since we use this.fetch, we could mock fetch return value, BUT Api.js uses helper methods wrapping fetch?
            // Line 187: calls getDiscordAccessTokenFromCode.
            // StartApi/Api.js:
            // getDiscordAccessTokenFromCode calls this.fetch.

            // For this test, we can mock the helper methods to test createUser logic isolated from fetch logic
            api.getDiscordAccessTokenFromCode = vi.fn().mockResolvedValue('accessToken');
            api.getDiscordUserFromToken = vi.fn().mockResolvedValue({ id: 'discordId123' });
            api.signToken = vi.fn().mockReturnValue('newToken');
            api.addUser = vi.fn().mockResolvedValue();

            const res = { json: vi.fn() };
            const req = {};

            const result = await api.createUser(req, res);

            // expect(api.addUser).toHaveBeenCalledWith('newToken', 'discordId123'); // Deprecated
            expect(result).toEqual({ token: 'newToken', discordId: 'discordId123' });
        });
    });

    describe('authentication', () => {
        it('should return empty object for public routes', async () => {
            const req = { url: '/auth' };
            const result = await api.authentication(req, {});
            expect(result).toEqual({});
        });

        it('should throw if user not authenticated', async () => {
            const req = { url: '/protected', query: { bot_id: 'bot1' } };
            api.getHashFromTokenRequest = vi.fn().mockResolvedValue(false);
            api.getBotIdFromRequest = vi.fn().mockReturnValue('bot1');

            // Mock bots map
            const mockBot = { users: { cache: new Map(), fetch: vi.fn() } };
            mockBots.set('bot1', mockBot);

            await expect(api.authentication(req, {})).rejects.toThrow('Utilisateur non authentifié');
        });
    });
});
