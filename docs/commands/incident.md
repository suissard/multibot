---
title: incident
layout: default
---

# Commande `incident`

## Description

Renvoit un url personnalisé pour déclarer un incident lors de la compétition OAFO

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `incident` |
| **Description** | Renvoit un url personnalisé pour déclarer un incident lors de la compétition OAFO |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
		{
			type: 'USER',
			name: 'user',
			description: "Utilisateur a qui faire parvenir le formulaire d'incident",
			required: false,
		},
	]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
		const discordUser = this.bot.users.cache.get(args.user) || this.user;

		//Recuperer les info de l'utilisateur discord qui a fait la commande
		const olympeId = this.bot.olympe.users[discordUser.id]?.id;

		var oAfoInfo = { nationality: 'FR', battlenetBtag: '', teams: [] };
		try {
			oAfoInfo = await this.bot.olympe.api.GET(
				`users/${olympeId}?fields=battlenetBtag%2CthirdpartiesDiscord`
			);
	}
```
