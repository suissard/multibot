const Bot = require('../Class/Bot');

const getMatchs = async (bot, scheduled, order = 'asc') => {
	const matchs = await bot.olympe.api.matchs.list({ scheduled, limit: 50, order });
	if (!matchs) {
		throw new Error('Error getting matchs');
	}
	return matchs;
};

const getFutureMatchs = async (bot) => {
	return await getMatchs(bot, 'future');
};

const getPastMatchs = async (bot) => {
	return await getMatchs(bot, 'past', 'desc');
};

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
	const user = await bot.olympe.api.POST('users/search?fields=thirdpartiesDiscord%2CcastUrl', {
		search: id,
	});
	if (!user) {
		throw new Error('Error getting user');
	}
	return user;
};

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
 *
 * @param {Bot} bot
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
