---
title: "Événement : Set Interaction Commands"
layout: default
---

# Événement : Set Interaction Commands

Cet événement est responsable de la création et de la mise à jour des commandes slash (interactions) auprès de Discord lorsque le bot démarre.

## Déroulement

À chaque fois qu'un bot se connecte à Discord et déclenche l'événement `ready`, ce gestionnaire est activé. Son but est de s'assurer que les commandes slash du bot sont bien enregistrées ou mises à jour sur les serveurs de Discord.

Il parcourt la liste de toutes les commandes disponibles. Pour celles qui sont marquées comme étant "en développement" dans la configuration, il envoie une requête à l'API de Discord pour les créer ou les mettre à jour. Cela permet aux développeurs de tester rapidement leurs nouvelles commandes sans avoir à les déployer manuellement.

Il est important de noter que Discord impose des limites sur la fréquence de création de ces commandes.

## Informations techniques

- **ID de l'événement :** `setInteractionCommands`
- **Événement discord.js :** `ready`
- **Fichier source :** `Events/ReadySetInteractionCommands.js`
