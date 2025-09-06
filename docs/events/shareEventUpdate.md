---
title: "Événement : Share Event Update"
layout: default
---

# Événement : Share Event Update

Cet événement assure la synchronisation des modifications de messages dans les salons partagés.

## Déroulement

Lorsqu'un message est modifié (`messageUpdate`), cet événement s'active. Il vérifie si le message modifié appartenait à un groupe de partage.

Si c'est le cas, il retrouve l'objet `ShareMessage` correspondant et lui transmet le nouveau contenu du message. L'objet `ShareMessage` se charge alors de modifier toutes les copies du message dans les autres salons, pour que la mise à jour soit visible partout.

## Informations techniques

- **ID de l'événement :** `shareEventUpdate`
- **Événement discord.js :** `messageUpdate`
- **Fichier source :** `Modules/ShareChannel/ShareEventUpdate.js`
- **Module associé :** `ShareChannel`
