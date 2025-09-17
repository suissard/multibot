const Bot = require('../../../Class/Bot');
const Discord = require('discord.js');
const {
	getUserById,
	getACLusers,
	getCasterUsers,
	getOwnerUsers,
} = require('../../../services/apiService');
const simultaneousRequest = require('../../../Tools/simultaneousRequest.js');
const ChallengesRolesId = require('../models/ChallengesRolesId.js');

const clubRolesList = [
	'owner',
	'president',
	'vice president',
	'staff',
	'communication',
	'esport director',
	'video analyst',
];
const managerRolesList = ['manager', 'assistant manager'];
const coachRolesList = ['head coach', 'mental coach'];

/**
 * Ajoute les données olympe des utilisateurs avec un discordId valable, à un objet global stocké dans le bot concerné (bot.olympe.users)
 * @param {OlympeMember} olympeMember
 * @param {OlympeTeam} team
 * @param {Bot} bot
 */
const addOlympeUserData = (olympeMember, team, bot) => {
	if (!bot.olympe.users[olympeMember.user.thirdparties.discord.discordID]) {
		//usage des models ?
		bot.olympe.users[olympeMember.user.thirdparties.discord.discordID] = {
			id: olympeMember.user.id,
			username: olympeMember.user.username,
		};
	}

	// filtrer segments valide et le mettre en avant
	let valideSegment = team.segments.find((segment) =>
		bot.olympe.segments.find((seg) => seg.id === segment.id || seg.id === segment)
	);
	if (valideSegment && !valideSegment.id) {
		valideSegment = bot.olympe.segments.find((seg) => seg.id === valideSegment);
		team.segments = [valideSegment];
	}
	// if (valideSegment) {
	//utile au secretrariat (Secretary.js > getMessageFooterFromUser)
	bot.olympe.users[olympeMember.user.thirdparties.discord.discordID][team.name] = {
		// roles: valideSegment ? getRoleToAdd(olympeMember) : [],
		roles: getRoleToAdd(olympeMember),
		segmentName: valideSegment?.name,
		segmentId: valideSegment?.id,
		//TODO ajouter donnée de pool ?
		// poolName: team.pool.name,
		// poolId: team.pool.id,
		// 	};
	};
};

/**
 * Renvoie un nom en fonction des arguments
 * @param {OlympeUser} olympeUser
 * @param {Discord.User} discordUser
 * @param {String} teamName
 * @returns {String} name
 */
const getName = (olympeUser, discordUser, teamName) => {
	let username = olympeUser.username || discordUser.user.tag;
	username = username.split('#')[0];

	let name = `${username} | ${teamName}`;
	if (name.length > 32) {
		name = `${name.slice(0, 29)}...`;
	}
	return name;
};

/**
 * Renomme un utilisateur discord en fonction des données olympe
 * @param {OlympeMember} olympeMember
 * @param {String} teamName
 * @param {Object} discordUser same update or error
 * @param {Bot} bot
 * @returns {Promise<string>}
 */
const renameDiscordUserWithOlympeData = async (olympeMember, teamName, discordUser, bot) => {
	if (!discordUser) {
		return 'error';
	}

	let name = getName(olympeMember.user, discordUser, teamName);
	try {
		if (discordUser.nickname === name) {
			return 'same';
		}

		await discordUser.setNickname(name);
		return 'update';
	} catch (error) {
		bot.error(error.message, 'autorole - rename');
		return 'error';
	}
};

/**
 * Donne les roles discord à un utilisateur en fonction des rôles olympe
 * @param {String} olympeMemberId
 * @param {Discord.Guild} guild
 * @param {Discord.User} discordUser
 * @param {OlympeTeam} teams
 * @param {ChallengesRolesId} challengesRolesId
 * @param {Array<String>} rolesCompetId
 * @returns
 */
