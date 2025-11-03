---
title: InteractionCommand
layout: default
---

# `InteractionCommand`

## Description

Gère les interactions de commande slash.

## Narrative

Cet événement est le point d'entrée pour la gestion des commandes slash (interactions). Lorsqu'un utilisateur exécute une commande slash, Discord envoie une interaction que cet événement intercepte. Son rôle est de vérifier si l'interaction est une commande, et si c'est le cas, de la transmettre au CommandManager pour traitement.

Gère l'événement `interactionCreate` pour les commandes slash. Si l'interaction est une commande, elle est transmise au CommandManager pour être traitée.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `interaction` | `import('discord.js').Interaction` | - L'interaction reçue. |

