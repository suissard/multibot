---
title: event
layout: default
---

# Commande `event`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `event` |
| **Description** | N/A |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'info = tableau des teams, team = ajout de rôle team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'users',
            description: 'user aux quels il faut ajouter le rôle de team',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
methode(args = {}) {
        if (args.texte.toLowerCase() == 'info') {
            return await this.info();
        } else if (args.texte.toLowerCase() == 'team') {
            if (!args.users) {
                return 'Tu n\'as pas mentionné de personnes aux quels il faut que j\'ajoute le rôle';
            } else {
                return this.addTeamRole(args.users);
            }
        } else if (args.texte.toLowerCase() == 'wash') {
            return await this.eventWash();
        } else {
            return 'Il y a eu une erreur, merci de contacter un admin';
        }
    }
```
