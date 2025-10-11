const { PermissionsBitField, ChannelType, EmbedBuilder, TextChannel } = require('discord.js');

/**
 * Create a channel in a category with a specific name and type
 * @param bot
 * @param category
 * @param guild
 * @param channelName
 * @param channelType
 * @returns {Promise<any>}
 */
const createChannel = async (bot, category, guild, channelName, channelType) => {
	try {
		const channel = await guild.channels.create({
			name: channelName,
			type: channelType,
			parent: category.id,
			userLimit: bot.modules.ChannelManager.userLimit,
			permissionOverwrites: [],
		});
		console.log(
			`[${bot.name}] AUTOCHANNEL : Creation de channel ${
				channelType == 2 ? 'voc' : 'txt'
			} : ${channelName}`
		);
		return channel;
	} catch (error) {
		console.error('Error creating channel: ' + channelName + '\n' + error);
	}
};

/**
 * Set permissions for a channel
 * @param channel
 * @param users
 * @param channelType
 * @returns {Promise<void>}
 */
const setPermissions = async (channel, users, channelType) => {
	const orgaRoleIds = channel.client.modules.AutoRole.orgaRoleIds;
	const everyonePermissions = {
		id: channel.guild.id,
		allow: [
			PermissionsBitField.Flags.Speak,
			PermissionsBitField.Flags.SendMessages,
			PermissionsBitField.Flags.SendMessagesInThreads,
			PermissionsBitField.Flags.ReadMessageHistory,
			PermissionsBitField.Flags.Stream,
		],
		deny: [],
	};
	try {
		const permissions = [];
		for (let roleId of orgaRoleIds) {
			const role = channel.guild.roles.cache.get(roleId);
			if (!role) continue;
			permissions.push({
				id: roleId, // Permissions Organisateurs
				allow: [
					PermissionsBitField.Flags.ViewChannel,
					PermissionsBitField.Flags.Stream,
					PermissionsBitField.Flags.Connect,
					PermissionsBitField.Flags.Speak,
					PermissionsBitField.Flags.SendMessages,
					PermissionsBitField.Flags.SendMessagesInThreads,
					PermissionsBitField.Flags.ReadMessageHistory,
					PermissionsBitField.Flags.MoveMembers,
					PermissionsBitField.Flags.ManageChannels,
					PermissionsBitField.Flags.ManageMessages,
					PermissionsBitField.Flags.MuteMembers,
					PermissionsBitField.Flags.DeafenMembers,
					PermissionsBitField.Flags.PrioritySpeaker,
				],
			});
		}

		if (channelType === ChannelType.GuildVoice) {
			for (const user of users) {
				permissions.push({
					id: user.id, // Permissions membre de team dans un salon vocale
					allow: [
						PermissionsBitField.Flags.Connect,
						PermissionsBitField.Flags.Speak,
						PermissionsBitField.Flags.ViewChannel,
						PermissionsBitField.Flags.SendMessages,
						PermissionsBitField.Flags.SendMessagesInThreads,
						PermissionsBitField.Flags.ReadMessageHistory,
						PermissionsBitField.Flags.MoveMembers,
					],
				});
			}
			everyonePermissions.deny.push(PermissionsBitField.Flags.Connect);
			everyonePermissions.allow.push(PermissionsBitField.Flags.ViewChannel);
		} else {
			for (const user of users) {
				permissions.push({
					id: user.id, // Permissions membre de team dans un salon texte
					allow: [
						PermissionsBitField.Flags.Connect,
						PermissionsBitField.Flags.ViewChannel,
						PermissionsBitField.Flags.SendMessages,
						PermissionsBitField.Flags.SendMessagesInThreads,
						PermissionsBitField.Flags.ReadMessageHistory,
					],
				});
			}
			everyonePermissions.deny.push(PermissionsBitField.Flags.ViewChannel);
		}
		permissions.push(everyonePermissions);
		await channel.permissionOverwrites.set(permissions);
	} catch (error) {
		console.error('Error setting permissions for channel : ' + channel, error);
	}
};

/**
 * Add a user to a channel with specific permissions
 * @param channel
 * @param user
 * @param channelType
 * @returns {Promise<void>}
 * @deprecated
 */

