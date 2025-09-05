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

	static narrative = `
- Cette commande permet de lancer manuellement la fonction principale du module ChannelManager : \`autoChannel\`.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande appelle la fonction \`autoChannel()\`, qui est le cœur de la logique de ce module.
    2.  Cette fonction est responsable de l'ensemble du processus de gestion des salons de match, ce qui inclut probablement :
        - La création de nouveaux salons pour les matchs à venir.
        - L'attribution des permissions correctes pour que seules les équipes concernées puissent accéder à leur salon.
        - Le nettoyage ou l'archivage des salons des matchs qui sont terminés.
    3.  La commande renvoie immédiatement un message "⏳ AutoChannel en cours..." pour indiquer que le processus est lancé en arrière-plan.
    4.  Une fois que la fonction \`autoChannel()\` a terminé son exécution, un second message "AutoChannel terminé !" est envoyé pour notifier l'utilisateur.
`;

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
