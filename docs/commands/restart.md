---
title: restart
layout: default
---

# Commande `restart`

## Description

redemarre le bot

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `restart` |
| **Description** | redemarre le bot |
| **Permissions User** | `['Administrator']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
            {
                type: 'STRING',
                name: 'raison',
                description: 'Raison du restart',
                required: false,
            },
        ]
```

## Fonctionnement du Code

```javascript
methode(args = {}) {
            let result = 'Redémarrage efféctué avec succès !';
            if (this.bot.ownerId == this.user.id) {
                if (args.raison) {
                    result = result + '\nPour la raison suivante : ' + args.raison;
                }
                this.bot.restart();
                return result;
            } else {
                return 'Cette commande est réservé au proprietaire du bot';
            }
            //throw new Error("Cette commande est réservé au proprietaire du bot")
        }
    }
```
