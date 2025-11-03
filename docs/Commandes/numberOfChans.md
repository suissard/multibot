---
title: numberOfChans
layout: default
---

# `numberOfChans`

Donne le nombre de channel du serveur

## Narrative


- La commande récupère le nombre total de salons (channels) actuellement présents sur le serveur.
- Elle accède à la collection \`channels.cache\` de l'objet \`guild\` (serveur) pour en obtenir la taille.
- Elle retourne une simple chaîne de caractères indiquant ce nombre, avec un rappel de la limite de 500 salons par serveur sur Discord.


Exécute la commande pour obtenir le nombre de salons sur le serveur.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `string` - message indiquant le nombre de salons.

