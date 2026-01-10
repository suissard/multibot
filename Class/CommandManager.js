const fs = require('fs');
const Discord = require('discord.js');
const Command = require('./Command.js');

module.exports = class CommandeManager {
	/**
	 * Gère l'enregistrement et l'accès aux commandes du bot.
	 */
	constructor() {
		this.__commands = new Map();
	}

	/**
	 * Ajoute une nouvelle commande à la collection.
	 * Ne fait rien si une commande avec le même ID existe déjà.
	 * @param {string} id - L'identifiant unique de la commande.
	 * @param {Command} value - La classe de la commande à ajouter.
	 */
	add(id, value) {
		if (this.__commands.has(id)) return; //throw new Error('This id already exist');
		this.__commands.set(id, value);
	}

	/**
	 * Met à jour une commande existante dans la collection.
	 * @param {string} id - L'identifiant de la commande à mettre à jour.
	 * @param {Command} value - La nouvelle classe de la commande.
	 * @throws {Error} Si aucune commande avec cet ID n'existe.
	 */
	update(id, value) {
		if (!this.__commands.has(id)) throw new Error("This id don't exist");
		this.__commands.set(id, value);
	}

	/**
	 * Récupère une commande par son ID.
	 * @param {string} id - L'identifiant de la commande.
	 * @returns {Command} La classe de la commande correspondante.
	 */
	get(id) {
		return this.__commands.get(id);
	}

	/**
	 * Récupère toutes les commandes enregistrées.
	 * @returns {Map<string, Command>} Une map de toutes les commandes.
	 */
	getAll() {
		return this.__commands;
	}

	/**
	 * Vérifie si une commande avec l'ID spécifié existe.
	 * @param {string} id - L'identifiant de la commande à vérifier.
	 * @returns {boolean} `true` si la commande existe, sinon `false`.
	 */
	has(id) {
		return this.__commands.has(id);
	}

	/**
	 * Charger la commande
	 */
	setCommand(path) {
		delete require.cache[require.resolve(path)];

		let data = require(path);

		let error = [];
		if (data.id === undefined) error.push('id');
		if (data.devBoss === undefined) error.push('devBoss');
		if (data.home === undefined) error.push('home');
		if (data.userPermissions === undefined) error.push('userPermissions');
		if (data.botPermissions === undefined) error.push('botPermissions');
		if (data.description === undefined) error.push('description');
		if (data.help === undefined) error.push('help');
		// if (data.howTo === undefined) error.push("howTo");
		if (data.test === undefined) error.push('test');

		if (error.length != 0) throw new Error(`La command "${data.id}" doit avoir ${error.join(', ')}`);

		this.add(data.id, data);
	}

	/**
	 * Charge toutes les commandes des bots
	 * 
	 * @param {BotManager} botManager 
	 */
	setAllCommands(botManager) {
		let files = fs.readdirSync('./Commandes');
		for (let i in files) {
			try {
				this.setCommand('../Commandes/' + files[i]);
			} catch (e) {
				botManager.error(e.message)
			};
		}
	}

	/**
	 * Réagit a un commande initié depuis une interaction
	 * @param {*} bot
	 * @param {*} interaction
	 */
	handleInteractionCommand(bot, interaction) {
		//interaction avec la commande

		if (!this.__commands.has(interaction.commandName))
			throw new Error(`Cette commande "${interaction.commandName}" n'existe pas`);
		if (bot.unauthorizedCommands.includes(interaction.commandName))
			throw new Error(`Cette commande "${interaction.commandName}" n'est pas autorisé`);

		let command = this.get(interaction.commandName);
		new command(bot).handleInteraction(interaction);
	}

	/**
	 * Réagit a une commande initié depuis un call api
	 * @param {Bot} bot
	 * @param {Request} req
	 * @param {} res
	 * @param {Discord.User} user
	 */
	handleApiRequestCommand(bot, req, res, commandId, user, app) {
		if (!this.__commands.has(commandId))
			throw new Error(`Cette commande "${commandId}" n'existe pas`);
		if (bot.unauthorizedCommands.includes(commandId))
			throw new Error(`Cette commande "${commandId}" n'est pas autorisé`);

		let command = this.get(commandId);
		return new command(bot).handleApiRequest(req, res, user, app);
	}

	/**
	 * DEPRECATED Réagit a une command initié depuiçs un message
	 * @param {*} bot
	 * @param {*} message
	 */
	handleMessageCommand(bot, message) {
		let args = message.content.split(' ');
		let cmd = args.shift().replace(bot.prefix, '');

		if (!this.__commands.has(cmd)) throw new Error(`Cette commande "${cmd}" n'existe pas`);
		let command = this.__commands.get(cmd);
		new command(bot).handleMessage(message);
	}
};
