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

	static narrative = `
- Cette commande permet de lancer manuellement le processus d'attribution automatique des rôles liés à la compétition Olympe.
- Elle offre trois modes de fonctionnement :

- **1. Mode général (aucun argument) :**
    - Si aucun argument n'est fourni, la commande lance la fonction \`autoRole()\` pour l'ensemble du serveur.
    - Cette fonction va probablement scanner tous les membres et mettre à jour leurs rôles en fonction des données de la compétition.
    - Elle renvoie un message immédiat indiquant que le processus est en cours, puis un message de confirmation une fois terminé.

- **2. Mode par utilisateur (\`user\`) :**
    - Si un utilisateur est mentionné, la commande exécute \`processFromDiscordUserId()\` pour cet utilisateur spécifique.
    - Elle met à jour les rôles uniquement pour cet utilisateur.
    - Si l'utilisateur n'est pas trouvé dans les données de la compétition, un message d'erreur est renvoyé.

- **3. Mode par équipe (\`teamid\`) :**
    - Si un ID d'équipe Olympe est fourni, la commande exécute \`processFromOlympeTeamId()\`.
    - Elle met à jour les rôles pour tous les membres de cette équipe spécifique.
    - Si l'équipe n'est pas trouvée, un message d'erreur est renvoyé.
`;

	/**
	 * Exécute la commande d'attribution manuelle des rôles.
	 * Peut être déclenchée pour tous les utilisateurs, un utilisateur spécifique ou une équipe spécifique.
	 * @param {object} args - Les arguments de la commande.
	 * @param {string} [args.user] - L'ID de l'utilisateur Discord à mettre à jour.
	 * @param {string} [args.teamid] - L'ID de l'équipe Olympe à mettre à jour.
	 * @returns {Promise<string>} Un message indiquant que le processus est en cours.
	 */
	async methode(args = {}) {
		if (!args.user && !args.teamid) {
			autoRole(this.bot, this.message.guild.id).then((result) => this.answerToUser('Roles mis à jour'));
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
