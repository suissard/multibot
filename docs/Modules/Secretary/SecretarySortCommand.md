---
title: SecretarySortCommand
layout: default
---

# `SecretarySortCommand`

Trie les tickets du secrétariat (❌ Priority)

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

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `type` | `STRING` | Type de tri (alpha par défaut) | No |

*No JSDoc comments found in this file.*
