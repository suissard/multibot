---
title: removeuserfromchannel
layout: default
---

# Commande `removeuserfromchannel`

## Description

Remove a user from a channel

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `removeuserfromchannel` |
| **Description** | Remove a user from a channel |
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
			description: 'The channel to remove the users from',
			required: true,
		},
		{
			type: 'USER',
			name: 'user1',
			description: 'The user to remove',
			required: true,
		},
		{
			type: 'USER',
			name: 'user2',
			description: 'The user to remove',
			required: false,
		},
		{
			type: 'USER',
			name: 'user3',
			description: 'The user to remove',
			required: false,
		},
	]
```

## Fonctionnement du Code

```javascript
methode(args) {
		const channelName = args.channel;
		const channel = this.guild.channels.cache.find(
			(channel) => channel.name === channelName,
		);
		const users = ['user1', 'user2', 'user3']
			.map((option) => args[option])
			.filter((user) => user !== null);

		try {
			for (const user of users) {
				removeUserFromChannel(channel, user);
	}
```
