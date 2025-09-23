---
title: index
layout: default
---

# `index`

Le module "VocalDuplicate" offre une fonctionnalité de salons vocaux temporaires. Il surveille des salons vocaux "modèles" prédéfinis. Lorsqu'un utilisateur rejoint l'un de ces salons modèles, le module crée instantanément une copie de ce salon (un "duplicata") avec les mêmes permissions et y déplace l'utilisateur. Cela permet de créer des espaces de discussion à la volée sans encombrer la liste des salons. Le module inclut également un processus de nettoyage automatique : il vérifie périodiquement tous les salons dupliqués et supprime ceux qui sont vides et inactifs, garantissant ainsi une gestion efficace des ressources.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `import('../../Class/Bot')` | - L'instance du bot. |

