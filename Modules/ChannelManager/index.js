const Bot = require('../../Class/Bot.js');
const { schedule } = require('node-cron');
const AddUserToChannel = require('./commands/addUserToChannel');
const RemoveUserFromChannel = require('./commands/removeUserFromChannel');
const CreateMatchCommand = require('./commands/createMatchCommand');
const washMatchCommand = require('./commands/washMatchCommand');
const AutoChannelCommand = require('./commands/autoChannelCommand');
const GuildMemberAddAutorole = require('./events/NewGuildMember');
const { autoChannel } = require('./utils/channelManagement.js');

/**
 * 
 * @param {Bot} bot 
 * @returns 
 */
module.exports = (bot) => {
	bot.on('ready', async () => {
		const guildId = bot.home;
		const guild = bot.guilds.cache.get(guildId);
		await guild.channels.fetch();
		await guild.members.fetch();
		//! TEST =====================================================================
		// bot.modules.ChannelManager.cronSchedule = '*/1 * * * *';
		// const duration = 12//0.5
		// bot.modules.ChannelManager.maximumNumberOfHoursToRetrieveFutureMatches = duration;
		// bot.modules.ChannelManager.maximumMatchDuration = duration;

		// let member = guild.members.cache.get("306395745693597697")
		// const event = bot.BOTS.Events.get('autorolenewguildmember')
		// new event(bot).handleEvent(member)

		//! TEST =====================================================================
		await schedule(bot.modules.ChannelManager.cronSchedule, async () => {
			autoChannel(bot, guild);
		});
	});

	return {
		AddUserToChannel,
		RemoveUserFromChannel,
		CreateMatchCommand,
		washMatchCommand,
		AutoChannelCommand,
		GuildMemberAddAutorole
	};
};
