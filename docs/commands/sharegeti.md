---
title: sharegeti
layout: default
---

# Commande `sharegeti`

## Description

Définit ce salon pour partager les annonces Geti

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `sharegeti` |
| **Description** | Définit ce salon pour partager les annonces Geti |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        let shareChannel = BOTS.ShareChannels.get(`overwatch-geti`);
        await shareChannel.addChannel(this.channel, 'overwatch', 'geti');
        return 'Les annonces de GeekingTime seront dorénavant publiés ici';
	}
```
