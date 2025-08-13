const Command = require('../../Class/Command.js');
const { processFromDiscordUserId, processFromOlympeTeamId } = require('./utils/utils.js');
const { autoRole } = require('./utils/utils2.js');

module.exports = class AutoRoleCommand extends Command {
	static id = 'autorole';
	static devBoss = false;
	static home = false;
	static userPermissions = [];
	static botPermissions = [];
	static description =
		"Ajoute les roles discord d'un utilisateur en lien avec la competition Olympe";
	static help = true;
	static howTo = 'PREFIXCMD';
	static test = [];
	static arguments = [
		{
			type: 'USER',
			name: 'user',
			description: 'Utilisateur a mettre a jour',
			required: false,
		},
		{
			type: 'STRING',
			name: 'teamid',
			description: 'Identifiant de team a mettre a jour',
			required: false,
		},
	];

	async methode(args = {}) {
		if (!args.user && !args.teamid) {
			autoRole(this.bot).then((result) => this.answerToUser('Roles mis à jour'));
			return '⏳ AutoRole générale en cours...';
		} else if (args.user) {
			processFromDiscordUserId(args.user, this.bot).then((result) => {
				if (!result) this.answerToUser('Utilisateur non trouvé => essaye avec une teamid');
				else this.answerToUser('Roles mis à jour');
			});
			return '⏳ AutoRole en cours pour <@' + args.user + '>...';
		} else if (args.teamid) {
			processFromOlympeTeamId(args.teamid, this.bot).then((result) => {
				if (!result) this.answerToUser('Team non référencé');
				else this.answerToUser('Roles mis à jour');
			});
			return '⏳ AutoRole de team en cours...';
		}
	}
};
