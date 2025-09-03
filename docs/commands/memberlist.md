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

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        await this.guild.members.fetch();
        let role = this.guild.roles.cache.get(args.role);
        if (role.members.size == 0) {
            return 'Personne n\'a ce rôle';
	}
```
