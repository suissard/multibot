---
title: Event
layout: default
---

# `Event`

> **Classe :** `Event`

> **Description :** N/A

### Constructeur `new Event(bot)`

#### Propriété `bot`

<span class="badge badge-type">Bot</span> L'instance du bot pour lequel cet événement est enregistré.

#### Propriété `id`

<span class="badge badge-type">string</span> L'identifiant unique de l'événement.

#### Propriété `listener`

<span class="badge badge-type">string</span> Le nom de l'événement Discord à écouter (par exemple, 'messageCreate').

### Méthode `handleEvent()`

Fonction gerant la survenue de l'evenement try { yourFunctionHere() } catch (err) { this.handleError(err); }

### Méthode `handleError(err, target)`

Gère les erreurs survenant dans l'événement.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `err` | <span class="badge badge-type">Error</span> | - L'erreur qui s'est produite. |
| `target` | <span class="badge badge-type">import('discord.js').User | import('discord.js').Channel</span> | - La cible à qui envoyer un message d'erreur (optionnel). |

### Méthode `createListener()`

Creer un listener pour le bot concerné

### Méthode `prependListener()`

Creer un listener en début de lite pour le bot concerné

