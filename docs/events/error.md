---
title: "Événement : Error"
layout: default
---

# Événement : Error

Cet événement est déclenché lorsqu'une erreur non gérée se produit au sein de `discord.js`.

## Déroulement

L'événement `error` est un mécanisme de sécurité essentiel. Son rôle est de capturer les erreurs inattendues qui pourraient autrement faire planter le bot, comme une déconnexion soudaine ou une réponse invalide de l'API Discord.

Lorsqu'une telle erreur se produit, cet événement l'intercepte et l'affiche dans la console. Cela permet aux administrateurs du bot d'être informés des problèmes, de les diagnostiquer et d'assurer la stabilité du bot sur le long terme.

## Informations techniques

- **ID de l'événement :** `error`
- **Événement discord.js :** `error`
- **Fichier source :** `Events/ErrorEvent.js`
