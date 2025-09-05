---
title: updateteam
layout: default
---

# Commande `updateteam`

## Description

Met à jour une équipe

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `updateteam` |
| **Description** | Met à jour une équipe |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'teamname',
            description: 'Nom de la team à modifier',
            required: true,
        },
        {
            type: 'STRING',
            name: 'newteamname',
            description: 'Nouveau nom de la team',
            required: false,
        },
        {
            type: 'USER',
            name: 'newcap',
            description: 'Nouveau capitaine de la team',
            required: false,
        },
        {
            type: 'STRING',
            name: 'newbtag',
            description: 'Nouveau battleTag du capitaine de la team',
            required: false,
        },
        {
            type: 'INTEGER',
            name: 'newrank',
            description: 'Nouveau rank de la team',
            required: false,
        },
    ]
```

## Fonctionnement

- Cette commande permet de modifier les informations d'une équipe existante.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`).
- L'utilisateur doit spécifier le nom de l'équipe à modifier et au moins une information à changer.

- **Champs modifiables :**
    - \`newteamname\` : Pour changer le nom de l'équipe.
    - \`newcap\` : Pour désigner un nouveau capitaine.
    - \`newbtag\` : Pour mettre à jour le BattleTag du capitaine.
    - \`newrank\` : Pour changer le classement (elo) de l'équipe.

- **Fonctionnement :**
    1.  La commande identifie l'équipe cible en base de données ainsi que son rôle et son salon associés.
    2.  Elle effectue les mises à jour en fonction des arguments fournis :
        - **Changement de nom :** Si \`newteamname\` est fourni, le nom du rôle et du salon de l'équipe sont mis à jour.
        - **Changement de capitaine :** Si \`newcap\` est fourni, l'ancien capitaine perd ses rôles de capitaine et d'équipe, et le nouveau membre les reçoit. Le \`newbtag\` est obligatoire dans ce cas.
        - **Changement de BattleTag :** Le BattleTag est mis à jour en base de données.
        - **Changement de rang :** Le rang (elo) est mis à jour en base de données.
    3.  Toutes les modifications de données (nom, capitaine, btag, elo) sont sauvegardées dans la base de données.
    4.  Si aucune information à modifier n'est fournie, la commande renvoie un message d'erreur.
