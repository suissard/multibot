---
title: "Événement : Bots Ready"
layout: default
---

# Événement : Bots Ready

Cet événement est un mécanisme interne pour synchroniser les actions au démarrage après que toutes les instances de bot se soient connectées à Discord.

## Déroulement

Dans une configuration où plusieurs bots fonctionnent simultanément (multi-bot), chaque bot se connecte indépendamment et émet son propre événement `ready`.

Cet événement `botsReady` écoute l'événement `ready` de *chaque* bot. Il utilise un compteur pour suivre le nombre de bots qui se sont connectés. Une fois que ce compteur atteint le nombre total de bots en cours d'exécution, cela signifie que tout le système est prêt.

À ce moment précis, il déclenche un événement personnalisé et global : `botsReady`. Cet événement spécial peut alors être utilisé par des modules ou des systèmes qui ont besoin d'attendre que *tous* les bots soient opérationnels pour s'initialiser correctement.

## Informations techniques

- **ID de l'événement :** `botsReady`
- **Événement discord.js :** `ready`
- **Fichier source :** `Events/ReadyBotsReady.js`
