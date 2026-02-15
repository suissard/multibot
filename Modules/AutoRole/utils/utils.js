const Bot = require('../../../Class/Bot');
const Discord = require('discord.js');
const {
	getUserById,
	getACLusers,
	getCasterUsers,
	getOwnerUsers,
} = require('../../../services/apiService');
const simultaneousRequest = require('../../../Tools/simultaneousRequest.js');
const ProgressBar = require('../../../Tools/progressBar.js');
const ChallengesRolesId = require('../models/ChallengesRolesId.js');
const { roleCategories, clubRolesList, managerRolesList, coachRolesList } = require('./constants');
const DiscordCallService = require('../../../services/DiscordCallService');


const progressBarRefreshRate = 5000;

/**
 * Ajoute les données olympe des utilisateurs avec un discordId valable, à un objet global stocké dans le bot concerné (bot.olympe.users)
 * @param {OlympeMember} olympeMember
 * @param {OlympeTeam} team
 * @param {Bot} bot
 */
const addOlympeUserData = (olympeMember, team, bot) => {
	if (!bot.olympe.users[olympeMember.user.thirdparties.discord.discordID]) {
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

	bot.olympe.users[olympeMember.user.thirdparties.discord.discordID][team.name] = {
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
 * @param {string} teamName
 * @returns {string} name
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
 * @param {string} teamName
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
		const oldNickname = discordUser.nickname;
		await DiscordCallService.setNickname(discordUser, name);
		return `${oldNickname} -> ${name}`;
	} catch (error) {
		return '❌ ' + error.message;
	}
};

/**
 * Récupère les rôles à ajouter depuis le cache Olympe
 * @param {Discord.Guild} guild
 * @param {OlympeMember} olympeMember
 * @param {string} teamName
 * @returns {Array<string>}
 */
const getRoleToAddFromOlympe = (guild, olympeMember, teamName) => {
	return guild.client.olympe?.users[olympeMember.user.thirdparties.discord.discordID]?.[teamName]?.roles || [];
};

/**
 * Récupère la liste des vrais rôles Discord (dédublonnés) pour un membre donné au travers de ses équipes
 * @param {Array<OlympeTeam>} teams
 * @param {string} olympeMemberId
 * @param {Discord.Guild} guild
 * @param {ChallengesRolesId} challengesRolesId
 * @returns {Array<Discord.Role>}
 */
const getDistinctRealRoles = (teams, olympeMemberId, guild, challengesRolesId) => {
	let realRole = [];
	// let lastOlympeMember = null;

	teams.forEach((team) => {
		const olympeMember = team.members
			.concat(team.membersLent.map((m) => m.member))
			.find((member) => member.user.id === olympeMemberId);

		if (olympeMember) {
			const rolesToAdd = getRoleToAddFromOlympe(guild, olympeMember, team.name);
			realRole = realRole.concat(
				getRealRole(rolesToAdd, guild, team.segments, challengesRolesId, olympeMember)
			);
			// lastOlympeMember = olympeMember;
		}
	});


	const uniqueRoles = [];
	const seenIds = new Set();
	for (const role of realRole) {
		if (role && !seenIds.has(role.id)) {
			seenIds.add(role.id);
			uniqueRoles.push(role);
		}
	}

	// if (teams.length > 1)
	// 	console.log(lastOlympeMember.user.username, uniqueRoles.map((role) => role.name));
	return uniqueRoles;
};

/**
 * Donne les roles discord à un utilisateur en fonction des rôles olympe
 * @param {string} olympeMemberId
 * @param {Discord.Guild} guild
 * @param {Discord.User} discordUser
 * @param {OlympeTeam} teams
 * @param {ChallengesRolesId} challengesRolesId
 * @param {Array<string>} rolesCompetId
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
		const realRoles = getDistinctRealRoles(teams, olympeMemberId, guild, challengesRolesId);



		let roleIdToAdd = realRoles.map((role) => role.id);
		let rolesIdToRemove = rolesCompetId.filter(
			(id) =>
				discordUser.roles.cache.find((role) => role.id === id) &&
				!roleIdToAdd.find((roleId) => roleId === id)
		);

		if (rolesIdToRemove.length) {
			await DiscordCallService.removeRole(discordUser, rolesIdToRemove);
		}

		roleIdToAdd = roleIdToAdd.filter(
			(id) => !discordUser.roles.cache.find((role) => role.id === id)
		);

		if (roleIdToAdd.length) {
			await DiscordCallService.addRole(discordUser, roleIdToAdd);
		}

		// renvois le nom des roles
		return [roleIdToAdd.map((id) => guild.roles.cache.get(id)?.name), rolesIdToRemove.map((id) => guild.roles.cache.get(id)?.name)];
	} catch (e) {
		return '❌ ' + e.message;
	}
};

/**
 * Obtient la liste des rôles à donner en fonction des données olympe et des rôles fournis en config
 * @param {OlympeMember} olympeMember
 * @returns {Array<string>} player, club, manager, coach, caster
 */
const getRoleToAdd = (olympeMember) => {
	let roleToAdd = [];

	olympeMember.roles.forEach((role) => {
		if (clubRolesList.includes(role) && !roleToAdd.includes(roleCategories.club)) {
			roleToAdd.push(roleCategories.club);
		}
		if (managerRolesList.includes(role) && !roleToAdd.includes(roleCategories.manager)) {
			roleToAdd.push(roleCategories.manager);
		}
		if (coachRolesList.includes(role) && !roleToAdd.includes(roleCategories.coach)) {
			roleToAdd.push(roleCategories.coach);
		}
	});
	if (olympeMember.user.castUrl && !roleToAdd.includes(roleCategories.caster)) {
		roleToAdd.push(roleCategories.caster);
	}
	if (olympeMember.tags.gameRoles.length > 0) {
		roleToAdd.push(roleCategories.player);
	}
	if (roleToAdd.length === 0) {
		// Si pas de role doit au moins avoir le role club
		roleToAdd.push(roleCategories.club);
	}
	return roleToAdd;
};

/**
 * Récupère les rôles au format discord en fonction des rôles olympe
 * @param {Array<string>} listRole
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

		let globRole = guild.roles.cache.get(challengesRolesId.ALL);
		realRole.push(globRole);
		if (captain === true && challengesRolesId.captain) {
			let globCaptainRole = guild.roles.cache.get(challengesRolesId.captain);
			realRole.push(globCaptainRole);
		}
		if (listRole.includes(roleCategories.caster))
			realRole.push(guild.roles.cache.get(challengesRolesId.caster));

		for (const segment of segments) {
			if (challengesRolesId.competitions[segment?.challengeID]) {
				const segmentName = segment.name;
				const challengeRole = challengesRolesId.competitions[segment?.challengeID];

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
					if (role === roleCategories.club && challengeRole.club && challengeRole.club.ALL) {
						let globClubRole = guild.roles.cache.get(challengeRole.club.ALL);
						realRole.push(globClubRole);
					}
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
	let bar = new ProgressBar(teams.length, 20, progressBarRefreshRate);
	for (let i = 0; i < teams.length; i++) {
		const team = teams[i];
		requestTeamsArray.push(async () => {
			await processTeam(team, olympeTeams, bot);
			const log = bar.next();
			if (log) {
				bot.log(`processAllTeam ${log}`, 'autorole'); // DEBUG
			}
		});
	}

	await simultaneousRequest(requestTeamsArray);

	const requestTeamMembersArray = [];
	let membersBar = new ProgressBar(olympeTeams.length, 20, progressBarRefreshRate);

	for (let team of olympeTeams) {
		requestTeamMembersArray.push(async () => {
			await processTeamMembers(team, guild, bot);
			const log = membersBar.next();
			if (log) {
				bot.log(`processTeam - members ${log}`, 'autorole');
			}
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
	const existingTeamIndex = olympeTeams.findIndex((t) => t.id == team.id);
	if (existingTeamIndex === -1)
		olympeTeams.push(
			await bot.olympe.api.teams.get(team.id, {
				userFields: ['thirdpartiesDiscord', 'castUrl'],
			})
		);
	else olympeTeams[existingTeamIndex] = team; // Si la team est déjà enregistré, alors il la remplace
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
			'users/search-deprecated-bot-suissard?fields=thirdpartiesDiscord%2CcastUrl',
			{
				search: member.user.id,
			}
		);

		if (!member.user.thirdparties?.discord?.discordID) return;
	}

	// let discordUser = guild.members.cache.get(member.user.thirdparties.discord.discordID);
	// if (!discordUser) {
	// 	discordUser = await guild.members
	// 		.fetch(member.user.thirdparties.discord.discordID)
	// 		.catch((_) => null);
	//     if (!discordUser) return
	// }

	if (!member.user.thirdparties.discord.discordID) return;

	let discordUser = await DiscordCallService.fetchMember(guild, member.user.thirdparties.discord.discordID).catch((_) => null);
	if (!discordUser) return;

	let userData = bot.olympe.users[discordUser.id]?.userData;

	bot.emit("olympeMember", { discordUser, olympeMember: member, team })


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
	let bar = new ProgressBar(users.length, 20, progressBarRefreshRate);

	users.forEach((user) => {
		let request = async () => {
			await processUser(user[1], guild, bot);
			const log = bar.next();
			if (log) {
				bot.log(`processusers ${log}`, 'autorole');
			}
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

	if (discordUser.id === bot.user.id) return;
	let olympeMember = user.userData.olympeMember;
	let teams = user.userData.teams;
	let renameResult = 'same',
		addRoleResult;

	//Creer une exception pour les casters pour qu'il n esoit pas renommer masi qu'dn
	const casterTeamName = bot.modules.AutoRole.guilds[guild.id]?.specialRoles.caster.name;



	let teamName = teams.length > 1 ? 'multiteam' : teams[0].name.trim()
	if (casterTeamName && teams.find((t) => t.name === casterTeamName))
		teamName = casterTeamName

	renameResult = await renameDiscordUserWithOlympeData(
		olympeMember,
		teamName,
		discordUser,
		bot
	);

	addRoleResult = (await changeDiscordRole(
		olympeMember.user.id,
		guild,
		discordUser,
		teams,
		bot.olympe.challengesRolesId,
		bot.olympe.challengesRolesId.getAllIds()
	));

	renameResult = renameResult === 'same' ? '' : renameResult === "update" ? renameResult : renameResult;
	// Le resultat est soit un tableau, quand c'est sans erreur, ou alrso un texte d'erreur
	if (Array.isArray(addRoleResult)) {
		addRoleResult = addRoleResult[0].length + addRoleResult[1].length ? 'addRole (+' + addRoleResult[0].join(',+') + ',-' + addRoleResult[1].join(',-') + ')' : '';
	} else {
		addRoleResult = addRoleResult ? 'addRole (' + addRoleResult + ')' : '';
	}

	if (renameResult !== "" || addRoleResult !== "") {
		bot.log(
			`${olympeMember.user.username} (${discordUser.user.tag}) : ${renameResult ? 'rename (' + renameResult + ')' : ''} ${addRoleResult}`,
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
		membersLent: [],
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
 * @param {string} teamId
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
	for (let user of users) {
		if (!user) continue;
		processUser(user, guild, bot);
	}
	return users.map(u => u?.userData?.discordUser?.id).filter(id => id);
};

/**
 * Donne les roles et rename pour un utilisateur olympe
 * @param {string} olympeUserId
 * @param {Bot} bot
 * @returns
 */
const processFromOlympeUserId = async (olympeUserId, bot) => {
	let user = await getUserById(bot, olympeUserId).catch(console.error);
	if (!user) return []; // Return empty array if user not found
	const userWithTeamData = await bot.olympe.api.users.get(user.id);
	user.teams = userWithTeamData.teams;

	let processedIds = new Set();
	for (let team of user.teams) {
		const ids = await processFromOlympeTeamId(team.id, bot);
		if (Array.isArray(ids)) ids.forEach(id => processedIds.add(id));
	}
	return Array.from(processedIds);
};

/**
 * Donne les roles et rename pour un utilisateur discord (nécessite une présence dans le cache : processTeamMember)
 * @param {string} discordUserId
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
 * @param {Array<string>} roles
 * @param {Array<string>} gameRoles
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
 * @param {string} name
 * @param {OlympeMember} olympeUser
 * @param {Array<Object>} segments
 * @returns {OlympeTeam}
 */
const generateTeamFromOlympeMembers = (name, members = [], segments = []) => {
	return {
		name,
		members,
		membersLent: [],
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
	casters = casters?.map((olympeUser) => generateMemberFromOlympeUser(olympeUser)) || [];
	if (!casters.length) return;

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
	// bot.log('start', 'autorole - processCasterUsers');
	const team = await getCasterTeam(bot, guild);
	await processTeamMembers(team, guild, bot);

	const users = Object.entries(bot.olympe.users);
	await processAllUsers(users, guild, bot);
	// bot.log('end', 'autorole - processCasterUsers');

	return team;
};

/**
 * Récupère les informations de l'équipe des "Owners". (Non implémenté)
 * @param {Bot} bot - L'instance du bot.
 * @param {import('discord.js').Guild} guild - La guilde concernée.
 * @returns {Promise<void>}
 */
const getOwnerTeam = async (bot, guild) => { };
/**
 * Traite les utilisateurs "Owners" pour leur attribuer les rôles et le nom. (Non implémenté)
 * @param {Bot} bot - L'instance du bot.
 * @param {string} guildId - L'ID de la guilde concernée.
 * @returns {Promise<void>}
 */
const processOwnerUsers = async (bot, guildId) => { };

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
	processTeam,
	processTeamMember,
	getRoleToAddFromOlympe,
	getDistinctRealRoles,
};
