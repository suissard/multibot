---
title: setteam
layout: default
---

# Commande `setteam`

## Description

Crée une nouvelle équipe avec un rôle et un salon dédiés.

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `setteam` |
| **Description** | Crée une nouvelle équipe avec un rôle et un salon dédiés. |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'teamname',
            description: 'Nom de la team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'btag',
            description: 'Btag Du capitaine',
            required: true,
        },
        {
            type: 'USER',
            name: 'capitaine',
            description: 'Capitaine de la team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'elo',
            description: 'Rank de la team',
            required: true,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        this.getEventRole(args).then(async ({ roleteam, rolecap }) => {
            await this.createRoleAnChannel(args, roleteam, rolecap);
            const embed = new MultiBotMessageEmbed(
                `__Création de la team **${args.teamname}**__`,
                `**Capitaine :** <@${args.capitaine}>\n**Elo :** ${args.elo}\n**Btag :** ${args.btag}`,
            );
            this.answerToUser(embed);
	}
```
