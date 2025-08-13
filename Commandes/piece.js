const Command = require('../Class/Command.js');

module.exports = class Piece extends Command {
	static id = 'piece';
	static devBoss = false;
	static home = false;
	static userPermissions = [];
	static botPermissions = [];
	static description = 'Lance une piece pour récolter pile ou face';
	static help = true;
	static howTo = 'PREFIXCMD';
    static test = [];
	static arguments = [];

	/**
	 * Exécute la commande pour simuler un lancer de pièce.
	 * @param {object} args - Les arguments de la commande (non utilisés ici).
	 * @returns {string} Le résultat du lancer : 'Pile' ou 'Face'.
	 */
	methode(args = {}) {
		return Math.random() < 0.5 ? 'Pile' : 'Face';
	}
};
