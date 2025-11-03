---
title: testCommand
layout: default
---

# `testCommand`

## Narrative


- Cette commande sert à lancer des tests automatisés pour d'autres commandes du bot.
- **Sécurité :** L'exécution est réservée au propriétaire du bot (\

Exécute la commande de test pour d'autres commandes. Peut tester une seule commande ou une liste de commandes.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.nom_de_commande` | `string` | - Le nom de la commande unique à tester. |
| `args.noms_des_commandes` | `string` | - Une chaîne contenant les noms de plusieurs commandes à tester, séparés par des espaces. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

Vérifie si une commande existe et si elle a un protocole de test défini.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `commandName` | `string` | - Le nom de la commande à vérifier. |

**Returns:** `boolean` - si la commande est testable, sinon `false`.

Lance le processus de test pour une commande spécifiée.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `commandName` | `string` | - Le nom de la commande à tester. |

**Returns:** `Promise<any>` - résultat du processus de test de la commande.

