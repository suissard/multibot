---
title: LoadShareChannelsBotsReady
layout: default
---

# `LoadShareChannelsBotsReady`

Charge et initialise la configuration des salons partagés au démarrage.

Gère l'événement 'ready' pour charger et initialiser la configuration des salons partagés. Itère sur la configuration par défaut, filtre les salons correspondants depuis la base de données, et instancie un objet `ShareChannels` pour chaque groupe, les rendant disponibles pour le module.

