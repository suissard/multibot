import { describe, expect, test } from 'vitest';

const { StrapiObject } = require('suissard-strapi-client');

const bots = require('../Class/BOTS.js');
const Bot = require('../Class/Bot');
const objectHaveEntries = require('./objectHaveEntries.js');

const configs = require('./testBotConfigs.json');
// Possibilité de configs en local pour dev
let botsData = {};

let bot = {};

describe('Test d\'exemple', () => {
    test('voici un des test', () => {
        let result = 4;
        expect(result).toBe(4);
    });
    test('En voici un autre', () => {
        let result = 4;
        expect(result).toBe(4);
    });
});

describe('BotCommandsApiRequest : instanciation du bot de test', () => {
    test('instanciation du bot de test', async () => {
        botsData = new Map();

        for (let config of configs.botsData) {
            let object = new StrapiObject(config.id, 'botdatas', config);
            botsData.set(config.id, object);
        }
        await bots.start(botsData);
        bot = bots.get(configs.botsData[0].id);
        expect(bot).toBeInstanceOf(Bot);
        expect(
            objectHaveEntries(bot, {
                id: 'string',
                token: 'string',
                name: 'string',
                activity: 'string',
                ownerId: 'string',
                home: 'string',
                prefix: 'string',
                admin: 'object',
                modules: {
                    Secretary: {
                        secretaryCategorieId: 'object',
                        secretaryRoleId: 'object',
                    },
                    AutoRole: {
                        everyXhours: 'number',
                        olympeAuth: {
                            value: 'string',
                            expiration: 'number',
                        },
                    },
                },
                unauthorizedCommands: 'object',
                unauthorizedEvents: 'object',
                commandInDev: 'object',
            }),
        ).toBeTruthy();

        const homeGuild = await bot.guilds.fetch(bot.home);
        expect(bot.guilds.cache.get(bot.home)).toBeDefined();
        const members = await homeGuild.members.fetch(bot.ownerId);
        expect(members).toBeDefined();
    });

    test('authentication', () => {
        expect(1).toBe(1);
    });
});
