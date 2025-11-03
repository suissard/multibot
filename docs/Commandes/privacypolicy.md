---
title: privacypolicy
layout: default
---

# `privacypolicy`

Fournit la politique de confidentialité du bot

## Narrative


- Au moment du chargement initial du fichier de commande (et non à chaque exécution), le contenu du fichier \`PRIVACY.md\` situé à la racine du projet est lu et stocké en mémoire.
- Lorsque la commande est exécutée, elle retourne simplement le contenu de ce fichier qui a été préalablement chargé.
- Cela permet d'afficher la politique de confidentialité du bot directement dans Discord.


Exécute la commande pour afficher la politique de confidentialité. Lit le fichier PRIVACY.md et retourne son contenu.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `string` - contenu du fichier de politique de confidentialité.

