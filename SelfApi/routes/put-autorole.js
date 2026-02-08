const Bot = require('../../Class/Bot.js');
const { EmbedBuilder } = require('discord.js');
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
		let processLogs = [];
		if (req.body.teamIDs) {
			for (const bot of bots) {
				const { ids: updatedUserIds, logs } = await utils.processFromOlympeTeamId(req.body.teamIDs, bot);
				if (logs && logs.length > 0) processLogs.push(...logs);

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
				const { ids: updatedUserIds, logs } = await utils.processFromOlympeUserId(req.body.userIDs, bot);
				if (logs && logs.length > 0) processLogs.push(...logs);

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

		// Log to Discord channel
		if (app.autoRoleLogChannelId) {
			// Check logic: if app.autoRoleLogOrganization is set, we might want to filter or just include it in the log?
			// The user said "indicate the id of the bot ... and the associated competition".
			// I will assume this means we only log if the request is relevant to that competition, OR we just use it to find the bot.
			// Actually, if a specific Organization is set in config, maybe we only log requests for that organization?
			// Let's log it anyway but maybe mention if it matches or just use the config.

			// If organization is specified in config and doesn't match request, maybe we shouldn't log?
			// "Cette salon a son id dans le fichier configApi" implies a specific channel for a specific purpose (maybe specific competition).
			// If `autoRoleLogOrganization` is provided, I'll check if it matches `req.body.organization`.

			let logBot;
			const domain = req.body.organization;

			// Deduce bot from x-domain
			if (domain) {
				for (const [id, bot] of app.BOTS) {
					if (bot.modules.AutoRole?.organization === domain) {
						logBot = bot;
						break;
					}
				}
			}

			// Fallback to configured bot ID if deduction failed or no domain
			if (!logBot && app.autoRoleLogBotId) {
				logBot = app.BOTS.get(app.autoRoleLogBotId);
			}

			if (logBot) {
				// If autoRoleLogOrganization is set, check if it matches the request domain
				if (!app.autoRoleLogOrganization || app.autoRoleLogOrganization === domain) {
					const logChannel = await logBot.channels.fetch(app.autoRoleLogChannelId).catch(() => null);
					if (logChannel) {
						const embed = new EmbedBuilder()
							.setTitle('AutoRole API Call')
							.setColor('#0099ff')
							.addFields(
								{ name: 'Organization', value: domain || 'Unknown', inline: true },
								{ name: 'Target', value: req.body.teamIDs ? `Teams: ${req.body.teamIDs}` : `Users: ${req.body.userIDs}`, inline: true }
							)
							.setTimestamp();

						if (processLogs.length > 0) {
							// Discord field value limit is 1024 characters
							const logsText = processLogs.join('\n');
							const truncatedLogs = logsText.length > 1024 ? logsText.substring(0, 1021) + '...' : logsText;
							embed.addFields({ name: 'Details', value: truncatedLogs });
						} else {
							embed.addFields({ name: 'Details', value: 'No changes detected.' });
						}

						logChannel.send({ embeds: [embed] }).catch(e => app.error(`Failed to send log: ${e.message}`, 'PUT_AUTOROLE'));
					} else {
						app.warn(`Log channel ${app.autoRoleLogChannelId} not found on bot ${logBot.user?.username || logBot.id}`, 'PUT_AUTOROLE');
					}
				}
			} else {
				if (domain) app.warn(`No bot found for domain ${domain}`, 'PUT_AUTOROLE');
			}
		}

		// Répondre
		return {
			message: 'Data received',
		};
	},
	auth: false
};
