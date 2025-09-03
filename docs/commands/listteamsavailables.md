---
title: listteamsavailables
layout: default
---

# Commande `listteamsavailables`

## Description

Renvoie la liste des teams disponibles pour un challenge donné

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `listteamsavailables` |
| **Description** | Renvoie la liste des teams disponibles pour un challenge donné |
| **Permissions User** | `[]` |
| **Permissions Bot** | `['SEND_MESSAGES']` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'INTEGER',
            name: 'challengeid',
            description: 'ID du challenge pour lequel lister les équipes',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args) {
        const challengeId = args.challengeid;

        if (!this.bot.olympe || !this.bot.olympe.api) {
            return "Le module Olympe n'est pas correctement initialisé. Veuillez contacter un administrateur.";
	}
```