const addUserToChannel = async (channel, user, channelType) => {
	try {
		await channel.permissionOverwrites.edit(user.id, {
			allow: [
				PermissionsBitField.Flags.ViewChannel,
				PermissionsBitField.Flags.SendMessages,
				PermissionsBitField.Flags.ReadMessageHistory,
			],
		});

		if (channelType === ChannelType.GuildVoice) {
			await channel.permissionOverwrites.edit(user.id, {
				allow: [
					PermissionsBitField.Flags.ViewChannel,
					PermissionsBitField.Flags.SendMessages,
					PermissionsBitField.Flags.ReadMessageHistory,
					PermissionsBitField.Flags.MoveMembers,
				],
			});
		}
	} catch (error) {
		console.error('Error adding user ' + user + ' to channel: ' + channel.name + '\n' + error);
	}
};

/**
 * Remove a user from a channel
 * @param channel
 * @param user
 * @returns {Promise<void>}
 */
const removeUserFromChannel = async (channel, user) => {
	try {
		await channel.permissionOverwrites.delete(user);
		console.log('User ' + user + ' removed from channel:' + channel.name);
	} catch (error) {
		console.error(
			'Error removing user ' + user + ' from channel: ' + channel.name + '\n' + error
		);
	}
};

/**
 * Trouve une catégorie par son nom.
 * @param {import('discord.js').Guild} guild - La guilde où chercher.
 * @param {string} name - Le nom de la catégorie à trouver.
 * @returns {import('discord.js').CategoryChannel|undefined} La catégorie trouvée, ou undefined.
 */
const getCategoryWithName = (guild, name) => {
	return guild.channels.cache.find(
		(c) => c.name.includes(name) && c.type === ChannelType.GuildCategory
	);
};

/**
 * Check if a channel with a specific name, category and type exists
 * @param guild
 * @param name
 * @param category
 * @param channelType
 * @returns {Holds}
 */
const checkIfChannelExists = (guild, name, category, channelType) => {
	return guild.channels.cache.find(
		(c) => c.name === name && c.parent === category && c.type === channelType
	);
};

/**
 * Trouve un salon par son nom et son type.
 * @param {import('discord.js').Guild} guild - La guilde où chercher.
 * @param {string} name - Le nom du salon.
 * @param {import('discord.js').ChannelType} channelType - Le type de salon.
 * @returns {import('discord.js').GuildChannel|undefined} Le salon trouvé, ou undefined.
 */
const getChannelByNameAndType = (guild, name, channelType) => {
	return guild.channels.cache.find((c) => c.name === name && c.type === channelType);
};

/**
 * Récupère l'URL du site web de l'organisation depuis la configuration du bot.
 * @param {Bot} bot - L'instance du bot.
 * @returns {string} L'URL du site web.
 */
const getWebsiteUrl = (bot) => {
	return `https://${bot.modules.AutoRole.organization}`;
};

/**
 * Crée une mention Discord pour un utilisateur Olympe, en vérifiant sa présence sur le serveur.
 * @param {object} user - L'objet utilisateur Olympe.
 * @param {import('discord.js').Guild} guild - La guilde où vérifier la présence.
 * @returns {string} La chaîne de mention.
 */
const getOlympeMention = (user, guild) => {
	const userIsPresent = guild.members.cache.get(user.thirdparties?.discord?.discordID);
	return `<@${
		userIsPresent
			? userIsPresent.id
			: !user.thirdparties?.discord?.discordID
			? 'noDiscordSync'
			: 'NotPresentInGuild'
	}>`;
};
/**
 * Mention users in a channel with specific information
 * @param {TextChannel} textChannel
 * @param timestamp
 * @param teams
 * @param teamsChannels
 * @param casters
 * @param castersChannels
 */
