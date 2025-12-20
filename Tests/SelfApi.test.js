import { beforeAll, describe, expect, it } from 'vitest';
import fetch from 'node-fetch';
import Route from '../SelfApi/Route.js';
import SelfApi from '../SelfApi/Api.js';

// Configurations API et Discord
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

let api, token, reqResult;
const paths = ['/truc', '/test', '/test/:id'];
const methods = ['get', 'post', 'put', 'delete'];
const resultTest = { json: (data) => (reqResult = data) };

// Fonction de création des routes pour les tests
const createAllRoutes = (api, paths, methods) => {
    for (let path of paths) {
        for (let method of methods) {
            new Route(api, path, method, (req, res, bot, user) =>
                res.json({ path, method, user, message: `${method} => ${path}` }),
            );
        }
    }
};

beforeAll(() => {
    api = new SelfApi(configs.api, configs.discord, new Map());
    api.start();
    createAllRoutes(api, paths, methods);
    token = api.generateToken();
});

describe('API: Setup and Route Tests', () => {

    it('should initialize API and create routes', async () => {
        api.authentication = async (req) => {
            const requestHash = await api.getHashFromTokenRequest(req);
            const userId = requestHash ? api.hashUsers.get(requestHash) : false;
            return { bot: false, user: userId };
        };

        for (let path of paths) {
            for (let method of methods) {
                const response = await fetch(`http://127.0.0.1:${configs.api.port}${path}`, {
                    method,
                    headers: { authorization: `Bearer ${token}` },
                });
                const json = await response.json();
                expect(json).toEqual({ path, method, user: undefined, message: `${method} => ${path}` });
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

describe('API: Authentication Flow Tests', () => {

    it('should create a new user via Discord authentication', async () => {
        api.getDiscordIdFromCode = () => '12345678910';
        const authResponse = await fetch(`http://127.0.0.1:${configs.api.port}/auth`);
        expect(authResponse.status).toBe(200);

        const { token: userToken, discordId: userDiscordId } = await api.createUser(
            { headers: {} },
            resultTest,
        );
        const [userHash] = Array.from(api.hashUsers)[0];
        expect(userDiscordId).toBe(reqResult.discordId);
        expect(await api.hashPassword(userToken)).toBe(userHash);
        expect(api.hashUsers.size).toBe(1);
    });

    it('should add another user when authenticated again', async () => {
        api.getDiscordAccessTokenFromCode = () => null;
        api.getDiscordIdFromDiscordToken = () => '10987654321';
        const authResponse2 = await fetch(`http://127.0.0.1:${configs.api.port}/auth`);
        expect(authResponse2.status).toBe(200);
        expect(api.hashUsers.size).toBe(2);

        const { token: userToken2, discordId: userDiscordId2 } = await authResponse2.json();

        for (let user of [{ token: userToken2, discordId: userDiscordId2 }]) {
            for (let path of paths) {
                for (let method of methods) {
                    const response = await fetch(`http://127.0.0.1:${configs.api.port}${path}`, {
                        method,
                        headers: { authorization: `Bearer ${user.token}` },
                    });
                    const json = await response.json();
                    expect(json).toEqual({ path, method, user: user.discordId, message: `${method} => ${path}` });
                }
            }
        }
    });
});

describe('API: Config Users Tests', () => {

    it('should add and verify configured users', async () => {
        const users = [
            { discordId: 'discordId1', token: 'token1' },
            { discordId: 'discordId2', token: 'token2' },
            { discordId: 'discordId3', token: 'token3' },
        ];

        const initialUserCount = api.hashUsers.size;
        await api.addConfigUsers(users);
        expect(api.hashUsers.size).toBe(initialUserCount + 3);

        const response = await fetch(`http://127.0.0.1:${configs.api.port}${paths[1]}`, {
            method: 'get',
            headers: { authorization: `Bearer ${users[0].token}` },
        });
        const json = await response.json();
        expect(json.user).toEqual(users[0].discordId);
    });
});
