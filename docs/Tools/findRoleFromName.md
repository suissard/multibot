---
title: findRoleFromName
layout: default
---

# `findRoleFromName`

## Classe : ``

Une classe utilitaire pour trouver ou créer des rôles dans une guilde.

Trouve un rôle par son nom dans une guilde. S'il n'existe pas, le crée.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `roleName` | <span class="badge badge-type">string</span> | - Le nom du rôle à trouver ou à créer. |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - La guilde où chercher le rôle. |

**Retour :** <span class="badge badge-type">Promise<import('discord.js').Role></span> - rôle trouvé ou nouvellement créé.

Crée un nouveau rôle dans une guilde.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - Le nom du rôle à créer. |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - La guilde où créer le rôle. |

**Retour :** <span class="badge badge-type">Promise<import('discord.js').Role></span> - rôle qui a été créé.

