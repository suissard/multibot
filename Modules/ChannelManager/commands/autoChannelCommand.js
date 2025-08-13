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
