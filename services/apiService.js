const Bot = require('../Class/Bot');

/**
 * Récupère une liste de matchs depuis l'API Olympe.
 * @param {Bot} bot - L'instance du bot.
 * @param {'future'|'past'} scheduled - Le statut des matchs à récupérer.
 * @param {'asc'|'desc'} [order='asc'] - L'ordre de tri des matchs.
 * @returns {Promise<Array<object>>} Une liste de matchs.
 * @throws {Error} Si la récupération des matchs échoue.
 */
const getMatchs = async (bot, scheduled, order = 'asc') => {
	const matchs = await bot.olympe.api.matchs.list({ scheduled, limit: 50, order });
	if (!matchs) {
		throw new Error('Error getting matchs');
	}
	return matchs;
};

/**
 * Récupère la liste des matchs à venir.
 * @param {Bot} bot - L'instance du bot.
 * @returns {Promise<Array<object>>} Une liste de matchs à venir.
 */
const getFutureMatchs = async (bot) => {
	return await getMatchs(bot, 'future');
};

/**
 * Récupère la liste des matchs passés.
 * @param {Bot} bot - L'instance du bot.
 * @returns {Promise<Array<object>>} Une liste de matchs passés, triés par ordre décroissant.
 */
const getPastMatchs = async (bot) => {
	return await getMatchs(bot, 'past', 'desc');
};

/**
 * Récupère les informations d'une équipe par son nom.
 * @param {Bot} bot - L'instance du bot.
 * @param {string} teamName - Le nom de l'équipe.
 * @returns {Promise<object>} L'objet équipe.
 * @throws {Error} Si la récupération de l'équipe échoue.
 */
const getTeamByName = async (bot, teamName) => {
	// TODO ne contourne pas si il ont un discord caché au public
	const team = await bot.olympe.api.teams.get(teamName, { userFields: ['thirdpartiesDiscord'] });
	if (!team) {
		throw new Error('Error getting team');
	}
	return team;
};

/**
 * Recuperer les données utilisateurs en mode administrateur (ne contient pas les donnée de teams)
 * @param {*} bot
 * @param {*} id
 * @returns
 */
const getUserById = async (bot, id) => {
	const user = await bot.olympe.api.POST(
		'users/search-deprecated-bot-suissard?fields=thirdpartiesDiscord%2CcastUrl',
		{
			search: id,
		}
	);
	if (!user) {
		throw new Error('Error getting user');
	}
	return user;
};

/**
 * Récupère les informations d'un match par son ID.
 * @param {Bot} bot - L'instance du bot.
 * @param {string} id - L'ID du match.
 * @returns {Promise<object>} L'objet match.
 * @throws {Error} Si le match n'est pas trouvé.
 */
const getMatchById = async (bot, id) => {
	const match = await bot.olympe.api.matchs.get(id, {
		userFields: ['thirdpartiesDiscord', 'battlenetBtag'],
	});
	if (!match) {
		throw new Error('No match');
	}
	return match;
};

/**
 * Récupère la liste des utilisateurs de la liste de contrôle d'accès (ACL).
 * @param {Bot} bot - L'instance du bot.
 * @returns {Promise<Array<object>>} Une liste d'utilisateurs.
 */
const getACLusers = (bot) => {
	return bot.olympe.api.GET('acl?fields=thirdpartiesDiscord%2CcastUrl');
};

/**
 * Reucperer totu les utilisateur avec des droits de cast
 * @param {Bot} bot
 */
const getCasterUsers = async (bot) => {
	const casters = await getACLusers(bot);
	return casters.filter(
		(caster) => caster.castUrl && caster.organizationRoles.includes('caster')
	);
};

/**
 * Reucperer totu les utilisateur avec des droits de cast
 * @param {Bot} bot
 */
const getOwnerUsers = async (bot) => {
	const casters = await getACLusers();
	return casters.filter((caster) => caster.castUrl && caster.organizationRoles.includes('owner'));
};

module.exports = {
	getTeamByName,
	getFutureMatchs,
	getPastMatchs,
	getUserById,
	getMatchById,
	getACLusers,
	getCasterUsers,
	getOwnerUsers,
};
