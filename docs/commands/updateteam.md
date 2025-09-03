---
title: updateteam
layout: default
---

# Commande `updateteam`

## Description

Met à jour une équipe

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `updateteam` |
| **Description** | Met à jour une équipe |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'teamname',
            description: 'Nom de la team à modifier',
            required: true,
        },
        {
            type: 'STRING',
            name: 'newteamname',
            description: 'Nouveau nom de la team',
            required: false,
        },
        {
            type: 'USER',
            name: 'newcap',
            description: 'Nouveau capitaine de la team',
            required: false,
        },
        {
            type: 'STRING',
            name: 'newbtag',
            description: 'Nouveau battleTag du capitaine de la team',
            required: false,
        },
        {
            type: 'INTEGER',
            name: 'newrank',
            description: 'Nouveau rank de la team',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        await this.guild.roles.fetch();
        await this.guild.members.fetch();
        let roleTeam = this.guild.roles.cache.find((role) => {
            if (role.name == `Team [${args.teamname}]`) return role;
	}
```