const changeDiscordRole = async (
	olympeMemberId,
	guild,
	discordUser,
	teams,
	challengesRolesId,
	rolesCompetId
) => {
	try {
		let realRole = [];
		let olympeMember, rolesToAdd;
		teams.forEach((team) => {
			olympeMember = team.members
				.concat(team.membersLent.map((m) => m.member))
				.find((member) => member.user.id === olympeMemberId);
			rolesToAdd =
				guild.client.olympe.users[olympeMember.user.thirdparties.discord.discordID]?.[
					team.name
				]?.roles || []; //! testReecriture getRoleToAdd(olympeMember); // Donne les role pour une team
			realRole = realRole.concat(
				getRealRole(rolesToAdd, guild, team.segments, challengesRolesId, olympeMember)
			);
		});

		let roleIdToAdd = [...new Set(realRole.map((role) => role.id))];
		let rolesIdToRemove = rolesCompetId.filter(
			(id) =>
				discordUser.roles.cache.find((role) => role.id === id) &&
				!roleIdToAdd.find((roleId) => roleId === id)
		);

		if (rolesIdToRemove.length) {
			await discordUser.roles.remove(rolesIdToRemove);
		}

		roleIdToAdd = roleIdToAdd.filter(
			(id) => !discordUser.roles.cache.find((role) => role.id === id)
		);

		if (roleIdToAdd.length) {
			await discordUser.roles.add(roleIdToAdd);
		}

		return [roleIdToAdd, rolesIdToRemove];
	} catch (e) {
		guild.client.error(e, 'autorole - changeDiscordRole');
		return false;
	}
};

/**
 * Obtient la liste des rôles à donner en fonction des données olympe et des rôles fournis en config
 * @param {OlympeMember} olympeMember
 * @returns {Array<String>} player, club, manager, coach, caster
 */
const getRoleToAdd = (olympeMember) => {
	let roleToAdd = [];

	olympeMember.roles.forEach((role) => {
		if (clubRolesList.includes(role) && !roleToAdd.includes('club')) {
			roleToAdd.push('club');
		}
		if (managerRolesList.includes(role) && !roleToAdd.includes('manager')) {
			roleToAdd.push('manager');
		}
		if (coachRolesList.includes(role) && !roleToAdd.includes('coach')) {
			roleToAdd.push('coach');
		}
	});
	if (olympeMember.user.castUrl && !roleToAdd.includes('caster')) {
		roleToAdd.push('caster');
	}
	if (olympeMember.tags.gameRoles.length > 0) {
		roleToAdd.push('player');
	}
	if (roleToAdd.length === 0) {
		// Si pas de role doit au moins avoir le role club
		roleToAdd.push('club');
	}
	return roleToAdd;
};

/**
 * Récupère les rôles au format discord en fonction des rôles olympe
 * @param {Array<String>} listRole
 * @param {Discord.Guild} guild
 * @param {Array<Object>} segments
 * @param {ChallengesRolesId} challengesRolesId
 * @param {OlympeMember} olympeMember
 * @returns {Array<Discord.Role>}
 */
const getRealRole = (listRole, guild, segments, challengesRolesId, olympeMember) => {
	const captain = olympeMember.roles.includes('captain');
	try {
		let realRole = [];
		let segmentName, challengeRole;

		for (const segment of segments) {
			if (challengesRolesId.competitions[segment?.challengeID]) {
				segmentName = segment.name;
				challengeRole = challengesRolesId.competitions[segment?.challengeID]; // s'arrête au premier segment trouvé
				break;
			}
		}

		let globRole = guild.roles.cache.get(challengesRolesId.ALL);
		realRole.push(globRole);
		if (captain === true && challengesRolesId.captain) {
			let globCaptainRole = guild.roles.cache.get(challengesRolesId.captain);
			realRole.push(globCaptainRole);
		}
		if (listRole.includes('caster'))
			realRole.push(guild.roles.cache.get(challengesRolesId.caster));
		if (challengeRole) {
			for (const role of listRole) {
				if (
					(!challengeRole[role] || !challengeRole[role][segmentName]) &&
					!challengesRolesId[role]
				) {
					continue;
				}

				let discordRole = guild.roles.cache.get(
					challengesRolesId[role] || challengeRole[role][segmentName]
				);
				realRole.push(discordRole);
				if (role === 'club') {
					let globClubRole = guild.roles.cache.get(challengeRole.club.ALL);
					realRole.push(globClubRole);
				}
			}
		}
		return realRole.filter((role) => role !== undefined);
	} catch (e) {
		guild.client.error(e, 'autorole - getrealrole');
		return [];
	}
};

/**
 * Ajoute la totalité des teams fournit et leur membres au cache du bot
 * @param {Array<OlympeTeam>} teams
 * @param {Discord.Guild} guild
 * @param {Bot} bot
 * @returns
 */
