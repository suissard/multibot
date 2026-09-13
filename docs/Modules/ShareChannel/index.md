---
title: index
layout: default
---

# `index`

Le module "ShareChannel" permet de synchroniser des messages entre plusieurs salons Discord. Lorsqu'un message est posté dans un salon "source", le module le copie et le diffuse dans un ou plusieurs salons "cibles". Ces salons peuvent se trouver sur le même serveur ou sur des serveurs différents, à condition que le bot y ait accès. Le module gère non seulement la création de nouveaux messages, mais aussi leur mise à jour et leur suppression, assurant ainsi que les salons partagés restent parfaitement synchronisés. Des commandes sont également disponibles pour configurer et gérer ces partages, par exemple pour lier des salons, afficher les partages actifs ou arrêter une synchronisation.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">import('../../Class/Bot')</span> | - L'instance du bot. |

**Retour :** <span class="badge badge-type">object</span> - objet contenant les classes du module.

## Commandes du Module

<div class="explore-grid">
  <a href="./SalonCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">SalonCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./ShareGetiCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">ShareGetiCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./ShareInfoCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">ShareInfoCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./SharePromoCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">SharePromoCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./ShareStopCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">ShareStopCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
</div>

## Configuration Spécifique

Ce module expose des classes de configuration dédiées :

<div class="explore-grid">
  <a href="./shareChannelsConfig.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">shareChannelsConfig</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Structure de configuration du module.</p>
  </a>
</div>

