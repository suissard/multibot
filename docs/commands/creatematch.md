---
title: creatematch
layout: default
---

# Commande `creatematch`

## Description

Create match channels

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `creatematch` |
| **Description** | Create match channels |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
		{
			type: 'STRING',
			name: 'matchid',
			description: 'The id of the match',
			required: true,
		},
	]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
		const matchId = args.matchid;
		const match = await getMatchById(this.bot, matchId).catch(()=>{});
		if (match) {
			createMatchChannels(this.bot, match, this.guild).then((channels) => {
				this.answerToUser(
					`Channels Créer avec succés !\n + <#${channels
						.map((c) => c.id)
						.join('>\n + <#')}>`
				);
	}
```
