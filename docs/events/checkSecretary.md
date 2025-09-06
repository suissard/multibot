---
title: "Événement : Check Secretary"
layout: default
---

# Événement : Check Secretary

Cet événement agit comme un aiguilleur pour le module `Secretary`. Il intercepte les messages et détermine s'ils doivent être traités comme des communications de secrétariat.

## Déroulement

Ce gestionnaire écoute tous les messages créés (`messageCreate`). Son but est d'identifier les messages qui sont destinés au système de secrétariat. Pour cela, il vérifie deux conditions :

1.  Le message est-il un **message privé (DM)** envoyé au bot, qui n'est pas une commande ?
2.  Le message a-t-il été envoyé dans un **salon de secrétariat** (un salon dont le nom suit un format spécifique, comme `ticket-1234`) ?

Si l'une de ces conditions est remplie, l'événement ne traite pas le message lui-même. À la place, il déclenche un événement personnalisé nommé `secretary` et lui transmet le message. C'est l'événement `secretary` qui contiendra la logique de traitement.

## Informations techniques

- **ID de l'événement :** `checkSecretary`
- **Événement discord.js :** `messageCreate`
- **Fichier source :** `Modules/Secretary/MessageCheckSecretary.js`
- **Module associé :** `Secretary`
