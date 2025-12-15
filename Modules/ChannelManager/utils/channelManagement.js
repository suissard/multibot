const { Discord, ChannelType, PermissionsBitField } = require('discord.js');
const {
	getTeamNamesFromMatch,
	getUsersDiscordIdFromTeam,
	getHoursMinutesOfMatch,
	generateMatchTextChannelName,
	generateVoiceChannelName,
	getCastersId,
	getTeamsFromMatch,
	getDiscordId,
	getGradinsName,
} = require('./utils');
const {
	checkIfChannelExists,
	mentionUsersInChannel,
	createChannel,
	setPermissions,
} = require('../../../services/discordService');
const { getUserById } = require('../../../services/apiService');
const { getMatchDivisionName } = require('../../../utils/matchUtils');

const { isMatchAlreadyPlayed, washOldChannels, washEmptyCategory } = require('../utils/utils');
const { getPastMatchs, getFutureMatchs, getMatchById } = require('../../../services/apiService');
const { isMatchStartedSoon } = require('../../../utils/dateUtils');
const Bot = require('../../../Class/Bot');

/**
 * Crée tous les salons (vocaux et textuels) associés à un match spécifique.
 * @param {Bot} bot - L'instance du bot.
 * @param {object} match - L'objet match contenant les détails de la rencontre.
 * @param {import('discord.js').Guild} guild - La guilde où créer les salons.
 * @returns {Promise<Array<import('discord.js').GuildChannel>>} Une promesse qui se résout avec un tableau des salons créés.
 */
const createMatchChannels = async (bot, match, guild) => {
	const division = getMatchDivisionName(match);
	const teamNames = getTeamNamesFromMatch(match);
	const castersId = getCastersId(match);
	const teams = await getTeamsFromMatch(bot, match); //manque els memebers
	const hoursMinutes = getHoursMinutesOfMatch(match.matchDate);
	const channelNames = [];
	let channels = [];
	const matchDiscordUsers = [];
	const casters = await Promise.all(castersId.map((id) => getUserById(bot, id)));

	let category = await findOrCreateCategory(guild, division);
	// console.log(`[${bot.name}] ChannelManager get category: ${category}`);
	if (!category) {
		console.error('Category not found:', division);
		return;
	}

	let textChannelName = generateMatchTextChannelName(teamNames, hoursMinutes);

	channels = channels.concat(
		await createTeamChannels(
			bot,
			guild,
			teams,
			category,
			hoursMinutes,
			matchDiscordUsers,
			channelNames
		)
	);
	channels = channels.concat(
		await createCasterChannels(
			bot,
			guild,
			casters,
			category,
			textChannelName,
			matchDiscordUsers,
			channelNames
		)
	);
	channels = channels.concat(
		await createTextChannel(
			bot,
			guild,
			category,
			textChannelName,
			match,
			teams,
			casters,
			matchDiscordUsers,
			channelNames
		)
	);

	return channels;
};

/**
 * Trouve une catégorie existante pour une division qui n'est pas pleine (moins de 50 salons),
 * ou en crée une nouvelle si nécessaire.
 * @param {import('discord.js').Guild} guild - La guilde où chercher ou créer la catégorie.
 * @param {string} divisionName - Le nom de la division, utilisé pour nommer la catégorie.
 * @returns {Promise<import('discord.js').CategoryChannel>} La catégorie trouvée ou créée.
 */
const findOrCreateCategory = async (guild, divisionName) => {
	const categories = guild.channels.cache.filter(
		(c) => c.name.includes(divisionName) && c.type === ChannelType.GuildCategory
	);
	// console.log('Categories found:', categories, 'Is mock?', categories.find && categories.find._isMockFunction);
	const category =
		categories.find((chan) => chan.children.cache.size < 40) ||
		(await guild.channels.create({
			name: divisionName + (categories.size == 0 ? '' : ' ' + categories.size),
			type: ChannelType.GuildCategory,
		}));
	await findOrCreateGradins(category, divisionName, guild.client);
	return category;
};

/**
 * Trouve ou crée le salon vocal "Gradins" dans une catégorie donnée et configure ses permissions.
 * @param {import('discord.js').CategoryChannel} category - La catégorie où chercher ou créer le salon.
 * @param {string} divisionName - Le nom de la division, utilisé pour les permissions.
 * @param {Bot} bot - L'instance du bot.
 * @returns {Promise<import('discord.js').VoiceChannel>} Le salon vocal "Gradins".
 */
