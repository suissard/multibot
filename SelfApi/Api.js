// #############################################################
// ##    Fonctions pour communiquer avec le bot via un api    ##
// #############################################################
// const BotManager = require('../Class/BotManager.js'); // Removed to avoid circular dependency and unused
const { routes, createAllRoutes } = require('./routes');
const { transformApiArgsToDiscordObjects } = require('./discord-object-transformer.js');

var express = require('express');
var bodyParser = require('body-parser');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Route = require('./Route.js');
const fetch = require('node-fetch');

const cors = require('cors');
const { Server } = require("socket.io");

module.exports = class SelfApi {
	/**
	 * Class permettant de gerer l'API du bot
	 * @param {Object} configs
	 * @param {Object} discord
	 * @param {BotManager} BOTS Instance de gestionnaire de bot
	 * @param {Number} saltRounds
	 * @param {Object} libs Dépendances injectées (express, bcrypt, fetch)
	 */
	constructor(configs, discord, BOTS, saltRounds = 12, libs = {}) {
		this.token = configs.token;
		this.hostname = configs.hostname || 'localhost';
		this.port = configs.port || 3000;
		this.autoRoleLogChannelId = configs.autoRoleLogChannelId;
		this.autoRoleLogBotId = configs.autoRoleLogBotId;
		this.autoRoleLogOrganization = configs.autoRoleLogOrganization;
		this.discord = discord;
		this.BOTS = BOTS;

		// Dependency Injection
		this.express = libs.express || express;
		this.bcrypt = libs.bcrypt || bcrypt;
		this.express = libs.express || express;
		this.bcrypt = libs.bcrypt || bcrypt;
		this.fetch = libs.fetch || fetch;
		this.SocketServer = libs.SocketServer || Server;

		this.salt = this.bcrypt.genSaltSync(saltRounds);

		this.routes = new Map();
		this.hashUsers = new Map();
		this.userSockets = new Map();
		this.configUsers = configs.users || [];

		this.router = this.express.Router();
		this.app = this.express();
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

		// Initialize routes but do not start server yet
		this.setAuthRoute();
		this.setHomeRoute();
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
	 * @param {object} userData - Les données de l'utilisateur Discord.
	 * @param {string} accessToken - Le token d'accès Discord.
	 */
	async addUser(token, userData, accessToken) {
		// Deprecated: In-memory storage removed in favor of stateless tokens
	}

	/**
	 * Extrait le token Bearer d'une requête et retourne son hash.
	 * @param {import('express').Request} req - L'objet de la requête Express.
	 * @returns {Promise<string|false>} Le hash du token, ou `false` si aucun token n'est trouvé.
	 */
	async getHashFromTokenRequest(req) {
		const token = req.headers?.authorization?.replace('Bearer ', '');
		if (!token) return false;

		const hash = await this.bcrypt.hash(token, this.salt);
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
	 * Génère un token signé contenant les données de l'utilisateur.
	 * @param {object} userData - Les données de l'utilisateur.
	 * @param {string} accessToken - Le token d'accès Discord.
	 * @returns {string} Le token signé (base64.signature).
	 */
	signToken(userData, accessToken) {
		const payload = JSON.stringify({
			id: userData.id,
			data: userData,
			accessToken,
			timestamp: Date.now()
		});
		const base64Payload = Buffer.from(payload).toString('base64');
		const signature = crypto
			.createHmac('sha256', this.token || 'default_secret')
			.update(base64Payload)
			.digest('hex');
		return `${base64Payload}.${signature}`;
	}

	/**
	 * Vérifie un token signé et retourne son payload si valide.
	 * @param {string} token - Le token signé.
	 * @returns {object|null} Le payload décodé ou null si invalide.
	 */
	verifyToken(token) {
		if (!token) return null;
		const [base64Payload, signature] = token.split('.');
		if (!base64Payload || !signature) return null;

		const expectedSignature = crypto
			.createHmac('sha256', this.token || 'default_secret') // Ensure same secret is used
			.update(base64Payload)
			.digest('hex');

		if (signature !== expectedSignature) return null;

		try {
			const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString('utf8'));
			return payload;
		} catch (e) {
			console.error('Invalid token payload', e);
			return null;
		}
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

		let response = await this.fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			body,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		});

		response = await response.json();
		return response.access_token;
	}

	/**
	 * Récupère les données de l'utilisateur Discord en utilisant son jeton d'accès.
	 * @param {string} token - Le jeton d'accès OAuth2 de l'utilisateur.
	 * @returns {Promise<object>} L'objet utilisateur Discord.
	 */
	async getDiscordUserFromToken(token) {
		const response = await this.fetch('https://discord.com/api/users/@me', {
			headers: { Authorization: 'Bearer ' + token },
		});
		const discordUser = await response.json();
		return discordUser;
	}

	/**
	 * Créer un nouvel utilisateur dans le cache après validation OAuth2.
	 * 1. Vérifie si la requête contient déjà un token valide.
	 * 2. Échange le code OAuth2 contre un access token Discord.
	 * 3. Récupère l'ID Discord l'utilisateur.
	 * 4. Génère un nouveau token API unique et l'enregistre le cache.
	 * @param {import('express').Request} req - La requête contenant le code d'autorisation.
	 * @param {import('express').Response} res - La réponse pour renvoyer le nouveau token.
	 * @returns {Promise<{token: string, discordId: string}>} Les informations de l'utilisateur créé.
	 */
	async createUser(req, res) {
		//Verifier que l'utilisateur n'est pas existant
		const requestHash = await this.getHashFromTokenRequest(req);
		if (requestHash) throw new Error('Votre requete contient déjà un token');

		//Recuperer discord ID
		const dicordCode = this.getDiscordCodeFromRequest(req);
		const accessToken = await this.getDiscordAccessTokenFromCode(dicordCode);
		const discordUser = await this.getDiscordUserFromToken(accessToken);

		// Synchronize with Strapi
		let strapiToken = null;
		try {
			const strapiResponse = await this.fetch(`${process.env.STRAPI_URL}/api/auth/discord/callback?access_token=${accessToken}`);
			const strapiData = await strapiResponse.json();
			if (strapiData.jwt) {
				strapiToken = strapiData.jwt;
			} else {
				this.warn('Strapi authentication failed during sync', 'createUser');
			}
		} catch (e) {
			this.error('Error syncing with Strapi: ' + e.message, 'createUser');
		}

		const token = this.signToken(discordUser, accessToken); // Create signed token
		// Store strapi token in the session token (or optionally return it separately)
		// For now, let's keep them separate in the response so the frontend can store both if needed,
		// but we'll prioritize the unified token.

		res.json({ token, strapiToken, discordId: discordUser.id }); //Renvoyer données utilisateurs
		return { token, strapiToken, discordId: discordUser.id };
	}

	/**
	 * Middleware d'authentification centralisé pour les requêtes API.
	 * Identifie l'utilisateur via son token (Header Authorization) et le bot concerné via le paramètre URL/Body.
	 * - Si l'URL est publique (auth, discord/authurl), l'authentification est sautée.
	 * - Un bot DOIT être spécifié (bot_id).
	 * - Un token utilisateur valide est requis sauf pour certaines routes (ex: /commands).
	 * @param {import('express').Request} req - L'objet de la requête Express.
	 * @param {import('express').Response} res - L'objet de la réponse Express.
	 * @param {object} [options] - Options de la route (ex: { auth: false }).
	 * @returns {Promise<{bot: import('../Class/Bot.js'), user: import('discord.js').User}>} L'instance du bot et de l'utilisateur authentifié.
	 */
	async authentication(req, res, options = {}) {
		const token = req.headers?.authorization?.replace('Bearer ', '');
		let tokenData;

		// Master Token Bypass
		if (token === this.token) {
			tokenData = {
				data: {
					id: 'system',
					username: 'System',
					discriminator: '0000',
					avatar: null,
					bot: true,
					system: true
				}
			};
		} else {
			tokenData = this.verifyToken(token); // Verify and extract payload
		}

		if (req.url.includes('/discord/authurl')) return {};
		if (req.url.includes('/auth')) return {};

		let botId = this.getBotIdFromRequest(req);
		let bot;

		if (botId && botId !== 'undefined' && botId !== 'null') {
			bot = this.BOTS.get(botId);
			if (!bot) {
				const err = new Error('Bot introuvable');
				err.status = 404;
				throw err;
			}
		} else {
			if (this.BOTS.size > 0) {
				bot = this.BOTS.values().next().value;
			} else {
				const err = new Error('Aucun bot disponible');
				err.status = 404;
				throw err;
			}
		}


		if (!tokenData) {
			// Fallback: Check if token matches a configured user (Dev mode / Static tokens)
			const configUser = this.configUsers.find(u => u.token === token);
			if (configUser) {
				// Try to fetch full user details from the bot if possible
				let discordUser = { id: configUser.discordId, username: 'Dev User', discriminator: '0000', avatar: null };

				if (bot) {
					try {
						const fetchedUser = await bot.users.fetch(configUser.discordId);
						if (fetchedUser) {
							discordUser = {
								id: fetchedUser.id,
								username: fetchedUser.username,
								discriminator: fetchedUser.discriminator,
								avatar: fetchedUser.avatar
							};
						}
					} catch (e) {
						console.warn('Could not fetch dev user details from Discord', e);
					}
				}

				return { bot, user: discordUser };
			}

			if (req.url.includes('/commands')) return { bot };
			// if (req.url.includes('/autorole')) return { bot }; // Removed in favor of option

			const err = new Error('Utilisateur non authentifié ou session expirée');
			err.status = 401;
			throw err;
		}

		const user = tokenData.data;

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
		return this.bcrypt.hash(password, this.salt);
	}

	/**
	 * Construit et retourne l'URL d'autorisation OAuth2 de Discord.
	 * @returns {string} L'URL d'autorisation.
	 */
	getDiscordAuthUrl() {
		return encodeURI(
			`https://discord.com/api/oauth2/authorize?client_id=${this.discord.clientId
			}&redirect_uri=${this.discord.redirectUrl
			}&response_type=code&scope=${this.discord.scope.join(' ')}`
		);
	}

	/**
	 * Retourne les sockets connectés pour un utilisateur donné.
	 * @param {string} userId - L'ID de l'utilisateur Discord.
	 * @returns {Set<string>|null} Un Set d'IDs de sockets ou null si aucun.
	 */
	getUserSockets(userId) {
		return this.userSockets.get(userId) || null;
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
	 * @param {object} [options] - Options de la route (ex: { auth: false }).
	 */
	setRoute(path, method, handler, options = {}) {
		this.routes.set(`${method}--${path}`, { path, method, handler, options });
		try {
			this.router.route(path)[method.toLowerCase()](async (req, res) => {
				try {
					let { user, bot } = (await this.authentication(req, res, options)) || {};
					return handler(req, res, bot, user, this);
				} catch (e) {
					this.error(`BUG API ${e.message}\n${e.stack}`);
					res.status(e.status || 500);
					res.send({ message: e.message });
				}
			});
		} catch (e) {
			this.error(`BUG API Instanciation ${path}${method} \n${e.message}\n${e.stack}`);
		}
	}

	/*
	 * Démarrage du serveur API
	 */
	start() {
		if (process.env.BOT_MODE === 'PROD') {
			const path = require('path');
			this.app.use(express.static(path.join(__dirname, '../Front/app/dist')));
		}
		this.app.use('', this.router);
		this.server = this.app.listen(this.port, this.hostname, () => {
			this.log('démarrée à : http://' + this.hostname + ':' + this.port);
		});

		this.io = new this.SocketServer(this.server, {
			cors: {
				origin: "*", // Adjust in production
				methods: ["GET", "POST"]
			}
		});

		// Middleware d'authentification Socket.IO
		this.io.use(async (socket, next) => {
			const token = socket.handshake.auth.token || socket.handshake.headers.auth;
			const tokenData = this.verifyToken(token);

			if (!tokenData) {
				return next(new Error("Authentication error"));
			}
			socket.user = tokenData.data; // Attach user data to socket
			next();
		});

		this.io.on('connection', (socket) => {
			// Add socket to user's list
			const userId = socket.user.id;
			if (!this.userSockets.has(userId)) {
				this.userSockets.set(userId, new Set());
			}
			this.userSockets.get(userId).add(socket.id);

			this.log('New client connected: ' + socket.user.username, 'SOCKET');

			socket.on('disconnect', () => {
				this.log('Client disconnected: ' + socket.user.username, 'SOCKET');

				// Remove socket from user's list
				if (this.userSockets.has(userId)) {
					const userSockets = this.userSockets.get(userId);
					userSockets.delete(socket.id);
					if (userSockets.size === 0) {
						this.userSockets.delete(userId);
					}
				}
			});

			// Rejoindre un salon (Listening)
			socket.on('joinSecretaryChannel', async ({ botId, channelId }) => {
				try {
					if (!botId || !channelId) return;
					const bot = this.BOTS.get(botId);
					if (!bot) return;

					const channel = await bot.channels.fetch(channelId).catch(() => null);
					if (!channel) return;

					// Vérification des droits de lecture
					const member = await channel.guild.members.fetch(socket.user.id).catch(() => null);
					if (!member) return socket.emit('error', 'Member not found in guild');

					// Import dynamique pour éviter les dépendances circulaires si nécessaire, ou utiliser discord.js
					const { PermissionsBitField } = require('discord.js');
					if (!channel.permissionsFor(member).has(PermissionsBitField.Flags.ViewChannel)) {
						return socket.emit('error', 'Missing ViewChannel permissions');
					}

					socket.join(channelId);
					// this.log(`User ${socket.user.username} joined channel ${channel.name}`, 'SOCKET');
				} catch (e) {
					console.error('[SOCKET] Error joining channel', e);
				}
			});

			// Envoyer un message (Reply)
			socket.on('sendSecretaryMessage', async ({ botId, channelId, content }) => {
				try {
					if (!botId || !channelId || !content) return;
					const bot = this.BOTS.get(botId);
					if (!bot) return;

					const channel = await bot.channels.fetch(channelId).catch(() => null);
					if (!channel) return;

					const member = await channel.guild.members.fetch(socket.user.id).catch(() => null);
					if (!member) return socket.emit('error', 'Member not found');

					const { PermissionsBitField } = require('discord.js');

					// Vérification des droits : Voir le salon + Ecrire + Permissions Secrétaire (impliqué par l'accès au salon privé)
					const permissions = channel.permissionsFor(member);
					if (!permissions.has(PermissionsBitField.Flags.ViewChannel) ||
						!permissions.has(PermissionsBitField.Flags.SendMessages)) {
						return socket.emit('error', 'Missing permissions to send message');
					}

					// Envoi du message via SecretaryManager pour gestion centralisée (Embed, DM, etc.)
					const secretaryManager = bot.secretaryManager;
					if (!secretaryManager) return socket.emit('error', 'Secretary Manager not ready');

					// Construct author object from socket user
					const author = {
						id: socket.user.id,
						username: socket.user.username,
						displayAvatarURL: () => socket.user.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'
					};

					// Appeler la méthode partagée
					await secretaryManager.sendStaffResponse(channel, content, author, [], null);

				} catch (e) {
					console.error('[SOCKET] Error sending message', e);
					socket.emit('error', 'Internal server error: ' + e.message);
				}
			});
		});
	}

	/**
	 * Initialise toutes les routes définies dans le répertoire `routes`.
	 * @param {object} routesArg - Arguments supplémentaires à passer au créateur de routes.
	 */
	listenAllRoutes(routesArg) {
		createAllRoutes(this, routesArg);
	}

	/**
	 * Formate un message de log avec une référence et une couleur spécifique.
	 * @param {string} content - Le message à logger.
	 * @param {string} reference - La référence du log (ex: NOM_DE_ROUTE).
	 * @param {string} [color='\x1b[36m'] - Code couleur ANSI (défaut: cyan).
	 * @param {string} [prefix='API'] - Préfixe du log.
	 * @returns {string} Le message formaté.
	 */
	formatLog(content, reference, color = '\x1b[36m', prefix = 'API') {
		const reset = '\x1b[0m';
		const now = new Date();
		const time = now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR');
		return `[${time}] ${color}[${prefix}]${reset} ${reference ? reference.toUpperCase() + ' ' : ''}| ${content}`;
	}

	/**
	 * Log un message d'information.
	 * @param {string} content - Le message à logger.
	 * @param {string} [reference=''] - La référence du log.
	 */
	log(content, reference = '') {
		console.log(this.formatLog(content, reference, '\x1b[36m')); // Cyan
	}

	/**
	 * Log un message de stuccès.
	 * @param {string} content - Le message à logger.
	 * @param {string} [reference=''] - La référence du log.
	 */
	success(content, reference = '') {
		console.log(this.formatLog(content, reference, '\x1b[32m')); // Green
	}

	/**
	 * Log une erreur.
	 * @param {string|Error} content - L'erreur à logger.
	 * @param {string} [reference=''] - La référence du log.
	 */
	error(content, reference = '') {
		const message = content instanceof Error ? content.stack : content;
		console.error(this.formatLog('❌ ' + message, reference, '\x1b[31m')); // Red
	}

	/**
	 * Log un avertissement.
	 * @param {string} content - L'avertissement à logger.
	 * @param {string} [reference=''] - La référence du log.
	 */
	warn(content, reference = '') {
		console.warn(this.formatLog('⚠️ ' + content, reference, '\x1b[33m')); // Yellow
	}

	/**
	 * Log un message de debug.
	 * @param {string} content - Le message de debug.
	 * @param {string} [reference=''] - La référence du log.
	 */
	debug(content, reference = '') {
		console.log(this.formatLog('🐛 ' + content, reference, '\x1b[35m')); // Magenta
	}
};
