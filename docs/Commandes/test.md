---
title: test
layout: default
---

# `test`

Test une commande ou serie de commandes

## Narrative


- Cette commande est un outil de développement conçu pour tester la manière dont le bot reçoit et interprète différents types d'arguments de commandes slash.
- Elle accepte une large gamme de types d'arguments : texte, entier, booléen, utilisateur, salon, rôle, mention, et pièce jointe.

- **Fonctionnement :**
    1.  Lorsqu'elle est exécutée, la commande reçoit un objet \`args\` contenant toutes les valeurs des arguments fournis par l'utilisateur.
    2.  Elle convertit cet objet \`args\` en une chaîne de caractères au format JSON.
    3.  Elle retourne une réponse qui inclut le texte "test OK" suivi de la chaîne JSON des arguments, formatée dans un bloc de code pour une lecture facile.
    4.  Cela permet à un développeur de vérifier rapidement que tous les types de données sont correctement reçus et formatés.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `string` | `STRING` | un texte | No |
| `integer` | `INTEGER` | un chiffre | No |
| `boolean` | `BOOLEAN` | un boolean | No |
| `user` | `USER` | un utilisateur | No |
| `channel` | `CHANNEL` | un channel | No |
| `role` | `ROLE` | un role | No |
| `mentionable` | `MENTIONABLE` | une mention | No |
| `attachement` | `ATTACHMENT` | une piece jointe | No |

Exécute la commande de test. Cette commande est conçue pour tester la réception de différents types d'arguments. Elle retourne les arguments reçus sous forme de chaîne JSON.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |

**Returns:** `Promise<string>` - chaîne de caractères contenant "test OK" et les arguments en format JSON.

