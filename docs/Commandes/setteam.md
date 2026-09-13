---
title: setteam
layout: default
---

# `setteam`

> **Description :** Crée une nouvelle équipe avec un rôle et un salon dédiés.

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

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `teamname` | <span class="badge badge-type">STRING</span> | Nom de la team | <span class="badge badge-required">Requis</span> |
| `btag` | <span class="badge badge-type">STRING</span> | Btag Du capitaine | <span class="badge badge-required">Requis</span> |
| `capitaine` | <span class="badge badge-type">USER</span> | Capitaine de la team | <span class="badge badge-required">Requis</span> |
| `elo` | <span class="badge badge-type">STRING</span> | Rank de la team | <span class="badge badge-required">Requis</span> |

Exécute la commande de création d'équipe. Lance le processus de création de rôle et de salon, puis envoie un message de confirmation.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.teamname` | <span class="badge badge-type">string</span> | - Le nom de l'équipe. |
| `args.capitaine` | <span class="badge badge-type">string</span> | - L'ID de l'utilisateur capitaine. |
| `args.elo` | <span class="badge badge-type">string</span> | - L'elo de l'équipe. |
| `args.btag` | <span class="badge badge-type">string</span> | - Le BattleTag du capitaine. |

**Retour :** <span class="badge badge-type">string</span> - message indiquant que la création est en cours.

Récupère ou crée les rôles nécessaires pour l'équipe. Crée un rôle spécifique pour l'équipe et trouve le rôle de "Capitaine".

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande, principalement `args.teamname`. |

**Retour :** <span class="badge badge-type">Promise<{roleteam: import('discord.js').Role, rolecap: import('discord.js').Role}></span> - objet contenant le rôle de l'équipe et le rôle de capitaine.

Crée le salon de l'équipe, assigne les rôles au capitaine et enregistre les données de l'équipe.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `roleteam` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle de l'équipe. |
| `rolecap` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle de capitaine. |

