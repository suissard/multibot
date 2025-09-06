---
title: "Événement : Interaction Command"
layout: default
---

# Événement : Interaction Command

Cet événement est le point d'entrée pour la gestion des commandes slash (interactions).

## Déroulement

Lorsqu'un utilisateur exécute une commande slash (par exemple `/ping`), Discord envoie une `interactionCreate`. Cet événement intercepte cette interaction.

Son unique rôle est de vérifier si l'interaction est bien une commande. Si c'est le cas, il ne l'exécute pas lui-même, mais la transmet immédiatement au `CommandManager`. C'est ce dernier qui se chargera de trouver le code correspondant à la commande et de l'exécuter. Cet événement agit donc comme un aiguilleur, s'assurant que les commandes slash sont bien dirigées vers le système qui les traite.

## Informations techniques

- **ID de l'événement :** `InteractionCommand`
- **Événement discord.js :** `interactionCreate`
- **Fichier source :** `Events/InteractionCommand.js`
