---
title: GetCasterStatForm
layout: default
---

# `GetCasterStatForm`

## Narrative


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


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `matchid` | `STRING` | Identifiant de match de la compétition | Yes |
| `user` | `USER` | Utilisateur a qui faire parvenir le formulaire | No |
| `castnbr` | `STRING` | Caster était en position 1 ou 2 | No |

Génère une URL pré-remplie pour le formulaire de statistiques de caster.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `match` | `object` | - L'objet contenant les données du match, provenant de l'API Olympe. |
| `castNbr` | `number` | - Le numéro du caster (1 ou 2) pour lequel générer le formulaire. |

**Returns:** `string` - personnalisée et pré-remplie du formulaire.

Exécute la commande pour envoyer un formulaire de statistiques de caster. Récupère les données du match, génère une URL de formulaire pré-remplie et l'envoie en message privé à l'utilisateur concerné.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.matchid` | `string` | - L'ID du match pour lequel déclarer les statistiques. |
| `args.user` | `string` | - L'ID de l'utilisateur à qui envoyer le formulaire. |
| `args.castnbr` | `string` | - Le numéro du caster (1 ou 2). |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

