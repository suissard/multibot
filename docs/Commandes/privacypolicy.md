---
title: privacypolicy
layout: default
---

# `privacypolicy`

## Description

Fournit la politique de confidentialité du bot

## Narrative


- Au moment du chargement initial du fichier de commande (et non à chaque exécution), le contenu du fichier \

Exécute la commande pour afficher la politique de confidentialité. Lit le fichier PRIVACY.md et retourne son contenu.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `string` - contenu du fichier de politique de confidentialité.

