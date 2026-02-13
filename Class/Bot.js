const Discord = require('discord.js'); // utilisation de l'API Discord
const { botPermissions } = require('./Command');
const { GatewayIntentBits, Partials } = require('discord.js');

const { StrapiObject } = require('suissard-strapi-client');

module.exports = class Bot extends Discord.Client {
	/**
	 * Initialise un nouveau bot avec les données spécifiées.
	 * Gère les options de connexion, les intentions d'accès, et divers paramètres de configuration du bot.
	 * @param {StrapiObject} data - Objet contenant les informations nécessaires pour configurer le bot.
	 * @param {Function} data.getID - Fonction pour obtenir un identifiant unique pour le bot.
	 * @param {string} data.name - Nom du bot, obligatoire.
	 * @param {string} data.ownerId - ID de l'utilisateur propriétaire du bot, obligatoire.
	 * @param {string} data.home - Identifiant du serveur Discord considéré comme la "maison" du bot, obligatoire.
	 * @param {boolean} data.devMode - Indicateur du mode développement, obligatoire.
	 * @param {string} [data.prefix="!!"] - Préfixe des commandes du bot, par défaut "!!".
	 * @param {Array<string>} [data.admin=[]] - Liste des IDs d'administrateurs autorisés, ajoute automatiquement le propriétaire.
	 * @param {string} [data.activity=""] - Activité par défaut du bot affichée aux utilisateurs.
	 * @param {Object} [data.modules={}] - Modules supplémentaires du bot.
	 * @param {Array<string>} [data.unauthorizedEvents=[]] - Liste d'événements non autorisés par le bot.
	 * @param {Array<string>} [data.unauthorizedCommands=[]] - Liste de commandes non autorisées par le bot.
	 * @param {Array<string>} [data.commandInDev=[]] - Liste des commandes en cours de développement.
	 * @param {string} data.token - Jeton d'authentification du bot pour se connecter à l'API Discord.
	 * @param {BotManager} BOTS - gestionnaire de bots.
	 */
	constructor(data, BOTS) {
		super({
			autoReconnect: true,
			// fetchAllMembers:true,//met 2min pour se lancer mais limit certian bug par manque de données
			intents: [
				GatewayIntentBits.Guilds, // "GUILDS",
				GatewayIntentBits.GuildMembers, //"GUILD_MEMBERS",
				GatewayIntentBits.GuildBans, //"GUILD_BANS",
				GatewayIntentBits.GuildVoiceStates, //"GUILD_VOICE_STATES",

				// "GUILD_EMOJIS_AND_STICKERS",
				// "GUILD_INTEGRATIONS",
				// "GUILD_WEBHOOKS",
				// "GUILD_INVITES",
				// "GUILD_VOICE_STATES",
				// "GUILD_PRESENCES",

				GatewayIntentBits.MessageContent, //"GUILD_MESSAGES",
				GatewayIntentBits.GuildMessages, //"GUILD_MESSAGES",
				GatewayIntentBits.GuildMessageReactions, //"GUILD_MESSAGE_REACTIONS",
				// "GUILD_MESSAGE_TYPING",
				GatewayIntentBits.DirectMessages, //"DIRECT_MESSAGES",

				// "DIRECT_MESSAGE_REACTIONS",
				// "DIRECT_MESSAGE_TYPING"
			],
			partials: [Partials.Channel, Partials.Reaction], //["MESSAGE", "CHANNEL", "REACTION"],
		});

		if (!BOTS) throw "❌ 'BOTS' doit etre definit";

		/**
		 * @type {BotManager} BOTS - gestionnaire de bots.
		 */
		this.BOTS = BOTS;

		/**
		 * Identifiant unique du bot
		 * @type {string}
		 */
		this.id = data.getID();

		/**
		 * Nom usuel du bot
		 * @type {string}
		 */
		this.name;
		if (data.name) this.name = data.name;
		else throw new Error(`Un name doit être déclaré`);

		/**
		 * ID du propriétaire du bot
		 * @type {string}
		 */
		this.ownerId;
		if (data.ownerId) this.ownerId = data.ownerId;
		else throw new Error(`Un ownerId doit être déclaré`);

		/**
		 * Serveur principal ("maison") du bot
		 * @type {string}
		 */
		this.home;
		if (data.home) this.home = data.home;
		else throw new Error(`Une home doit être déclarée`);

		/**
		 * Indicateur du mode développement
		 * @type {boolean}
		 * @throws {Error} Si devMode n'est pas spécifié
		 */
		this.devMode;
		// ! JAMAIS UTILISE NULL PART
		if (data.devMode === true || data.devMode === false) this.devMode = data.devMode;
		else throw new Error(`devMode doit être déclaré`);

		/**
		 * Préfixe des commandes, par défaut "!!"
		 * @type {string}
		 */
		data.prefix ? (this.prefix = data.prefix) : (this.prefix = '!!');

		/**
		 * Liste des administrateurs du bot, inclut le propriétaire
		 * @type {Array<string>}
		 */
		data.admin ? (this.admin = data.admin) : (this.admin = []);
		if (!this.admin.includes(this.ownerId)) this.admin.push(this.ownerId);

		/**
		 * Activité affichée du bot, vide par défaut
		 * @type {string}
		 */
		data.activity ? (this.activity = data.activity) : (this.activity = '');

		/**
		 * Modules additionnels du bot
		 * @type {Object}
		 */
		this.modules = data.modules ? data.modules : {};

		/**
		 * Liste d'événements non autorisés
		 * @type {Array<string>}
		 */
		data.unauthorizedEvents
			? (this.unauthorizedEvents = data.unauthorizedEvents)
			: (this.unauthorizedEvents = []);

		/**
		 * Liste des commandes non autorisées
		 * @type {Array<string>}
		 */
		data.unauthorizedCommands
			? (this.unauthorizedCommands = data.unauthorizedCommands)
			: (this.unauthorizedCommands = []);

		/**
		 * Couleur de log du bot
		 * @type {string}
		 */
		this.color = data.color;

		/**
		 * Connexion du bot à l'API Discord avec le token fourni
		 */
		this.login(data.token).catch((e) =>
			console.error(`[${this.name}] Start failed for` + this.name, e)
		);
		// console.log(`🤖 Bot "${this.name}" (${this.id}) crée`);
	}
	/**
	 * Redémarrrer le bot
	 */
	restart() {
		this.BOTS.restart(this.id);
	}

	/**
	 * Vérifie l'accès à des éléments Discord (serveur, salon, message) et les retourne si trouvés.
	 * Au moins un `guildId` ou `channelId` doit être fourni.
	 * @param {string} [guildId] - L'ID du serveur Discord à vérifier.
	 * @param {string} [channelId] - L'ID du salon Discord à vérifier.
	 * @param {string} [messageId] - L'ID du message Discord à vérifier.
	 * @returns {Promise<false|{guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}>} Un objet contenant les éléments trouvés, ou `false` si un élément requis n'est pas accessible.
	 * @throws {Error} Si ni `guildId` ni `channelId` ne sont fournis.
	 */
	async checkAccess(guildId, channelId, messageId) {
		if (!guildId && !channelId)
			throw new Error(`Il faut au moins indiquer un guildId ou un channelId`);
		let guild, channel, message;

		guild = this.guilds.cache.get(guildId);
		if (!guild && !channelId) return false;
		else if (!channelId) return { guild };

		channel = this.channels.cache.get(channelId);
		if (!channel) return false;
		else if (!messageId) return { guild: channel.guild, channel };

		message = await channel.messages.fetch(messageId).catch((_) => null);
		if (!message) return false;
		else return { guild: channel.guild, channel, message };
	}

	/**
	 * Génère une couleur ANSI basée sur le nom du bot
	 * @param {string} name
	 * @returns {string} Code couleur ANSI
	 */
	formatLog(content, reference, isError = false) {
		if (content instanceof Error || isError) content = '❌ ' + content;
		const colorCode = this.color || '37'; // Default to white if undefined
		const color = `\x1b[${colorCode}m`;
		const reset = '\x1b[0m';
		const now = new Date();
		const time = now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR');
		return `[${time}] ${color}[${this.name}]${reset} ${reference ? reference.toUpperCase() + ' ' : ''
			}| ${content}`;
	}

	/**
	 * Diffuse un log
	 * @param {String} content
	 * @param {String} reference
	 */
	/**
	 * Diffuse un log
	 * @param {string} content
	 * @param {string} reference
	 */
	log(content, reference) {
		console.log(this.formatLog(content, reference));
	}

	/**
	 * Diffuse une erreur
	 * @param {String || Error} content
	 * @param {String} reference
	 */
	error(content, reference) {
		console.error(this.formatLog(content, reference, true));
	}
};
