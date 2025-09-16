// #############################################################
// ##    Fonctions pour communiquer avec le bot via un api    ##
// #############################################################
const BotManager = require('../Class/BotManager.js');
const { routes, createAllRoutes } = require('./routes');
const { transformApiArgsToDiscordObjects } = require('./discord-object-transformer.js');

var express = require('express');
var bodyParser = require('body-parser');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const Route = require('./Route.js');
const fetch = require('node-fetch');
const cors = require('cors');

module.exports = class SelfApi {
	/**
	 * Class permettant de gerer l'API du bot
	 * @param {Object} configs
	 * @param {Object} discord
	 * @param {BotManager} BOTS Instance de gestionnaire de bot
	 * @param {Number} saltRounds
	 */
	constructor(configs, discord, BOTS, saltRounds = 12) {
		this.token = configs.token;
		this.hostname = configs.hostname || 'localhost';
		this.port = configs.port || 3000;
		this.discord = discord;
		this.BOTS = BOTS;

		this.salt = bcrypt.genSaltSync(saltRounds);

		this.routes = new Map();
		this.hashUsers = new Map();

		this.router = express.Router();
		this.app = express();
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		this.app.use(cors());
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept, Authorization'
			);
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			next();
		});

		this.startRouter();
	}

	/**
	 * Récupère l'instance du bot à partir de la requête.
	 * @param {import('express').Request} req - L'objet de la requête Express.
	 * @returns {import('../Class/Bot.js')} L'instance du bot.
	 */
	getBot(req) {
		const botId = this.getBotIdFromRequest(req);
		if (!botId) throw new Error('Bot non trouvé');
		const bot = this.BOTS.get(botId);
		if (!bot) throw new Error('Bot non trouvé');
		return bot;
	}

	/**
	 * Convertit le corps de la requête API en objets Discord.
	 * @param {import('express').Request} req - L'objet de la requête Express.
	 * @param {import('../Class/Command.js')} command - La commande à exécuter.
	 * @returns {Promise<object>} Les arguments transposés.
	 */
	async convertApiBadyToDiscordObject(req, command) {
		const bot = this.getBot(req);
		const args = req.body.args;
		return await transformApiArgsToDiscordObjects(args, command, bot);
	}

	/**
	 * Ajoute plusieurs utilisateurs à partir d'un tableau de configuration.
	 * @param {Array<{token: string, discordId: string}>} users - Un tableau d'objets utilisateur.
	 */
	async addConfigUsers(users) {
		for (const user of users) {
			await this.addUser(user.token, user.discordId);
		}
	}

	/**
	 * Ajoute un utilisateur et son token d'API au cache d'authentification.
	 * Le token est hashé avant d'être stocké.
	 * @param {string} token - Le token d'API brut de l'utilisateur.
	 * @param {string} discordId - L'ID Discord de l'utilisateur.
	 */
	async addUser(token, discordId) {
		const oldHash = Array.from(this.hashUsers).find(([hash, id]) => id == discordId);
		if (oldHash) this.hashUsers.delete(oldHash[0]);

		const hash = await bcrypt.hash(token, this.salt); //hash the token
		this.hashUsers.set(hash, discordId); // Ajouter le hash et le discordId a ala table de correspondance
	}

	/**
	 * Extrait le token Bearer d'une requête et retourne son hash.
	 * @param {import('express').Request} req - L'objet de la requête Express.
	 * @returns {Promise<string|false>} Le hash du token, ou `false` si aucun token n'est trouvé.
	 */
	async getHashFromTokenRequest(req) {
		const token = req.headers?.authorization?.replace('Bearer ', '');
		if (!token) return false;

		const hash = await bcrypt.hash(token, this.salt);
		return hash;
	}

	/**
	 * Extrait le code d'autorisation Discord des paramètres de la requête.
	 * @param {import('express').Request} req - L'objet de la requête Express.
	 * @returns {string} Le code d'autorisation.
	 */
	getDiscordCodeFromRequest(req) {
		return req.query?.code;
	}

	getCommandIdFromRequest(req) {
		return req.query.command_id;
	}

	/**
	 * Génère un token d'API unique en utilisant UUID v4.
	 * @returns {string} Le token généré.
	 */
	generateToken() {
		return uuidv4() + uuidv4();
	}

	/**
	 * Échange un code d'autorisation Discord contre un jeton d'accès.
	 * @param {string} code - Le code d'autorisation obtenu via OAuth2.
	 * @returns {Promise<string>} Le jeton d'accès de l'utilisateur.
	 */
	async getDiscordAccessTokenFromCode(code) {
		const body = new URLSearchParams();
		body.append('client_id', this.discord.clientId);
		body.append('client_secret', this.discord.clientSecret);
		body.append('grant_type', 'authorization_code');
		body.append('code', code);
		body.append('redirect_uri', this.discord.redirectUrl);
		body.append('scope', this.discord.scope);

		let response = await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			body,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		});

		response = await response.json();
		return response.access_token;
	}

	/**
	 * Récupère l'ID Discord d'un utilisateur en utilisant son jeton d'accès.
	 * @param {string} token - Le jeton d'accès OAuth2 de l'utilisateur.
	 * @returns {Promise<string>} L'ID Discord de l'utilisateur.
	 */
	async getDiscordIdFromDiscordToken(token) {
		const response = await fetch('https://discord.com/api/users/@me', {
			headers: { Authorization: 'Bearer ' + token },
		});
		const discordUser = await response.json();
		return discordUser.id;
	}

	/**
	 * TODO Creer un utilisateru dans le cache
	 * @param {*} req
	 * @param {*} res
	 * @returns
	 */
	async createUser(req, res) {
		//Verifier que l'utilisateur n'est pas existant
		const requestHash = await this.getHashFromTokenRequest(req);
		if (requestHash) throw new Error('Votre requete contient déjà un token');

		//Recuperer discord ID
		const dicordCode = this.getDiscordCodeFromRequest(req);
		const accessToken = await this.getDiscordAccessTokenFromCode(dicordCode);
		const discordId = await this.getDiscordIdFromDiscordToken(accessToken);

		//Verifier que l'id discord n'est pas existant

		const token = this.generateToken(); //Creer un token
		await this.addUser(token, discordId); //Ajouter l'utilisateur dans le cache

		res.json({ token, discordId }); //Renvoyer données utilisateurs
		return { token, discordId };
	}

	/**
	 * Gère l'authentification d'une requête API.
	 * @todo La logique de cette fonction est commentée et doit être réimplémentée.
	 * @param {import('express').Request} req - L'objet de la requête Express.
	 * @param {import('express').Response} res - L'objet de la réponse Express.
	 * @returns {Promise<{bot: Bot, user: import('discord.js').User}>} L'instance du bot et de l'utilisateur.
	 */
	async authentication(req, res) {
		const requestHash = await this.getHashFromTokenRequest(req);
		const userId = this.hashUsers.get(requestHash);

		if (req.url.includes('/discord/authurl')) return {};
		if (req.url.includes('/auth')) return {};

		const botId = this.getBotIdFromRequest(req);
		if (!botId) return {}; // Ne rien faire si le bot n'est pas spécifié
		const bot = this.BOTS.get(botId);
		if (!bot) throw new Error('Bot non trouvé');

		if (!userId) {
			if (req.url.includes('/commands')) return { bot };
			else throw new Error('Utilisateur non authentifié');
		}

		const user = bot.users.cache.get(userId) || (await bot.users.fetch(userId));
		if (!user) throw new Error('Utilisateur non trouvé');

		return { bot, user };
	}

	/**
	 * Extrait l'ID du bot des paramètres de la requête.
	 * @param {import('express').Request} req - L'objet de la requête Express.
	 * @returns {string} L'ID du bot.
	 */
	getBotIdFromRequest(req) {
		return req.query.bot_id;
	}

	/**
	 * Hashe une chaîne de caractères en utilisant le sel de l'instance.
	 * @param {string} password - La chaîne à hasher.
	 * @returns {Promise<string>} Le hash résultant.
	 */
	hashPassword(password) {
		return bcrypt.hash(password, this.salt);
	}

	/**
	 * Construit et retourne l'URL d'autorisation OAuth2 de Discord.
	 * @returns {string} L'URL d'autorisation.
	 */
	getDiscordAuthUrl() {
		return encodeURI(
			`https://discord.com/api/oauth2/authorize?client_id=${
				this.discord.clientId
			}&redirect_uri=${
				this.discord.redirectUrl
			}&response_type=code&scope=${this.discord.scope.join(' ')}`
		);
	}

	/**
	 * Remonte une donnée depuis un objet, en se basant sur une url
	 * @param {Object} object
	 * @param {String} url
	 * @param {String} delStr
	 */
	getDataFromUrl(object, url) {
		url = url.split('/');
		for (let i in url) {
			//MAP or not
			if (object.get && !object.createFromFiles) {
				for (let [val, index] of object) {
					if (val.toLowerCase() == url[i]) {
						console.log(val);
						object = object.get(val);
						break;
					}
				}
			} else object = object[url[i]];
		}
		return object;
	}

	/**
	 * Renvoie la documentation des route dipsonible de l'api
	 * @returns
	 */
	construcDoc() {
		let doc = [];
		for (let [id, route] of this.routes) {
			doc.push(`"${route.path}" - ${route.method.toUpperCase()}`);
		}
		return doc.join('\n');
	}

	/**
	 * Définit la route racine qui retourne la documentation
	 * @returns {Route}
	 */
	setHomeRoute() {
		// Route d'accueil qui retourne la documentation
		return new Route(this, '/', 'get', (req, res) =>
			res.send("Bienvenue sur l'API Multibot\n" + this.construcDoc())
		);
	}

	/**
	 * Définit la route `/auth` pour la création d'utilisateur via le flux OAuth2.
	 */
	setAuthRoute() {
		new Route(this, '/auth', 'get', (req, res) => {
			res.status(404).send({ message: 'Authentication is handled by the client.' });
		});
	}

	/**
	 * Paramétrer plusieur routes dans l'api
	 * @param {Array} routes
	 */
	setRoutes(routes) {
		for (let { path, method, handler } of routes) this.setRoute(path, method, handler);
	}

	/**
	 * Enregistre une nouvelle route dans le routeur Express.
	 * Ajoute un wrapper pour gérer l'authentification et les erreurs de manière centralisée.
	 * @param {string} path - Le chemin de la route (ex: '/commands').
	 * @param {'get'|'post'|'put'|'delete'} method - La méthode HTTP.
	 * @param {function} handler - La fonction de gestion de la route.
	 */
	setRoute(path, method, handler) {
		this.routes.set(`${method}--${path}`, { path, method, handler });
		try {
			this.router.route(path)[method](async (req, res) => {
				try {
					let { user, bot } = (await this.authentication(req, res)) || {};
					return handler(req, res, bot, user, this);
				} catch (e) {
					console.error(`BUG API ${e.message}\n${e.stack}`);
					res.status(e.status || 500);
					res.send({ message: e.message });
				}
			});
		} catch (e) {
			console.error(`BUG API Instanciation ${path}${method} \n${e.message}\n${e.stack}`);
		} 
	}

	/*
	 * Démarrage du routeur
	 */
	startRouter() {
		this.app.use(this.router);
		this.app.listen(this.port, this.hostname, () => {
			console.log('📡 API démarrée à : http://' + this.hostname + ':' + this.port);
		});
		this.setHomeRoute();
		this.setAuthRoute();
	}

	/**
	 * Initialise toutes les routes définies dans le répertoire `routes`.
	 * @param {object} routesArg - Arguments supplémentaires à passer au créateur de routes.
	 */
	listenAllRoutes(routesArg) {
		createAllRoutes(this, routesArg);
	}
};
