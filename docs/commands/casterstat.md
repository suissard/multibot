---
title: casterstat
layout: default
---

# Commande `casterstat`

## Description

Renvoit un url personnalisé pour déclarer les statistiques dun match

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `casterstat` |
| **Description** | Renvoit un url personnalisé pour déclarer les statistiques dun match |
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
			description: 'Identifiant de match de la compétition',
			required: true,
		},
		{
			type: 'USER',
			name: 'user',
			description: 'Utilisateur a qui faire parvenir le formulaire',
			required: false,
		},
		{
			type: 'STRING',
			name: 'castnbr',
			description: 'Caster était en position 1 ou 2',
			required: false,
		},
	]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
		const discordUser = this.bot.users.cache.get(args.user) || this.user;
		const match = await this.bot.olympe.api.matchs.get(args.matchid).catch();
		if (!match) return 'Match non trouvé';

		const formUrl = this.getCasterStatUrlForm(match, Number(args.castnbr||"1")-1);

		//envoyer par mp
		var msgEmbed = new EmbedBuilder()
			.setTitle('Formulaire casterStat')
			.setColor(Colors.Purple)
			.setDescription(`[**LIEN**](${formUrl})`);

		discordUser.send({ embeds: [msgEmbed] });

		return 'Un formulaire personnalisé a été envoyé par MP';
	}
```
