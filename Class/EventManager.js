const fs = require('fs');
const Bot = require('./Bot');
const Event = require('./Event.js');

module.exports = class EventManager {
	constructor(bots) {
		this.__events = new Map();
		this.bots = bots;
	}

	add(id, value) {
		if (this.__events.has(id)) throw new Error(`This id (${id}) already exist`);
		return this.__events.set(id, value);
	}

	get(id) {
		return this.__events.get(id);
	}

	/**
	 * Charger un event
	 */
	setEvent(path) {
		delete require.cache[require.resolve(path)];
		let event = require(path);
		this.add(event.id, event);
	}

	/**
	 * Charge tout els evenements des bots
	 */
	setAllEvents() {
		let files = fs.readdirSync('./Events');
		for (let i in files) {
			this.setEvent('../Events/' + files[i]);
		}
	}

	/**
	 *
	 * @param {Event} event
	 * @param {Bot} bot
	 */
	createListener(event, bot) {
		new event(bot).createListener();
	}

	createAllListener(bot) {
		for (let event of this.__events) {
			if (bot.unauthorizedEvents.includes(event[0])) continue;
			this.createListener(event[1], bot);
		}
	}

	createAllListenerForAllBot() {
		for (let bot of this.bots) this.createAllListener(bot[1]);
	}

	addListenerForAllBot(event) {
		this.add(event.id, event);
		for (let bot of this.bots) new event(bot[1]).createListener();
	}

	prependListenerForAllBot(event) {
		this.add(event.id, event);
		for (let bot of this.bots) new event(bot[1]).prependListener();
	}
};
