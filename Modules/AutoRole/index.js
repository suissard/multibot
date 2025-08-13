const simultaneousRequest = require('../../Tools/simultaneousRequest');
const GetIncidentForm = require('./GetIncidentForm.js');
const GetCastRewardFormCommand = require('./GetCastRewardForm.js');
const GetCasterStatFormCommand = require('./GetCasterStatForm.js');
const AutoRoleCommand = require('./AutoRoleCommand.js');
const { autoRole, instanciateOlympe } = require('./utils/utils2');

const ChallengesRolesId = require('./models/ChallengesRolesId.js');

/**
 * Initialise le module AutoRole pour un bot.
 * Ce module attribue automatiquement des rôles aux membres en fonction de données
 * provenant d'une source externe (Olympe API). Il se déclenche au démarrage du bot
 * puis s'exécute à intervalles réguliers.
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
	/**
	 * Une fois le bot prêt, ce gestionnaire configure et lance le processus d'attribution automatique des rôles.
	 * Il initialise la connexion à l'API Olympe, s'assure que les données du serveur sont en cache,
	 * puis exécute la fonction d'attribution des rôles immédiatement et à un intervalle défini.
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
