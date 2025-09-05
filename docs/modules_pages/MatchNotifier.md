---
title: "Module: MatchNotifier"
layout: default
---

# Module: `MatchNotifier`

## Rôle

Le module `MatchNotifier` est le crieur public du serveur. Son unique but est d'informer les membres de la communauté des matchs à venir. Il s'assure que personne ne manque un événement important en envoyant des notifications claires et ciblées.

## Déroulé et Cas d'Usage

Ce module est fortement dépendant des données fournies par `GetiJsonToDataBase` et des rôles gérés by `AutoRole`. Il fonctionne comme une horloge, vérifiant périodiquement la base de données pour les matchs approchant.

### 1. Notification de Match Standard

C'est la fonction première du module. Il surveille la base de données pour les matchs dont la date est proche.

*   **Exemple de situation :** Un match est prévu pour dans 24 heures. Le `MatchNotifier` se réveille, récupère les informations du match (équipes, heure, etc.) et prépare une notification. Il envoie ensuite un message dans le canal `#annonces-matchs`. Le message pourrait ressembler à :

    > :bell: **Match à venir !** :bell:
    >
    > Ne manquez pas le match passionnant entre **Équipe A** et **Équipe B** !
    > **Quand ?** Demain à 20h00.
    > **Où ?** Le match sera diffusé sur notre chaîne Twitch !
    >
    > @RoleMatchs Spectateurs, soyez prêts !

### 2. Mentions Ciblées

Pour s'assurer que les bonnes personnes voient la notification, `MatchNotifier` peut mentionner des rôles spécifiques.

*   **Exemple de situation :** Pour le match ci-dessus, le module ne se contente pas d'envoyer un message. Il identifie que les joueurs des deux équipes ont les rôles "Joueur Équipe A" et "Joueur Équipe B" (attribués par `AutoRole`). La notification inclura donc des mentions pour ces rôles, s'assurant que tous les participants directs reçoivent une alerte. De plus, il peut mentionner un rôle général comme `@Spectateurs` pour alerter tous ceux qui ont exprimé un intérêt pour les matchs.

### 3. Rappels de Dernière Minute

Le module peut être configuré pour envoyer plusieurs notifications à des moments différents.

*   **Exemple de situation :** En plus de la notification 24 heures à l'avance, `MatchNotifier` envoie un rappel 1 heure avant le début du match. Ce message est souvent plus court et plus direct :

    > :rocket: **Le match entre Équipe A et Équipe B commence dans 1 heure !** :rocket:
    >
    > Prenez vos pop-corn et rejoignez-nous sur Twitch !

En résumé, `MatchNotifier` est un outil de communication crucial qui crée de l'engagement et s'assure que la communauté est toujours informée des événements en cours. Il transforme une simple base de données de matchs en une expérience vivante et interactive pour les membres du serveur.
