---
title: teamManager
layout: default
---

# `teamManager`

> **Classe :** `TeamManager`

### Constructeur `new TeamManager(collection)`

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `collection` | <span class="badge badge-type">import('suissard-strapi-client').StrapiCollection</span> | - La collection Strapi pour les équipes. |

### Méthode `saveTeamData(name, userID, elo, battleTag)`

Sauvegarde ou met à jour les données d'une équipe dans la base de données Strapi.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - Le nom de l'équipe. |
| `userID` | <span class="badge badge-type">string</span> | - L'ID Discord du capitaine. |
| `elo` | <span class="badge badge-type">string</span> | - Le classement de l'équipe. |
| `battleTag` | <span class="badge badge-type">string</span> | - Le BattleTag du capitaine. |

**Retour :** <span class="badge badge-type">Promise&lt;import('suissard-strapi-client').StrapiObject&gt;</span> - équipe sauvegardé ou mis à jour.

### Méthode `getTeamByName(name)`

Retrouve une équipe dans le cache par son nom.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - Le nom de l'équipe. |

**Retour :** <span class="badge badge-type">import('suissard-strapi-client').StrapiObject|undefined</span> - équipe trouvé, ou undefined.

### Méthode `createRoleTeam(teamname, guild)`

Crée le rôle spécifique pour une équipe, s'il n'existe pas déjà.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `teamname` | <span class="badge badge-type">string</span> | - Le nom de l'équipe. |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - La guilde. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').Role&gt;</span> - rôle de l'équipe.

### Méthode `createCatEvent(guild)`

Crée la catégorie de salons pour les événements.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - La guilde. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').CategoryChannel&gt;</span> - catégorie créée.

### Méthode `createChannelTeam(teamname, guild)`

Crée le salon vocal pour une équipe, s'il n'existe pas déjà. Configure les permissions pour le staff, le capitaine et les membres de l'équipe.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `teamname` | <span class="badge badge-type">string</span> | - Le nom de l'équipe. |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - La guilde. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').VoiceChannel&gt;</span> - salon vocal de l'équipe.

### Méthode `addRoleTeam(member, rolecap, roleteam)`

Ajoute les rôles d'équipe et de capitaine à un membre.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `member` | <span class="badge badge-type">import('discord.js').GuildMember</span> | - Le membre à qui ajouter les rôles. |
| `rolecap` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle de capitaine. |
| `roleteam` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle de l'équipe. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').GuildMember&gt;</span> - membre mis à jour.

### Méthode `checkRole(member, rolecap, roleteam)`

Vérifie si un membre a les rôles d'équipe et de capitaine, et les ajoute si nécessaire.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `member` | <span class="badge badge-type">import('discord.js').GuildMember</span> | - Le membre à vérifier. |
| `rolecap` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle de capitaine. |
| `roleteam` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle de l'équipe. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').GuildMember&gt;</span> - membre vérifié.

### Méthode `updateRoleTeam(role, newTeamName)`

Met à jour le nom d'un rôle d'équipe.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `role` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle à modifier. |
| `newTeamName` | <span class="badge badge-type">string</span> | - Le nouveau nom de l'équipe. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').Role&gt;</span> - rôle mis à jour.

### Méthode `updateChannelTeam(channel, newTeamName)`

Met à jour le nom d'un salon d'équipe.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `channel` | <span class="badge badge-type">import('discord.js').VoiceChannel</span> | - Le salon à modifier. |
| `newTeamName` | <span class="badge badge-type">string</span> | - Le nouveau nom de l'équipe. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').VoiceChannel&gt;</span> - salon mis à jour.

### Méthode `updateTeamCap(cap, newCap, capRole, teamRole)`

Transfère les rôles de capitaine et d'équipe d'un ancien capitaine à un nouveau.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `cap` | <span class="badge badge-type">import('discord.js').GuildMember</span> | - L'ancien capitaine. |
| `newCap` | <span class="badge badge-type">import('discord.js').GuildMember</span> | - Le nouveau capitaine. |
| `capRole` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle de capitaine. |
| `teamRole` | <span class="badge badge-type">import('discord.js').Role</span> | - Le rôle de l'équipe. |

**Retour :** <span class="badge badge-type">Promise&lt;import('discord.js').GuildMember&gt;</span> - nouveau capitaine mis à jour.

### Méthode `updateCapBtag(teamInfo, newBtag)`

Met à jour le BattleTag du capitaine.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `teamInfo` | <span class="badge badge-type">object</span> | - Les informations de l'équipe. |
| `newBtag` | <span class="badge badge-type">string</span> | - Le nouveau BattleTag. |

### Méthode `updateTeamRank(teamInfo, newRank)`

Met à jour le classement (elo) de l'équipe.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `teamInfo` | <span class="badge badge-type">object</span> | - Les informations de l'équipe. |
| `newRank` | <span class="badge badge-type">number</span> | - Le nouveau classement. |

