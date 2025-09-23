const { schedule } = require('node-cron');
const { getFutureMatchs, getUserById } = require('../../services/apiService');
const {
	isMatchStartedSoon,
	getTeamsFromMatch,
	getCastersId,
} = require('../ChannelManager/utils/utils');
const { getMatchDivisionName, getChallengeDivision } = require('../../utils/matchUtils');
const { notifyMatch } = require('../../services/discordService');

function instanciateMatchNotifier(bot) {
	return (bot.olympe.MatchNotifier = { cache: new Map() });
}

function saveMatchNotif(bot, matchId) {
	return bot.olympe.MatchNotifier.cache.set(matchId, new Date());
}

function checkMatchNotif(bot, matchId) {
	return bot.olympe.MatchNotifier.cache.has(matchId);
}

/**
 * Ce module a pour but de notifier les membres de la communauté des matchs à venir.
 *
 * À l'aide d'une tâche planifiée (cron), il interroge régulièrement l'API pour obtenir la liste des futurs matchs.
 * Pour chaque match, il vérifie si la date de début est proche et si des casters y ont été assignés.
 * Si c'est le cas, et qu'aucune notification n'a déjà été envoyée pour ce match, il publie un message dans le salon de notification approprié.
 * Ce message mentionne les équipes, la division, l'heure du match, les casters, et notifie également le rôle Discord correspondant pour assurer une visibilité maximale.
 *
 * @param {Bot} bot - L'instance du bot.
 */
module.exports = (bot) => {
	const getNotificationRoleIdByDivision = (competId, divisionName) => {
		return bot.modules.MatchNotifier.notifRoleId[competId][divisionName];
	};

	const getNotifChannelIdByCompetition = (competId) => {
		return bot.modules.MatchNotifier.competitions[competId].channelId;
	};

	bot.on('ready', async () => {
		const guild = bot.guilds.cache.get(bot.home);

		instanciateMatchNotifier(bot);

		// console.log(bot.modules.ChannelManager)
		// TEST =====================================================================
		// bot.modules.MatchNotifier.cronSchedule = '*/1 * * * *';
		// bot.modules.ChannelManager.maximumNumberOfHoursToRetrieveFutureMatches = 48;
		// TEST =====================================================================
		await schedule(bot.modules.MatchNotifier.cronSchedule, async () => {
			console.log(`[${bot.name}] MATCHNOTIFIER : start`);
			try {
				const futuresMatchs = await getFutureMatchs(bot);
				// if (bot.name.includes('AFO')) return; //! TEST
				for (const match of futuresMatchs) {
					if (
						match.matchDate &&
						isMatchStartedSoon(
							match.matchDate,
							bot.modules.MatchNotifier.maximumNumberOfHoursToRetrieveFutureMatches
						)
					) {
						const casterIds = getCastersId(match);
						if (!casterIds.length) continue;

						const casters = [];
						for (const casterId of casterIds) {
							const caster = await getUserById(bot, casterId);
							casters.push(caster);
						}
						const teams = await getTeamsFromMatch(bot, match);
						const competId = getChallengeDivision(match);
						const channelId = getNotifChannelIdByCompetition(competId);
						const channel = guild.channels.cache.get(channelId);
						if (!channel) {
							throw new Error(
								`[${bot.name}] MatchNotifier : Channel ${channelId} not found`
							);
						}
						const division = getMatchDivisionName(match);
						const timestamp = match.matchDate;
						const roleId = getNotificationRoleIdByDivision(competId, division);

						if (casters.length > 0 && !checkMatchNotif(bot, match.id)) {
							await notifyMatch(
								bot,
								teams,
								division,
								timestamp,
								casters,
								channel,
								roleId
							).then(() => {
								saveMatchNotif(bot, match.id);
							});
						}
					}
				}
			} catch (error) {
				console.error('Error getting matchs: ', error);
			}
			console.log(`[${bot.name}] MATCHNOTIFIER : end`);
		});
	});
};
