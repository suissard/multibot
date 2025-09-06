---
title: "Événement : Share Event"
layout: default
---

# Événement : Share Event

Cet événement est le point d'entrée pour la fonctionnalité de partage de messages entre plusieurs salons.

## Déroulement

Ce gestionnaire écoute tous les messages créés (`messageCreate`). À chaque message, il vérifie si le salon dans lequel il a été posté fait partie d'un groupe de partage (`ShareChannel`).

Si c'est le cas, il délègue le message à l'instance de `ShareChannels` correspondante. C'est cette instance qui se chargera de la logique complexe : copier le message, le mettre en forme, et l'envoyer dans tous les autres salons du groupe de partage. L'événement `shareEvent` agit donc comme un simple aiguilleur.

## Informations techniques

- **ID de l'événement :** `shareEvent`
- **Événement discord.js :** `messageCreate`
- **Fichier source :** `Modules/ShareChannel/ShareEvent.js`
- **Module associé :** `ShareChannel`
