---
title: test
layout: default
---

# `test`

## Description

Test une commande ou serie de commandes

## Narrative


- Cette commande est un outil de développement conçu pour tester la manière dont le bot reçoit et interprète différents types d'arguments de commandes slash.
- Elle accepte une large gamme de types d'arguments : texte, entier, booléen, utilisateur, salon, rôle, mention, et pièce jointe.

- **Fonctionnement :**
    1.  Lorsqu'elle est exécutée, la commande reçoit un objet \

Exécute la commande de test. Cette commande est conçue pour tester la réception de différents types d'arguments. Elle retourne les arguments reçus sous forme de chaîne JSON.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |

**Returns:** `Promise<string>` - chaîne de caractères contenant "test OK" et les arguments en format JSON.

