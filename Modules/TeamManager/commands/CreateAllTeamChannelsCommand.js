const Command = require('../../../Class/Command');

module.exports = class CreateAllTeamChannelsCommand extends Command {
    static id = 'createallteamchannels';
    static description = 'Lance la création/synchronisation de tous les salons d\'équipe pour un segment donné.';
    static userPermissions = ['Administrator'];
    static botPermissions = [];
    static help = true;
    static arguments = [
        { name: 'segment', type: 'STRING', required: false, description: 'Le nom du segment à synchroniser (Optionnel).' }
    ];
    static category = 'TeamManager';

    async methode(args) {
        if (!this.bot.olympeCacheReady) {
            return `❌ Le cache Olympe n'est pas encore prêt. Veuillez patienter...`;
        }

        const segmentFilter = args.segment || (args._ && args._.join ? args._.join(' ') : null);

        // No checks needed here, syncAllTeams handles optional filter

        const guild = await this.bot.guilds.fetch(this.bot.home).catch(() => null);
        if (!guild) return '❌ Serveur principal introuvable.';

        if (this.bot.teamManager && this.bot.teamManager.syncAllTeams) {
            if (args.interaction) {
                await args.interaction.deferReply();
            }
            try {
                const report = await this.bot.teamManager.syncAllTeams(guild, segmentFilter);
                return report || `⚠️ Commande terminée, mais aucun rapport généré.`;
            } catch (error) {
                return `❌ Erreur lors de la synchronisation : ${error.message}`;
            }
        } else {
            return '❌ Erreur interne: Module TeamManager mal initialisé.';
        }
    }
};
