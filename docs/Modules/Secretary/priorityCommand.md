---
title: priorityCommand
layout: default
---

# `priorityCommand`

Déplace le ticket en priorité

## Narrative


- Cette commande permet de déplacer un ticket vers une catégorie "PRIORITY".
- Elle doit être exécutée dans un salon de ticket.
- Si la catégorie "PRIORITY" n'existe pas, elle est créée en haut de la liste des salons.


Exécute la commande pour déplacer le ticket en priorité.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |

**Returns:** `string` - message de confirmation ou d'échec.

