---
title: unmute
layout: default
---

# Commande `unmute`

## Description

Annule le statut muet dun utilisateur, restaurant son accès aux salons.

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `unmute` |
| **Description** | Annule le statut muet dun utilisateur, restaurant son accès aux salons. |
| **Permissions User** | `['BanMembers']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
            {
                type: 'USER',
                name: 'user',
                description: 'User à unmute',
                required: true,
            },
        ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
            let channelMute = this.guild.channels.cache.find((chan) => {
                if (chan.name == 'tu-as-été-mute') return chan;
	}
```
