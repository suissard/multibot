---
title: "Événement : Debug"
layout: default
---

# Événement : Debug

Cet événement est déclenché pour fournir des informations de débogage internes de la librairie `discord.js`.

## Déroulement

L'événement `debug` est un outil de diagnostic. Son rôle est de capturer et d'afficher dans la console les messages de débogage émis par la bibliothèque `discord.js`. Ces messages peuvent contenir des informations très techniques sur l'état de la connexion avec Discord, les requêtes API envoyées, ou d'autres opérations internes.

Il est principalement utilisé par les développeurs pour comprendre et résoudre des problèmes de bas niveau qui ne seraient pas visibles autrement. Pour une utilisation normale du bot, cet événement n'a pas d'impact direct sur les fonctionnalités.

## Informations techniques

- **ID de l'événement :** `debug`
- **Événement discord.js :** `debug`
- **Fichier source :** `Events/DebugEvent.js`
