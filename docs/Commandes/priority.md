---
title: priority
layout: default
---

# `priority`

> **Description :** Déplace le ticket en priorité

## Narrative


- Cette commande permet de déplacer un ticket vers une catégorie "PRIORITY".
- Elle doit être exécutée dans un salon de ticket.
- Si la catégorie "PRIORITY" n'existe pas, elle est créée en haut de la liste des salons.


Exécute la commande pour déplacer le ticket en priorité.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |

**Retour :** <span class="badge badge-type">string</span> - message de confirmation ou d'échec.

