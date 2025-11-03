---
title: GetCastRewardForm
layout: default
---

# `GetCastRewardForm`

Renvoit un url personnalisé pour réclamer une récompense de cast OAFO

## Narrative


- Cette commande a pour but d'envoyer un lien personnalisé vers un formulaire Google pour réclamer une récompense de cast (diffusion de match).
- Elle peut cibler soit un utilisateur mentionné en argument, soit l'auteur de la commande si personne n'est mentionné.

- **Fonctionnement :**
    1.  La commande identifie l'utilisateur Discord cible.
    2.  Elle construit une URL unique pour un formulaire Google. L'URL est personnalisée en ajoutant l'ID Discord de l'utilisateur comme paramètre pré-rempli (\`entry.728176607\`).
    3.  Elle crée un message "embed" contenant ce lien personnalisé.
    4.  Elle envoie cet embed en message privé (DM) à l'utilisateur cible.
    5.  Enfin, elle renvoie un message de confirmation dans le salon où la commande a été exécutée.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `user` | `USER` | Utilisateur a qui faire parvenir le formulaire de récompense | No |

Génère une URL personnalisée pour le formulaire de récompense de cast.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `discordUser` | `import('discord.js').User` | - L'utilisateur Discord pour lequel générer l'URL. |

**Returns:** `string` - personnalisée du formulaire Google.

Exécute la commande pour envoyer un formulaire de récompense de cast. Cible l'utilisateur mentionné ou l'auteur de la commande, génère une URL de formulaire personnalisée et l'envoie en message privé.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur à qui envoyer le formulaire. |

**Returns:** `Promise<string>` - message de confirmation.

