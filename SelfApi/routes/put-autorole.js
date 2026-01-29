const Bot = require('../../Class/Bot.js');
const utils = require('../../Modules/AutoRole/utils/utils.js');
/**
 * Route permettant de déclencerh des fonctions de l'autorole
 */
module.exports = {
	path: /autorole/,
	method: 'put',
	/**
	 * Gère la requête pour déclencher le processus d'attribution de rôles pour des équipes ou utilisateurs spécifiques.
	 * @param {import('express').Request} req - L'objet de la requête Express. Le corps doit contenir `organization` et soit `teamIDs` soit `userIDs`.
	 * @param {import('express').Response} res - L'objet de la réponse Express.
	 * @param {any} botArg - (Non utilisé) L'instance du bot.
	 * @param {any} user - (Non utilisé) L'utilisateur authentifié.
	 * @param {import('../Api')} app - L'instance de l'API principale.
	 */
	handler: async (req, res, botArg, user, app) => {
		app.debug('AUTOROLE API DEBUG', 'PUT_AUTOROLE');
		// retrouver dans app.BOTS (Map) celui qui a les bonne option dans ses configs
		req.body.organization;
		const bots = [];
		for (let [id, bot] of app.BOTS) {
			if (req.body.organization == bot.modules.AutoRole?.organization) bots.push(bot);
		}

		const { syncMemberPermissions } = require('../../Modules/ChannelManager/utils/channelManagement.js');

		// lancer la fonction autorole lié a une team ou un utilisateur
		if (req.body.teamIDs) {
			for (const bot of bots) {
				const updatedUserIds = await utils.processFromOlympeTeamId(req.body.teamIDs, bot);
				if (Array.isArray(updatedUserIds)) {
					for (const discordId of updatedUserIds) {
						const guild = bot.guilds.cache.get(bot.home);
						const member = guild.members.cache.get(discordId);
						if (member) await syncMemberPermissions(bot, member, guild);
					}
				}
			}
		} else if (req.body.userIDs) {
			for (const bot of bots) {
				const updatedUserIds = await utils.processFromOlympeUserId(req.body.userIDs, bot);
				if (Array.isArray(updatedUserIds)) {
					for (const discordId of updatedUserIds) {
						const guild = bot.guilds.cache.get(bot.home);
						const member = guild.members.cache.get(discordId);
						if (member) await syncMemberPermissions(bot, member, guild);
					}
				}
			}
		} else {
			app.warn("No OlympeID's provided", 'PUT_AUTOROLE');
		}

		// Répondre
		return {
			message: 'Data received',
		};
	},
};
