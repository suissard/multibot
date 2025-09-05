---
title: megarole
layout: default
---

# Commande `megarole`

## Description

Ajoute ou supprime en masse un ou plusieurs rôles à tous les membres du serveur.

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `megarole` |
| **Description** | Ajoute ou supprime en masse un ou plusieurs rôles à tous les membres du serveur. |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'BOOLEAN',
            name: 'del',
            description: 'True = Supprimer les rôles / False = Ajouter les rôles',
            required: true,
        }, {
            type: 'ROLE',
            name: 'role',
            description: 'Role à supprimer',
            required: false,
        },
        {
            type: 'STRING',
            name: 'multipleroles',
            description: 'Mettre plusieurs roles à supprimer',
            required: false,
        },
    ]
```

## Fonctionnement

- Cette commande permet d'ajouter ou de supprimer un ou plusieurs rôles à **tous les membres** du serveur en une seule fois.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`) pour être utilisée.

- **Arguments :**
    - \`del\` (booléen, requis) : Détermine l'action. \`true\` pour supprimer les rôles, \`false\` pour les ajouter.
    - \`role\` (rôle, optionnel) : Un rôle unique à traiter.
    - \`multipleroles\` (texte, optionnel) : Une chaîne de texte contenant les mentions de plusieurs rôles.

- **Fonctionnement :**
    1. La commande commence par récupérer la liste complète de tous les membres du serveur.
    2. Elle collecte les rôles à traiter à partir des arguments \`role\` et/ou \`multipleroles\`.
    3. En fonction de la valeur de l'argument \`del\`, elle parcourt la liste de **tous les membres** :
        - Si \`del\` est \`true\`, elle tente de **supprimer** les rôles spécifiés à chaque membre.
        - Si \`del\` est \`false\`, elle tente d'**ajouter** les rôles spécifiés à chaque membre.
    4. Une barre de chargement visuelle est affichée pendant l'opération.
    5. Après l'opération, si des erreurs se sont produites (par exemple, permissions insuffisantes pour modifier un membre avec un rôle plus élevé), elles sont listées dans un message.
    6. Un message final confirme que la commande a été exécutée.
