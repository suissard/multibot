const Bot = require('./Bot');

module.exports = class Event {
	constructor(bot) {
		/**
		 * @type {Bot}
		 */
		this.bot = bot;

		/**
         * @type {String} id 
         */
		this.id = this.constructor.id;

        /**
		 * @type {String}
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
	 * Renvoie une erreur type
	 * @param {Error} err
	 * @param {User || Channel} target
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
