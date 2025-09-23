---
title: index
layout: default
---

# `index`

Le module "ShareChannel" permet de synchroniser des messages entre plusieurs salons Discord. Lorsqu'un message est posté dans un salon "source", le module le copie et le diffuse dans un ou plusieurs salons "cibles". Ces salons peuvent se trouver sur le même serveur ou sur des serveurs différents, à condition que le bot y ait accès. Le module gère non seulement la création de nouveaux messages, mais aussi leur mise à jour et leur suppression, assurant ainsi que les salons partagés restent parfaitement synchronisés. Des commandes sont également disponibles pour configurer et gérer ces partages, par exemple pour lier des salons, afficher les partages actifs ou arrêter une synchronisation.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `import('../../Class/Bot')` | - L'instance du bot. |

**Returns:** `object` - objet contenant les classes du module.

