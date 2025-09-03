---
title: addusertochannel
layout: default
---

# Commande `addusertochannel`

## Description

Add a user to a channel

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `addusertochannel` |
| **Description** | Add a user to a channel |
| **Permissions User** | `['ManageChannels']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
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
	]
```

## Fonctionnement du Code

```javascript
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
```
