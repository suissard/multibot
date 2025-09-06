---
title: "Événement : Secretary"
layout: default
---

# Événement : Secretary

Cet événement est le cœur logique du module `Secretary`. Il traite les messages qui ont été identifiés comme des communications de secrétariat par l'événement `checkSecretary`.

## Déroulement

Ce gestionnaire écoute un événement personnalisé nommé `secretary`. Il est déclenché par `checkSecretary` et gère toute la logique du système de tickets. Le déroulement dépend de l'origine du message :

### 1. Message d'un utilisateur (en DM)

-   Lorsqu'un utilisateur envoie un message privé au bot, `checkSecretary` le transmet ici.
-   L'événement recherche alors un salon de secrétariat existant pour cet utilisateur.
-   S'il n'en existe pas, il en crée un nouveau sur le serveur du staff, dans la bonne catégorie.
-   Le message de l'utilisateur (avec son contenu, ses images, etc.) est alors formaté et posté dans ce salon, pour que le staff puisse le consulter et y répondre.

### 2. Réponse d'un membre du staff

-   Lorsqu'un membre du staff écrit un message commençant par `msg` dans un salon de secrétariat.
-   L'événement identifie à quel utilisateur le salon est dédié (grâce à l'ID dans le nom du salon).
-   Il envoie ensuite le contenu du message du staff en message privé à cet utilisateur.

Cet événement assure donc la communication bidirectionnelle entre les utilisateurs et l'équipe de staff.

## Informations techniques

- **ID de l'événement :** `secretary`
- **Événement écouté :** `secretary` (événement personnalisé)
- **Fichier source :** `Modules/Secretary/Secretary.js`
- **Module associé :** `Secretary`
