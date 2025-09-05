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

## Fonctionnement

- Cette commande est conçue pour redémarrer le bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot, dont l'ID est défini dans la configuration (\`this.bot.ownerId\`).
- La commande vérifie si l'ID de l'utilisateur qui l'exécute correspond à l'ID du propriétaire.
- Si c'est le cas, elle appelle la méthode \`this.bot.restart()\` qui gère le processus de redémarrage.
- Si une raison est fournie en argument, elle est ajoutée au message de confirmation qui est envoyé juste avant le redémarrage.
- Si l'utilisateur n'est pas le propriétaire, la commande renvoie un message d'erreur et ne fait rien d'autre.
