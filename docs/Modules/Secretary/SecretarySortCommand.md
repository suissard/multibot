---
title: SecretarySortCommand
layout: default
---

# `SecretarySortCommand`

> **Description :** Trie les tickets du secrétariat (❌ Priority)

## Narrative


- Cette commande réorganise les salons dans TOUTES les catégories de secrétariat.
- **Attention** : Les salons peuvent changer de catégorie pour respecter la limite de 50 salons.
- Règle de tri :
    1. **Priorité Haute** : Les salons dont le nom commence par '❌' (Message utilisateur sans réponse).
    2. **Priorité Basse** : Les autres salons.
    3. **Ordre Secondaire** :
        - **Alphabétique** : A-Z
        - **Dernier Message** : Du plus ancien au plus récent


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `type` | <span class="badge badge-type">STRING</span> | Type de tri (date par défaut) | <span class="badge badge-optional">Optionnel</span> |

Sorts the secretary channels.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guild` | <span class="badge badge-type">Discord.Guild</span> | - The guild to sort. |
| `interaction` | <span class="badge badge-type">Discord.CommandInteraction</span> | - Optional interaction for replies. |
| `sortType` | <span class="badge badge-type">string</span> | - Sort type: 'alpha' or 'date'. |