const findOrCreateGradins = async (category, divisionName, bot) => {
	const gradinsName = getGradinsName(divisionName);
	const channel =
		category.children.cache.find((chan) => chan.name == gradinsName) ||
		(await category.children.create({
			name: gradinsName,
			type: ChannelType.GuildVoice,
			parent: category.id,
			position: 0,
			permissionOverwrites: [],
		}));

	const permissions = [
		{
			id: channel.guild.id,
			allow: [
				PermissionsBitField.Flags.ViewChannel,
				PermissionsBitField.Flags.Connect,
				PermissionsBitField.Flags.Speak,
				PermissionsBitField.Flags.SendMessages,
				PermissionsBitField.Flags.SendMessagesInThreads,
				PermissionsBitField.Flags.ReadMessageHistory,
				PermissionsBitField.Flags.Stream,
			],
		},
	];

	let divisionRoleId,
		casterRoleId = bot.modules.AutoRole.guilds[category.guild.id].specialRoles.caster.id;
	const competitionRolesId = channel.client.modules.AutoRole.roleIds.competitions;
	for (const challengeId in competitionRolesId) {
		//TODO s'arrete au premeri challenge => pas souple
		divisionRoleId = competitionRolesId[challengeId].player[divisionName];
		break;
	}
	const divisionRole = channel.guild.roles.cache.get(divisionRoleId);
	const casterRole = channel.guild.roles.cache.get(casterRoleId);
	if (divisionRole)
		permissions.push({
			id: divisionRoleId,
			allow: [PermissionsBitField.Flags.MoveMembers],
		});
	if (casterRole)
		permissions.push({
			id: casterRoleId,
			allow: [PermissionsBitField.Flags.MoveMembers],
		});

	await channel.permissionOverwrites.set(permissions);
	return channel;
};

/**
 * Crée les salons vocaux privés pour chaque équipe d'un match.
 * @param {Bot} bot - L'instance du bot.
 * @param {import('discord.js').Guild} guild - La guilde.
 * @param {Array<object>} teams - Un tableau des deux équipes du match.
 * @param {import('discord.js').CategoryChannel} category - La catégorie où créer les salons.
 * @param {string} hoursMinutes - L'heure du match au format HH-MM.
 * @param {Array<import('discord.js').GuildMember>} matchDiscordUsers - Un tableau (muté par la fonction) pour collecter tous les membres du match.
 * @returns {Promise<Array<import('discord.js').VoiceChannel>>} Un tableau des salons vocaux d'équipe créés.
 */
const createTeamChannels = async (bot, guild, teams, category, hoursMinutes, matchDiscordUsers) => {
	const channels = [];
	for (const team of teams) {
		const voiceChannelName = generateVoiceChannelName(team.name, hoursMinutes);

		const discordIds = getUsersDiscordIdFromTeam(team).filter((id) => id);

		let discordUsers = await Promise.all(
			discordIds.map((id) => guild.members.fetch(id).catch(() => null))
		);

		discordUsers = discordUsers.filter((user) => user);
		matchDiscordUsers.push(...discordUsers);

		const channel =
			checkIfChannelExists(guild, voiceChannelName, category, ChannelType.GuildVoice) ||
			(await createChannel(bot, category, guild, voiceChannelName, ChannelType.GuildVoice));
		channels.push(channel);
		await setPermissions(channel, discordUsers, ChannelType.GuildVoice);
	}
	return channels;
};

/**
 * Crée les salons vocaux pour les casters d'un match.
 * @param {Bot} bot - L'instance du bot.
 * @param {import('discord.js').Guild} guild - La guilde.
 * @param {Array<object>} casters - Un tableau des casters du match.
 * @param {import('discord.js').CategoryChannel} category - La catégorie où créer les salons.
 * @param {string} textChannelName - Le nom du salon textuel du match.
 * @param {Array<import('discord.js').GuildMember>} matchDiscordUsers - Un tableau (muté par la fonction) pour collecter les casters.
 * @returns {Promise<Array<import('discord.js').VoiceChannel>>} Un tableau des salons vocaux de caster créés.
 */
