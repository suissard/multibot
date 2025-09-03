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

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        await this.guild.members.fetch();
        let roles = [];
        let userlist = this.guild.members.cache;
        if (!args.role && !args.multipleroles) {
            return 'Il faut mentionner un rôle à supprimer';
	}
```
