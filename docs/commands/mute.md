---
title: mute
layout: default
---

# Commande `mute`

## Description

Rend un utilisateur muet, restreignant son accès aux salons.

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `mute` |
| **Description** | Rend un utilisateur muet, restreignant son accès aux salons. |
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
                description: 'User à mute',
                required: true,
            }, {
                type: 'STRING',
                name: 'raison',
                description: 'Raison du mute',
                required: false,
            },
        ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
            await this.guild.members.fetch();
            let userMute = await this.guild.members.cache.get(args.user);
            let result = 'Utilisateur mute par : <@' + this.user.id + '> ✅';
            let muteRole = await FindChanRole.findRole('mute', this.guild);
            if (!muteRole) {
                await FindChanRole.findRole('mute', this.guild);
	}
```
