import { describe, expect, test } from 'vitest';
import Discord from 'discord.js';
import SelfApi from '../SelfApi/Api.js';

const fetch = require('node-fetch');
const { StrapiObject } = require('suissard-strapi-client');

const { createAllRoutes } = require('../SelfApi/routes/index.js');
const objectHaveEntries = require('./objectHaveEntries.js');

// const configs = {
// 	api: {
// 		token: "ceciestuntokentemporaire",
// 		hostname: "localhost",
// 		port: 3000,
// 	},
// 	discord: {
// 		clientId: "716968666821820497",
// 		clientPublicKey: "e74d333048e11ff0b0171dfd7d7d37e5b1fed8870fa6918a16663616b8ac7320",
// 		clientSecret: "XoIZXo85XArNsHKVKvSFdpX2nyR8W4kD",
// 		scope: ["identify", "guilds", "guilds.join"],
// 		redirectUrl: "http://localhost:8080",
// 	},
// };

// instancier un bot de test
const configs = require("./testBotConfigs.json");
const botsDatas = new Map();
const botId = configs.botsData[0].id;

botsDatas.set(
    botId,
    new StrapiObject(botId, 'botdatas', {
        ...configs.botsData[0],
        modules: { ...configs.botsData[0].modules, AutoRole: undefined },
    }),
);
const bots = require('../Class/BOTS.js');
bots.start(botsDatas);
// const boting = new Bot(object);
// const BOTS = { get: () => boting };

const discordId = '683789687504371719';
const discordUserId = '306395745693597697';
const api = new SelfApi(configs.api, configs.discord, bots);
createAllRoutes(api);

let reqResult, token, bot, user;

const resultTest = { json: (data) => (reqResult = data) };
token = api.generateToken();
const requestTest = {
    headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    query: { code: 'discordCode', bot_id: botId },
};

describe('SELFAPI : Test des routes de l\'api', () => {
    test('Recuperer utilisateur discord et bot', async () => {
        await api.addUser(token, discordId);

        const apiAuth = await api.authentication(requestTest, resultTest);
        bot = apiAuth.bot;
        user = apiAuth.user;

        // console.log("bot, user", bot, user);
        expect(bot.id).toBe(botId);
        expect(user).toBeInstanceOf(Discord.User);
        expect(user.id).toBe(discordId);
    });

    test('test de route get-command', async () => {
        let request = await fetch(
            `http://${configs.api.hostname}:${configs.api.port}/commands?bot_id=${botId}`,
            { ...requestTest, method: 'GET' },
        );
        const cmdPattern = {
            id: 'string',
            description: 'string',
            userPermissions: 'object',
            home: 'boolean',
            botPermissions: 'object',
            devBoss: 'boolean',
            help: 'boolean',
            botPermissions: 'object',
        };
        const json = await request.json();
        expect(json).toBeInstanceOf(Array);
        expect(json.length).toBe(bots.Commands.__commands.size);
        expect(objectHaveEntries(json[0], cmdPattern)).toBeTruthy();

        const request2 = await fetch(
            `http://${configs.api.hostname}:${configs.api.port}/commands/ping?bot_id=${botId}`,
            { ...requestTest, method: 'GET' },
        );
        const json2 = await request2.json();
        expect(objectHaveEntries(json2, cmdPattern)).toBeTruthy();
    }, 20000);
});

describe('SELFAPI : Test des routes de l\'api', () => {
    test('Recuperer utilisateur discord et bot', async () => {
        await api.addUser(token, discordId);

        const apiAuth = await api.authentication(requestTest, resultTest);
        bot = apiAuth.bot;
        user = apiAuth.user;

        // console.log("bot, user", bot, user);
        expect(bot.id).toBe(botId);
        expect(user).toBeInstanceOf(Discord.User);
        expect(user.id).toBe(discordId);
    });

    test('test de route post-command', async () => {
        let request = await fetch(
            `http://${configs.api.hostname}:${configs.api.port}/commands/test?bot_id=${botId}`,
            { ...requestTest, method: 'post' },
        );
        const json = await request.json();
        expect(json.result).toMatch(/test OK/);

        //TEST d'une commande avec des arguments
        let body = {
            args: {
                user: discordUserId,
                string: 'string',
                texte: 'prout',

            },
        };

        let request2 = await fetch(
            `http://${configs.api.hostname}:${configs.api.port}/commands/test?bot_id=${botId}`,
            { ...requestTest, method: 'post', body: JSON.stringify(body) },
        );
        const json2 = await request2.json();
        expect(json2.result).toMatch(/test OK/);

        let request3 = await fetch(
            `http://${configs.api.hostname}:${configs.api.port}/commands/message?bot_id=${botId}`,
            { ...requestTest, method: 'post', body: JSON.stringify(body) },
        );
        const json3 = await request3.json();
        expect(json3.result).toBe(`les messages ont été envoyé`);

    }, 20000);
});
