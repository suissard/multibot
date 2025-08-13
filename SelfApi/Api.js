// #############################################################
// ##    Fonctions pour communiquer avec le bot via un api    ##
// #############################################################
const BotManager = require('../Class/BotManager.js');
const { routes, createAllRoutes } = require('./routes');

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
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
			res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			next();
		});

		this.startRouter();
	}

	async addConfigUsers(users) {
		for (const user of users) {
			await this.addUser(user.token, user.discordId);
		}
	}

	async addUser(token, discordId) {
		const oldHash = Array.from(this.hashUsers).find(([hash, id]) => id == discordId);
		if (oldHash) this.hashUsers.delete(oldHash[0]);

		const hash = await bcrypt.hash(token, this.salt); //hash the token
		this.hashUsers.set(hash, discordId); // Ajouter le hash et le discordId a ala table de correspondance
	}

	async getHashFromTokenRequest(req) {
		const token = req.headers?.authorization?.replace('Bearer ', '');
		if (!token) return false;

		const hash = await bcrypt.hash(token, this.salt);
		return hash;
	}

	getDiscordCodeFromRequest(req) {
		return req.query?.code;
	}

	getCommandIdFromRequest(req) {
		return req.query.command_id;
	}

	generateToken() {
		return uuidv4() + uuidv4();
	}

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
	 * Vérifie l'authentification et renvoie l'instance de bot et d'utilisateur correspondant
	 * @return { bot, user }
	 */
	async authentication(req, res) {
		//TODO donnée de test
		let userId;

		const requestHash = await this.getHashFromTokenRequest(req);
		if (!requestHash) userId = false;
		else userId = this.hashUsers.get(requestHash);
		// const botId = this.getBotIdFromRequest(req);
		// const bot = this.BOTS.get(botId);
		// if (!bot) throw new Error('Bot non trouvé');
		// if (!userId) return { bot };

		// const user = bot.users.cache.get(userId) || (await bot.users.fetch(userId));
		// return { bot, user };
	}

	getBotIdFromRequest(req) {
		return req.query.bot_id;
	}

	hashPassword(password) {
		return bcrypt.hash(password, this.salt);
	}

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

	setAuthRoute() {
		new Route(this, '/auth', 'get', (req, res) => {
			this.createUser(req, res);
		});
	}

	/**
	 * Paramétrer plusieur routes dans l'api
	 * @param {Array} routes
	 */
	setRoutes(routes) {
		for (let { path, method, handler } of routes) this.setRoute(path, method, handler);
	}

	setRoute(path, method, handler) {
		this.routes.set(`${method}--${path}`, { path, method, handler });

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

	listenAllRoutes(routesArg) {
		createAllRoutes(this, routesArg);
	}
};
