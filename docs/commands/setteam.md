---
title: setteam
layout: default
---

# Commande `setteam`

## Description

Crée une nouvelle équipe avec un rôle et un salon dédiés.

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `setteam` |
| **Description** | Crée une nouvelle équipe avec un rôle et un salon dédiés. |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'teamname',
            description: 'Nom de la team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'btag',
            description: 'Btag Du capitaine',
            required: true,
        },
        {
            type: 'USER',
            name: 'capitaine',
            description: 'Capitaine de la team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'elo',
            description: 'Rank de la team',
            required: true,
        },
    ]
```

## Fonctionnement

- Cette commande permet de créer une nouvelle équipe sur le serveur.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`).

- **Arguments requis :**
    - \`teamname\` : Le nom de la nouvelle équipe.
    - \`btag\` : Le BattleTag du capitaine.
    - \`capitaine\` : La mention de l'utilisateur qui sera le capitaine.
    - \`elo\` : Le niveau de classement (elo) de l'équipe.

- **Processus de création :**
    1.  La commande commence par envoyer un message temporaire "Team en cours d'ajout...".
    2.  Elle crée un nouveau rôle pour l'équipe, dont le nom est formaté (par exemple, "Team [NomDeLequipe]").
    3.  Elle recherche le rôle "🎉 Capitaine". Si ce rôle n'existe pas, il est créé.
    4.  Elle crée un nouveau salon textuel privé pour l'équipe. Seuls les membres ayant le rôle de l'équipe peuvent y accéder.
    5.  Elle assigne le rôle de l'équipe et le rôle "🎉 Capitaine" à l'utilisateur désigné comme capitaine.
    6.  Elle enregistre les informations de l'équipe (nom, capitaine, elo, btag) dans une base de données ou un système de stockage.
    7.  Une fois toutes les opérations terminées, elle envoie un message "embed" final pour confirmer la création de l'équipe avec tous ses détails.
