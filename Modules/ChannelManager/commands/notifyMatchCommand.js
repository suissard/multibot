const Commande = require('../../../Class/Command');
const { notifyMatch } = require('../../../services/discordService');
const { getTeamByName } = require('../../../services/apiService');

class NotifyMatchCommand extends Commande {
    static id = 'notifymatch';
    static devBoss = false;
    static home = false;
    static userPermissions = ["ManageChannels"];
    static botPermissions = [];
    static description = 'Envoie une notification de match';
    static howTo = 'PREFIXCMD <team1> <team2> <division> <timestamp> [casters] [role]';
    static test = [];
    static arguments = [
        {
            type: 'STRING',
            name: 'team1',
            description: 'Nom de la première équipe',
            required: true,
        },
        {
            type: 'STRING',
            name: 'team2',
            description: 'Nom de la deuxième équipe',
            required: true,
        },
        {
            type: 'STRING',
            name: 'division',
            description: 'Nom de la division',
            required: true,
        },
        {
            type: 'INTEGER',
            name: 'timestamp',
            description: 'Timestamp du match',
            required: true,
        },
        {
            type: 'STRING',
            name: 'casters',
            description: 'Noms des casters (séparés par une virgule)',
            required: false,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'Rôle à mentionner',
            required: false,
        },
    ];

    static narrative = `
- Cette commande permet d'envoyer manuellement une notification de match dans le salon où la commande est exécutée.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande récupère les informations sur le match depuis les arguments.
    2.  Elle appelle la fonction \`notifyMatch()\` pour envoyer la notification.
    3.  La commande renvoie un message de confirmation.
`;

    /**
     * Exécute la commande pour envoyer une notification de match.
     * @param {object} args - Les arguments de la commande.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async methode(args = {}) {
        const { team1: team1Name, team2: team2Name, division, timestamp, casters: castersString, role } = args;

        try {
            const team1 = await getTeamByName(this.bot, team1Name);
            const team2 = await getTeamByName(this.bot, team2Name);

            if (!team1 || !team2) {
                return "Une des équipes n'a pas été trouvée.";
            }

            const teams = [team1, team2];

            let casters = [];
            if (castersString) {
                const casterNames = castersString.split(',');
                // This is a simplification. We might need a way to get caster objects from names.
                // For now, we'll just create simple objects.
                casters = casterNames.map(name => ({
                    user: { thirdparties: { discord: { discordID: null } } }, // Placeholder
                    castUrl: `https://twitch.tv/${name.trim()}`
                }));
            }

            await notifyMatch(this.bot, teams, division, timestamp, casters, this.channel, role?.id);

            return `Notification de match envoyée pour ${team1.name} vs ${team2.name}.`;
        } catch (error) {
            console.error(error);
            return "Une erreur est survenue lors de l'envoi de la notification de match.";
        }
    }
}

module.exports = NotifyMatchCommand;