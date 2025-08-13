const Commande = require('../../../Class/Command');
const { addUserToChannel } = require('../../../services/discordService');

class AddUserToChannel extends Commande {
	static id = 'addusertochannel';
	static devBoss = false;
	static home = false;
	static userPermissions = ['ManageChannels'];
	static botPermissions = [];
	static description = 'Add a user to a channel';
	static howTo = 'PREFIXCMD';
	static test = [];
	static arguments = [
		{
			type: 'CHANNEL',
			name: 'channel',
			description: 'The channel to add the users to',
			required: true,
		},
		{
			type: 'USER',
			name: 'user1',
			description: 'The user to add',
			required: true,
		},
		{
			type: 'USER',
			name: 'user2',
			description: 'The user to add',
			required: false,
		},
		{
			type: 'USER',
			name: 'user3',
			description: 'The user to add',
			required: false,
		},
	];

	methode(args = {}) {
		const channelId = args.channel;
		const channel = this.guild.channels.cache.find((channel) => channel.id === channelId);
		const users = ['user1', 'user2', 'user3']
			.map((option) => args[option])
			.filter((user) => user !== null);

		try {
			for (const user of users) {
				addUserToChannel(channel, user, channel.type);
			}
			return `Users have been added to the channel ${channel.name}.`;
		} catch (error) {
			console.error('Error adding users to channel:', error);
			return 'There was an error while adding the users to the channel.';
		}
	}
}

//module.exports = AddUserToChannel;
