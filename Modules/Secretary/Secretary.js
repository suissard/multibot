const Event = require('../../Class/Event.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');
const { Colors } = require('discord.js');

module.exports = class Secretary extends Event {
    static id = 'secretary';
    static listener = 'secretary';

    handleEvent(message, isDm) {
        try {
            if (!isDm) {
                this.handleMsgFromSecretaryGuild(message);
            } else this.handleDm(message);
        } catch (err) {
            this.handleError(err);
        }
    }

    async handleDm(message) {
        try {
            let freeServ = await this.checkFreeServ();
            let secretaryChannel = await this.checkSecretaryChannel(message, freeServ);

            if (!freeServ && !secretaryChannel) {
                for (let i in this.bot.admin) {
                    let admin = this.bot.users.cache.get(this.bot.admin[i]);
                    admin.send(
                        'Tout vos serveurs de secrétariat sont pleins ! Personnes ne peux envoyer de nouveaux message !',
                    );
                }
                new Error(
                    'Le message n\'a pas pu être envoyé car les servers du secrétariat sont complet !',
                );
            }
            let videoUrl = []
            let imageUrl = []
            let badFile = 0

            if (message.fromCommandMessage) {
                let embed = new Discord.EmbedBuilder()
                    .setTitle(this.bot.name)
                    .setDescription(message.content)
                    .setThumbnail(message.botAvatar)
                    .setColor(Colors.DarkGrey);
                if (message.attachments.first()) {
                    embed.setImage(message.attachments.first().url);
                }
                secretaryChannel.send({ embeds: [embed] });
            } else {
                let embeds = [];
                if (message.attachments.size > 0) {
                    for (let [key, value] of message.attachments) {
                        if (value.contentType.startsWith('image/')) {
                            imageUrl.push(value.url)
                        } else if (value.contentType.startsWith('video/')) {
                            videoUrl.push(value.url)
                        } else {
                            message.channel.send(`Le format du fichier **__${value.name}__** n'est pas pris en charge`)
                            message.react('❗');
                            badFile++;
                        }
                    }
                }

                let embed = new Discord.EmbedBuilder();
                if (badFile > 0 && message.content == '' && imageUrl.length == 0 && videoUrl.length == 0) {
                    throw Error('Aucun message ou fichier valide n\'a été envoyé')
                }
                if (message.content == '') {
                    embed
                        .setTitle(message.author.tag)
                        .setThumbnail(message.author.avatarURL())
                        .setColor(Colors.DarkGrey);
                        if (videoUrl.length > 0) {
                            embed.setDescription("Des vidéos ou des images ont été envoyées, veuillez les consulter ci-dessous")
                        }
                } else {
                    embed
                        .setTitle(message.author.tag)
                        .setDescription(message.content)
                        .setThumbnail(message.author.avatarURL())
                        .setColor(Colors.DarkGrey);
                }
                if (this.bot.modules.Secretary.notifKeywords) {
                    if (message.content.match(/SOS/g)) {
                        secretaryChannel.send(`<@&${freeServ.idRole}>`);
                    }
                }
                if (imageUrl.length > 0) {
                    let url = imageUrl.shift()
                    embed.setImage(url);
                }

                if (this.bot.olympe && this.bot.olympe.users[message.author.id])
                    embed.setFooter({
                        text: this.getMessageFooterFromUser(this.bot, message.author),
                        iconURL: 'https://playallforone.com/assets/OA_2021_LOGO_FavIcon_V01.png',
                    }); //signature avec les données AFO
                embeds.unshift(embed);

                if (imageUrl.length > 0) {
                    for (let url of imageUrl) {
                        let embed = new Discord.EmbedBuilder()
                            .setImage(url)
                            .setColor(Colors.DarkGrey);
                        embeds.push(embed);
                    }
                }
                secretaryChannel.send({ embeds });
                if (videoUrl.length > 0) {
                    let i = 0
                    for (let url of videoUrl) {
                        i++;
                        secretaryChannel.send(`Vidéo ${i}: ${url}`)
                    }
                }
                console.log(
                    `📥[${this.bot.name}] Secretary : ${message.author.username} - ${message.content}`,
                );
                message.react('📩');
            }
        } catch (e) {
            console.log('Reception d\'un mp', e.stack);
            message.react('❌');
        }
    }

    handleMsgFromSecretaryGuild(message) {
        if (!message.content.toLowerCase().startsWith('msg')) return;
        this.answer(message);
        console.log(
            `📤[${this.bot.id}] Secretary : ${message.author.username} - ${message.content}`,
        );
        return;
    }

    /**
     * Renvoie des informations sur un utilisateur et la compétition.
     * La logique etant que tout utilisateur chargé dans le systeme a vus ses données
     * enrichie d'une entrée "competition" qui contient tout ce qu'il faut savoir sur
     * l'utilisateur. Si il n'y a pas cette entrée, la fonction renvera undefined
     * TODO Pourrait nécessiter l'affichage de multiples competitions
     * @param {Discord.User} user
     * @returns {String} AFO TeamName (Role - Segment - Pool)\nTeamName (Role - Segment - Pool)\n
     */
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
                competInfo += `+ ${teamName} (${role.join(', ') || 'NoRole'} - ${
                    olympeUserInfo[teamName]?.segmentName || 'No segment'
                // } - ${
                //     olympeUserInfo[teamName]?.poolName || 'No pool'
                })\n`;
            }
            return `AFO : ${olympeUserInfo.username}\n${competInfo}\n${
                bot.olympe.api.xDomain
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
                    deny: ['ViewChannel'],
                },
            ];
            if (serv.idRoleAdmin) {
                for (let i in serv.idRoleAdmin) {
                    dataChannel.push({
                        id: serv.idRoleAdmin[i],
                        allow: ['ViewChannel'],
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
                    deny: ['ViewChannel'],
                },
            ];

            if (serv.idRoleAdmin) {
                for (let i in serv.idRoleAdmin) {
                    dataChannel.push({
                        id: serv.idRoleAdmin[i],
                        allow: ['ViewChannel'],
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

    /**
     * Verifie si une categorie existe et renvoie l'objet channel existant ou en créer un
     * @param {*} message objet message initiateur de la commande
     */
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

    /**
     * Verifie si un channel existe et renvoie l'objet channel existant ou en créer un
     * @param {*} message objet message initiateur de la commande
     */
    async checkSecretaryChannel(message, serv) {
        // try {
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
                secretaryChannel.setName('❌' + secretaryChannel.name.replace(/✅/g, ''));
            }
            return secretaryChannel;
        }
        let parentChannel = await this.checkSecretaryCategory(serv);

        return await this.createSecretaryChannel(message, parentChannel, serv);
    }

    /**
     * Fonction pour repondre depuis un channel de secretatriat
     * @param {Discord.Message} message
     */
    async answer(message) {
        try {
            var idUser = message.channel.name.split('-').pop();

            if (message.attachments.first()) {
                let user = this.bot.users.cache.get(idUser);
                if (!user) user = await this.bot.users.fetch(idUser).catch(_ => null);
                let messageToSend = message.content.replace(/msg/i, '');
                if (messageToSend != '') await user.send(messageToSend);
                for (let [key, value] of message.attachments) {
                    await user.send(value.url);
                }
            } else {
                let user = this.bot.users.cache.get(idUser);
                if (!user) user = await this.bot.users.fetch(idUser).catch(_ => null);
                if (user) {
                    let messageToSend = message.content.replace(/msg/i, '');
                    if (messageToSend != '') await user.send(messageToSend);
                    else {
                        message.react('❌');
                        message.reply('Cannot send an empty message');
                        throw new Error('Impossible d\'envoyer un message vide');
                    }
                } else throw new Error('impossible d\'acceder au mp de l\'utilisateur');
            }

            //! l'image ne s'affiche pas
            // let embeds = [];
            // let embed = new Discord.EmbedBuilder()
            //     .setTitle(message.author.tag)
            //     .setThumbnail(message.author.avatarURL())
            //     .setColor(Colors.White);
            // let messageToSend = message.content.replace(/msg/i, '');
            // if (messageToSend != '') embed.setDescription(messageToSend);
            // if (message.attachments.first()) {
            //     let url = message.attachments.first().url;
            //     console.log(url);
            //     embed.setImage(url);
            // }
            // embeds.push(embed);

            // await message.channel.send({ embeds });
            await message.reply('Message envoyé !');
            // await message.delete().catch(console.error);
        } catch (e) {
            this.handleError('MessagePrivés/answer\n' + e, message.channel);
            message.react('❌');
        }
    }
};
