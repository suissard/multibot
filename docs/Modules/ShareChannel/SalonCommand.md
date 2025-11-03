---
title: SalonCommand
layout: default
---

# `SalonCommand`

Définit un salon partagée de recherche de joueur ou le supprime

## Narrative


- Cette commande permet de désigner le salon actuel comme faisant partie d'un "groupe de partage".
- Un groupe de partage est défini par un jeu et une catégorie (par exemple, "overwatch-scrim"). Tous les messages postés dans un salon d'un groupe sont répliqués dans tous les autres salons du même groupe, même s'ils sont sur des serveurs différents.
- Elle nécessite la permission "Gérer les salons" (\`MANAGE_CHANNELS\`).

- **Arguments requis :**
    - \`game\` : Le jeu auquel le salon est dédié (ex: "overwatch", "lol").
    - \`catégorie\` : La catégorie du salon (ex: "scrim", "team").

- **Fonctionnement :**
    1.  La commande valide que le jeu et la catégorie fournis en argument font partie des listes prédéfinies dans la configuration (\`gamePattern\`, \`categoryPattern\`).
    2.  Si les arguments sont valides, elle recherche le groupe de partage correspondant (ex: "overwatch-scrim").
    3.  Si le groupe de partage existe, elle ajoute le salon actuel à ce groupe.
    4.  Elle renvoie un message de confirmation. Ce message inclut un avertissement si le serveur a moins de 50 membres, indiquant que la diffusion des messages ne sera activée qu'au-delà de ce seuil.
    5.  Si le jeu, la catégorie, ou le groupe de partage n'existent pas, une erreur est renvoyée.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `game` | `STRING` | A quel jeu est dédié ce channel : overwatch, tekken, lol ou valorant | Yes |
| `catégorie` | `STRING` | A quel catégorie est dédié ce channel : scrim, team, player ou staff | Yes |

Commande de gestion des shareChannel

Exécute la commande pour ajouter le salon actuel à un groupe de partage. Valide les arguments de jeu et de catégorie avant de procéder à l'ajout.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.game` | `string` | - Le nom du jeu pour ce groupe de partage. |
| `args.catégorie` | `string` | - Le nom de la catégorie pour ce groupe. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

Ajoute le salon actuel au groupe de partage spécifié.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `categorie` | `string` | - La catégorie du groupe de partage. |
| `game` | `string` | - Le jeu du groupe de partage. |

**Returns:** `Promise<string>` - message de confirmation.

