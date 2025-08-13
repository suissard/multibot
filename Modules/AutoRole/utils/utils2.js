const { OlympeApi } = require('olympe-client-api');
const { processCasterUsers, getCasterTeam, processAllUsers, processAllTeams } = require('./utils');
const simultaneousRequest = require('../../../Tools/simultaneousRequest.js');

/**
 * Initialise la connexion à l'API Olympe et la stocke dans l'objet bot.
 * @param {import('../../../Class/Bot')} bot - L'instance du bot.
 * @param {import('../models/ChallengesRolesId')} challengesRolesId - L'objet contenant les IDs des rôles de la compétition.
 */
const instanciateOlympe = async (bot, challengesRolesId) => {
	// Token d'utilisateur random (aucun droits nécessaires)
	const olympeToken = bot.modules.AutoRole.olympeAuth.value;
	const olympeDomain = bot.modules.AutoRole.olympeDomain; //Domain ou est hebergé l'api olympe
	const olympeOrganization = bot.modules.AutoRole.organization; //Organization associé au call
	const olympeApi = new OlympeApi(olympeToken, olympeDomain, olympeOrganization);
	bot.olympe = {};
	bot.olympe.api = olympeApi;

	// ============================================ DEV ============================================
	// ============================================ DEV ============================================
	// ============================================ DEV ============================================
	// const teamTest = require('../DataTest/OlympeTeam.json');
	// bot.olympe.api.teams.get = ()=> teamTest
	// ============================================ DEV ============================================
	// ============================================ DEV ============================================
	// ============================================ DEV ============================================

	bot.olympe.challengesRolesId = challengesRolesId;
};

/**
 * Remettre a zero le cache de données olympe
 */
const wipeOlympeData = (bot) => {
	bot.olympe.url = `https://${bot.modules.AutoRole.olympeDomain}`;
	bot.olympe.users = {};
	bot.olympe.segments = [];
	bot.olympe.teams = [];
};

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
 * Récupère les données de toutes les équipes disponibles pour un challenge de compétition spécifique.
 * @param {import('../../../Class/Bot')} bot - L'instance du bot.
 * @param {string} idChallenge - L'ID du challenge.
 * @returns {Promise<Array<object>>} Une promesse qui se résout avec un tableau d'objets d'équipe.
 * @todo La méthode actuelle pour sélectionner la poule (la dernière de la liste) n'est pas fiable.
 */
const getAllTeamsFromChallenge = async (bot, idChallenge) => {
	if (!idChallenge.match(/[0-9]/)) return [];
	let pools = await bot.olympe.api.GET(`challenges/${idChallenge}/pools`);
	if (!pools) return [];
	return await bot.olympe.api.GET(
		`challenges/${idChallenge}/pools/${pools.pools[pools.pools.length - 1].id}/teams/available` // TODO gere cela via des données plus fiable => derniere pool n'est pas forcement la bonne pool
	);
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
			await member.roles.remove(bot.olympe.challengesRolesId.getAllIds());
		}
	}
};

/**
 * Fonction principale qui gere une boucle complete pour l'ajout des roles et des noms
 * @param {*} bot
 */
const autoRole = async function (bot, guildId) {
	try {
		let guild = bot.guilds.cache.get(guildId); // ! a faire une fois au démarrage et apres c'est ok
		if (!guild) throw new Error('guild not found');

		bot.log(`start : ${bot.olympe.api.xDomain}`, 'autorole');
		wipeOlympeData(bot);

		// ===== DEV =====
		// if (bot.modules.AutoRole.guilds[guildId].specialRoles.caster) await processCasterUsers(bot, bot.guilds.cache.get(bot.home));

		let teams = [];
		for (let idChallenge in bot.olympe.challengesRolesId.competitions) {
			teams = teams.concat(await getAllTeamsFromChallenge(bot, idChallenge));
			let segments = await bot.olympe.api.segments.list(idChallenge);
			bot.olympe.segments = bot.olympe.segments.concat(segments);
		}
		await processAllTeams(teams, guild, bot);

		bot.log(`check pseudo & roles`, 'autorole');

		const users = Object.entries(bot.olympe.users);
		await processAllUsers(users, guild, bot);

		bot.log(`done : ${teams.length} teams, ${users.length} users`, 'autorole');
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
	instanciateOlympe,
};
