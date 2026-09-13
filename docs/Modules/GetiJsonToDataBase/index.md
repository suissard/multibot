---
title: index
layout: default
---

# `index`

Ce module contient un ensemble de scripts utilitaires conçus pour la migration de données. Sa fonction principale est de lire des données depuis des fichiers JSON, de les transformer dans un format compatible avec la base de données, puis de les y insérer. Il inclut des fonctions spécifiques pour traiter les données "Geti" et pour convertir d'anciens formats de configuration, comme ceux de 'ShareChannel', vers la nouvelle structure de la base de données. Ce module n'est pas destiné à être activé ou désactivé comme les autres modules du bot, mais plutôt à être utilisé ponctuellement pour des tâches de maintenance et de migration.

Lit les fichiers d'un répertoire et les insère dans une base de données.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `dbname` | <span class="badge badge-type">string</span> | - Le nom de la collection dans la base de données. |
| `dirPath` | <span class="badge badge-type">string</span> | - Le chemin vers le répertoire contenant les données. |
| `exclusions` | <span class="badge badge-type">Array<string></span> | - Une liste de fichiers à exclure. |
| `databasify` | <span class="badge badge-type">function</span> | - Une fonction pour transformer les données avant l'insertion. |

Transforme un objet de données "Geti" brut en un format adapté à la base de données. Renomme `key` en `_id` et supprime plusieurs propriétés inutiles.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `getiData` | <span class="badge badge-type">object</span> | - L'objet de données Geti à transformer. |

**Retour :** <span class="badge badge-type">object</span> - de données formaté pour la base de données.

Convertit les anciennes données de ShareChannel vers le nouveau format de base de données.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `oldData` | <span class="badge badge-type">Array<object></span> | - Un tableau d'anciens objets ShareChannel. |

