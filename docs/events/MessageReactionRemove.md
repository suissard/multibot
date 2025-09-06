---
title: "Événement : Message Reaction Remove"
layout: default
---

# Événement : Message Reaction Remove

Cet événement est déclenché chaque fois qu'un utilisateur retire une réaction (un émoji) d'un message.

## Déroulement

Cet événement est le miroir de `MessageReactionAdd`. Lorsqu'un utilisateur enlève sa réaction d'un message, Discord déclenche `messageReactionRemove`.

Ce gestionnaire intercepte l'événement et le transmet à l'`EmoteMessageManager`. C'est ce dernier qui vérifiera si un rôle doit être retiré à l'utilisateur, complétant ainsi la logique des "reaction roles".

## Informations techniques

- **ID de l'événement :** `MessageReactionRemove`
- **Événement discord.js :** `messageReactionRemove`
- **Fichier source :** `Events/MessageReactionRemove.js`
