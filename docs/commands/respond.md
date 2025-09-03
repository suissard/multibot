---
title: respond
layout: default
---

# Commande `respond`

## Description

Répond au message du secretary

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `respond` |
| **Description** | Répond au message du secretary |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'Texte à envoyer',
            required: false,
        }, {
            type: 'ATTACHMENT',
            name: 'fichier',
            description: 'Fichier à envoyer',
            required: false,
        }
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        let passing = false;
        for (let i in this.bot.modules.Secretary.secretary) {
            if (this.bot.modules.Secretary.secretary[i].guild.id == args.interaction.guild.id) {
                passing = true;
	}
```
