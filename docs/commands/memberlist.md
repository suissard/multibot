---
title: memberlist
layout: default
---

# Commande `memberlist`

## Description

Renvoie la liste des utilisateurs qui ont le rôle mentiionné

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `memberlist` |
| **Description** | Renvoie la liste des utilisateurs qui ont le rôle mentiionné |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'ROLE',
            name: 'role',
            description: 'Role dont on doit renvoyer les membres',
            required: true,
        },
    ]
```

## Fonctionnement

- Cette commande permet d'obtenir la liste de tous les membres d'un serveur qui possèdent un rôle spécifique.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`) pour être utilisée.
- L'utilisateur doit fournir un rôle en argument.

- **Fonctionnement :**
    1. La commande récupère d'abord la liste complète des membres du serveur pour s'assurer que les données sont à jour.
    2. Elle identifie le rôle spécifié par l'utilisateur.
    3. Elle parcourt ensuite la liste de tous les membres qui possèdent ce rôle.
    4. Elle construit une chaîne de caractères qui mentionne chaque membre trouvé.
    5. Finalement, elle génère et envoie un message "embed" qui contient :
        - Un titre indiquant le nombre total de membres trouvés et le nom du rôle.
        - La liste des mentions de tous les membres concernés.
    6. Si aucun membre ne possède le rôle, elle renvoie simplement un message l'indiquant.
