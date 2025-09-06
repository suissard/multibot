---
title: "Événement : Message Reaction Add"
layout: default
---

# Événement : Message Reaction Add

Cet événement est déclenché chaque fois qu'un utilisateur ajoute une réaction (un émoji) à un message.

## Déroulement

Cet événement est essentiel pour les fonctionnalités basées sur les réactions, comme les "reaction roles". Quand un utilisateur clique sur un émoji sous un message, Discord déclenche l'événement `messageReactionAdd`.

Ce gestionnaire capture cet événement et le transmet directement à l'`EmoteMessageManager`. C'est ce manager qui contient la logique pour vérifier si le message en question est un message de "reaction role" et si l'émoji correspond à un rôle à attribuer. L'événement `MessageReactionAdd` agit donc comme un simple passe-plat.

## Informations techniques

- **ID de l'événement :** `MessageReactionAdd`
- **Événement discord.js :** `messageReactionAdd`
- **Fichier source :** `Events/MessageReactionAdd.js`
