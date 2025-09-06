---
title: "Événement : Check Command"
layout: default
---

# Événement : Check Command

Cet événement est responsable de la détection et de la gestion des commandes textuelles, c'est-à-dire celles qui sont invoquées à l'aide d'un préfixe (par exemple, `!ping`).

## Déroulement

L'événement `checkCommand` écoute chaque message envoyé sur le serveur. Pour chaque message, il effectue une vérification simple : est-ce que le message commence par le préfixe du bot (par exemple `!` ou `?`).

Si c'est le cas, il considère que le message est une commande et le transmet au `CommandManager`. Tout comme pour les commandes slash, cet événement ne fait que router le message vers le bon gestionnaire, qui se chargera ensuite d'analyser le contenu du message pour trouver et exécuter la commande demandée.

## Informations techniques

- **ID de l'événement :** `checkCommand`
- **Événement discord.js :** `messageCreate`
- **Fichier source :** `Events/MessageCommand.js`
