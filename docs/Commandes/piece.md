---
title: piece
layout: default
---

# `piece`

Lance une piece pour récolter pile ou face

## Narrative


- La commande simule un lancer de pièce à pile ou face.
- Elle génère un nombre aléatoire entre 0 et 1 en utilisant \`Math.random()\`.
- Si le nombre est inférieur à 0.5, elle retourne la chaîne de caractères "Pile".
- Sinon (si le nombre est supérieur ou égal à 0.5), elle retourne "Face".


Exécute la commande pour simuler un lancer de pièce.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `string` - résultat du lancer : 'Pile' ou 'Face'.

