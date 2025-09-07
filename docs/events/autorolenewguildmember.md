---
title: "Événement : autorolenewguildmember"
layout: default
---

# Événement : autorolenewguildmember

## Description

Déclenche lattribution de rôles automatique pour un nouveau membre.

## Déroulement

Cet événement écoute l'événement \`guildMemberAdd\` et, lorsqu'un nouveau membre rejoint le serveur, il déclenche le processus d'attribution de rôles automatique pour cet utilisateur.

## Informations techniques

- **ID de l'événement :** `autorolenewguildmember`
- **Événement discord.js :** `guildMemberAdd`
- **Fichier source :** `Modules/ChannelManager/events/NewGuildMember.js`
