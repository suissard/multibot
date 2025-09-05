---
title: castreward
layout: default
---

# Commande `castreward`

## Description

Renvoit un url personnalisé pour réclamer une récompense de cast OAFO

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `castreward` |
| **Description** | Renvoit un url personnalisé pour réclamer une récompense de cast OAFO |
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
            description: 'Utilisateur a qui faire parvenir le formulaire de récompense',
            required: false,
        },
    ]
```

## Fonctionnement

- Cette commande a pour but d'envoyer un lien personnalisé vers un formulaire Google pour réclamer une récompense de cast (diffusion de match).
- Elle peut cibler soit un utilisateur mentionné en argument, soit l'auteur de la commande si personne n'est mentionné.

- **Fonctionnement :**
    1.  La commande identifie l'utilisateur Discord cible.
    2.  Elle construit une URL unique pour un formulaire Google. L'URL est personnalisée en ajoutant l'ID Discord de l'utilisateur comme paramètre pré-rempli (\`entry.728176607\`).
    3.  Elle crée un message "embed" contenant ce lien personnalisé.
    4.  Elle envoie cet embed en message privé (DM) à l'utilisateur cible.
    5.  Enfin, elle renvoie un message de confirmation dans le salon où la commande a été exécutée.
