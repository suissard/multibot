---
title: updateteam
layout: default
---

# `updateteam`

Met à jour une équipe

## Narrative


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


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `teamname` | `STRING` | Nom de la team à modifier | Yes |
| `newteamname` | `STRING` | Nouveau nom de la team | No |
| `newcap` | `USER` | Nouveau capitaine de la team | No |
| `newbtag` | `STRING` | Nouveau battleTag du capitaine de la team | No |
| `newrank` | `INTEGER` | Nouveau rank de la team | No |

Exécute la commande pour mettre à jour les informations d'une équipe. Permet de changer le nom de l'équipe, le capitaine, le BattleTag et le classement (elo).

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.teamname` | `string` | - Le nom actuel de l'équipe à modifier. |
| `args.newteamname` | `string` | - Le nouveau nom pour l'équipe. |
| `args.newcap` | `string` | - L'ID du nouveau capitaine. |
| `args.newbtag` | `string` | - Le nouveau BattleTag du capitaine. |
| `args.newrank` | `number` | - Le nouveau classement (elo) de l'équipe. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

