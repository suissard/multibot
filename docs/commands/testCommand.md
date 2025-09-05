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

## Fonctionnement

- Cette commande sert à lancer des tests automatisés pour d'autres commandes du bot.
- **Sécurité :** L'exécution est réservée au propriétaire du bot (\`devBoss = true\`).
- Elle peut tester soit une seule commande, soit une liste de commandes.

- **Fonctionnement :**
    1.  L'utilisateur fournit le nom d'une commande (\`nom_de_commande\`) ou une liste de noms de commandes séparées par des espaces (\`noms_des_commandes\`).
    2.  Pour chaque nom de commande fourni :
        a.  La commande vérifie d'abord si la commande cible existe.
        b.  Elle vérifie ensuite si cette commande cible possède une propriété statique \`test\` qui contient des scénarios de test.
        c.  Si la commande est testable, elle appelle la méthode \`testProcess()\` de la commande cible. Cette méthode exécute les scénarios de test définis dans la propriété \`test\`.
    3.  Si une commande n'existe pas ou n'a pas de tests définis, un message d'erreur est renvoyé.
    4.  Une fois tous les tests effectués, un message de confirmation est envoyé.
