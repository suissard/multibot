---
title: creatematch
layout: default
---

# Commande `creatematch`

## Description

Create match channels

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `creatematch` |
| **Description** | Create match channels |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
		{
			type: 'STRING',
			name: 'matchid',
			description: 'The id of the match',
			required: true,
		},
	]
```

## Fonctionnement

- Cette commande permet de créer manuellement les salons (vocaux et textuels) pour un match spécifique.
- Elle est utile si la création automatique a échoué ou pour des besoins de test.
- Elle nécessite l'ID du match en argument.

- **Fonctionnement :**
    1.  La commande prend un ID de match (\`matchid\`) en argument.
    2.  Elle utilise cet ID pour appeler une API externe (\`getMatchById\`) et récupérer les informations détaillées du match.
    3.  Si le match est trouvé, elle appelle la fonction \`createMatchChannels()\`. Cette fonction est responsable de :
        - La création des différents salons nécessaires pour le match (salon vocal, salon textuel, etc.).
        - La configuration des permissions pour ces salons.
    4.  Pendant la création, un message "⏳ Channels en cours de création..." est affiché.
    5.  Une fois les salons créés, un message de confirmation est envoyé, incluant des liens cliquables vers les nouveaux salons.
    6.  Si aucun match ne correspond à l'ID fourni, un message d'erreur est renvoyé.
