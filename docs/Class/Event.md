---
title: Event
layout: default
---

# `Event`

> **Description :** N/A

L'instance du bot pour lequel cet événement est enregistré.

L'identifiant unique de l'événement.

Le nom de l'événement Discord à écouter (par exemple, 'messageCreate').

Fonction gerant la survenue de l'evenement try { yourFunctionHere() } catch (err) { this.handleError(err); }

Gère les erreurs survenant dans l'événement.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `err` | <span class="badge badge-type">Error</span> | - L'erreur qui s'est produite. |
| `target` | <span class="badge badge-type">import('discord.js').User | import('discord.js').Channel</span> | - La cible à qui envoyer un message d'erreur (optionnel). |

Creer un listener pour le bot concerné

Creer un listener en début de lite pour le bot concerné

