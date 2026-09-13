---
title: processAllUsersEvent
layout: default
---

# `processAllUsersEvent`

> **Description :** Déclenche le traitement des utilisateurs une fois le cache Olympe prêt.

## Narrative

Cet événement écoute l'événement \`olympeUserCacheReady\` émis lorsque les données des équipes sont chargées. Il déclenche ensuite \`processAllUsers\` pour mettre à jour les utilisateurs.

Gère l'événement olympeUserCacheReady.

