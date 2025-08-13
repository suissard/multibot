const EmoteMessage = require('./EmoteMessage.js');
const DATAS = require('./DataBase');

module.exports = class EmoteMessageManager {
	constructor(bots) {
		this.bots = bots;
		this.__messages = new Map();
	}

	handleMessageReactionAdd(reaction, user) {
		let message = reaction.message;
		if (user.bot) return;
		const emoteMessage = this.bots.EmoteMessages.get(`${message.channel.id}-${message.id}`);
		if (!emoteMessage) return;
		emoteMessage.handleMessageReactionAdd(reaction, user);
	}

	handleMessageReactionRemove(reaction, user) {
		if (user.bot) return;
		let message = reaction.message;
		const emoteMessage = this.bots.EmoteMessages.get(`${message.channel.id}-${message.id}`);
		if (!emoteMessage) return;
		emoteMessage.handleMessageReactionRemove(reaction, user);
	}

	setAllEmoteMessages() {
		DATAS.collections.emotemessages.list().then((emotesMessages) => {
			emotesMessages.forEach((emoteMessage) => {
				this.setEmoteMessage(emoteMessage);
			});
		});
	}

	/**
	 *
	 * @param {EmoteMessage} emoteMessage
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

	async create(body) {
		const emoteMessage = await DATAS.collections.emotemessages.create(body);
		this.setEmoteMessage(emoteMessage);
	}

	add(id, value) {
		if (this.__messages.has(id))
			console.error(
				`EmoteMessage en doublon ${id} (id : ${value.getID()} et ${this.__messages
					.get(id)
					.getID()})`
			);
		this.__messages.set(id, value);
	}

	update(id, value) {
		if (!this.__messages.has(id)) throw new Error("This id don't exist");
		this.__messages.get(id).update(value);
	}

	get(id) {
		return this.__messages.get(id);
	}

	getAll() {
		return this.__messages;
	}
};
