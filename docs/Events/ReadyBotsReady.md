---
title: ReadyBotsReady
layout: default
---

# `ReadyBotsReady`

Détermine quand tous les bots sont prêts et émet un événement global.

Gère l'événement 'clientReady' de chaque bot pour déterminer quand tous les bots sont prêts. Incrémente un compteur à chaque fois qu'un bot est prêt. Lorsque tous les bots sont prêts, émet un événement global 'botsReady' sur le BotManager.

