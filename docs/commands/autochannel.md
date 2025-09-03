---
title: autochannel
layout: default
---

# Commande `autochannel`

## Description

Lance la fonction autochannel : creation, permission et nettoyage des channels de match

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `autochannel` |
| **Description** | Lance la fonction autochannel : creation, permission et nettoyage des channels de match |
| **Permissions User** | `["ManageChannels"]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
async methode(args = {}) {
			autoChannel(this.bot, this.guild).then(() => {
				this.answerToUser(
					`AutoChannel terminé !`
				);
	}
```
