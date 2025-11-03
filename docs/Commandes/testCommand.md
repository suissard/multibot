---
title: testCommand
layout: default
---

# `testCommand`

## Narrative


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


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `nom_de_commande` | `STRING` | Nom de la commande a tester | No |
| `noms_des_commandes` | `STRING` | Noms des commandes a tester, séparées par un espace | No |

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

