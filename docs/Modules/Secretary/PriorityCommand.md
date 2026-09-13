---
title: PriorityCommand
layout: default
---

# `PriorityCommand`

> **Classe :** `PriorityCommand` (hérite de `Command`)

> **Identifiant :** `priority`

> **Description :** Passe un ticket en priorité haute 🔴

> **Permissions utilisateur :** `ManageChannels`

> **Permissions bot :** `ManageChannels`

## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `channel` | <span class="badge badge-type">CHANNEL</span> | Le salon à passer en priorité (optionnel) | <span class="badge badge-optional">Optionnel</span> |

### Méthode `methode(args = {})`

Exécute la commande pour passer un ticket en priorité.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Arguments de la commande. |

**Retour :** <span class="badge badge-type">string</span> - de confirmation.

