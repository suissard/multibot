---
title: SalonCommand
layout: default
---

# `SalonCommand`

> **Description :** Définit un salon partagée de recherche de joueur ou le supprime

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

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `game` | <span class="badge badge-type">STRING</span> | A quel jeu est dédié ce channel : overwatch, tekken, lol ou valorant | <span class="badge badge-required">Requis</span> |
| `catégorie` | <span class="badge badge-type">STRING</span> | A quel catégorie est dédié ce channel : scrim, team, player ou staff | <span class="badge badge-required">Requis</span> |

Commande de gestion des shareChannel

Exécute la commande pour ajouter le salon actuel à un groupe de partage. Valide les arguments de jeu et de catégorie avant de procéder à l'ajout.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.game` | <span class="badge badge-type">string</span> | - Le nom du jeu pour ce groupe de partage. |
| `args.catégorie` | <span class="badge badge-type">string</span> | - Le nom de la catégorie pour ce groupe. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

Ajoute le salon actuel au groupe de partage spécifié.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `categorie` | <span class="badge badge-type">string</span> | - La catégorie du groupe de partage. |
| `game` | <span class="badge badge-type">string</span> | - Le jeu du groupe de partage. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation.

