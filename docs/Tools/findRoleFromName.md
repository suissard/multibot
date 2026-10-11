---
title: findRoleFromName
layout: default
---

# `findRoleFromName`

> **Classe :** `findRoleFromName`

## Classe : `findRoleFromName`

Une classe utilitaire pour trouver ou créer des rôles dans une guilde.

### Méthode `findRole(roleName, guild)`

Trouve un rôle par son nom dans une guilde. S'il n'existe pas, le crée.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `roleName` | <span class="badge badge-type">string</span> | - Le nom du rôle à trouver ou à créer. |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - La guilde où chercher le rôle. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').Role&gt;</span> - rôle trouvé ou nouvellement créé.

### Méthode `createRole(name, guild)`

Crée un nouveau rôle dans une guilde.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - Le nom du rôle à créer. |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - La guilde où créer le rôle. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').Role&gt;</span> - rôle qui a été créé.

**Erreur :** <span class="badge badge-required">Error</span> - la création du rôle échoue.

