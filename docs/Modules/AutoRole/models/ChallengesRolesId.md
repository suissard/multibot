---
title: ChallengesRolesId
layout: default
---

# `ChallengesRolesId`

## Classe : ``

Structure les IDs de rôles pour les différentes compétitions. Contient les rôles globaux (pour tous, capitaine, caster) et les rôles spécifiques à chaque compétition, organisés par segment.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `ALL` | <span class="badge badge-type">string</span> | - L'ID du rôle Discord donné à tous les participants. |
| `captain` | <span class="badge badge-type">string</span> | - L'ID du rôle Discord donné à tous les capitaines. |
| `caster` | <span class="badge badge-type">string</span> | - L'ID du rôle Discord donné à tous les casters. |
| `competitions` | <span class="badge badge-type">object</span> | - Un objet où les clés sont les ID de challenge et les valeurs sont les configurations de rôles pour ce challenge. |

Récupère de manière récursive tous les ID de rôle contenus dans l'objet.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `object` | <span class="badge badge-type">object</span> | - L'objet à parcourir. |
| `target` | <span class="badge badge-type">Array<string></span> | - Le tableau pour accumuler les IDs. |

**Retour :** <span class="badge badge-type">Array<string></span> - tableau plat de tous les ID de rôle.

