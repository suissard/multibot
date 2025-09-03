---
title: autorole
layout: default
---

# Commande `autorole`

## Description

Ajoute les roles discord dun utilisateur en lien avec la competition Olympe

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `autorole` |
| **Description** | Ajoute les roles discord dun utilisateur en lien avec la competition Olympe |
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
			description: 'Utilisateur a mettre a jour',
			required: false,
		},
		{
			type: 'STRING',
			name: 'teamid',
			description: 'Identifiant de team a mettre a jour',
			required: false,
		},
	]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
		if (!args.user && !args.teamid) {
			autoRole(this.bot).then((result) => this.answerToUser('Roles mis à jour'));
			return '⏳ AutoRole générale en cours...';
	}
```
