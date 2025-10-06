const Commande = require('../../../Class/Command');
const { notifyMatch } = require('../../../services/discordService');
const { getMatchById } = require('../../../services/apiService');
const { getMatchDivisionName } = require('../../../utils/matchUtils');

class NotifyMatchCommand extends Commande {
    static id = 'notifymatch';
    static devBoss = false;
    static home = false;
    static userPermissions = ["ManageChannels"];
    static botPermissions = [];
    static description = "Envoie une notification de match à partir d'un ID de match.";
    static howTo = 'PREFIXCMD <matchId> [role]';
    static test = [];
    static arguments = [
        {
            type: 'STRING',
            name: 'matchid',
            description: 'ID du match Olympe',
            required: true,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'Rôle à mentionner',
            required: false,
        },
    ];

    static narrative = `
- Cette commande permet d'envoyer manuellement une notification de match dans le salon où la commande est exécutée, en utilisant simplement l'ID du match.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande récupère l'ID du match depuis l'argument.
    2.  Elle appelle l'API pour obtenir les détails complets du match (équipes, division, date, casters).
    3.  Elle appelle la fonction \`notifyMatch()\` pour envoyer la notification.
    4.  La commande renvoie un message de confirmation.
`;

    /**
     * Exécute la commande pour envoyer une notification de match à partir d'un ID.
     * @param {object} args - Les arguments de la commande.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async methode(args = {}) {
        const { matchid, role } = args;

        try {
            const match = await getMatchById(this.bot, matchid);

            if (!match) {
                return `Aucun match trouvé avec l'ID : ${matchid}`;
            }

            const teams = [match.team1, match.team2];
            const division = getMatchDivisionName(match);
            const timestamp = match.matchDate;
            const casters = match.casters;

            if (!teams || !division || !timestamp) {
                return "Les informations du match récupérées depuis l'API sont incomplètes.";
            }

            await notifyMatch(this.bot, teams, division, timestamp, casters, this.channel, role?.id);

            return `Notification de match envoyée pour ${teams[0].name} vs ${teams[1].name}.`;
        } catch (error) {
            console.error(error);
            return "Une erreur est survenue lors de l'envoi de la notification de match.";
        }
    }
}

module.exports = NotifyMatchCommand;