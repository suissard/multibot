---
title: index
layout: default
---

# `index`

Ce module est responsable de la gestion automatisée des salons de match. Il utilise une tâche planifiée (cron) pour créer et archiver les salons vocaux et textuels associés aux matchs à venir, en se basant sur les données de l'API. Le module expose également des commandes pour permettre aux administrateurs de créer des salons manuellement, d'y ajouter ou d'en retirer des utilisateurs, et de nettoyer les salons après un match.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">import('../../Class/Bot')</span> | - L'instance du bot pour laquelle initialiser le module. |

**Retour :** <span class="badge badge-type">object</span> - objet contenant les classes de commandes et d'événements exportées par ce module.

Une fois le bot prêt, ce gestionnaire configure et lance la tâche planifiée pour la gestion automatique des salons.

## Commandes du Module

<div class="explore-grid">
  <a href="./commands/addUserToChannel.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">addUserToChannel</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./commands/autoChannelCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">autoChannelCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./commands/createMatchCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">createMatchCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./commands/notifyMatchCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">notifyMatchCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./commands/removeUserFromChannel.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">removeUserFromChannel</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./commands/washMatchCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">washMatchCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
</div>

## Événements du Module

<div class="explore-grid">
  <a href="./events/NewGuildMember.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">NewGuildMember</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Écouteur d'événement lié au module.</p>
  </a>
</div>

