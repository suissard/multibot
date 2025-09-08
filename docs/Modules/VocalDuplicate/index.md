---
title: index
layout: default
---

# `index`



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `import('../../Class/Bot')` | - L'instance du bot. |

Récupère l'ensemble des IDs des salons vocaux qui ont été dupliqués par ce module.

**Returns:** `Promise<Set<string>>` - Set contenant les IDs des salons dupliqués.

Vérifie tous les salons dupliqués et supprime ceux qui sont inactifs (vides).

Gère l'événement 'voiceStateUpdate' pour déclencher la duplication de salon. Si un utilisateur rejoint un salon vocal configuré comme "modèle", un nouveau salon est créé avec les mêmes permissions et l'utilisateur y est déplacé.

