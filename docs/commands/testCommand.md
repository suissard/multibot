---
title: testCommand
layout: default
---

# Commande `testCommand`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `testCommand` |
| **Description** | N/A |
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
methode(args = {}) {
        if (args.nom_de_commande) {
            if (this.checkCommand(args.nom_de_commande)) await this.launchTestProcess(args.nom_de_commande);
            else return `La commande \`\`${args.nom_de_commande}\`\` n'existe pas ou n'as pas de test intégré`;
            return `La commande \`\`${args.nom_de_commande}\`\` a été testée`;
        } else if (args.noms_des_commandes) {
            let commandsNames = args.noms_des_commandes.split(/ +/);
            for (let i in commandsNames) {
                let commandName = commandsNames[i];
                if (this.checkCommand(commandName)) await this.launchTestProcess(commandName);
                else return `La commande \`\`${commandName}\`\` n'existe pas ou n'as pas de test intégré`;
            }
            return `Commandes \`\`${commandsNames.join('``, ``')}\`\` ont été testées`;

        }
        return '❌ Veuillez indiquer une ou plusieurs commandes a tester';

    }
```
