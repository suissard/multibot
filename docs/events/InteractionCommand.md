---
title: "Événement : InteractionCommand"
layout: default
---

# Événement : InteractionCommand

## Description

Gère les interactions de commande slash.

## Déroulement

Cet événement est le point d'entrée pour la gestion des commandes slash (interactions). Lorsqu'un utilisateur exécute une commande slash, Discord envoie une interaction que cet événement intercepte. Son rôle est de vérifier si l'interaction est une commande, et si c'est le cas, de la transmettre au CommandManager pour traitement.

## Informations techniques

- **ID de l'événement :** `InteractionCommand`
- **Événement discord.js :** `interactionCreate`
- **Fichier source :** `Events/InteractionCommand.js`
