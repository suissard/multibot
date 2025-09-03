---
title: testCommand
layout: default
---

# Commande `testCommand`

## Description

Test une commande ou serie de commandes

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `testCommand` |
| **Description** | Test une commande ou serie de commandes |
| **Permissions User** | `['BanMembers']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'nom_de_commande',
            description: 'Nom de la commande a tester',
            required: false,
        }, {
            type: 'STRING',
            name: 'noms_des_commandes',
            description: 'Noms des commandes a tester, séparées par un espace',
            required: false,
        },

    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        if (args.nom_de_commande) {
            if (this.checkCommand(args.nom_de_commande)) await this.launchTestProcess(args.nom_de_commande);
            else return `La commande \`\`${args.nom_de_commande}\`\` n'existe pas ou n'as pas de test intégré`;
            return `La commande \`\`${args.nom_de_commande}\`\` a été testée`;
	}
```