const processAllTeams = async (teams, guild, bot) => {
	const requestTeamsArray = [];
	const olympeTeams = bot.olympe.teams;
	for (let i in teams) {
		const team = teams[i];
		requestTeamsArray.push(async () => {
			await processTeam(team, olympeTeams, bot);
			if (i % 40 == 0 || i == teams.length || i == 1)
				bot.log(`loading team ${olympeTeams.length}/${teams.length}`, 'autorole'); // DEBUG
		});
	}

	await simultaneousRequest(requestTeamsArray);

	const requestTeamMembersArray = [];
	let ii = 1;
	for (let team of olympeTeams) {
		requestTeamMembersArray.push(async () => {
			await processTeamMembers(team, guild, bot);

			if (ii % 20 == 0 || ii == olympeTeams.length || ii == 1)
				bot.log(
					// `team N°${ii++}/${olympeTeams.length} - ${team.name}`,
					`team ${ii++}/${olympeTeams.length}`,
					'autorole - processteam'
				);
		});
	}
	await simultaneousRequest(requestTeamMembersArray);
	return olympeTeams;
};

/**
 * Réalise une requete pour une team et recupérér les discord et castURL et l'ajoute au cache du bot
 * @param {OlympeTeam} team
 * @param {Array<OlympeTeam>} olympeTeams team en cache du bot
 * @param {Bot} bot
 */
const processTeam = async (team, olympeTeams, bot) => {
	if (!olympeTeams.find((t) => t.id == team.id))
		olympeTeams.push(
			await bot.olympe.api.teams.get(team.id, {
				userFields: ['thirdpartiesDiscord', 'castUrl'],
			})
		);
	else olympeTeams[olympeTeams.indexOf(team.id)] = team; // Si la team est déjà enregistré, alors il la remplace
};
/**
 * Traite les membres d'une équipe : ajout des donnée dans la cache Olympe (bot.olympe.users)
 * @param {OlympeTeam} team
 * @param {Discord.Guild} guild
 * @param {Bot} bot
 * @returns
 */
const processTeamMembers = async (team, guild, bot) => {
	const requestMembersArray = [];
	const members = team.members.concat(team.membersLent.map((m) => m.member));
	for (let member of members) {
		requestMembersArray.push(async () => {
			await processTeamMember(team, member, guild, bot);
		});
	}
	await simultaneousRequest(requestMembersArray);

	return team;
};

/**
 * Recupere des info d'un membre d'équipe en forcant els info manquante (discord) et l'ajoute au cache
 * @param {OlympeTeam} team
 * @param {OlympeMember} member
 * @param {Discord.Guild} guild
 * @param {Bot} bot
 * @returns
 */
const processTeamMember = async (team, member, guild, bot) => {
	if (
		!member.user?.thirdparties.discord ||
		member.user.thirdparties.discord.publicDiscordTag != 1
	) {
		member.user = await bot.olympe.api.post(
			'users/search?fields=thirdpartiesDiscord%2CcastUrl',
			{
				search: member.user.id,
			}
		);

		if (!member.user.thirdparties?.discord?.discordID) return;
	}

	addOlympeUserData(member, team, bot);
	let discordUser = guild.members.cache.get(member.user.thirdparties.discord.discordID);

	if (!discordUser) {
		discordUser = await guild.members
			.fetch(member.user.thirdparties.discord.discordID)
			.catch((_) => null);
		if (!discordUser) return;
	}

	let userData = bot.olympe.users[discordUser.id].userData;

	if (!userData) {
		userData = { discordUser };
	}

	userData.olympeMember = member;

	if (!userData.teams) {
		userData.teams = [];
	}

	if (!userData.teams.find((t) => t.id === team.id)) {
		userData.teams.push(team);
	}

	bot.olympe.users[discordUser.id].userData = userData;
};

/**
 * Boucle tout les utilisateurs pour rename et ajout de droit en fonciton de leur donnée olympe (si cache bien remplit au préalable : processAllTeams)
 * @param {OlympeUser} users
 * @param {Discord.Guild} guild
 * @param {Bot} bot
 * @returns
 */
