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

	static narrative = `
- Cette commande permet de créer manuellement les salons (vocaux et textuels) pour un match spécifique.
- Elle est utile si la création automatique a échoué ou pour des besoins de test.
- Elle nécessite l'ID du match en argument.

- **Fonctionnement :**
    1.  La commande prend un ID de match (\`matchid\`) en argument.
    2.  Elle utilise cet ID pour appeler une API externe (\`getMatchById\`) et récupérer les informations détaillées du match.
    3.  Si le match est trouvé, elle appelle la fonction \`createMatchChannels()\`. Cette fonction est responsable de :
        - La création des différents salons nécessaires pour le match (salon vocal, salon textuel, etc.).
        - La configuration des permissions pour ces salons.
    4.  Pendant la création, un message "⏳ Channels en cours de création..." est affiché.
    5.  Une fois les salons créés, un message de confirmation est envoyé, incluant des liens cliquables vers les nouveaux salons.
    6.  Si aucun match ne correspond à l'ID fourni, un message d'erreur est renvoyé.
`;

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
