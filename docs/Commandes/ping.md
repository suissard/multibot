---
title: ping
layout: default
---

# `ping`

> **Description :** Répond pong

## Narrative


- La commande répond simplement "Pong".
- Si un argument 'user' est fourni, elle mentionne l'utilisateur.
- Si un argument 'texte' est fourni, elle ajoute le texte à la réponse.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `texte` | <span class="badge badge-type">STRING</span> | Texte à envoyer | <span class="badge badge-optional">Optionnel</span> |
| `user` | <span class="badge badge-type">USER</span> | Mentionner un user à ping | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande ping. Répond "Pong" et peut inclure un texte ou mentionner un utilisateur si fourni en argument.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.user` | <span class="badge badge-type">string</span> | - L'ID de l'utilisateur à mentionner. |
| `args.texte` | <span class="badge badge-type">string</span> | - Le texte à inclure dans la réponse. |

**Retour :** <span class="badge badge-type">string</span> - réponse de la commande.

