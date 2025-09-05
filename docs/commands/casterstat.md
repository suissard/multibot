---
title: casterstat
layout: default
---

# Commande `casterstat`

## Description

Renvoit un url personnalisé pour déclarer les statistiques dun match

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `casterstat` |
| **Description** | Renvoit un url personnalisé pour déclarer les statistiques dun match |
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
			description: 'Identifiant de match de la compétition',
			required: true,
		},
		{
			type: 'USER',
			name: 'user',
			description: 'Utilisateur a qui faire parvenir le formulaire',
			required: false,
		},
		{
			type: 'STRING',
			name: 'castnbr',
			description: 'Caster était en position 1 ou 2',
			required: false,
		},
	]
```

## Fonctionnement

- Cette commande a pour but de générer et d'envoyer un lien vers un formulaire pré-rempli pour que les casters (diffuseurs) puissent soumettre leurs statistiques après un match.
- Elle nécessite l'ID du match concerné.

- **Fonctionnement :**
    1.  La commande prend en argument l'ID d'un match (\`matchid\`). Elle peut aussi prendre en option un utilisateur cible et un numéro de caster (1 ou 2).
    2.  Elle interroge l'API Olympe pour récupérer toutes les informations du match correspondant à l'ID fourni.
    3.  Si le match est trouvé, elle utilise une URL de base de formulaire (probablement Google Forms) et la personnalise en pré-remplissant plusieurs champs avec les données du match :
        - ID du match, date, nom des équipes, nom de la division, lien de la chaîne Twitch, etc.
    4.  Elle identifie l'utilisateur à qui envoyer le formulaire (l'utilisateur mentionné ou l'auteur de la commande).
    5.  Elle crée un message "embed" contenant le lien vers le formulaire pré-rempli.
    6.  Elle envoie cet embed en message privé (DM) à l'utilisateur cible.
    7.  Si le match n'est pas trouvé, elle renvoie un message d'erreur.