const processAllUsers = async (users, guild, bot) => {
	const requestUsersArray = [];
	// const users = Object.entries(bot.olympe.users);
	let i = 1;
	users.forEach((user) => {
		let request = async () => {
			await processUser(user[1], guild, bot);
			if (i % 200 == 0 || i == users.length || i == 1)
				bot.log(`users N°${i++}/ ${users.length}`, 'autorole - processusers');
		};
		requestUsersArray.push(request);
	});

	await simultaneousRequest(requestUsersArray);
};

/**
 * Traite un utilisateur : rename discord et changer roles discord + log
 * @param {Object} user
 * @param {Discord.Guild} guild
 * @param {Bot} bot
 * @returns {Promise<boolean>}
 */
const processUser = async (user, guild, bot) => {
	if (!user?.userData) {
		return;
	}
	let discordUser = user.userData.discordUser;
	let olympeMember = user.userData.olympeMember;
	let teams = user.userData.teams;
	let renameResult = 'same',
		addRoleResult;

	try {
		renameResult = await renameDiscordUserWithOlympeData(
			olympeMember,
			teams.length > 1 ? 'multiteam' : teams[0].name.trim(),
			discordUser,
			bot
		);
	} catch (e) {
		bot.error(e, `[${bot.name}] AUTOROLE : renameResult`, e.message);
	}

	try {
		addRoleResult = (await changeDiscordRole(
			olympeMember.user.id,
			guild,
			discordUser,
			teams,
			bot.olympe.challengesRolesId,
			bot.olympe.challengesRolesId.getAllIds()
		)) || [[], []];
	} catch (e) {
		console.error(`[${bot.name}] AUTOROLE : addRoleResult`, e.message);
	}
	if (renameResult !== 'same' || addRoleResult[0].length + addRoleResult[1].length) {
		bot.log(
			`changeUsername (${renameResult}) changeRole (+${addRoleResult[0].length}/-${addRoleResult[1].length}) pour ${olympeMember.user.username} (${discordUser.user.tag})`,
			'autorole'
		);
		return true;
	} else return false;
};

// ! mis en asynchrone pour anticiper la nécessité de call api ultérieur
/**
 * Transpose des données de team d'un objet match, dan sun format compatctible pour etre passé a ProcessTeam
 * @param {OlympeMatch.team1|OlympeMatch.team2} teamFromMatch
 * @returns {OlympeTeam}
 */
const getProcessableTeamFromTeamMatch = async (teamFromMatch) => {
	const team = {
		...teamFromMatch,
		members: !teamFromMatch.lineup
			? []
			: teamFromMatch.lineup.members.concat(teamFromMatch.lineup.substitutes),
	};
	return team;
};

/**
 * Donne els roles et rename pour les meembres d'équipe participant a un match
 * @param {OlympeMatch} match
 * @param {Bot} bot
 */
const processMatch = async (match, bot) => {
	const team1 = await getProcessableTeamFromTeamMatch(match.team1);
	const team2 = await getProcessableTeamFromTeamMatch(match.team2);

	const guild = bot.guilds.cache.get(bot.home);

	await processTeamMembers(team1, guild, bot); // va charger bot.olympe.users
	await processTeamMembers(team2, guild, bot); // va charger bot.olympe.users

	const matchUsersId = team1.members.concat(team2.members).map((m) => m.id);
	let matchUsers = bot.olympe.users.filter((u) => matchUsersId.contain(u.id));

	for (let user of matchUsers) {
		processUser(user[1], guild, bot);
	}
};

/**
 * Donne les roles et rename pour les membres d'une équipe
 * @param {String} teamId
 * @param {Bot} bot
 * @returns
 */
const processFromOlympeTeamId = async (teamId, bot) => {
	let guild = bot.guilds.cache.get(bot.home);

	let team = await bot.olympe.api.teams.get(teamId, {
		userFields: ['thirdpartiesDiscord'],
	});
	await processTeamMembers(team, guild, bot);

	//!  doit aller chercher dans le cache
	const users = team.members
		.concat(team.membersLent.map((m) => m.member))
		.filter((olympeMember) => olympeMember.user.thirdparties?.discord?.discordID)
		.map((olympeMember) => bot.olympe.users[olympeMember.user.thirdparties.discord.discordID]);
	if (!users.length) return false;
	for (let user of users) {
		if (!user) continue;
		processUser(user, guild, bot);
	}
	return true;
};

