---
title: "Module: VocalDuplicate"
layout: default
---

# Module: `VocalDuplicate`

## Description

Initialise le module VocalDuplicate pour un bot.

## Fonctionnement

Ce module gère la duplication de salons vocaux. Lorsqu'un utilisateur rejoint un salon "modèle", un nouveau salon est créé pour lui. Les salons dupliqués et vides sont nettoyés périodiquement.
 @param {import('../../Class/Bot')} bot - L'instance du bot.

## Fichiers du Module

```
index.js
```

## Composants Enregistrés

Ce module enregistre les composants suivants (commandes, événements) :
```
N/A
```

## Contenu de `index.js`

```javascript
/**
 * @description Initialise le module VocalDuplicate pour un bot.
 * @narrative Ce module gère la duplication de salons vocaux. Lorsqu'un utilisateur rejoint un salon "modèle", un nouveau salon est créé pour lui. Les salons dupliqués et vides sont nettoyés périodiquement.
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 */
module.exports = (bot) => {
    /**
     * Récupère l'ensemble des IDs des salons vocaux qui ont été dupliqués par ce module.
     * @returns {Promise<Set<string>>} Un Set contenant les IDs des salons dupliqués.
     */
    async function getCreatedChannels() {
        let createdChannels = new Set();
        const config = bot.modules.VocalDuplicate.guilds;

        for (let guildConfig of config) {
            let guild = bot.guilds.cache.get(guildConfig.guild);
            let channels = [];

            if (!guild) {
                try {
                    guild = await bot.guilds.fetch(guildConfig.guild).catch(_ => null);
                } catch (e) {
                    console.error(`VOCAL DUPLICATE : Le serveur ${guildConfig.guild} n'existe pas`);
                }
            }

            if (!guild) {
                console.error(`VOCAL DUPLICATE : Le serveur ${guildConfig.guild} n'existe pas`);
                continue;
            }

            for (let id of guildConfig.channels) {
                let channel = guild.channels.cache.get(id.id);
                if (!channel) {
                    try {
                        channel = await guild.channels.fetch(id.id).catch(_ => null);
                    } catch (e) {
                        console.error(`VOCAL DUPLICATE : Le channel ${id.id} n'existe pas`);
                    }
                }
                if (channel)
                    channels.push([id.name ,channel]);
            }
            guild.channels.cache.forEach((chan) => {
                if (chan.type === 2) {
                    for (let [name, id] of channels) {
                        if (chan.parent === id.parent && chan.name.startsWith(`${name} #`)) {
                            createdChannels.add(chan.id);
                        }
                    }
                }
            });
        }

        return createdChannels;
    }

    /**
     * Vérifie tous les salons dupliqués et supprime ceux qui sont inactifs (vides).
     */
    async function checkInactiveChannels() {
        let createdChannels = await getCreatedChannels();
        for (const channelId of createdChannels) {
            const channel = bot.channels.cache.get(channelId);
            if (channel && !channel.members.size) {
                channel
                    .delete()
                    .then(() => createdChannels.delete(channelId))
                    .catch(console.error);
            }
        }
    }

    setInterval(checkInactiveChannels, 1000 * 60 * 10);

    /**
     * Gère l'événement 'voiceStateUpdate' pour déclencher la duplication de salon.
     * Si un utilisateur rejoint un salon vocal configuré comme "modèle", un nouveau salon
     * est créé avec les mêmes permissions et l'utilisateur y est déplacé.
     */
    bot.on('voiceStateUpdate', async (oldState, newState) => {
        if (!newState.channel || newState.channel.type !== 2) return;

        try {
            const config = bot.modules.VocalDuplicate.guilds;
            const category = newState.channel.parent;
            const guildFind = config.find((guild) => guild.guild === newState.guild.id);
            if (!guildFind) return;

            const guild = bot.guilds.cache.get(guildFind.guild);
            if (!guild) return;

            const channel = guildFind.channels.find((channel) => channel.id === newState.channel.id);
            if (channel) {
                const matchChannels = [];
                guild.channels.cache.forEach((chan) => {
                    if (chan.parent === category && chan.type === 2 && chan.name.startsWith(`${channel.name} #`)) {
                        matchChannels.push(chan);
                    }
                });
                const newChannelName = `${channel.name} #${matchChannels.length}`;

                const newChannel = await guild.channels.create({
                    type: 2,
                    parent: category,
                    name: newChannelName,
                    userLimit: newState.channel.userLimit,
                    permissionOverwrites: newState.channel.permissionOverwrites.cache,
                });

                await newState.setChannel(newChannel);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
};

```
