const fs = require('fs');
const Discord = require('discord.js');
const Command = require('./Command.js');

module.exports = class CommandeManager {
	constructor() {
		this.__commands = new Map();
	}

	add(id, value) {
		if (this.__commands.has(id)) return; //throw new Error('This id already exist');
		this.__commands.set(id, value);
	}

	update(id, value) {
		if (!this.__commands.has(id)) throw new Error("This id don't exist");
		this.__commands.set(id, value);
	}

	/**
	 *
	 * @param {String} id
	 * @returns {Command}
	 */
	get(id) {
		return this.__commands.get(id);
	}

	getAll() {
		return this.__commands;
	}

	/**
	 *
	 * @param {String} id
	 * @returns {Boolean}
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

		if (error.length != 0) throw new Error(`La commande doit avoir ${error.join(', ')}`);

		this.add(data.id, data);
	}

	/**
	 * Charge toutes les commandes des bots
	 */
	setAllCommands() {
		let files = fs.readdirSync('./Commandes');
		for (let i in files) {
			this.setCommand('../Commandes/' + files[i]);
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
	handleApiRequestCommand(bot, req, res, commandId, user) {
		if (!this.__commands.has(commandId))
			throw new Error(`Cette commande "${commandId}" n'existe pas`);
		if (bot.unauthorizedCommands.includes(commandId))
			throw new Error(`Cette commande "${commandId}" n'est pas autorisé`);

		let command = this.get(commandId);
		return new command(bot).handleApiRequest(req, res, user);
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
