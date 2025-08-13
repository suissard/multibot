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
	// TEST ===============================================
	// const matchs = require('./tests/json/matchs.json');
	// const team1 = require('./tests/json/Team 1.json');
	// const team2 = require('./tests/json/Team 2.json');
	// const users = require('./tests/json/casters.json');

	// matchs[0] = { ...matchs[0], matchDate: Math.floor(new Date().getTime() / 1000 + 1000) };

	// bot.olympe.api.teams = {
	// 	get: (name) =>
	// 		name == 'Team 1'? team1:team2
	// };
	// bot.olympe.api.matchs = {
	// 	get: () => matchs[0],
	// 	list: () => matchs,
	// };
	// bot.olympe.api.users = { get: () => users[0] };
	// TEST ===============================================

	return (bot.olympe.MatchNotifier = { cache: new Map() });
}

/**
 * Ajoute l'identifiant d'un match en cahche pour verifier si il a bien bénéficié d'une notification
 * @param {Bot} bot Bot discord
 * @param {String} matchId Identifiant de match
 * @returns
 */
function saveMatchNotif(bot, matchId) {
	// TODO stocker en cache ou regarder les channels existants
	return bot.olympe.MatchNotifier.cache.set(matchId, new Date());
}

/**
 *
 * @param {*} bot
 * @param {*} matchId
 * @returns
 */
function checkMatchNotif(bot, matchId) {
	return bot.olympe.MatchNotifier.cache.has(matchId);
}

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
