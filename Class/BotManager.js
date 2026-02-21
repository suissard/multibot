const fs = require('fs');
const events = require('events');

const Bot = require('./Bot.js');
const CommandManager = require('./CommandManager');
const Command = require('./Command.js');
const EventManager = require('./EventManager');
const Event = require('./Event.js');
const EmoteMessageManager = require('./EmoteMessageManager');

// const SelfApi = require('../SelfApi/Api.js');

//const EmoteMessage = require("./EmoteMessage.js");

/**
 * Configure les gestionnaires de commandes, événements, et messages d'émote.
 */
module.exports = class BotManager extends Map {
	constructor() {
		super();
		/**
		 * Émetteur d'événements pour gérer les événements globaux du BotManager.
		 * @type {EventEmitter}
		 */
		this.event = new events.EventEmitter();

		/**
		 * Gestionnaire de commandes pour l'ensemble des bots, gère les commandes et leur exécution.
		 * @type {CommandManager}
		 */
		this.Commands = new CommandManager();

		/**
		 * Gestionnaire d'événements, initialisé avec une référence au BotManager.
		 * Configure les événements pour chaque bot.
		 * @type {EventManager}
		 */
		this.Events = new EventManager(this);

		/**
		 * Gestionnaire des messages d'émotes, permettant de configurer les réponses d'émote pour chaque bot.
		 * Initialisé avec une référence au BotManager.
		 * @type {EmoteMessageManager}
		 */
		this.EmoteMessages = new EmoteMessageManager(this);
	}

	/**
	 * Initialise et démarre tous les bots.
	 * Cette fonction crée toutes les instances de bot, configure les commandes et les événements,
	 * puis charge les modules associés à chaque bot.
	 * @param {Map<string, object>} botsData - Une map contenant les données de configuration de chaque bot.
	 */
	async start(botsData) {
		this.createAllBot(botsData);

		this.Commands.setAllCommands(this);
		this.Events.setAllEvents();

		this.event.on('botsReady', () => {
			this.EmoteMessages.setAllEmoteMessages();
		});

		this.Events.createAllListenerForAllBot();
		this.loadModules();
	}
	/**
	 * Détermine le bot "maître" pour une ressource Discord donnée, en priorité celui dont le "home" correspond au serveur.
	 * @param {string} [guildId] - L'ID du serveur.
	 * @param {string} [channelId] - L'ID du salon.
	 * @param {string} [messageId] - L'ID du message.
	 * @returns {Promise<{bot: Bot, guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}|undefined>} L'objet de données d'accès du bot maître, ou undefined si aucun bot n'a accès.
	 */
	async getMasterBot(guildId, channelId, messageId) {
		let dataFromBot = await this.checkBotsAccess(guildId, channelId, messageId);

		// Priorité au bot home
		let data =
			dataFromBot.find(
				(d) =>
					d.channel.client?.home ==
					(d.message?.guild.id || d.channel?.guild.id || d.guild?.id)
			) || dataFromBot[0];

		return data;
	}

	/**
	 * Charge les modules pour tout les bots
	 * @returns
	 */
	loadModules() {
		for (let [id, bot] of this) {
			// TEST =================================================================================================
			// if (bot.name !== 'OlympeBot') continue;
			// TEST =================================================================================================

			for (let moduleName in bot.modules) {
				if (!bot.modules[moduleName]) continue;
				this.loadModule(bot, moduleName);
			}
		}
	}

	/**
	 * Charge un module pour un bot définit
	 * @param {Bot} bot
	 * @param {Object || Boolean} module
	 */
	loadModule(bot, moduleName) {
		const moduleConfig = bot.modules[moduleName];
		const validatorPath = `../Modules/${moduleName}/validatorClass.js`;

		try {
			const ValidatorClass = require(validatorPath);
			const validator = new ValidatorClass(moduleConfig);
			validator.validate();

			if (!validator.isValid()) {
				const { missing, invalid } = validator.getErrors();
				let finalMessage = '';

				if (missing.length > 0) {
					finalMessage += `Missing properties: ${missing.join(', ')}`;
				}

				if (invalid.length > 0) {
					if (finalMessage) finalMessage += ' | ';
					finalMessage += invalid.join(' | ');
				}

				bot.error(`Configuration de modules eronnée : ${finalMessage}`, moduleName);
				return; // Stop loading this module
			}
		} catch (e) {
			if (e.code !== 'MODULE_NOT_FOUND') {
				bot.error(`Error during module validation ${moduleName}: ` + e.stack, moduleName);
				return;
			}
			// Validator not found, continue without validation
		}

		let botModule;

		try {
			botModule = require(`../Modules/${moduleName}`);
			let commandAndEvent = botModule(bot); // TODO ne gere pas si la commande est asynchrone

			// DEPENDENCY CHECK
			if (commandAndEvent.dependencies && Array.isArray(commandAndEvent.dependencies)) {
				const missingDeps = commandAndEvent.dependencies.filter(dep => !bot.modules[dep]);
				if (missingDeps.length > 0) {
					throw new Error(`Module ${moduleName} requires missing dependencies: ${missingDeps.join(', ')}`);
				}
			}

			// console.log(`🤖 [${bot.name}] module ${moduleName} chargé`);
			for (let ii in commandAndEvent) {
				if (ii === 'dependencies') continue; // Skip dependency property
				commandAndEvent[ii].category = moduleName;
				this.use(commandAndEvent[ii], bot); //TODO ! Dasn le cas ou plusieurs bot on els meme module cela déclenche un erreur quand il essaie d'intégerer event et command
			}
		} catch (e) {
			bot.error(`Le module est inutilisable : ` + e.stack, moduleName);
		}
	}

	/**
	 * Crée et enregistre une nouvelle instance de bot.
	 * @param {object} data - Données de configuration pour le bot.
	 * @param {BotManager} BOTS - L'instance du gestionnaire de bots.
	 * @returns {Bot} L'instance du bot créé.
	 */
	createBot(data, BOTS) {
		let bot = new Bot(data, BOTS);
		this.set(data.getID(), bot);
		return bot;
	}

	/**
	 * Crée toutes les instances de bot à partir de leurs données de configuration.
	 * Seuls les bots marqués comme "actifs" sont créés.
	 * @param {Map<string, object>} botsData - Une map contenant les données de configuration de chaque bot.
	 */
	createAllBot(botsData) {
		const colors = [
			'32', // Green
			'33', // Yellow
			'34', // Blue
			'35', // Magenta
			'36', // Cyan
			'92', // Bright Green
			'93', // Bright Yellow
			'94', // Bright Blue
			'95', // Bright Magenta
			'96', // Bright Cyan
			'38;5;208', // Orange
			'38;5;141', // Lilac/Purple
			'38;5;80', // Turquoise
			'38;5;220', // Gold
			'38;5;154', // Lime
		];
		let colorIndex = 0;

		for (let [id, botData] of botsData) {
			try {
				if (botData.active) {
					botData.color = colors[colorIndex % colors.length];
					this.createBot(botData, this);
					colorIndex++;
				}
			} catch (e) {
				this.error(
					`Les données fournit n'ont pas permis de creer un bot` +
					JSON.stringify(botData) +
					e.stack,
					'createAllBot'
				);
			}
		}
	}

	/**
	 * Arrete le bot indiqué par l'identifiant
	 * @param {String} id Identifiant de bot
	 */
	stop(id) {
		let data = this.get(id).data;
		this.get(id).destroy();
		this.delete(id);
		this.log(`✅ Bot ${data.name} est stopé`, 'stop');
	}

	/**
	 * Redemarre le bot indiqué par l'identifiant
	 * @param {String} id Identifiant de bot
	 */
	restart(id) {
		let data = this.get(id).data;
		this.stop(id);
		this.createBot(data, this);
		this.log(`✅ Bot ${data.name} est rafraichit`, 'restart');
	}

	/**
	 * Permettre l'usage a l'intégralité des bots, d'un evenement ou d'une commande
	 * @param {Command || Event} data une class heritant des commands ou des events
	 * @param {Bot} bot instance de bot auquel rattaché l'evenement (si undefined, tout les bots )
	 */
	use(data, bot) {
		try {
			if (data.prototype instanceof Command) return this.Commands.add(data.id, data);
			if (data.prototype instanceof Event) {
				if (!this.Events.get(data.id)) this.Events.add(data.id, data);
				if (bot) return this.Events.createListener(data, bot);
				this.Events.addListenerForAllBot(data);
			}
		} catch (e) {
			this.error(`Impossible d'utiliser ${data.id}:` + e.stack, 'BotManager.use');
		}
	}

	/**
	 * Vérifie quels bots ont accès à une ressource Discord spécifique.
	 * @param {string} [guildId] - L'ID du serveur.
	 * @param {string} [channelId] - L'ID du salon.
	 * @param {string} [messageId] - L'ID du message.
	 * @returns {Promise<Array<{bot: Bot, guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}>>} Un tableau d'objets contenant le bot et les ressources accessibles.
	 */
	async checkBotsAccess(guildId, channelId, messageId) {
		let dataFromBot = [];
		for (let [id, bot] of this) {
			let data = await bot.checkAccess(guildId, channelId, messageId);
			if (data) dataFromBot.push({ bot, ...data });
		}
		return dataFromBot;
	}

	/**
	 * Démarre l'API (serveur HTTP) pour interagir avec les bots.
	 * Instancie la classe SelfApi avec les configurations fournies.
	 * @param {Object} configs - Configuration globale de l'API (port, host, etc.).
	 * @param {Object} discord - Configuration Discord (clientId, clientSecret, etc.) pour l'OAuth2.
	 * @param {Number} saltRounds - Nombre de rounds pour le hachage des tokens (bcrypt).
	 */
	startApi(configs, discord, saltRounds = 10) {
		try {
			const SelfApi = require('../SelfApi/Api.js');
			this.API = new SelfApi(configs, discord, this, saltRounds);
			this.API.start();
		} catch (e) {
			this.error('Erreur API Bot : ' + e.stack, 'startApi');
		}
	}

	/**
	 * Met la référence et le contenu au bon format
	 * @param {String || Error} content
	 * @param {String} reference
	 * @param {Boolean} isError
	 * @returns
	 */
	static formatLog(content, reference, isError = false) {
		if (content instanceof Error || isError) content = '❌ ' + content;
		const color = '\x1b[31m'; // Red for error, Magenta for normal
		const reset = '\x1b[0m';
		return `${color}[BOTMANAGER]${reset} ${reference ? reference.toUpperCase() + ' ' : ''
			}| ${content}`;
	}

	/**
	 * Diffuse un log
	 * @param {String} content
	 * @param {String} reference
	 */
	static log(content, reference) {
		console.log(BotManager.formatLog(content, reference, false));
	}

	/**
	 * Diffuse une erreur
	 * @param {String || Error} content
	 * @param {String} reference
	 */
	static error(content, reference) {
		console.error(BotManager.formatLog(content, reference, true));
	}

	/**
	 * Met la référence et le contenu au bon format
	 * @param {String || Error} content
	 * @param {String} reference
	 * @param {Boolean} isError
	 * @returns
	 */
	formatLog(content, reference, isError = false) {
		return BotManager.formatLog(content, reference, isError);
	}

	/**
	 * Diffuse un log
	 * @param {String} content
	 * @param {String} reference
	 */
	log(content, reference) {
		BotManager.log(content, reference);
	}

	/**
	 * Diffuse une erreur
	 * @param {String || Error} content
	 * @param {String} reference
	 */
	error(content, reference) {
		BotManager.error(content, reference);
	}
};
