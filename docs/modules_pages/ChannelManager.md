---
title: "Module: ChannelManager"
layout: default
---

# Module: `ChannelManager`

## Description

Initialise le module ChannelManager pour un bot.

## Fonctionnement

Ce module gère automatiquement la création et la suppression de salons de match en se basant sur une tâche planifiée (cron). Il expose également des commandes pour gérer manuellement les salons.
 @param {import('../../Class/Bot')} bot - L'instance du bot pour laquelle initialiser le module.
 @returns {object} Un objet contenant les classes de commandes et d'événements exportées par ce module.

## Fichiers du Module

```
commands, events, index.js, tests, utils
```

## Composants Enregistrés

Ce module enregistre les composants suivants (commandes, événements) :
```
AddUserToChannel, RemoveUserFromChannel, CreateMatchCommand, washMatchCommand, AutoChannelCommand, GuildMemberAddAutorole
```

## Contenu de `index.js`

```javascript
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
 * @description Initialise le module ChannelManager pour un bot.
 * @narrative Ce module gère automatiquement la création et la suppression de salons de match en se basant sur une tâche planifiée (cron). Il expose également des commandes pour gérer manuellement les salons.
 * @param {import('../../Class/Bot')} bot - L'instance du bot pour laquelle initialiser le module.
 * @returns {object} Un objet contenant les classes de commandes et d'événements exportées par ce module.
 */
module.exports = (bot) => {
	/**
	 * Une fois le bot prêt, ce gestionnaire configure et lance la tâche planifiée
	 * pour la gestion automatique des salons.
	 */
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

```
