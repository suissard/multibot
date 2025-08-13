const Commande = require('../../../Class/Command');
const { getMatchById } = require('../../../services/apiService');
const { createMatchChannels } = require('../utils/channelManagement');

class CreateMatchCommand extends Commande {
	static id = 'creatematch';
	static devBoss = false;
	static home = false;
	static userPermissions = [];
	static botPermissions = [];
	static description = 'Create match channels';
	static howTo = 'PREFIXCMD';
	static test = [];
	static arguments = [
		{
			type: 'STRING',
			name: 'matchid',
			description: 'The id of the match',
			required: true,
		},
	];

	/**
	 * Exécute la commande pour créer manuellement les salons pour un match spécifique.
	 * @param {object} args - Les arguments de la commande.
	 * @param {string} args.matchid - L'ID du match pour lequel créer les salons.
	 * @returns {Promise<string>} Un message indiquant que le processus est en cours ou qu'une erreur s'est produite.
	 */
	async methode(args = {}) {
		const matchId = args.matchid;
		const match = await getMatchById(this.bot, matchId).catch(()=>{});
		if (match) {
			createMatchChannels(this.bot, match, this.guild).then((channels) => {
				this.answerToUser(
					`Channels Créer avec succés !\n + <#${channels
						.map((c) => c.id)
						.join('>\n + <#')}>`
				);
			});
		} else return `Pas de match trouvé :\n\`\`${matchId}\`\``;
		return `⏳ Channels en cours de création...`
	}
}

module.exports = CreateMatchCommand;
