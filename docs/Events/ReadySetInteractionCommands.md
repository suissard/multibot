---
title: ReadySetInteractionCommands
layout: default
---

# `ReadySetInteractionCommands`

Enregistre les commandes slash en développement au démarrage du bot.

Gère l'événement 'clientReady' pour enregistrer les commandes slash "en développement". Pour chaque commande marquée comme étant en développement dans la configuration du bot, cette fonction appelle la méthode pour créer ou mettre à jour la commande slash auprès de l'API Discord.

Compare une commande locale (JSON builder) avec une commande distante (API Discord). Retourne true si elles sont différentes.

