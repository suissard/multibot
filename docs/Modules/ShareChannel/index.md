---
layout: default
title: ShareChannel
parent: Modules
---

# ShareChannel

Ce module permet de partager des messages de recherche (scrim, joueurs, staff, etc.) entre plusieurs serveurs Discord.

## Fonctionnement

Le bot écoute les messages postés dans les salons configurés et les reposte sur tous les autres salons configurés pour le même **jeu** et la même **catégorie**.

> **Note :** Si votre serveur a moins de 50 membres, vous recevrez les annonces des autres serveurs, mais vos propres messages ne seront pas diffusés tant que ce seuil n'est pas atteint.

## Commandes Requises

Voici les commandes principales pour configurer et gérer le partage de salons :

### 1. Configurer un salon (`!sharechannel`)

Définit le salon actuel comme un salon partagé pour un jeu et une catégorie spécifiques.

**Utilisation :**
`!sharechannel <jeu> <catégorie>`

**Arguments :**
*   **<jeu>** : Le jeu concerné (voir la liste ci-dessous).
*   **<catégorie>** : Le type de recherche (voir la liste ci-dessous).

**Exemple :**
`!sharechannel overwatch scrim`
*(Configure le salon pour partager des demandes de scrim Overwatch)*

---

### 2. Vérifier la configuration (`!shareinfo`)

Affiche la configuration actuelle du salon (si elle existe).

**Utilisation :**
`!shareinfo`

**Résultat attendu :**
Le bot vous indiquera si le salon est configuré, pour quel jeu et quelle catégorie, et si votre serveur remplit les conditions de diffusion (50+ membres).

---

### 3. Arrêter le partage (`!sharestop`)

Retire le salon actuel du système de partage. Il ne recevra plus de messages et n'en diffusera plus.

**Utilisation :**
`!sharestop`

## Listes des Jeux et Catégories Disponibles

Pour utiliser `!sharechannel`, vous devez choisir parmi les valeurs suivantes :

### Jeux disponibles
*   `overwatch` (ou `ow`)
*   `tekken` (ou `tk`)
*   `valorant` (ou `val`)
*   `leagueOfLegend` (ou `lol`, `league of legends`)

### Catégories disponibles
*   `scrim` : Pour la recherche de matchs d'entraînement.
*   `team` : Pour la recherche d'équipe (LFT).
*   `player` : Pour la recherche de joueurs (LFP, LFSub).
*   `staff` : Pour le recrutement de staff (coach, manager, etc.).
*   `caster` : Pour la recherche de commentateurs.

## Permissions

La permission **Gérer les salons** (`MANAGE_CHANNELS`) est requise pour utiliser `!sharechannel` et `!sharestop`.
