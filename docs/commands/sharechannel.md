---
title: sharechannel
layout: default
---

# Commande `sharechannel`

## Description

Définit un salon partagée de recherche de joueur ou le supprime

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `sharechannel` |
| **Description** | Définit un salon partagée de recherche de joueur ou le supprime |
| **Permissions User** | `['MANAGE_CHANNELS']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'game',
            description: 'A quel jeu est dédié ce channel : overwatch, tekken, lol ou valorant',
            required: true,
        },
        {
            type: 'STRING',
            name: 'catégorie',
            description: 'A quel catégorie est dédié ce channel : scrim, team, player ou staff',
            required: true,
        },
    ]
```

## Fonctionnement

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
