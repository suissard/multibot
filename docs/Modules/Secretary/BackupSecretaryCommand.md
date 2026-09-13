---
title: BackupSecretaryCommand
layout: default
---

# `BackupSecretaryCommand`

> **Description :** Sauvegarde les discussions du secrétariat en JSON

## Narrative


- Cette commande permet de sauvegarder l'historique complet des discussions de secrétariat.
- Si une catégorie est fournie :
    - Elle est considérée comme la base.
    - La commande cherche toutes les catégories dérivées (ex: "Nom", "Nom - 1").
- Si aucune catégorie n'est fournie :
    - La commande utilise la configuration du module Secretary pour trouver tous les secrétariats de ce serveur.
- Elle génère un fichier JSON contenant tous les messages.
- Affiche une barre de progression.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `category` | <span class="badge badge-type">CHANNEL</span> | La catégorie principale du secrétariat (Optionnel) | <span class="badge badge-optional">Optionnel</span> |

