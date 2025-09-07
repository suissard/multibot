const Bot = require('./Bot');

module.exports = class Event {
	/**
	 * @property {string} id - L'identifiant unique de l'événement.
	 * @property {string} listener - Le nom de l'événement Discord à écouter.
	 * @property {string} description - Une courte description de ce que fait l'événement.
	 * @property {string} narrative - Une description détaillée du fonctionnement de l'événement.
	 */
	static id = undefined;
	static listener = undefined;
	static description = 'N/A';
	static narrative = 'N/A';

	constructor(bot) {
		/**
		 * L'instance du bot pour lequel cet événement est enregistré.
		 * @type {Bot}
		 */
		this.bot = bot;

		/**
		 * L'identifiant unique de l'événement.
		 * @type {string}
		 */
		this.id = this.constructor.id;

		/**
		 * Le nom de l'événement Discord à écouter (par exemple, 'messageCreate').
		 * @type {string}
		 */
		this.listener = this.constructor.listener;
	}

	/**
	 * Fonction gerant la survenue de l'evenement
	 *        try {
	 *            yourFunctionHere()
	 *        } catch (err) {
	 *            this.handleError(err);
	 *        }
	 */
	async handleEvent() {
		throw new Error(
			`La fonction d'evenements "handleEvent" de ${this.id} n'as pas été surchargée`
		);
	}

	/**
	 * Gère les erreurs survenant dans l'événement.
	 * @param {Error} err - L'erreur qui s'est produite.
	 * @param {import('discord.js').User | import('discord.js').Channel} [target] - La cible à qui envoyer un message d'erreur (optionnel).
	 */
	handleError(err, target) {
		this.bot.error(err, `Event - ${this.listener} - ${this.id}`);
		// let msg = `❌ [${this.bot.name}] Event : ${this.listener} => ${this.id}\n${err.stack}`;
		// console.error(`${msg}`);
		if (target)
			target
				.send(err.message)
				.catch((e) => console.warn(`[${this.bot.name}] sendError`, e, err));
	}

	/**
	 * Creer un listener pour le bot concerné
	 */
	createListener() {
		try {
			this.bot.on(this.listener, this.handleEvent.bind(this));
		} catch (e) {
			console.error(`[${this.bot.name}] Event ${this.listener}`, e);
		}
	}

	/**
	 * Creer un listener en début de lite pour le bot concerné
	 */
	prependListener() {
		this.bot.prependListener(this.listener, this.handleEvent.bind(this));
	}
};
