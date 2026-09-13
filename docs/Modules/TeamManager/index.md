---
title: index
layout: default
---

# `index`

Le module TeamManager gère la création et la mise à jour automatique des salons vocaux d'équipe. Il se base sur les données fournies par le module AutoRole (API Olympe).

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">import('../../Class/Bot')</span> | - L'instance du bot. |

Internal helper to sync teams for a specific segment object.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> |  |
| `targetSegment` | <span class="badge badge-type">object</span> |  |

**Retour :** <span class="badge badge-type">Promise<object></span> - object { found, success, pruned, errors }

Synchronise toutes les équipes présentes dans le cache Olympe pour un segment donné ou tous les segments.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> |  |
| `segmentFilter` | <span class="badge badge-type">string</span> | - Filtre optionnel pour le segment. |

## Commandes du Module

<div class="explore-grid">
  <a href="./commands/CreateAllTeamChannelsCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">CreateAllTeamChannelsCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./commands/DeleteAllTeamChannelsCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">DeleteAllTeamChannelsCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
  <a href="./commands/UpdateTeamChannelPermissionsCommand.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">UpdateTeamChannelPermissionsCommand</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>
</div>

