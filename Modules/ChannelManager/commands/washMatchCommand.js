const Commande = require('../../../Class/Command');
const { getMatchById } = require('../../../services/apiService');
const { createMatchChannels } = require('../utils/channelManagement');
const { washOldChannels } = require('../utils/utils');

class WashMatchCommand extends Commande {
	static id = 'washmatchs';
	static devBoss = false;
	static home = false;
	static userPermissions = ["ManageChannels"];
	static botPermissions = [];
	static description = 'Supprime les channels de matchs';
	static howTo = 'PREFIXCMD';
	static test = [];
	static arguments = [];

	async methode(args = {}) {
		const exceptionName = []
		washOldChannels(this.guild, exceptionName, true).then(() => {
			this.answerToUser(
				`Channels supprimé avec succés !`
			);
		});
		return `⏳ Channels en cours de suppression...`
	}
}

module.exports = WashMatchCommand;
