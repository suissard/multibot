const TeamChannel = require('./TeamChannel');

/**
 * Le module TeamManager gère la création et la mise à jour automatique des salons vocaux d'équipe.
 * Il se base sur les données fournies par le module AutoRole (API Olympe).
 *
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 */
module.exports = (bot) => {

    // Flags to track state
    let isReady = false;

    // Flag for cache readiness
    bot.olympeCacheReady = false;

    /**
     * Internal helper to sync teams for a specific segment object.
     * @param {import('discord.js').Guild} guild 
     * @param {object} targetSegment 
     * @returns {Promise<object>} Stats object { found, success, pruned, errors }
     */
    const syncTeamsForSegment = async (guild, targetSegment) => {
        const stats = {
            found: 0,
            success: 0,
            pruned: 0,
            errors: []
        };

        // Check if this segment has a valid configuration in ChallengesRolesId
        const challengeID = targetSegment.challengeID;
        if (!bot.olympe.challengesRolesId || !bot.olympe.challengesRolesId.competitions[challengeID]) {
            // stats.errors.push({ name: 'Configuration', error: `Segment "${targetSegment.name}" (Challenge ${challengeID}) has no Role Configuration.` });
            // Or just skip silently?
            return stats;
        }

        bot.log(`Syncing teams for Segment: ${targetSegment.name}...`, 'TeamManager');

        const olympeTeams = bot.olympe ? bot.olympe.teams : [];
        const activeChannelNames = [];

        for (const team of olympeTeams) {
            try {
                if (!team.segments) continue;

                const hasSegment = team.segments.some(s => {
                    const id = (typeof s === 'object') ? s.id : s;
                    return id === targetSegment.id;
                });

                if (!hasSegment) continue;

                stats.found++;

                // Create/Update Channel
                const teamChannel = new TeamChannel(bot, team, targetSegment);
                await teamChannel.ensureChannel(guild);
                activeChannelNames.push(teamChannel.channelName);
                stats.success++;

            } catch (error) {
                console.error(`Error syncing team ${team.name}:`, error);
                stats.errors.push({ name: team.name, error: error.message });
            }
        }

        // Prune old channels in this segment's category
        const categoryName = targetSegment.name;
        const categories = guild.channels.cache.filter(c =>
            c.type === require('discord.js').ChannelType.GuildCategory &&
            c.name.startsWith(categoryName)
        );

        const pruneIds = [];
        for (const [catId, cat] of categories) {
            const children = guild.channels.cache.filter(c =>
                c.parentId === catId &&
                c.type === require('discord.js').ChannelType.GuildVoice &&
                c.name.startsWith(TeamChannel.CHANNEL_PREFIX) &&
                !activeChannelNames.includes(c.name)
            );
            children.forEach(c => pruneIds.push(c));
        }

        if (pruneIds.length > 0) {
            bot.log(`Pruning ${pruneIds.length} old team channels in "${categoryName}"...`, 'TeamManager');
            for (const channel of pruneIds) {
                try {
                    await channel.delete('Auto-prune old team channel in segment');
                    stats.pruned++;
                } catch (error) {
                    console.error(`Failed to prune channel ${channel.name}:`, error);
                }
            }
        }

        return stats;
    };


    /**
     * Synchronise toutes les équipes présentes dans le cache Olympe pour un segment donné ou tous les segments.
     * @param {import('discord.js').Guild} guild
     * @param {string} [segmentFilter] - Filtre optionnel pour le segment.
     */
    const syncAllTeams = async (guild, segmentFilter = null) => {
        if (!guild) return;

        const allSegments = bot.olympe ? bot.olympe.segments : [];
        if (!allSegments || allSegments.length === 0) return '❌ Aucun segment trouvé dans le cache Olympe.';

        let segmentsToProcess = [];

        if (segmentFilter) {
            const targetSegment = allSegments.find(s => s.name && s.name.toLowerCase() === segmentFilter.toLowerCase());
            if (!targetSegment) return `❌ Segment "${segmentFilter}" introuvable dans le cache.`;
            segmentsToProcess.push(targetSegment);
        } else {
            segmentsToProcess = allSegments;
        }

        bot.log(`Starting massive sync for ${segmentsToProcess.length} segments...`, 'TeamManager');

        let globalStats = {
            found: 0,
            success: 0,
            pruned: 0,
            errors: []
        };

        for (const segment of segmentsToProcess) {
            const stats = await syncTeamsForSegment(guild, segment);
            globalStats.found += stats.found;
            globalStats.success += stats.success;
            globalStats.pruned += stats.pruned;
            globalStats.errors = [...globalStats.errors, ...stats.errors];
        }

        bot.log('Massive team sync complete.', 'TeamManager');

        // Generate Report
        let report = `✅ **Synchronisation Terminée** (${segmentFilter ? 'Segment : ' + segmentFilter : 'TOUT'})\n`;
        report += `📋 Équipes trouvées : **${globalStats.found}**\n`;
        report += `✅ Salons traités : **${globalStats.success}**\n`;

        if (globalStats.pruned > 0) {
            report += `🗑️ Salons supprimés (anciens) : **${globalStats.pruned}**\n`;
        }

        if (globalStats.errors.length > 0) {
            report += `\n❌ **Erreurs (${globalStats.errors.length}) :**\n`;
            // Limit error display if too many
            const displayErrors = globalStats.errors.slice(0, 10);
            displayErrors.forEach(e => {
                report += `- **${e.name}** : ${e.error}\n`;
            });
            if (globalStats.errors.length > 10) {
                report += `... et ${globalStats.errors.length - 10} autres erreurs.`;
            }
        } else {
            report += `✨ Aucune erreur.`;
        }

        return report;
    };


    // Écoute l'événement de fin de chargement du cache Olympe (AutoRole)
    bot.on('olympeUserCacheReady', async () => {
        isReady = true;
        bot.olympeCacheReady = true;
        bot.log('Olympe/AutoRole cache ready. TeamManager waiting for command.', 'TeamManager');
    });

    // Écoute l'ajout/mise à jour d'un membre Olympe
    // payload: { discordUser, olympeMember, team }
    bot.on('olympeMember', async ({ discordUser, olympeMember, team }) => {
        if (!isReady) return;

        const guild = await bot.guilds.fetch(bot.home).catch(() => null);
        if (!guild) return;

        const isAuthorized = (() => {
            if (!team.segments || !bot.olympe.challengesRolesId) return false;
            for (const segment of team.segments) {
                const challengeID = segment.challengeID;
                if (!challengeID) continue;
                const challengeConfig = bot.olympe.challengesRolesId.competitions[challengeID];
                if (!challengeConfig) continue;
                const segmentName = segment.name;
                const categories = ['club', 'coach', 'manager', 'player'];
                for (const cat of categories) {
                    if (challengeConfig[cat] && challengeConfig[cat][segmentName]) return true;
                }
            }
            return false;
        })();

        if (!isAuthorized) return;

        try {
            const teamChannel = new TeamChannel(bot, team);
            await teamChannel.ensureChannel(guild);
            bot.log(`Updated team channel for ${team.name} due to member update.`, 'TeamManager');
        } catch (error) {
            console.error(`Error updating team channel for ${team?.name}:`, error);
        }
    });

    // START EXPORT MODIFICATION
    // Attach syncAllTeams to bot for command access (or export it strictly via module)
    // Since commands are loaded separately and 'require' this file again might not give the same closure scope if not cached properly (it is cached), 
    // but the pattern here returns an object. 
    // We can attach to bot.teamManager (if it exists) or just trust the command to assume structure.

    bot.teamManager = {
        syncAllTeams
    };

    const CreateAllTeamChannelsCommand = require('./commands/CreateAllTeamChannelsCommand');
    const DeleteAllTeamChannelsCommand = require('./commands/DeleteAllTeamChannelsCommand');
    const UpdateTeamChannelPermissionsCommand = require('./commands/UpdateTeamChannelPermissionsCommand');

    return {
        CreateAllTeamChannelsCommand,
        DeleteAllTeamChannelsCommand,
        UpdateTeamChannelPermissionsCommand,
        dependencies: ['Olympe', 'AutoRole']
    };
};
