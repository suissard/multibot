import { test } from 'vitest';

const configs = require('../configs.json');
const { StrapiObject } = require('suissard-strapi-client');
const botsData = new Map();

for (let i in configs) {
    let object = new StrapiObject(configs[i].id, 'botdatas', configs[i]);
    botsData.set(configs[i].id, object);
}

// const BOTS = new BotManager(botsData);

test('Instanciation', () => {

    // expect(bot.id).toBe(config.id)
    // expect(bot.token).toBe(config.token)
    // expect(bot.name).toBe(config.name)
    // expect(bot.ownerId).toBe(config.ownerId)
    // expect(bot.home).toBe(config.home)
    // expect(bot.devMode).toBe(config.devMode)
    // expect(bot.prefix).toBe(config.prefix)
    // expect(bot.admin).toBe(config.admin)
    // expect(bot.activity).toBe(config.activity)
    // expect(bot.modules).toBe(config.modules)
    // expect(bot.unauthorizedEvents).toBe(config.unauthorizedEvents)
    // expect(bot.unauthorizedCommands).toBe(config.unauthorizedCommands)
    // expect(bot.commandInDev).toBe(config.commandInDev)
});
