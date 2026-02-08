import { beforeAll, describe, expect, it } from 'vitest';
import fetch from 'node-fetch';
import Route from '../SelfApi/Route.js';
import SelfApi from '../SelfApi/Api.js';

// Configurations API et Discord
process.env.STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
process.env.STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'test-token';
const configs = {
    api: {
        token: 'ceciestuntokentemporaire',
        hostname: '127.0.0.1',
        port: 3000 + Math.round(Math.random() * 1000),
    },
    discord: {
        clientId: '716968666821820497',
        clientPublicKey: 'e74d333048e11ff0b0171dfd7d7d37e5b1fed8870fa6918a16663616b8ac7320',
        clientSecret: 'XoIZXo85XArNsHKVKvSFdpX2nyR8W4kD',
        scope: ['identify', 'guilds', 'guilds.join'],
        redirectUrl: 'http://localhost:8080',
    },
};

let api, token;
const paths = ['/truc', '/test', '/test/:id'];
const methods = ['get', 'post', 'put', 'delete'];

// Mock Bot
const mockBot = {
    id: 'mock_bot_id',
    name: 'MockBot'
};

// Fonction de création des routes pour les tests
const createAllRoutes = (api, paths, methods) => {
    for (let path of paths) {
        for (let method of methods) {
            new Route(api, path, method, (req, res, bot, user) =>
                res.json({ path, method, user: user?.id, message: `${method} => ${path}` }),
            );
        }
    }
};

beforeAll(() => {
    const botsMap = new Map();
    botsMap.set(mockBot.id, mockBot);
    api = new SelfApi(configs.api, configs.discord, botsMap);
    api.start();
    createAllRoutes(api, paths, methods);
    token = api.signToken({ id: 'test_user_id', username: 'test_user' }, 'dummy_access_token');
});

describe('API: Setup and Route Tests', () => {

    it('should initialize API and create routes', async () => {
        // Mock authentication to return our test user
        // But since we use signToken, verifyToken should work if secret matches.
        // Api.js uses this.token or default_secret.

        for (let path of paths) {
            for (let method of methods) {
                const response = await fetch(`http://127.0.0.1:${configs.api.port}/api${path}?bot_id=${mockBot.id}`, {
                    method,
                    headers: { authorization: `Bearer ${token}` },
                });
                const json = await response.json();
                expect(json).toEqual({ path, method, user: 'test_user_id', message: `${method} => ${path}` });
            }
        }
    });
});

describe('API: Unit Method Tests', () => {

    it('should generate and verify token hashes', async () => {
        const hashReq = await api.getHashFromTokenRequest({ headers: { authorization: `Bearer ${token}` } });
        const hashPassword = await api.hashPassword(token);

        expect(hashReq.startsWith('$2b$12$')).toBeTruthy();
        expect(hashPassword.startsWith('$2b$12$')).toBeTruthy();
        expect(hashReq).toEqual(hashPassword);
    });

    it('should get Discord authentication URL', () => {
        const discordAuthUrl = api.getDiscordAuthUrl();
        expect(discordAuthUrl).toContain(configs.discord.clientId);
    });

    it('should retrieve Discord code from request', () => {
        const discordCode = api.getDiscordCodeFromRequest({ query: { code: 'discordCode' } });
        expect(discordCode).toEqual('discordCode');
    });
});
