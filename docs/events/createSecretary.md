---
title: "Événement : Create Secretary"
layout: default
---

# Événement : Create Secretary

Cet événement est responsable de l'initialisation du module `Secretary` au démarrage du bot.

## Déroulement

Lorsque le bot démarre et se connecte à Discord (`ready`), cet événement s'active. Son rôle est de préparer toutes les configurations nécessaires au bon fonctionnement du module `Secretary`.

Il lit les informations de configuration (comme les IDs des catégories et des rôles pour le secrétariat) et récupère les objets correspondants depuis l'API de Discord (par exemple, l'objet "catégorie" et les objets "rôles"). Ces objets sont ensuite stockés en mémoire (mis en cache) pour que le reste du module puisse y accéder instantanément plus tard, sans avoir à les redemander à Discord à chaque message.

## Informations techniques

- **ID de l'événement :** `createSecretary`
- **Événement discord.js :** `ready`
- **Fichier source :** `Modules/Secretary/ReadyCreateSecretary.js`
- **Module associé :** `Secretary`
