---
title: "Module: ShareChannel"
layout: default
---

# Module: `ShareChannel`

## Rôle

Le module `ShareChannel` est un pont entre les serveurs Discord. Sa fonction principale est de "partager" le contenu d'un canal (channel) d'un serveur source vers un ou plusieurs canaux sur des serveurs de destination. Il permet de créer une communication inter-serveurs transparente.

## Déroulé et Cas d'Usage

Un administrateur configure un canal à "partager" via des commandes. Une fois la configuration en place, le module écoute en permanence le canal source et republie automatiquement les messages dans les canaux de destination.

### 1. Annonces Globales

C'est l'utilisation la plus évidente. Vous pouvez avoir un canal d'annonces sur votre serveur principal et le partager sur tous les serveurs de votre communauté.

*   **Exemple de situation :** Vous gérez une communauté de jeu répartie sur plusieurs serveurs (un pour chaque jeu). Vous avez un serveur "Hub" central. Vous postez une annonce importante dans le canal `#annonces-globales` du serveur Hub. Le module `ShareChannel` détecte ce message et le republie instantanément dans le canal `#annonces` de tous les autres serveurs. Cela vous évite de devoir copier-coller le message manuellement sur chaque serveur.

### 2. Partage de Contenu Spécifique

Le partage peut être plus ciblé. Vous pouvez partager des canaux thématiques entre des serveurs partenaires.

*   **Exemple de situation :** Votre serveur est partenaire avec un autre serveur spécialisé dans le "speedrunning". Vous configurez `ShareChannel` pour que tous les messages du canal `#speedrun-news` de votre partenaire soient automatiquement postés dans un canal `#actus-partenaires` sur votre serveur. Vos membres peuvent ainsi suivre l'actualité de votre partenaire sans avoir à rejoindre leur serveur.

### 3. Communication Inter-Équipes

Dans un contexte de tournoi multi-serveurs, `ShareChannel` peut permettre aux équipes de communiquer même si elles ne sont pas sur le même serveur.

*   **Exemple de situation :** L'équipe "A" est sur le serveur "France" et l'équipe "B" est sur le serveur "Belgique". Un canal `#discussion-match` est créé sur chaque serveur. `ShareChannel` est configuré pour synchroniser les deux canaux. Quand un membre de l'équipe A poste un message dans son canal, il apparaît instantanément dans le canal de l'équipe B, et vice-versa.

Le module gère également les modifications et les suppressions de messages. Si un message partagé est modifié dans le canal source, la modification est répercutée sur tous les serveurs de destination, assurant que l'information reste cohérente partout.

En résumé, `ShareChannel` est un outil puissant pour connecter les communautés, centraliser l'information et faciliter la communication à travers les frontières des serveurs Discord.
