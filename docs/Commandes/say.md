---
title: say
layout: default
---

# `say`

> **Description :** Fait parler le bot.

## Narrative


- Cette commande permet de faire parler le bot dans un channel.
- Elle nécessite la permission "Administrateur" (\`Administrator\`) pour être utilisée.
- La commande peut être utilisée uniquement dans le discord considéré comme home.
- Le bot se contentera d'écrire le texte dans le channel indiqué avec la piece jointe fournit


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `texte` | <span class="badge badge-type">STRING</span> | Message à envoyer | <span class="badge badge-required">Requis</span> |
| `channel` | <span class="badge badge-type">CHANNEL</span> | Channel où envoyer le message | <span class="badge badge-optional">Optionnel</span> |
| `piecejointe` | <span class="badge badge-type">ATTACHMENT</span> | Pièce jointe à envoyer | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande pour faire parler le bot.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.texte` | <span class="badge badge-type">string</span> | - Le contenu du message à envoyer. |
| `args.channel` | <span class="badge badge-type">string</span> | - L'ID du channel où envoyer le message. |
| `args.piecejointe` | <span class="badge badge-type">string</span> | - L'URL de la pièce jointe à envoyer. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

