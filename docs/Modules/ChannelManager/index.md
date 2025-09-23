---
title: index
layout: default
---

# `index`

Ce module est responsable de la gestion automatisée des salons de match. Il utilise une tâche planifiée (cron) pour créer et archiver les salons vocaux et textuels associés aux matchs à venir, en se basant sur les données de l'API. Le module expose également des commandes pour permettre aux administrateurs de créer des salons manuellement, d'y ajouter ou d'en retirer des utilisateurs, et de nettoyer les salons après un match.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `import('../../Class/Bot')` | - L'instance du bot pour laquelle initialiser le module. |

**Returns:** `object` - objet contenant les classes de commandes et d'événements exportées par ce module.

