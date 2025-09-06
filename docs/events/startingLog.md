---
title: "Événement : Starting Log"
layout: default
---

# Événement : Starting Log

Cet événement affiche un message de confirmation dans la console lorsque le bot a démarré avec succès.

## Déroulement

Lorsque le bot se connecte avec succès à Discord et déclenche l'événement `ready`, ce gestionnaire s'active. Son unique rôle est d'afficher un message dans la console pour confirmer que le démarrage s'est bien passé.

Le message contient des informations utiles comme le nom du bot, le nombre de serveurs sur lesquels il se trouve, et le nombre total d'utilisateurs qu'il dessert. C'est un simple retour visuel pour l'administrateur du bot.

## Informations techniques

- **ID de l'événement :** `startingLog`
- **Événement discord.js :** `ready`
- **Fichier source :** `Events/ReadyStartingLog.js`
