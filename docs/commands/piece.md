---
title: piece
layout: default
---

# Commande `piece`

## Description

Lance une piece pour récolter pile ou face

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `piece` |
| **Description** | Lance une piece pour récolter pile ou face |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
methode(args = {}) {
		return Math.random() < 0.5 ? 'Pile' : 'Face';
	}
```
