---
title: test
layout: default
---

# `test`

> **Description :** Test une commande ou serie de commandes

## Narrative


- Cette commande est un outil de développement conçu pour tester la manière dont le bot reçoit et interprète différents types d'arguments de commandes slash.
- Elle accepte une large gamme de types d'arguments : texte, entier, booléen, utilisateur, salon, rôle, mention, et pièce jointe.

- **Fonctionnement :**
    1.  Lorsqu'elle est exécutée, la commande reçoit un objet \`args\` contenant toutes les valeurs des arguments fournis par l'utilisateur.
    2.  Elle convertit cet objet \`args\` en une chaîne de caractères au format JSON.
    3.  Elle retourne une réponse qui inclut le texte "test OK" suivi de la chaîne JSON des arguments, formatée dans un bloc de code pour une lecture facile.
    4.  Cela permet à un développeur de vérifier rapidement que tous les types de données sont correctement reçus et formatés.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `string` | <span class="badge badge-type">STRING</span> | un texte | <span class="badge badge-optional">Optionnel</span> |
| `integer` | <span class="badge badge-type">INTEGER</span> | un chiffre | <span class="badge badge-optional">Optionnel</span> |
| `boolean` | <span class="badge badge-type">BOOLEAN</span> | un boolean | <span class="badge badge-optional">Optionnel</span> |
| `user` | <span class="badge badge-type">USER</span> | un utilisateur | <span class="badge badge-optional">Optionnel</span> |
| `channel` | <span class="badge badge-type">CHANNEL</span> | un channel | <span class="badge badge-optional">Optionnel</span> |
| `role` | <span class="badge badge-type">ROLE</span> | un role | <span class="badge badge-optional">Optionnel</span> |
| `mentionable` | <span class="badge badge-type">MENTIONABLE</span> | une mention | <span class="badge badge-optional">Optionnel</span> |
| `attachement` | <span class="badge badge-type">ATTACHMENT</span> | une piece jointe | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande de test. Cette commande est conçue pour tester la réception de différents types d'arguments. Elle retourne les arguments reçus sous forme de chaîne JSON.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |

**Retour :** <span class="badge badge-type">Promise<string></span> - chaîne de caractères contenant "test OK" et les arguments en format JSON.

