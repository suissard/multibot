const EmoteMessage = require('./EmoteMessage.js');
const DATAS = require('./DataBase');

module.exports = class EmoteMessageManager {
	/**
	 * Gère les messages à réaction pour l'ensemble des bots.
	 * @param {import('./BotManager')} bots - Le gestionnaire de bots.
	 */
	constructor(bots) {
		this.bots = bots;
		this.__messages = new Map();
	}

	/**
	 * Gère un événement d'ajout de réaction pour tous les messages à réaction.
	 * @param {import('discord.js').MessageReaction} reaction - La réaction ajoutée.
	 * @param {import('discord.js').User} user - L'utilisateur qui a réagi.
	 */
	handleMessageReactionAdd(reaction, user) {
		let message = reaction.message;
		if (user.bot) return;
		const emoteMessage = this.bots.EmoteMessages.get(`${message.channel.id}-${message.id}`);
		if (!emoteMessage) return;
		emoteMessage.handleMessageReactionAdd(reaction, user);
	}

	/**
	 * Gère un événement de suppression de réaction pour tous les messages à réaction.
	 * @param {import('discord.js').MessageReaction} reaction - La réaction retirée.
	 * @param {import('discord.js').User} user - L'utilisateur dont la réaction a été retirée.
	 */
	handleMessageReactionRemove(reaction, user) {
		if (user.bot) return;
		let message = reaction.message;
		const emoteMessage = this.bots.EmoteMessages.get(`${message.channel.id}-${message.id}`);
		if (!emoteMessage) return;
		emoteMessage.handleMessageReactionRemove(reaction, user);
	}

	/**
	 * Charge et initialise tous les messages à réaction depuis la base de données.
	 */
	setAllEmoteMessages() {
		DATAS.collections.emotemessages.list().then((emotesMessages) => {
			emotesMessages.forEach((emoteMessage) => {
				this.setEmoteMessage(emoteMessage);
			});
		});
	}

	/**
	 * Initialise un message à réaction spécifique et l'ajoute au gestionnaire.
	 * @param {EmoteMessage} emoteMessage - L'objet EmoteMessage brut de la base de données.
	 */
	async setEmoteMessage(emoteMessage) {
		const em = new EmoteMessage(
			emoteMessage.getID(),
			emoteMessage.getType(),
			emoteMessage,
			emoteMessage.getCollection(),
			this.bots
		);
		await em.set();
		this.add(`${emoteMessage.channel.Channel}-${emoteMessage.message.Message}`, em);
	}

	/**
	 * Crée un nouveau message à réaction dans la base de données et l'initialise.
	 * @param {object} body - Les données pour la création du message à réaction.
	 */
	async create(body) {
		const emoteMessage = await DATAS.collections.emotemessages.create(body);
		this.setEmoteMessage(emoteMessage);
	}

	/**
	 * Ajoute un message à réaction au gestionnaire.
	 * @param {string} id - L'identifiant unique du message (`channelId-messageId`).
	 * @param {EmoteMessage} value - L'instance de EmoteMessage à ajouter.
	 */
	add(id, value) {
		if (this.__messages.has(id))
			console.error(
				`EmoteMessage en doublon ${id} (id : ${value.getID()} et ${this.__messages
					.get(id)
					.getID()})`
			);
		this.__messages.set(id, value);
	}

	/**
	 * Met à jour un message à réaction existant.
	 * @param {string} id - L'identifiant du message à mettre à jour.
	 * @param {object} value - Les nouvelles données pour le message.
	 * @throws {Error} Si le message n'existe pas.
	 */
	update(id, value) {
		if (!this.__messages.has(id)) throw new Error("This id don't exist");
		this.__messages.get(id).update(value);
	}

	/**
	 * Récupère un message à réaction par son ID.
	 * @param {string} id - L'identifiant du message (`channelId-messageId`).
	 * @returns {EmoteMessage} L'instance de EmoteMessage.
	 */
	get(id) {
		return this.__messages.get(id);
	}

	/**
	 * Récupère tous les messages à réaction gérés.
	 * @returns {Map<string, EmoteMessage>} Une map de tous les messages à réaction.
	 */
	getAll() {
		return this.__messages;
	}
};
