---
title: washmatchs
layout: default
---

# Commande `washmatchs`

## Description

Supprime les channels de matchs

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `washmatchs` |
| **Description** | Supprime les channels de matchs |
| **Permissions User** | `["ManageChannels"]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
async methode(args = {}) {
		const exceptionName = []
		washOldChannels(this.guild, exceptionName, true).then(() => {
			this.answerToUser(
				`Channels supprimé avec succés !`
			);
	}
```
