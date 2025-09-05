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

	static narrative = `
- Cette commande permet de lancer manuellement le processus de nettoyage des anciens salons de match.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande appelle la fonction \`washOldChannels()\`.
    2.  Cette fonction est responsable de parcourir les salons du serveur, d'identifier ceux qui sont liés à des matchs terminés, et de les supprimer.
    3.  Un argument \`exceptionName\` (actuellement vide) pourrait permettre d'exclure certains salons du nettoyage.
    4.  Un argument booléen (ici \`true\`) semble forcer l'action de suppression.
    5.  La commande renvoie immédiatement un message "⏳ Channels en cours de suppression..." pour indiquer que le processus est lancé en arrière-plan.
    6.  Une fois le nettoyage terminé, un second message "Channels supprimé avec succés !" est envoyé.
`;

	/**
	 * Exécute la commande pour déclencher manuellement le nettoyage des anciens salons de match.
	 * @param {object} args - Les arguments de la commande (non utilisés ici).
	 * @returns {Promise<string>} Un message indiquant que le processus est en cours.
	 */
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
