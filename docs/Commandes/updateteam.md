---
title: updateteam
layout: default
---

# `updateteam`

> **Description :** Met à jour une équipe

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

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `teamname` | <span class="badge badge-type">STRING</span> | Nom de la team à modifier | <span class="badge badge-required">Requis</span> |
| `newteamname` | <span class="badge badge-type">STRING</span> | Nouveau nom de la team | <span class="badge badge-optional">Optionnel</span> |
| `newcap` | <span class="badge badge-type">USER</span> | Nouveau capitaine de la team | <span class="badge badge-optional">Optionnel</span> |
| `newbtag` | <span class="badge badge-type">STRING</span> | Nouveau battleTag du capitaine de la team | <span class="badge badge-optional">Optionnel</span> |
| `newrank` | <span class="badge badge-type">INTEGER</span> | Nouveau rank de la team | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande pour mettre à jour les informations d'une équipe. Permet de changer le nom de l'équipe, le capitaine, le BattleTag et le classement (elo).

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.teamname` | <span class="badge badge-type">string</span> | - Le nom actuel de l'équipe à modifier. |
| `args.newteamname` | <span class="badge badge-type">string</span> | - Le nouveau nom pour l'équipe. |
| `args.newcap` | <span class="badge badge-type">string</span> | - L'ID du nouveau capitaine. |
| `args.newbtag` | <span class="badge badge-type">string</span> | - Le nouveau BattleTag du capitaine. |
| `args.newrank` | <span class="badge badge-type">number</span> | - Le nouveau classement (elo) de l'équipe. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

