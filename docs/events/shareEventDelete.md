---
title: "Événement : Share Event Delete"
layout: default
---

# Événement : Share Event Delete

Cet événement assure la synchronisation des suppressions de messages dans les salons partagés.

## Déroulement

Lorsqu'un message est supprimé (`messageDelete`), cet événement s'active. Il vérifie si le message en question appartenait à un groupe de partage.

Si c'est le cas, il retrouve l'objet `ShareMessage` qui correspond au message original. Cet objet conserve la trace de toutes les copies du message qui ont été envoyées dans les autres salons. L'événement déclenche alors une fonction (`resetTargets`) qui va supprimer toutes ces copies, une par une.

De cette manière, si un message est supprimé dans un des salons partagés, il est automatiquement supprimé dans tous les autres.

## Informations techniques

- **ID de l'événement :** `shareEventDelete`
- **Événement discord.js :** `messageDelete`
- **Fichier source :** `Modules/ShareChannel/ShareEventDelete.js`
- **Module associé :** `ShareChannel`
