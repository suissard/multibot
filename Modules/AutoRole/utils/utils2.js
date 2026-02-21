const { OlympeApi } = require('olympe-client-api');
const { processCasterUsers, getCasterTeam, processAllUsers, processAllTeams, processTeamMembers } = require('./utils');
const simultaneousRequest = require('../../../Tools/simultaneousRequest.js');
const checkConfigMatch = require('./checkConfig');
const DiscordCallService = require('../../../services/DiscordCallService');
const { getAllTeamsFromChallenge, wipeOlympeData } = require('../../Olympe/utils/utils');


/**
 * Recuperer tout les id fournit par le json de roles de compétition de facon recursive
 * @param {Object} object Object provenant initialement des config : bot.modules.AutoRole.roleIds.competition[challengeID]
 * @param {Array} target Array a remplir avec les id de tout les role associé a la compétition
 * @returns
 */
const recurciveIdGet = (object, target) => {
	for (let entrie in object) {
		let value = object[entrie];
		if (typeof value == 'object') recurciveIdGet(value, target);
		else target.push(value);
	}
	return target;
};



/**
 * Supprime les roles de compétition, a tous ou ceux qui ne sont pas dans le systeme
 * @param {*} bot
 * @param {Boolean} eraseAll si true alros supprime les roels a tout le monde
 */
const deleteAllRole = async (bot, eraseAll = false) => {
	// Recuperer jsute les id
	const guild = await bot.guilds.fetch(bot.home).catch((_) => null);
	let members = await guild.members.fetch();
	for (let [id, member] of members) {
		if (!bot.olympe.users[member.id] || eraseAll) {
			console.log(`deleteAllRole : ${member.nickname} n'est pas référencé`);
			//await member.roles.remove(bot.olympe.challengesRolesId.getAllIds());
			await DiscordCallService.removeRole(member, bot.olympe.challengesRolesId.getAllIds());
		}
	}
};

/**
 * Fonction principale qui gere une boucle complete pour l'ajout des roles et des noms
 * @param {Bot} bot
 */
const autoRole = async function (bot, guildId) {
	try {
		let guild = bot.guilds.cache.get(guildId); // ! a faire une fois au démarrage et apres c'est ok
		if (!guild) {
			bot.log(`Guild ${guildId} not found, skipping.`, "autorole");
			return;
		}

		bot.log(`start : ${bot.olympe.api.xDomain}`, 'autorole');
		wipeOlympeData(bot);

		if (bot.modules.AutoRole.guilds[guildId].specialRoles.caster) {
			const team = await getCasterTeam(bot, guild);
			if (team) {
				await processTeamMembers(team, guild, bot);
			} else {
				bot.log('WARN: No caster team found or API error (getCasterTeam returned null/undefined).', 'AutoRole');
			}
			// await processCasterUsers(bot, bot.guilds.cache.get(bot.home));
		}

		let teams = [];
		for (let idChallenge in bot.olympe.challengesRolesId.competitions) {
			const challengeTeams = await getAllTeamsFromChallenge(bot, idChallenge);
			teams = teams.concat(challengeTeams);

			let segments = await bot.olympe.api.segments.list(idChallenge);
			bot.olympe.segments = bot.olympe.segments.concat(segments);
		}

		checkConfigMatch(bot, bot.olympe.segments, bot.olympe.challengesRolesId);

		await processAllTeams(teams, guild, bot);

		bot.emit('olympeUserCacheReady'); // signal cache ready
	} catch (error) {
		bot.error(error, 'autorole');
	}
};
module.exports = {
	wipeOlympeData,
	recurciveIdGet,
	getAllTeamsFromChallenge,
	deleteAllRole,
	autoRole,
	processAllUsers,
};
