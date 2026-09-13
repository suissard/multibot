---
title: GetCastRewardForm
layout: default
---

# `GetCastRewardForm`

> **Description :** Renvoit un url personnalisé pour réclamer une récompense de cast OAFO

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

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `user` | <span class="badge badge-type">USER</span> | Utilisateur a qui faire parvenir le formulaire de récompense | <span class="badge badge-optional">Optionnel</span> |

Génère une URL personnalisée pour le formulaire de récompense de cast.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `discordUser` | <span class="badge badge-type">import('discord.js').User</span> | - L'utilisateur Discord pour lequel générer l'URL. |

**Retour :** <span class="badge badge-type">string</span> - personnalisée du formulaire Google.

Exécute la commande pour envoyer un formulaire de récompense de cast. Cible l'utilisateur mentionné ou l'auteur de la commande, génère une URL de formulaire personnalisée et l'envoie en message privé.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.user` | <span class="badge badge-type">string</span> | - L'ID de l'utilisateur à qui envoyer le formulaire. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation.

