---
title: index
layout: default
---

# `index`

Le module "VocalDuplicate" offre une fonctionnalité de salons vocaux temporaires. Il surveille des salons vocaux "modèles" prédéfinis. Lorsqu'un utilisateur rejoint l'un de ces salons modèles, le module crée instantanément une copie de ce salon (un "duplicata") avec les mêmes permissions et y déplace l'utilisateur. Cela permet de créer des espaces de discussion à la volée sans encombrer la liste des salons. Le module inclut également un processus de nettoyage automatique : il vérifie périodiquement tous les salons dupliqués et supprime ceux qui sont vides et inactifs, garantissant ainsi une gestion efficace des ressources.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">import('../../Class/Bot')</span> | - L'instance du bot. |

Récupère l'ensemble des IDs des salons vocaux qui ont été dupliqués par ce module.

**Retour :** <span class="badge badge-type">Promise<Set<string>></span> - Set contenant les IDs des salons dupliqués.

Vérifie tous les salons dupliqués et supprime ceux qui sont inactifs (vides).

Gère l'événement 'voiceStateUpdate' pour déclencher la duplication de salon. Si un utilisateur rejoint un salon vocal configuré comme "modèle", un nouveau salon est créé avec les mêmes permissions et l'utilisateur y est déplacé.

