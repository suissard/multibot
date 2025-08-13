const Bot = require('../../Class/Bot.js');
const {
	processFromOlympeTeamId,
	processFromOlympeUserId,
} = require('../../Modules/AutoRole/utils/utils.js');
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
	handler: (req, res, botArg, user, app) => {
		console.log('AUTOROLE API DEBUG');
		// retrouver dans app.BOTS (Map) celui qui a les bonne option dans ses configs
		req.body.organization;
		const bots = [];
		for (let [id, bot] of app.BOTS) {
			if (req.body.organization == bot.modules.AutoRole?.organization) bots.push(bot);
		}

		// lancer la fonction autorole lié a une team ou un utilisateur
		if (req.body.teamIDs) bots.forEach((bot) => processFromOlympeTeamId(req.body.teamIds, bot));
		else if (req.body.userIDs)
			bots.forEach((bot) => processFromOlympeUserId(req.body.userIDs, bot));
		else console.log("No OlympeID's provided")

		// Répondre
		res.json({
			message: 'Data received',
		});
	},
};
