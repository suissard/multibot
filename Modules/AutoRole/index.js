const simultaneousRequest = require('../../Tools/simultaneousRequest');
const GetIncidentForm = require('./GetIncidentForm.js');
const GetCastRewardFormCommand = require('./GetCastRewardForm.js');
const GetCasterStatFormCommand = require('./GetCasterStatForm.js');
const AutoRoleCommand = require('./AutoRoleCommand.js');
const { autoRole, instanciateOlympe } = require('./utils/utils2');

const ChallengesRolesId = require('./models/ChallengesRolesId.js');

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
	 * Déclencher l'autorole au démarrage puis a interval régulier
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
