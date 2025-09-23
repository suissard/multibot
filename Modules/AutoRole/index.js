const simultaneousRequest = require('../../Tools/simultaneousRequest');
const GetIncidentForm = require('./GetIncidentForm.js');
const GetCastRewardFormCommand = require('./GetCastRewardForm.js');
const GetCasterStatFormCommand = require('./GetCasterStatForm.js');
const AutoRoleCommand = require('./AutoRoleCommand.js');
const { autoRole, instanciateOlympe } = require('./utils/utils2');

const ChallengesRolesId = require('./models/ChallengesRolesId.js');

/**
 * Ce module gère l'attribution automatique des rôles pour les membres du serveur.
 *
 * Une fois le bot prêt, le module s'initialise en se connectant à une source de données externe, l'API Olympe, pour récupérer les informations sur les utilisateurs et leurs attributions.
 * Il s'assure que les données du serveur (rôles, membres) sont bien chargées, puis lance une première synchronisation des rôles.
 *
 * Par la suite, le processus est répété à intervalles réguliers, définis dans la configuration, pour garantir que les rôles des membres sont toujours à jour par rapport aux données de l'API.
 *
 * @param {import('../../Class/Bot')} bot - L'instance du bot pour laquelle initialiser le module.
 * @returns {object} Un objet contenant les classes de commandes exportées par ce module.
 */
module.exports = (bot) => {
	// Exemple de config
	/**
	 AutoRole : {
		"everyXhours": 8,
		"olympeAuth": {
			"value": "token",
		},
		olympeDomain: "playallforone.com",
	 }
	 */
	bot.on('ready', async () => {
		try {
			// ===== DEV ===== TEST =====
			// const roleCast = bot.modules.AutoRole.guilds["595557812051116052"].specialRoles.caster.id
			// ===== DEV ===== TEST =====

			const challengesRolesId = new ChallengesRolesId(
				bot.modules.AutoRole.roleIds.ALL,
				bot.modules.AutoRole.roleIds.captain,
				// roleCast, // ===== DEV ===== TEST =====
				bot.modules.AutoRole.roleIds.caster,
				bot.modules.AutoRole.roleIds.competitions
			);

			await instanciateOlympe(bot, challengesRolesId);

			for (guildId in bot.modules.AutoRole.guilds) {
				const guild = await bot.guilds.fetch(bot.home).catch((_) => null);
				await guild.roles.fetch();
				await guild.members.fetch();
			}

			const autoroleFn = () => {
				for (guildId in bot.modules.AutoRole.guilds) autoRole(bot, guildId);
			};
			autoroleFn(); // .then(() => deleteAllRole(bot));
			setInterval(autoroleFn, bot.modules.AutoRole.everyXhours * 60 * 60 * 1000);
		} catch (err) {
			bot.error(err, 'autorole');
		}
	});

	return { GetIncidentForm, AutoRoleCommand, GetCasterStatFormCommand, GetCastRewardFormCommand };
};