const createCasterChannels = async (
	bot,
	guild,
	casters,
	category,
	textChannelName,
	matchDiscordUsers,
	channelNames
) => {
	const channels = [];
	for (const caster of casters) {
		const casterVoiceChannelName = `🎥🔴 - ${caster.castUrl.split(/\..+\//)[1]}`;

		const channel =
			checkIfChannelExists(guild, casterVoiceChannelName, category, ChannelType.GuildVoice) ||
			(await createChannel(
				bot,
				category,
				guild,
				casterVoiceChannelName,
				ChannelType.GuildVoice
			));
		channels.push(channel);
		let discordUser;
		const casterDiscordId = getDiscordId(caster);
		if (casterDiscordId) {
			discordUser = await guild.members.fetch(casterDiscordId).catch(() => null);
			if (discordUser) {
				matchDiscordUsers.push(discordUser);
			}
		}

		const permissions = [
			{
				id: guild.id,
				allow: [PermissionsBitField.Flags.ViewChannel],
				deny: [PermissionsBitField.Flags.Connect],
			},
		];

		if (discordUser)
			permissions.push({
				id: discordUser.id,
				allow: [
					PermissionsBitField.Flags.Connect,
					PermissionsBitField.Flags.Speak,
					PermissionsBitField.Flags.ViewChannel,
					PermissionsBitField.Flags.SendMessages,
					PermissionsBitField.Flags.SendMessagesInThreads,
					PermissionsBitField.Flags.ReadMessageHistory,
					PermissionsBitField.Flags.MoveMembers,
				],
			});
		await channel.permissionOverwrites.set(permissions);
	}
	return channels;
};

/**
 * Crée le salon textuel commun pour un match.
 * @param {Bot} bot - L'instance du bot.
 * @param {import('discord.js').Guild} guild - La guilde.
 * @param {import('discord.js').CategoryChannel} category - La catégorie où créer le salon.
 * @param {string} textChannelName - Le nom du salon à créer.
 * @param {object} match - L'objet match.
 * @param {Array<object>} teams - Les équipes du match.
 * @param {Array<object>} casters - Les casters du match.
 * @param {Array<import('discord.js').GuildMember>} matchDiscordUsers - La liste de tous les participants pour définir les permissions.
 * @returns {Promise<Array<import('discord.js').TextChannel>>} Un tableau contenant le salon textuel créé.
 */
const createTextChannel = async (
	bot,
	guild,
	category,
	textChannelName,
	match,
	teams,
	casters,
	matchDiscordUsers
) => {
	const channelExist = await checkIfChannelExists(
		guild,
		textChannelName,
		category,
		ChannelType.GuildText
	);
	const channel =
		channelExist ||
		(await createChannel(bot, category, guild, textChannelName, ChannelType.GuildText));
	await setPermissions(channel, matchDiscordUsers, ChannelType.GuildText);

	if (!channelExist) mentionUsersInChannel(channel, match.matchDate, teams, casters, match.id);
	return [channel];
};

/**
 * Fonction principale du module : gère l'ensemble du cycle de vie des salons de match.
 * Récupère les matchs à venir et passés récents, crée les salons nécessaires,
 * et nettoie les anciens salons et les catégories vides.
 * @param {Bot} bot - L'instance du bot.
 * @param {import('discord.js').Guild} guild - La guilde à gérer.
 */
const autoChannel = async (bot, guild) => {
	console.log(`[${bot.name}] CHANNELMANAGER : Start`);
	let exceptionName = [];
	const divisionNames = [];
	let futuresMatchs = await getFutureMatchs(bot);
	let pastMatchs = await getPastMatchs(bot);

	futuresMatchs = futuresMatchs.filter((match) =>
		isMatchStartedSoon(
			match.matchDate,
			bot.modules.ChannelManager.maximumNumberOfHoursToRetrieveFutureMatches
		)
	);
	pastMatchs = pastMatchs.filter(
		(match) =>
			!isMatchAlreadyPlayed(match.matchDate, bot.modules.ChannelManager.maximumMatchDuration)
	);
	const matchs = futuresMatchs.concat(pastMatchs);

	for (const m of matchs) {
		try {
			const match = await getMatchById(bot, m.id);
			const channels = (await createMatchChannels(bot, match, guild)) || [];
			exceptionName = exceptionName.concat(channels.map((c) => c.name));
			if (divisionNames.indexOf(match.segment.name) === -1)
				divisionNames.push(match.segment.name);
		} catch (error) {
			console.error('Error getting matchs: ', error);
		}
	}

	// supprimer les channels useless
	await washOldChannels(guild, exceptionName).catch(console.error);
	await washEmptyCategory(bot, guild);
	console.log(`[${bot.name}] CHANNELMANAGER : End`);
};

module.exports = {
	createMatchChannels,
	autoChannel,
	getGradinsName,
	findOrCreateGradins,
	findOrCreateCategory,
};
