const { Discord, ChannelType } = require('discord.js');
const Bot = require('../../../Class/Bot.js');
const { getTeamByName } = require('../../../services/apiService.js');
const getTextChannelName = require('../../../utils/getTextChannelName.js');

/**
 * Recuperer un nom de gradin
 * @param {String} divisionName
 * @returns {String}
 */
const getGradinsName = (divisionName) => {
	return `Gradins : ${divisionName}`;
};

/**
 * Extrait les noms des deux équipes d'un objet match.
 * @param {object} match - L'objet match.
 * @returns {Array<string>} Un tableau contenant les noms des deux équipes.
 */
const getTeamNamesFromMatch = (match) => {
	return [match.team1.name, match.team2.name];
};

/**
 * Récupère les objets équipe complets à partir d'un objet match en utilisant leurs noms.
 * @param {Bot} bot - L'instance du bot.
 * @param {object} match - L'objet match.
 * @returns {Promise<Array<object>>} Une promesse qui se résout avec un tableau des deux objets équipe.
 */
const getTeamsFromMatch = async (bot, match) => {
	// Nécessite de refaire une call pour obtenir els members
	const team1 = await getTeamByName(bot, match.team1.name);
	const team2 = await getTeamByName(bot, match.team2.name);
	return [team1, team2];
};

/**
 * Extrait les IDs Discord de tous les membres d'une équipe.
 * @param {object} team - L'objet équipe.
 * @returns {Array<string>} Un tableau des IDs Discord des membres.
 */
const getUsersDiscordIdFromTeam = (team) => {
	// const membersDiscordIds = team.lineup?.members
	const membersDiscordIds = team.members.concat(team.membersLent.map(m=>m.member))
		.filter((member) => member.user.thirdparties && member.user.thirdparties.discord)
		.map((member) => member.user.thirdparties.discord.discordID);

	// TODO ajouter memeberLent ?
	// const substitutesDiscordIds = team.lineup?.substitutes
	// .filter((member) => member.user.thirdparties && member.user.thirdparties.discord)
	// .map((member) => member.user.thirdparties.discord.discordID);

	// return [...(membersDiscordIds || []), ...(substitutesDiscordIds || [])];
	return [...(membersDiscordIds || [])];
};

/**
 * Récupère l'ID Discord d'un objet utilisateur Olympe.
 * @param {object} user - L'objet utilisateur Olympe.
 * @returns {string|undefined} L'ID Discord de l'utilisateur, ou undefined s'il n'est pas trouvé.
 */
const getDiscordId = (user) => {
	return user.thirdparties?.discord?.discordID;
};

/**
 * Vérifie si un match commence dans une période de temps donnée.
 * @param {number} timestamp - Le timestamp Unix du début du match.
 * @param {number} hoursToRetrieve - Le nombre d'heures dans le futur à vérifier.
 * @returns {boolean} `true` si le match commence bientôt, sinon `false`.
 */
const isMatchStartedSoon = (timestamp, hoursToRetrieve) => {
	if (
		!timestamp ||
		typeof timestamp !== 'number' ||
		!hoursToRetrieve ||
		typeof hoursToRetrieve !== 'number'
	) {
		console.error('isMatchStartedSoon : Invalid args provided.');
		return false;
	}

	const now = new Date();
	const nextHours = new Date(now.getTime() + hoursToRetrieve * 60 * 60 * 1000);

	const givenDate = new Date(timestamp * 1000);
	return givenDate > now && givenDate < nextHours;
};

/**
 * Vérifie si un match est terminé depuis plus longtemps que la durée maximale autorisée.
 * @param {number} timestamp - Le timestamp Unix du début du match.
 * @param {number} maximumMatchDuration - La durée maximale d'un match en heures pour le considérer comme "passé".
 * @returns {boolean} `true` si le match est considéré comme terminé, sinon `false`.
 */
const isMatchAlreadyPlayed = (timestamp, maximumMatchDuration) => {
	if (
		!timestamp ||
		typeof timestamp !== 'number' ||
		!maximumMatchDuration ||
		typeof maximumMatchDuration !== 'number'
	) {
		console.error('isMatchAlreadyPlayed : Invalid args provided.');
		return false;
	}

	const now = new Date();
	const previousHours = new Date(now.getTime() - maximumMatchDuration * 60 * 60 * 1000);
	const givenDate = new Date(timestamp * 1000);
	return givenDate < previousHours;
};

/**
 * Formate un timestamp en une chaîne "HHhMM".
 * @param {number} timestamp - Le timestamp Unix à formater.
 * @returns {string} L'heure formatée.
 */
const getHoursMinutesOfMatch = (timestamp) => {
	const date = new Date(timestamp * 1000);
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return hours + 'h' + minutes;
};

/**
 * Renvoie un nom de channel en fonction de donnée de match, en respectant les contraintes des Discord.GuildTextChannel
 * @param {String} teamNames
 * @param {String} hoursMinutes
 * @returns {String}
 */
