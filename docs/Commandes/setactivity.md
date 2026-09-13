---
title: setactivity
layout: default
---

# `setactivity`

> **Description :** change le status du bot

## Narrative


- Cette commande permet de changer le message d'activité (le statut "Joue à...") du bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot (\`devBoss = true\`).

- **Fonctionnement :**
    1.  La commande prend un argument \`status\` (texte) qui est le message à afficher.
    2.  Elle appelle la méthode \`setActivity()\` sur l'objet \`user\` du bot, en lui passant le texte du statut.
    3.  Elle retourne ensuite un message confirmant que le statut a été mis à jour.
    4.  Note : Un argument \`type\` existe mais n'est pas actuellement utilisé dans le code. La fonctionnalité pour changer le type d'activité (Streaming, Watching, etc.) est présente en commentaire mais n'est pas active.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `status` | <span class="badge badge-type">STRING</span> | Status a mettre | <span class="badge badge-required">Requis</span> |
| `type` | <span class="badge badge-type">STRING</span> | Type de status a mettre | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande pour changer l'activité du bot.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.status` | <span class="badge badge-type">string</span> | - Le texte de l'activité à afficher. |
| `args.type` | <span class="badge badge-type">string</span> | - Le type d'activité (non implémenté actuellement). |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation.

