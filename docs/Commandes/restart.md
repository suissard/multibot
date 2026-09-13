---
title: restart
layout: default
---

# `restart`

> **Description :** redemarre le bot

## Narrative


- Cette commande est conçue pour redémarrer le bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot, dont l'ID est défini dans la configuration (\`this.bot.ownerId\`).
- La commande vérifie si l'ID de l'utilisateur qui l'exécute correspond à l'ID du propriétaire.
- Si c'est le cas, elle appelle la méthode \`this.bot.restart()\` qui gère le processus de redémarrage.
- Si une raison est fournie en argument, elle est ajoutée au message de confirmation qui est envoyé juste avant le redémarrage.
- Si l'utilisateur n'est pas le propriétaire, la commande renvoie un message d'erreur et ne fait rien d'autre.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `raison` | <span class="badge badge-type">STRING</span> | Raison du restart | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande pour redémarrer le bot. La commande ne peut être exécutée que par le propriétaire du bot.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.raison` | <span class="badge badge-type">string</span> | - La raison du redémarrage, qui sera incluse dans la réponse. |

**Retour :** <span class="badge badge-type">string</span> - message de confirmation ou un message d'erreur si l'utilisateur n'est pas le propriétaire.

