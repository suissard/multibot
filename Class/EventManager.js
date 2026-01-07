const fs = require('fs');
const Bot = require('./Bot');
const Event = require('./Event.js');

module.exports = class EventManager {
	/**
	 * Gère l'enregistrement et l'attachement des événements pour les bots.
	 * @param {import('./BotManager')} bots - Le gestionnaire de bots.
	 */
	constructor(bots) {
		this.__events = new Map();
		this.bots = bots;
	}

	/**
	 * Ajoute un nouvel événement à la collection.
	 * @param {string} id - L'identifiant unique de l'événement.
	 * @param {Event} value - La classe de l'événement à ajouter.
	 * @throws {Error} Si un événement avec le même ID existe déjà.
	 */
	add(id, value) {
		if (this.__events.has(id)) throw new Error(`This id (${id}) already exist`);
		return this.__events.set(id, value);
	}

	/**
	 * Récupère un événement par son ID.
	 * @param {string} id - L'identifiant de l'événement.
	 * @returns {Event} La classe de l'événement correspondante.
	 */
	get(id) {
		return this.__events.get(id);
	}

	/**
	 * Charge une classe d'événement depuis un fichier et l'ajoute au gestionnaire.
	 * @param {string} path - Le chemin vers le fichier de l'événement.
	 */
	setEvent(path) {
		delete require.cache[require.resolve(path)];
		let event = require(path);
		this.add(event.id, event);
	}

	/**
	 * Récupère tous les événements enregistrés.
	 * @returns {Map<string, Event>} Une map de tous les événements.
	 */
	getAll() {
		return this.__events;
	}

	/**
	 * Charge tous les événements depuis le dossier `Events` et les ajoute au gestionnaire.
	 */
	setAllEvents() {
		let files = fs.readdirSync('./Events');
		for (let i in files) {
			this.setEvent('../Events/' + files[i]);
		}
	}

	/**
	 * Crée et attache un écouteur d'événement pour un bot spécifique.
	 * @param {Event} event - La classe de l'événement.
	 * @param {Bot} bot - L'instance du bot à laquelle attacher l'écouteur.
	 */
	createListener(event, bot) {
		new event(bot).createListener();
	}

	/**
	 * Crée et attache tous les écouteurs d'événements enregistrés pour un bot spécifique.
	 * Ignore les événements non autorisés pour ce bot.
	 * @param {Bot} bot - L'instance du bot.
	 */
	createAllListener(bot) {
		for (let event of this.__events) {
			if (bot.unauthorizedEvents.includes(event[0])) continue;
			this.createListener(event[1], bot);
		}
	}

	/**
	 * Crée et attache tous les écouteurs d'événements pour tous les bots gérés.
	 */
	createAllListenerForAllBot() {
		for (let bot of this.bots) this.createAllListener(bot[1]);
	}

	/**
	 * Ajoute un événement et attache son écouteur à tous les bots gérés.
	 * @param {Event} event - La classe de l'événement à ajouter et attacher.
	 */
	addListenerForAllBot(event) {
		this.add(event.id, event);
		for (let bot of this.bots) new event(bot[1]).createListener();
	}

	/**
	 * Ajoute un événement et attache son écouteur au début de la liste pour tous les bots gérés.
	 * @param {Event} event - La classe de l'événement à ajouter et attacher.
	 */
	prependListenerForAllBot(event) {
		this.add(event.id, event);
		for (let bot of this.bots) new event(bot[1]).prependListener();
	}
};