const generateMatchTextChannelName = (teamNames, hoursMinutes) => {
	let textChannelName = '';
	for (const teamName of teamNames) {
		textChannelName += teamName.toString() + '_';
	}
	textChannelName += hoursMinutes;
	return getTextChannelName(textChannelName);
};

/**
 * Génère un nom pour un salon vocal d'équipe.
 * @param {string} teamName - Le nom de l'équipe.
 * @param {string} hoursMinutes - L'heure du match au format "HHhMM".
 * @returns {string} Le nom généré pour le salon vocal.
 */
const generateVoiceChannelName = (teamName, hoursMinutes) => {
	return teamName + ' - ' + hoursMinutes;
};

/**
 * Verifie qu'un channel correspond au channel type (nom + type)
 * @param {Discord.Channel} channel
 */
const checkChannelPattern = (channel) => {
	return (
		(channel.name.match(/.+ \- [0-9]{2}h[0-9]{2}$/) && //Team 1 - 22h22
			channel.type == ChannelType.GuildVoice) ||
		(channel.name.match(/.+\_.+\_[0-9]{2}h[0-9]{2}$/) && // team-1_team-2_18h26
			channel.type == ChannelType.GuildText) ||
		// (channel.name.match(/.+\-.+\-[0-9]{2}h[0-9]{2} \- .+\#[0-9]+$/) && // team-1-team-2-18h26 - Zugmat#1234
		// 	channel.type == ChannelType.GuildVoice) ||
		(channel.name.match(/🎥🔴 \- .+$/) && // 🎥🔴 - aydenplay
			channel.type == ChannelType.GuildVoice)
	);
};

/**
 * Supprimer tout les channels qui correspondent a des channels de matchs. Possibilité d'inclure des exceptions a ne pas suprimer
 * @param {Discord.Guild} guild
 * @param {Array<String>} exceptionName Nom des channel a ne pas supprimer
 * @param {Boolean} forceWash forcer le nettoyage meme si la date de creation du salon est ok
 */
const washOldChannels = async (guild, exceptionName = [], forceWash) => {
	if (!guild) throw new Error('Guild or divisionName not found');

	let nbrDeleteChannels = 0;
	for (let [, channel] of guild.channels.cache) {
		if (!exceptionName.includes(channel.name) && checkChannelPattern(channel)) {
			if (channel.type == ChannelType.GuildVoice && channel.members.size > 0) continue;

			const channelCanBeDelete =
				channel.createdTimestamp +
					(guild.client.modules.ChannelManager.maximumMatchDuration +
						guild.client.modules.ChannelManager
							.maximumNumberOfHoursToRetrieveFutureMatches) *
						60 *
						60 *
						1000 <
				Date.now();

			if (!channelCanBeDelete && !forceWash) continue;

			if (channel.type == ChannelType.GuildVoice && channel.members.size > 0) continue;

			await guild.channels.delete(channel);
			nbrDeleteChannels++;
			console.log(
				`[${guild.client.name}] CHANNELMANAGER : Nettoyage du channel ${channel.name}`
			);
		}
	}
};

/**
 * Supprime les categories avec un nom de competition qui sont vide
 * @param {Bot} bot
 * @param {Discord.Guild} guild
 */
const washEmptyCategory = async (bot, guild) => {
	for (const challengeId in bot.modules.AutoRole.roleIds.competitions) {
		const divisionNames = Object.keys(
			bot.modules.AutoRole.roleIds.competitions[challengeId].player
		);
		for (const divisionName of divisionNames) {
			const gradinsName = getGradinsName(divisionName);
			for (let [, category] of guild.channels.cache.filter(
				(c) => c.name.includes(divisionName) && c.type === ChannelType.GuildCategory
			)) {
				const gradins = category.children.cache.find((chan) => chan.name == gradinsName);
				if (
					category.children.cache.size === 0 ||
					(category.children.cache.size === 1 && gradins)
				) {
					await category.delete();
					await gradins?.delete();
					console.log(`Catégorie '${divisionName}' supprimée car vide.`);
				}
			}
		}
	}
};
/**
 * Extrait les IDs de tous les casters d'un objet match.
 * @param {object} match - L'objet match.
 * @returns {Array<string>} Un tableau des IDs des casters.
 */
const getCastersId = (match) => {
	return match.casters.map((caster) => caster.id);
};

module.exports = {
	getTeamNamesFromMatch,
	getUsersDiscordIdFromTeam,
	isMatchAlreadyPlayed,
	isMatchStartedSoon,
	getHoursMinutesOfMatch,
	generateMatchTextChannelName,
	generateVoiceChannelName,
	getCastersId,
	getTeamsFromMatch,
	getDiscordId,
	checkChannelPattern,
	washOldChannels,
	washEmptyCategory,
	getGradinsName,
};
