---
title: "Événement : Warn"
layout: default
---

# Événement : Warn

Cet événement est déclenché pour signaler des avertissements non critiques provenant de la librairie `discord.js`.

## Déroulement

Tout comme les événements `debug` et `error`, l'événement `warn` sert à remonter des informations de la bibliothèque `discord.js`. Il est utilisé pour des problèmes qui ne sont pas assez graves pour être une erreur (et faire planter le bot), mais qui signalent un comportement inattendu ou une configuration potentiellement incorrecte.

Ce gestionnaire se contente d'afficher l'avertissement reçu dans la console, afin que les développeurs puissent en prendre connaissance.

## Informations techniques

- **ID de l'événement :** `warn`
- **Événement discord.js :** `warn`
- **Fichier source :** `Events/WarnEvent.js`
