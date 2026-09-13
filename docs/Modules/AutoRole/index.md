---
title: index
layout: default
---

# `index`

Ce module gère l'attribution automatique des rôles pour les membres du serveur. Une fois le bot prêt, le module s'initialise en se connectant à une source de données externe, l'API Olympe, pour récupérer les informations sur les utilisateurs et leurs attributions. Il s'assure que les données du serveur (rôles, membres) sont bien chargées, puis lance une première synchronisation des rôles. Par la suite, le processus est répété à intervalles réguliers, définis dans la configuration, pour garantir que les rôles des membres sont toujours à jour par rapport aux données de l'API.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">import('../../Class/Bot')</span> | - L'instance du bot pour laquelle initialiser le module. |

**Retour :** <span class="badge badge-type">object</span> - objet contenant les classes de commandes exportées par ce module.

AutoRole : { "everyXhours": 8, "olympeAuth": { "value": "token", }, olympeDomain: "playallforone.com", }

Une fois le bot prêt, ce gestionnaire configure et lance le processus d'attribution automatique des rôles. Il initialise la connexion à l'API Olympe, s'assure que les données du serveur sont en cache, puis exécute la fonction d'attribution des rôles immédiatement et à un intervalle défini.

## Commandes du Module

<div class="explore-grid">
  <a href="./AutoRoleCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">AutoRoleCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./GiveCasterRoleCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">GiveCasterRoleCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
</div>

## Configuration Spécifique

Ce module expose des classes de configuration dédiées :

<div class="explore-grid">
  <a href="./AutoroleConfigClass.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">AutoroleConfigClass</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Structure de configuration du module.</p>
  </a>
</div>

## Événements du Module

<div class="explore-grid">
  <a href="./events/addOlympeDataEvent.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">addOlympeDataEvent</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Écouteur d'événement lié au module.</p>
  </a>
  <a href="./events/processAllUsersEvent.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">processAllUsersEvent</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Écouteur d'événement lié au module.</p>
  </a>
</div>