const mentionUsersInChannel = (textChannel, timestamp, teams, casters = null, matchID) => {
	let embeds = [];
	let message = `Hey !\nLe match entre **${teams[0].name} ⚔️ ${
		teams[1].name
	}**\nse déroule **<t:${timestamp}:R>**\n[Lien vers le match](${getWebsiteUrl(
		textChannel.client
	)}/matchs/${matchID})\n\n`;
	const gradinChannel = textChannel.parent.children.cache.find(c => c.name.startsWith("Gradins"))
		message +=
		'⚠️ **Pas d\'accés au channel vocal ? :** Tu peux déplacer tes teammates depuis <#'+gradinChannel+'> vers le channel d\'équipe\n';
	message +=
	//	'⚠️ **Remplissez votre lineup** sur le site olympe pour ne pas offrir une win gratuite à vos opposants !!!\n';
	// message += [...teamsChannels.map(chan=>`<#${chan.id}>`), ...castersChannels.map(chan=>`<#${chan.id}>`)].join(' ');

	for (const team of teams) {
		let description = '';

		// for (const user of team.lineup?.members) {
		for (const member of team.members) {
			description += `${getOlympeMention(member.user, textChannel.guild)} - [${
				member.user.battlenetBtag || 'Profile'
			}](${getWebsiteUrl(textChannel.client)}/profile/${member.user.id}) - ${getRoleEmoji(
				member.tags.gameRoles[0]
			)}\n`;
		}
		
		if (team.membersLent.length) {
			description += "**Membres en pret :**\n"
			for (const member of team.membersLent.map(m=>m.member)) {
			description += `${getOlympeMention(member.user, textChannel.guild)} - [${
				member.user.battlenetBtag || 'Profile'
			}](${getWebsiteUrl(textChannel.client)}/profile/${member.user.id}) - ${getRoleEmoji(
				member.tags.gameRoles[0]
			)}\n`;
		}}
		
		const embedTeam = new EmbedBuilder()
			.setTitle(team.name)
			.setURL(`${getWebsiteUrl(textChannel.client)}/teams/${team.id}`)
			.setDescription(description)
			.setThumbnail(`https://assets.olympe.xyz/assets/teams/${team.id}/profile`);
		embeds.push(embedTeam);
	}

	if (casters.length) {
		let description = '';
		for (const caster of casters) {
			description += `${getOlympeMention(caster, textChannel.guild)} - <${caster.castUrl}>\n`;
		}

		const embedCast = new EmbedBuilder()
			.setTitle('Cast')
			.setDescription(description)
			.setThumbnail('https://storage.googleapis.com/logo-site/twitch.png');
		embeds.push(embedCast);
	}

	textChannel?.send({ content: message, embeds: embeds }).catch(console.error);
};

/**
 * Envoie une notification de match dans un salon spécifique.
 * @param {Bot} bot - L'instance du bot.
 * @param {Array<object>} teams - Les deux équipes du match.
 * @param {string} division - Le nom de la division.
 * @param {number} timestamp - Le timestamp du match.
 * @param {Array<object>} casters - Les casters du match.
 * @param {import('discord.js').TextChannel} channel - Le salon où envoyer la notification.
 * @param {string} roleId - L'ID du rôle à mentionner.
 */
const notifyMatch = async (bot, teams, division, timestamp, casters, channel, roleId) => {
	let embeds = [];
	let message = bot.modules.MatchNotifier.notifMessage
		.replace('${teams[0].name}', teams[0].name)
		.replace('${teams[1].name}', teams[1].name)
		.replace('${division}', division)
		.replace('${timestamp}', timestamp);

	let role = channel.guild.roles.cache.get(roleId);
	if (role) message = message.replace('${roleId}', `<@&${roleId}>`);
	else message = message.replace('${roleId}', '');

	if (casters) {
		let description = '';
		for (const caster of casters) {
			description += `🎙️ ${getOlympeMention(caster, channel.guild)} - <${caster.castUrl}>\n`;
		}

		const embedCast = new EmbedBuilder()
			.setTitle('Le stream du match en direct avec:')
			.setDescription(description)
			.setThumbnail('https://storage.googleapis.com/logo-site/twitch.png');
		embeds.push(embedCast);
	}

	for (const team of teams) {
		const embedTeam = new EmbedBuilder()
			.setTitle('Suivez ' + team.name + ' !')
			.setURL(`${getWebsiteUrl(bot)}/teams/${team.id}`)
			.setDescription("Toute l'activité de votre équipe favorite, ici !")
			.setThumbnail(`https://assets.olympe.xyz/assets/teams/${team.id}/profile`);
		embeds.push(embedTeam);
	}

	channel
		.send({ content: message, embeds: embeds })
		.catch((err) => {
			console.error(
				`[${bot.name}] MatchNotifier : notif for ${teams[0].name} vs ${teams[1].name} in ${channel.name} failed`,
				err
			);
		})
		.then(() =>
			console.log(
				`[${bot.name}] MatchNotifier : notif send for ${teams[0].name} vs ${teams[1].name} in ${channel.name}`
			)
		);
};

/**
 * Retourne un emoji correspondant à un rôle en jeu (dps, heal, tank).
 * @param {string} role - Le nom du rôle.
 * @returns {string} L'emoji correspondant, ou une chaîne vide.
 */
const getRoleEmoji = (role) => {
	if (!role) return '';
	if (role.includes('dps')) {
		return '⚔️';
	} else if (role.includes('heal')) {
		return '💉';
	} else if (role.includes('tank')) {
		return '🛡️';
	}
	return '';
};

module.exports = {
	createChannel,
	addUserToChannel,
	removeUserFromChannel,
	getCategoryWithName,
	checkIfChannelExists,
	getChannelByNameAndType,
	mentionUsersInChannel,
	setPermissions,
	notifyMatch,
};
