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
const { schedule } = require('node-cron');
const { getFutureMatchs, getUserById } = require('../../services/apiService');
const {
	isMatchStartedSoon,
	getTeamsFromMatch,
	getCastersId,
} = require('../ChannelManager/utils/utils');
const { getMatchDivisionName, getChallengeDivision } = require('../../utils/matchUtils');
const { notifyMatch } = require('../../services/discordService');

/**
 * Initialise le cache pour le notificateur de matchs sur l'objet bot.
 * @param {Bot} bot - L'instance du bot.
 * @returns {object} L'objet cache du MatchNotifier.
 */
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
 * Ajoute l'identifiant d'un match au cache pour marquer qu'il a été notifié.
 * @param {Bot} bot - L'instance du bot.
 * @param {string} matchId - L'identifiant du match.
 */
function saveMatchNotif(bot, matchId) {
	// TODO stocker en cache ou regarder les channels existants
	return bot.olympe.MatchNotifier.cache.set(matchId, new Date());
}

/**
 * Vérifie si un match a déjà été notifié en consultant le cache.
 * @param {Bot} bot - L'instance du bot.
 * @param {string} matchId - L'identifiant du match.
 * @returns {boolean} `true` si le match a été notifié, sinon `false`.
 */
function checkMatchNotif(bot, matchId) {
	return bot.olympe.MatchNotifier.cache.has(matchId);
}

/**
 * Initialise le module MatchNotifier pour un bot.
 * Ce module envoie des notifications pour les matchs à venir via une tâche planifiée (cron).
 * @param {Bot} bot - L'instance du bot.
 */
module.exports = (bot) => {
	/**
	 * Récupère l'ID du rôle de notification pour une division de compétition spécifique.
	 * @param {string} competId - L'ID de la compétition.
	 * @param {string} divisionName - Le nom de la division.
	 * @returns {string} L'ID du rôle de notification.
	 */
	const getNotificationRoleIdByDivision = (competId, divisionName) => {
		return bot.modules.MatchNotifier.notifRoleId[competId][divisionName];
	};

	/**
	 * Récupère l'ID du salon de notification pour une compétition spécifique.
	 * @param {string} competId - L'ID de la compétition.
	 * @returns {string} L'ID du salon de notification.
	 */
	const getNotifChannelIdByCompetition = (competId) => {
		return bot.modules.MatchNotifier.competitions[competId].channelId;
	};

	/**
	 * Une fois le bot prêt, ce gestionnaire configure et lance la tâche planifiée
	 * pour l'envoi des notifications de match.
	 */
	bot.on('clientReady', async () => {
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

	return {
		dependencies: ['Olympe']
	};
};
