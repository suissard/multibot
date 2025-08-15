---
title: megarole
layout: default
---

# Commande `megarole`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `megarole` |
| **Description** | N/A |
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

## Fonctionnement du Code

```javascript
methode(args = {}) {
        await this.guild.members.fetch();
        let roles = [];
        let userlist = this.guild.members.cache;
        if (!args.role && !args.multipleroles) {
            return 'Il faut mentionner un rôle à supprimer';
        }
        if (args.role) {
            roles.push(args.role);
        }
        if (args.multipleroles) {
            roles = await this.getRoleFromMultipleRoles(args.multipleroles);
        }
        this.removeRolesToUser(userlist, roles, args);
        return 'Commande effectué !';
    }
```
