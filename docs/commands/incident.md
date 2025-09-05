---
title: incident
layout: default
---

# Commande `incident`

## Description

Renvoit un url personnalisé pour déclarer un incident lors de la compétition OAFO

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `incident` |
| **Description** | Renvoit un url personnalisé pour déclarer un incident lors de la compétition OAFO |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
		{
			type: 'USER',
			name: 'user',
			description: "Utilisateur a qui faire parvenir le formulaire d'incident",
			required: false,
		},
	]
```

## Fonctionnement

- Cette commande a pour but de fournir à un utilisateur un lien personnalisé pour déclarer un incident survenu lors de la compétition OAFO.
- Elle peut cibler l'auteur de la commande ou un autre utilisateur si celui-ci est mentionné.

- **Fonctionnement :**
    1.  La commande identifie l'utilisateur Discord cible.
    2.  Elle recherche l'ID Olympe de cet utilisateur dans sa base de données locale.
    3.  Elle tente d'utiliser cet ID pour récupérer des informations supplémentaires sur l'utilisateur depuis l'API Olympe (BattleTag, équipes, etc.).
    4.  Elle utilise une URL de base de formulaire Google et la personnalise en pré-remplissant plusieurs champs avec les informations récupérées :
        - Langue (basée sur la nationalité), BattleTag, Tag Discord, nom de l'équipe, etc.
    5.  Si les informations Olympe ne sont pas trouvées, elle utilise des valeurs par défaut.
    6.  Elle crée un message "embed" contenant le lien vers le formulaire pré-rempli.
    7.  Elle envoie cet embed en message privé (DM) à l'utilisateur cible.
    8.  Elle renvoie un message de confirmation, qui précise si les informations Olympe de l'utilisateur ont été trouvées ou non.
