---
title: numberOfChans
layout: default
---

# `numberOfChans`

> **Classe :** `Done` (hérite de `Command`)

> **Identifiant :** `numberofchans`

> **Description :** Donne le nombre de channel du serveur

> **Utilisation :** `PREFIXCMD`

## Narrative


- La commande récupère le nombre total de salons (channels) actuellement présents sur le serveur.
- Elle accède à la collection \`channels.cache\` de l'objet \`guild\` (serveur) pour en obtenir la taille.
- Elle retourne une simple chaîne de caractères indiquant ce nombre, avec un rappel de la limite de 500 salons par serveur sur Discord.


### Méthode `methode(args = {})`

Exécute la commande pour obtenir le nombre de salons sur le serveur.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande (non utilisés ici). |

**Retour :** <span class="badge badge-type">string</span> - message indiquant le nombre de salons.

