---
title: setteam
layout: default
---

# `setteam`

## Narrative


- Cette commande permet de créer une nouvelle équipe sur le serveur.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`).

- **Arguments requis :**
    - \`teamname\` : Le nom de la nouvelle équipe.
    - \`btag\` : Le BattleTag du capitaine.
    - \`capitaine\` : La mention de l'utilisateur qui sera le capitaine.
    - \`elo\` : Le niveau de classement (elo) de l'équipe.

- **Processus de création :**
    1.  La commande commence par envoyer un message temporaire "Team en cours d'ajout...".
    2.  Elle crée un nouveau rôle pour l'équipe, dont le nom est formaté (par exemple, "Team [NomDeLequipe]").
    3.  Elle recherche le rôle "🎉 Capitaine". Si ce rôle n'existe pas, il est créé.
    4.  Elle crée un nouveau salon textuel privé pour l'équipe. Seuls les membres ayant le rôle de l'équipe peuvent y accéder.
    5.  Elle assigne le rôle de l'équipe et le rôle "🎉 Capitaine" à l'utilisateur désigné comme capitaine.
    6.  Elle enregistre les informations de l'équipe (nom, capitaine, elo, btag) dans une base de données ou un système de stockage.
    7.  Une fois toutes les opérations terminées, elle envoie un message "embed" final pour confirmer la création de l'équipe avec tous ses détails.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `teamname` | `STRING` | Nom de la team | Yes |
| `btag` | `STRING` | Btag Du capitaine | Yes |
| `capitaine` | `USER` | Capitaine de la team | Yes |
| `elo` | `STRING` | Rank de la team | Yes |

Exécute la commande de création d'équipe. Lance le processus de création de rôle et de salon, puis envoie un message de confirmation.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.teamname` | `string` | - Le nom de l'équipe. |
| `args.capitaine` | `string` | - L'ID de l'utilisateur capitaine. |
| `args.elo` | `string` | - L'elo de l'équipe. |
| `args.btag` | `string` | - Le BattleTag du capitaine. |

**Returns:** `string` - message indiquant que la création est en cours.

Récupère ou crée les rôles nécessaires pour l'équipe. Crée un rôle spécifique pour l'équipe et trouve le rôle de "Capitaine".

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande, principalement `args.teamname`. |

**Returns:** `Promise<{roleteam: import('discord.js').Role, rolecap: import('discord.js').Role}>` - objet contenant le rôle de l'équipe et le rôle de capitaine.

Crée le salon de l'équipe, assigne les rôles au capitaine et enregistre les données de l'équipe.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `roleteam` | `import('discord.js').Role` | - Le rôle de l'équipe. |
| `rolecap` | `import('discord.js').Role` | - Le rôle de capitaine. |

