---
title: "Événement : Load Share Channels"
layout: default
---

# Événement : Load Share Channels

Cet événement est responsable de l'initialisation du module `ShareChannel` au démarrage du bot.

## Déroulement

Lorsque le bot démarre (`ready`), cet événement s'active pour préparer le système de partage de salons.

Il lit une configuration de base qui définit les différents types de groupes de partage existants (par exemple, un groupe "Annonces" pour le jeu "League of Legends"). Pour chaque type de groupe, il interroge la base de données pour obtenir la liste de tous les salons qui y sont associés.

Une fois ces informations récupérées, il crée un objet `ShareChannels` pour chaque groupe. Cet objet contiendra toute la logique et les données nécessaires pour synchroniser les messages, les modifications et les suppressions au sein de son groupe de salons.

## Informations techniques

- **ID de l'événement :** `loadShareChannels`
- **Événement discord.js :** `ready`
- **Fichier source :** `Modules/ShareChannel/LoadShareChannelsBotsReady.js`
- **Module associé :** `ShareChannel`
