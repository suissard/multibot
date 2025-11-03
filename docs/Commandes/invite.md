---
title: invite
layout: default
---

# `invite`

## Narrative


- La commande a pour but de fournir un lien d'invitation pour que les utilisateurs puissent ajouter ce bot à leur propre serveur Discord.
- Elle contient une liste de réponses textuelles amusantes et prédéfinies.
- À chaque exécution, elle choisit une de ces réponses de manière aléatoire.
- Elle construit ensuite le lien d'invitation OAuth2 du bot en utilisant l'ID client du bot actuellement connecté. Le lien demande des permissions d'administrateur (\

Exécute la commande d'invitation. Génère un lien d'invitation pour le bot, accompagné d'un message amusant aléatoire.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `string` - chaîne contenant un message et le lien d'invitation du bot.