/**
 * Donne les roles et rename pour un utilisateur olympe
 * @param {String} olympeUserId
 * @param {Bot} bot
 * @returns
 */
const processFromOlympeUserId = async (olympeUserId, bot) => {
	let user = await getUserById(bot, olympeUserId).catch(console.error);
	if (!user) return false;
	const userWithTeamData = await bot.olympe.api.users.get(user.id);
	user.teams = userWithTeamData.teams;

	for (let team of user.teams) await processFromOlympeTeamId(team.id, bot);
	return true;
};

/**
 * Donne les roles et rename pour un utilisateur discord (nécessite une présence dans le cache : processTeamMember)
 * @param {String} discordUserId
 * @param {Bot} bot
 * @returns
 */
const processFromDiscordUserId = async (discordUserId, bot) => {
	const userCacheData = bot.olympe.users[discordUserId]; //find olympe ID dans le cache
	const discordUser = bot.users.cache.get(discordUserId);
	if (!userCacheData || !discordUser) return false;
	return processFromOlympeUserId(userCacheData.id, bot);
};

/**
 * Transpoise un utilisateur olympe pour en faire un membre qui peut etre processTeamMember
 * @param {OlympeUser} olympeUser
 * @param {Array<String>} roles
 * @param {Array<String>} gameRoles
 * @returns {OlympeMember}
 */
const generateMemberFromOlympeUser = (olympeUser, roles = [], gameRoles = []) => {
	return {
		id: olympeUser.id,
		user: olympeUser,
		roles,
		tags: { gameRoles },
	};
};

/**
 * Transpose des membres olympe (generateMemberFromOlympeUser) pour en faire une équipe qui peut etre processTeams
 * @param {String} name
 * @param {OlympeMember} olympeUser
 * @param {Array<Object>} segments
 * @returns {OlympeTeam}
 */
const generateTeamFromOlympeMembers = (name, members = [], segments = []) => {
	return {
		name,
		members,
		segments,
	};
};

/**
 * Recuperer tout els caster et genere un team compactible avec processTeam
 * @param {Bot} bot
 * @param {Discord.Guild} guild
 * @returns {OlympeTeam}
 */
const getCasterTeam = async (bot, guild) => {
	let casters = await getCasterUsers(bot);
	casters = casters.map((olympeUser) => generateMemberFromOlympeUser(olympeUser));

	const segment = bot.olympe.segments[0];
	const casterTeamName = bot.modules.AutoRole.guilds[guild.id]?.specialRoles.caster.name;
	return generateTeamFromOlympeMembers(casterTeamName, casters, segment ? [segment] : []);
};

/**
 * Recuperer tout els caster, genere une team et donne els roles et rename sur discord
 * @param {Bot} bot
 * @param {Discord.Guild} guild
 * @returns {OlympeTeam}
 */
const processCasterUsers = async (bot, guild) => {
	bot.log('start', 'autorole - processCasterUsers');
	const team = await getCasterTeam(bot, guild);
	await processTeamMembers(team, guild, bot);

	const users = Object.entries(bot.olympe.users);
	await processAllUsers(users, guild, bot);
	bot.log('end', 'autorole - processCasterUsers');

	return team;
};

/**
 * Récupère les informations de l'équipe des "Owners". (Non implémenté)
 * @param {Bot} bot - L'instance du bot.
 * @param {import('discord.js').Guild} guild - La guilde concernée.
 * @returns {Promise<void>}
 */
const getOwnerTeam = async (bot, guild) => {};
/**
 * Traite les utilisateurs "Owners" pour leur attribuer les rôles et le nom. (Non implémenté)
 * @param {Bot} bot - L'instance du bot.
 * @param {string} guildId - L'ID de la guilde concernée.
 * @returns {Promise<void>}
 */
const processOwnerUsers = async (bot, guildId) => {};

module.exports = {
	processTeamMembers,
	processUser,

	processAllUsers,
	processAllTeams,

	getProcessableTeamFromTeamMatch,
	processMatch,
	processFromOlympeTeamId,
	processFromOlympeUserId,
	processFromDiscordUserId,

	addOlympeUserData,
	getName,
	renameDiscordUserWithOlympeData,
	changeDiscordRole,
	getRoleToAdd,
	getRealRole,
	processCasterUsers,
	getCasterTeam,
};
