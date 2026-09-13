---
title: refresh
layout: default
---

# `refresh`

> **Description :** Rafraichit les configurations depuis la base de données et redémarre les bots

## Narrative


- Cette commande force le rechargement des données depuis Strapi (base de données).
- Elle met à jour le cache des configurations (botsdatas, teams, etc.).
- Elle redémarre ensuite les bots pour qu'ils prennent en compte les nouvelles configurations.
- **Sécurité :** Réservé au développeur/propriétaire.


Exécute la commande pour rafraichir les données et redémarrer les bots.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |

**Retour :** <span class="badge badge-type">string</span> - car les bots sont redémarrés.

