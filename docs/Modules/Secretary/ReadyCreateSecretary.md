---
title: ReadyCreateSecretary
layout: default
---

# `ReadyCreateSecretary`

Initialise la configuration du secrétariat au démarrage.

Gère l'événement 'ready' pour initialiser la configuration du secrétariat. Pour chaque ID de catégorie de secrétariat dans la configuration, cet événement récupère les objets nécessaires (catégorie, rôles) et les stocke dans `bot.modules.Secretary.secretary` pour une utilisation ultérieure.

