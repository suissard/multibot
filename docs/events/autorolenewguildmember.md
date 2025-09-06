---
title: "Événement : Autorole New Guild Member"
layout: default
---

# Événement : Autorole New Guild Member

Cet événement automatise l'attribution de rôles lorsqu'un nouvel utilisateur rejoint un serveur.

## Déroulement

Dès qu'un nouvel utilisateur devient membre d'un serveur Discord, l'événement `guildMemberAdd` est déclenché. Ce gestionnaire l'intercepte pour lancer le processus de "rôle automatique".

Il transmet l'identifiant Discord du nouveau membre à une fonction du module `AutoRole`. Cette fonction se charge de communiquer avec des systèmes externes (comme une base de données de compétition) pour vérifier si ce membre doit recevoir des rôles spécifiques. Si c'est le cas, les rôles sont automatiquement attribués au nouvel arrivant.

Même s'il est situé dans le dossier `ChannelManager`, cet événement est une pièce maîtresse du module `AutoRole`.

## Informations techniques

- **ID de l'événement :** `autorolenewguildmember`
- **Événement discord.js :** `guildMemberAdd`
- **Fichier source :** `Modules/ChannelManager/events/NewGuildMember.js`
- **Module associé :** `AutoRole`
