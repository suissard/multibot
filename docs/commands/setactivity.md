---
title: setactivity
layout: default
---

# Commande `setactivity`

## Description

change le status du bot

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `setactivity` |
| **Description** | change le status du bot |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'status',
            description: 'Status a mettre',
            required: true,
        },
        {
            type: 'STRING',
            name: 'type',
            description: 'Type de status a mettre',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        this.bot.user.setActivity(args.status);
        // TODO permettre d'autres activités
        // this.bot.user.setActivity(args.status, { name : args.status, type: args.status ||"STREAMING", url: "https://playallforone.com/event" });

        return 'Status mis a jour : ' + args.status;
	}
```
