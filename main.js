const mode = process.env.BOT_MODE || 'DEV'; // "PROD", "PREPROD" OU "DEV"

console.log(`🤖 Démarrage des bots en mode ${mode}...`);

const BOTS = require('./Class/BOTS.js');
const DATAS = require('./Class/DataBase'); // CONNEXION A LA BASE DE DONNEE

async function start() {
	let botsData;
	await DATAS.getAllData();
	const configsApi = require('./configsApi.json');

	if (mode == 'PROD') {
		botsData = DATAS.collections.botsdatas.cache;
	} else if (mode == 'DEV') {
		const configs = require('./configs.json');
		// Possibilité de configs en local pour dev
		if (configs.botsData) {
			const { StrapiObject } = require('suissard-strapi-client');

			botsData = new Map();

			for (let config of configs.botsData) {
				let object = new StrapiObject(config.id, 'botdatas', config);
				botsData.set(config.id, object);
			}
		} else {
			throw new Error('No botsData in configs.json');
		}
	}

	//INSTANCIATION DES BOTS

	BOTS.start(botsData);
	BOTS.startApi(configsApi, configsApi.discord, configsApi.saltRounds);
	BOTS.API.listenAllRoutes();
}

start();

/**
 * BOTDATA
 * Array des differntes données des bots
	[
		{
			"id": "ID",
			"token": "TOKEN DE BOT DISCORD"
			"name": "NAME",
			"activity": "ACTIVITY",
			"ownerId": "ID DISCORD DU PROPRIETAIRE",
			"home": "ID DISCORD DE LA GUILDE PRINCIPAL",
			"prefix": "PREFIX",
			"admin": ["ID DISCORD D'UTILISATEURs ADMINISTRATEURS"],
			"modules":{moduleName:{configModule1:"value1",configModule2:"value2",configModule3:"value3"}}
			"unauthorizedEvents": ["ID DES EVENEMENTS NON AUTORISES SUR CE BOT"],
			"unauthorizedCommands": ["ID DES COMMANDES NON AUTORISES SUR CE BOT"],
			"commandInDev":[] //Exclusif au donnée fournit par un JSON, pour savoir quel commandes instancier auprès de discord

		}
	]
*/
