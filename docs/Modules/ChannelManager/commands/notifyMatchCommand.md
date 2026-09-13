---
title: notifyMatchCommand
layout: default
---

# `notifyMatchCommand`

> **Description :** Envoie une notification de match à partir d'un ID de match.

## Narrative


- Cette commande permet d'envoyer manuellement une notification de match dans le salon où la commande est exécutée, en utilisant simplement l'ID du match.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande récupère l'ID du match depuis l'argument.
    2.  Elle appelle l'API pour obtenir les détails complets du match (équipes, division, date, casters).
    3.  Elle appelle la fonction \`notifyMatch()\` pour envoyer la notification.
    4.  La commande renvoie un message de confirmation.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `matchid` | <span class="badge badge-type">STRING</span> | ID du match Olympe | <span class="badge badge-required">Requis</span> |
| `role` | <span class="badge badge-type">ROLE</span> | Rôle à mentionner | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande pour envoyer une notification de match à partir d'un ID.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

