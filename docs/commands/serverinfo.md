---
title: serverinfo
layout: default
---

# Commande `serverinfo`

## Description

Donne des infos sur le serveur

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `serverinfo` |
| **Description** | Donne des infos sur le serveur |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
methode(args = {}) {
            let embed = await this.serverInfoEmbed(this.guild);
            return embed;
        }

        /**
         * Crée et retourne un `EmbedBuilder` avec les informations d'un serveur.
         * @param {Discord.Guild} guild - L'objet Guild du serveur dont il faut extraire les informations.
         * @returns {Promise<Discord.EmbedBuilder>} Un EmbedBuilder contenant les informations formatées du serveur.
         */
        async serverInfoEmbed(guild) {
            let owner = await guild.fetchOwner();
            return new Discord.EmbedBuilder()
                .setTitle(`INFO DU SERVEUR : ${guild.name}` + ` (${guild.memberCount}membres)`)
                .setThumbnail(guild.iconURL())
                .setDescription(`**Dirigé par :** <@${guild.ownerId}> *(${owner.user.tag})*\n**Créer le :** ${guild.createdAt}\n**Nombres de channels :** ${guild.channels.cache.size}\n**Nombres de roles :** ${guild.roles.cache.size}`);

        }
    }
```
