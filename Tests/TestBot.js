const BotManager = require("../Class/BotManager.js");
const { StrapiObject } = require("suissard-strapi-client");
// const DATAS = require("../Class/DataBase");
const testBotConfigs = require("./testBotConfigs.json");


const botsData = new Map();

for (let config of testBotConfigs.botsData) {
	let object = new StrapiObject(config.id, "botdatas", config);
	botsData.set(config.id, object);
}

const BOTS = new BotManager();
BOTS.start(botsData);

module.exports = BOTS;
