const Commande = require('../../../Class/Command');
const { autoChannel } = require('../utils/channelManagement');

class AutoChannelCommand extends Commande {
	static id = 'autochannel';
	static devBoss = false;
	static home = false;
	static userPermissions = ["ManageChannels"];
	static botPermissions = [];
	static description = 'Lance la fonction autochannel : creation, permission et nettoyage des channels de match';
	static howTo = 'PREFIXCMD';
	static test = [];
	static arguments = [];

	/**
	 * Exécute la commande pour déclencher manuellement le processus de gestion automatique des salons.
	 * @param {object} args - Les arguments de la commande (non utilisés ici).
	 * @returns {Promise<string>} Un message indiquant que le processus est en cours.
	 */
	async methode(args = {}) {
			autoChannel(this.bot, this.guild).then(() => {
				this.answerToUser(
					`AutoChannel terminé !`
				);
			});
		return `⏳ AutoChannel en cours...`
	}
}

module.exports = AutoChannelCommand;
