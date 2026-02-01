const { ChannelType, PermissionFlagsBits, EmbedBuilder, Colors } = require('discord.js');
const Discord = require('discord.js');

module.exports = class SecretaryManager {
    constructor(bot) {
        this.bot = bot;
        this.messageLinks = new Map(); // Map<StaffMessageID, UserMessageID>
    }

    formatSecretaryEmbed(messageObject, source, author) {
        let embeds = [];
        let extraContent = '';
        let imageUrls = [];
        let videoUrls = [];

        if (messageObject.attachments && messageObject.attachments.size > 0) {
            for (let [key, value] of messageObject.attachments) {
                const isImage = (value.contentType && value.contentType.startsWith('image/')) ||
                    (!value.contentType && /\.(png|jpe?g|gif|webp)$/i.test(value.name));
                const isVideo = (value.contentType && value.contentType.startsWith('video/')) ||
                    (!value.contentType && /\.(mp4|webm|mov)$/i.test(value.name));

                if (isImage) {
                    imageUrls.push(value.url);
                } else if (isVideo) {
                    videoUrls.push(value.url);
                } else {
                    extraContent += `📁 Fichier: ${value.url}\n`;
                }
            }
        }

        let embed = new EmbedBuilder()
            .setAuthor({
                name: `${author.username} (${source})`,
                iconURL: author.displayAvatarURL()
            })
            .setDescription(messageObject.content || (imageUrls.length > 0 ? "*(Image)*" : "*(Vide)*"))
            .setColor(source === 'User'
                ? (this.bot.modules.Secretary.userEmbedColor || Colors.DarkGrey)
                : (this.bot.modules.Secretary.staffEmbedColor || Colors.Green))
            .setTimestamp();

        if (source === 'User' && this.bot.olympe && this.bot.olympe.users[author.id]) {
            embed.setFooter({
                text: this.getMessageFooterFromUser(this.bot, author) || 'Olympe Profile',
                iconURL: 'https://cdn-icons-png.flaticon.com/512/708/708906.png',
            });
        } else if (source !== 'User') {
            embed.setFooter({
                text: "Message d'organisateur",
                iconURL: this.bot.user ? this.bot.user.displayAvatarURL() : null
            });
        }

        if (imageUrls.length > 0) {
            embed.setImage(imageUrls.shift());
        }

        embeds.push(embed);

        for (let url of imageUrls) {
            let imgEmbed = new EmbedBuilder()
                .setImage(url)
                .setColor(source === 'User'
                    ? (this.bot.modules.Secretary.userEmbedColor || Colors.DarkGrey)
                    : (this.bot.modules.Secretary.staffEmbedColor || Colors.Green));
            embeds.push(imgEmbed);
        }

        if (videoUrls.length > 0) {
            extraContent += videoUrls.join('\n');
        }

        return { embeds, extraContent };
    }

    async emitSocketMessage(originalMessage, channelId, finalId, isStaff = false) {
        if (this.bot.BOTS.API && this.bot.BOTS.API.io) {
            try {
                const api = this.bot.BOTS.API;
                const channel = await this.bot.channels.fetch(channelId).catch(() => null);
                if (!channel) return;

                const messagePayload = {
                    botId: this.bot.id,
                    channelId: channelId,
                    message: {
                        id: finalId,
                        content: originalMessage.content,
                        author: {
                            id: originalMessage.author.id,
                            username: originalMessage.author.username,
                            avatar: originalMessage.author.displayAvatarURL(),
                            bot: originalMessage.author.bot
                        },
                        timestamp: Date.now(),
                        attachments: originalMessage.attachments.map(a => ({ url: a.url, name: a.name, type: a.contentType })),
                        embeds: originalMessage.embeds,
                        isStaff: isStaff
                    }
                };

                // Helper to check perm and emit
                const checkAndEmit = async (userId) => {
                    try {
                        let member = await channel.guild.members.fetch(userId).catch(() => null);
                        if (!member) return;

                        if (channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)) {
                            const socketIds = api.getUserSockets(userId);
                            if (socketIds) {
                                for (const socketId of socketIds) {
                                    api.io.to(socketId).emit('secretaryMessage', messagePayload);
                                }
                                // this.bot.log(`[SOCKET] Sent to user ${userId} (${socketIds.size} sockets)`, 'SecretaryManager');
                            }
                        }
                    } catch (e) {
                        // Ignore individual errors to avoid stopping the loop
                    }
                };

                // Iterate over all connected API users
                if (api.userSockets) {
                    for (const userId of api.userSockets.keys()) {
                        await checkAndEmit(userId);
                    }
                }

                this.bot.log(`[SOCKET] Emitted ${isStaff ? 'Staff' : 'User'} message to ${channelId} (Filtered)`, 'SecretaryManager');
            } catch (e) {
                console.error('[SOCKET] Failed to emit secretary message', e);
            }
        }
    }

    getMessageFooterFromUser(bot, user) {
        try {
            const olympeUserInfo = bot.olympe.users[user.id]
            if (!olympeUserInfo) return undefined;
            let competInfo = '';
            for (let teamName in olympeUserInfo) {
                if (teamName == 'id') continue;
                if (teamName == 'username') continue;
                if (teamName == 'userData') continue;

                let role = olympeUserInfo[teamName].roles;
                competInfo += `+ ${teamName} (${role.join(', ') || 'NoRole'} - ${olympeUserInfo[teamName]?.segmentName || 'No segment'
                    })\n`;
            }
            return `Olympe : ${olympeUserInfo.username}\n${competInfo}\n${(bot.olympe.api && bot.olympe.api.xDomain) || ''
                }/profile/${encodeURIComponent(olympeUserInfo.username)}`;
        } catch (e) {
            return 'Données irrécupérables\n' + e.message;
        }
    }

    async checkFreeServ() {
        for (let i in this.bot.modules.Secretary.secretary) {
            let cacheSize = this.bot.modules.Secretary.secretary[i].guild.channels.cache.size;
            if (cacheSize < 480) return this.bot.modules.Secretary.secretary[i];
        }
        return false;
    }

    async createSecretaryChannel(message, parentChannel, serv) {
        try {
            let dataChannel = [
                {
                    id: serv.guild.id, //droits pour everyone : invisible
                    deny: [PermissionFlagsBits.ViewChannel],
                },
            ];
            if (serv.idRoleAdmin) {
                for (let i in serv.idRoleAdmin) {
                    dataChannel.push({
                        id: serv.idRoleAdmin[i],
                        allow: [PermissionFlagsBits.ViewChannel],
                    });
                }
            }

            let newSecretaryChannel = await serv.guild.channels.create({
                name: `❌${message.author.username}-${message.author.id}`,
                type: ChannelType.GuildText,
                permissionOverwrites: dataChannel,
                reason: 'Nouvelle conversation en mp',
                parent: parentChannel,
            });

            return newSecretaryChannel;
        } catch (e) {
            console.log(e.stack);
            throw e;
        }
    }

    async createSecretaryCategory(allCategorieSize, serv) {
        try {
            let dataChannel = [
                {
                    id: serv.guild.id, //droits pour everyone : invisible
                    deny: [PermissionFlagsBits.ViewChannel],
                },
            ];

            if (serv.idRoleAdmin) {
                for (let i in serv.idRoleAdmin) {
                    dataChannel.push({
                        id: serv.idRoleAdmin[i],
                        allow: [PermissionFlagsBits.ViewChannel],
                    });
                }
            }

            let newSecretaryCategory = await serv.guild.channels.create({
                name: `${serv.name} - ${allCategorieSize}`,
                type: ChannelType.GuildCategory,
                permissionOverwrites: dataChannel,
                reason: 'Nouvelle Categorie de secretariat',
                position: serv.category.position + allCategorieSize + 1,
            });

            return newSecretaryCategory;
        } catch (e) {
            throw new Error('messageprivés/createSecretaryChannel' + e);
        }
    }

    async checkSecretaryCategory(serv) {
        let allCategory = new Map();
        for (let i in this.bot.modules.Secretary.secretary) {
            for (let channel of this.bot.modules.Secretary.secretary[i].guild.channels.cache) {
                let val = channel[1];
                if (val.type == 4)
                    if (val.name.startsWith(this.bot.modules.Secretary.secretary[i].name)) {
                        allCategory.set(val.id, val);
                    }
            }
        }

        let freeCategory;
        for (let category of allCategory) {
            let val = category[1];
            if (val.children.cache.size >= 30 || val.guild != serv.guild) continue;
            if (!freeCategory) freeCategory = val;
            if (val.children.size > freeCategory.children.size) freeCategory = val;
        }
        if (freeCategory) return freeCategory;
        return await this.createSecretaryCategory(allCategory.size, serv);
    }

    async checkSecretaryChannel(message, serv) {
        let secretaryChannel;
        let channels = new Discord.Collection();
        for (let i in this.bot.modules.Secretary.secretary) {
            for (let [id, channel] of this.bot.modules.Secretary.secretary[i].guild.channels
                .cache) {
                channels.set(id, channel);
            }
        }
        channels.find((val) => {
            if (val.name.endsWith(`${message.author.id}`)) {
                secretaryChannel = val;
            }
        });
        if (secretaryChannel) {
            if (secretaryChannel.name.startsWith('❌') == false) {
                secretaryChannel = await secretaryChannel.setName('❌' + secretaryChannel.name.replace(/✅/g, ''));
            }
            return secretaryChannel;
        }
        let parentChannel = await this.checkSecretaryCategory(serv);

        return await this.createSecretaryChannel(message, parentChannel, serv);
    }
    async sendStaffResponse(channel, content, author, attachments = [], originalMessage = null) {
        try {
            var idUser = channel.name.split('-').pop();

            let user = await this.bot.users.fetch(idUser).catch(_ => null);
            if (!user) throw new Error('Impossible d\'acceder à l\'utilisateur');

            if (!content && attachments.length === 0) {
                if (originalMessage) originalMessage.react('❌');
                throw new Error('Cannot send an empty message');
            }

            // 1. Send PLAIN TEXT to User
            let userContent = content;
            // attachments format expectation: array of { attachment: url, name: name }
            // If coming from Discord message attachments, we map them before calling this.

            let sentMessage;
            if (attachments.length > 0) {
                const sentFiles = await user.send({ content: userContent, files: attachments });
                sentMessage = sentFiles;
            } else {
                sentMessage = await user.send({ content: userContent });
            }

            // 2. Format Embed for Staff Channel (Confirmation)
            // Use sentMessage attachments to preserve potential re-hosting? 
            // Actually original implementation used sentMessage.attachments for the embed.

            // Construct a message-like object for formatSecretaryEmbed
            const tempMessage = {
                content: content,
                attachments: sentMessage.attachments, // Collection
                author: author,
                id: originalMessage ? originalMessage.id : Date.now().toString()
            };

            // source is 'Discord' ? Or just not 'User'. 
            // formatSecretaryEmbed logic: if source !== 'User', it adds "Message d'organisateur" footer. All good.
            const { embeds, extraContent } = this.formatSecretaryEmbed(tempMessage, 'Discord', author);

            // 3. Delete Staff Message and Send Embed
            if (originalMessage) await originalMessage.delete().catch(() => { });
            const staffEmbedMessage = await channel.send({ content: extraContent, embeds: embeds });

            // 4. Link Bot Embed -> User Message (For Delete Sync)
            this.messageLinks.set(staffEmbedMessage.id, sentMessage.id);

            // 5. Emit Socket Event for Frontend Update
            // We need to reconstruct a message-like object for emitSocketMessage because it expects a Discord Message object структура
            // or at least something with content, author, attachments. 
            // tempMessage created above is perfect.
            this.emitSocketMessage(tempMessage, channel.id, staffEmbedMessage.id, true);

            this.bot.log(`${author.username} - ${content}`, 'Secretary Answer');

        } catch (e) {
            console.error('SecretaryManager/sendStaffResponse\n' + e.message);
            throw e;
        }
    }
};
