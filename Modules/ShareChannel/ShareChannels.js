const Discord = require('discord.js');
const MultiBotMessageEmbed = require('../../Tools/MultiBotMessageEmbed');
const BOTS = require('../../Class/BOTS.js');
const DATAS = require('../../Class/DataBase');

const ShareMessage = require('./ShareMessage.js');

/**
 * Représente un groupe de salons partagés.
 * Gère la configuration (jeu, catégorie, pattern), la liste des salons,
 * et la logique de partage des messages entre eux.
 * @class
 */
class ShareChannels {
    /**
     * @param {object} data - Les données de configuration pour le groupe de salons partagés.
     * @param {string} data.id - L'identifiant unique du groupe (ex: "overwatch-scrim").
     * @param {string} data.game - Le jeu associé.
     * @param {string} data.categorie - La catégorie du partage.
     * @param {string} data.pattern - L'expression régulière pour valider les messages à partager.
     * @param {Array<string>} [data.channels=[]] - Une liste d'IDs de salons à inclure initialement.
     */
    constructor(data) {
        if (data.game) this.game = data.game;
        //jeu du salon
        else throw new Error(`Une name doit etre déclaré`);

        if (data.categorie) this.categorie = data.categorie;
        //categorie du salon
        else throw new Error(`Une categorie doit etre déclaré`);

        if (data.pattern) this.pattern = new RegExp(data.pattern, 'i');
        //pattern validant les messages
        else throw new Error(`Un pattern doit etre déclaré`);

        this.id = data.id;
        // data.blackListUsers ? this.blackListUsers = data.blackListUsers : this.blackListUsers = []

        BOTS.ShareChannels.set(this.id, this);

        this._channels = [];
        this._messages = new Map();
        this.setChannels(data.channels ? data.channels : []);
        // this.setMessages(data.messages ? data.messages :  []);
    }

    /**
     * Ajouter un message comme ayant été partagé
     * @param {Discord.Message} message le message discord qui a été partagé
     * @returns {ShareMessage} le message partagée au format shareMessage
     */
    addMessage(message) {
        let sharemessage = new ShareMessage(message, this.game, this.categorie);
        this._messages.set(message.id, sharemessage);
        return sharemessage;
        // if (this._messages.size > 10000) this._messages.delete(this._messages.keys().next().value)
    }

    /**
     * Recuperer une message de la collection
     * @param {String} id Par convention, l'identifiant discord de l'auteur du message
     * @returns {ShareMessage} le message partagée au format shareMessage
     */
    getMessage(id) {
        return this._messages.get(id);
    }

    /**
     * Supprimer une message de la collection
     * @param {String} id Par convention, l'identifiant discord de l'auteur du message
     * @returns {ShareMessage} le message partagée au format shareMessage
     */
    deleteMessage(id) {
        return this._messages.delete(id);
    }

    /**
     * Initialise la collection de messages partagés.
     * (Note: Cette fonction semble boguée ou inachevée, elle itère sur `this._messages`
     * qui est déjà une Map et tente de la reconstruire).
     * @returns {Promise<Map<string, ShareMessage>>} La collection de messages initialisée.
     */
    async setMessages() {
        let messages = new Map();
        for (let i in this._messages) {
            let [channelId, messageId] = this._messages[i].split('-');
            let message = await BOTS.get('1')
                .channels.cache.get(channelId)
                .messages.fetch(messageId).catch(_ => null);
            messages.set(
                `${message.channel.id}-${message.id}`,
                new ShareMessage(message, this._channels, this.game, this.categorie),
            );
        }
        return (this._messages = messages);
    }

    /**
     * Ajouter un channel dans la liste de partage
     * @param {Discord.Message} message le message discord qui a été partagé
     * @returns {Discord.Channel} le channel qui a été ajouté
     */
    addChannel(channel, game, categorie) {
        let index;
        BOTS.ShareChannels.get('all').set(channel.id, this);

        index = this._channels.findIndex((value) => value.id == channel.id);
        if (index == -1) {
            this._channels.push(channel);
            if (
                !DATAS.collections.sharechannels.cache.find(
                    (chan) => chan.channel?.Channel == channel.id,
                )
            )
                this.saveNewChannel(channel);
        } else this._channels[index] = channel;
        return channel;
    }

    /**
     * Enregistre un nouveau salon dans la base de données.
     * @param {import('discord.js').TextChannel} channel - Le salon à enregistrer.
     */
    saveNewChannel(channel) {
        let [game, categorie] = this.id.split('-');
        let data = {
            game,
            categorie,
            receive: true,
            share: true,
            guild: { Guild: channel.guild.id },
            channel: { Channel: channel.id },
        };
        DATAS.collections.sharechannels.create(data);
    }

    /**
     * Supprimer une channel de la collection
     * @param {String} id Par convention, l'identifiant discord du channel
     */
    deleteChannel(id) {
        BOTS.ShareChannels.get('all').delete(id);
        if (this._channels.find((channel) => channel.id == id))
            this._channels.splice(
                this._channels.findIndex((value) => value.id == id),
                1,
            );
    }

    /**
     * Initialise la liste des salons pour ce groupe de partage.
     * @param {Array<string>} channels - Une liste d'IDs de salons.
     * @returns {Promise<Array<import('discord.js').TextChannel>>} La liste des objets Channel initialisés.
     */
    async setChannels(channels) {
        let i = channels.length;

        while (i--) {
            let channelId = channels[i],
                { channel } = (await BOTS.getMasterBot(undefined, channelId)) || {};

            if (channel) this.addChannel(channel);
        }
        return this._channels;
    }

    /**
     * Function de prise en charge des messages
     * @param {Discord.message} message
     */
    handleMessage(message) {
        try {
            if (message.content.startsWith(message.client.prefix) || message.author.bot) return;
            if (!message.content.match(this.pattern)) return;
            if (!this.checkAuthor(message)) return;
            // console.log(
            // 	`ShareChannels ${message.guild.name}>${message.channel.name} (${message.channel.id}) => ${message.author.tag} : ${message.content}`
            // );
            // if (message.guild.memberCount < 100) throw new Error("Ce serveur accueil moins de 100 membres et ne fais que recevoir les annonces")
            this.sendEmbed(message);
        } catch (e) {
            message.channel
                .send(':x: ' + e.message)
                .then((msg) => msg.delete({ timeout: 8000 }))
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    /**
     * Permet d'obtenir els info du channela renvoier a l'utilisateur
     * @returns {String} message d'information sur le channel
     */
    channelInfo() {
        return `**Info sur le channel : **\n\`\`\`Jeu : ${this.game}\nCatégorie : ${this.categorie}\nChannels reliés : ${this._channels.length}\`\`\``;
    }

    /**
     * Renvoie un embed sur le modele du message fournit
     * @param {Discord.Message} message
     * @returns {MultiBotMessageEmbed} message au format embed
     */
    async createEmbed(message) {
        let invites = await message.channel.fetchInvites();
        let invite = invites.find((value) => value.inviter.id == message.client.user.id);
        if (!invite)
            invite = await message.channel.createInvite({
                maxAge: 0,
                reason: 'Invitation creer pour le channel partagé',
            });

        var embed = new MultiBotMessageEmbed()
            .setDescription(
                `<@${message.author.id}>*(${message.author.tag})* sur [${message.guild.name}](https://discord.gg/${invite.code})` +
                '\n\n> ' +
                `${message.content}`,
            )
            .setThumbnail(message.author.avatarURL());

        if (message.attachments.first()) embed.setImage(message.attachments.first().url);
        return embed;
    }

    /**
     * Verification des message précedent de l'auteur et qu'il respecte les usages du partage
     * @param {Discord.Message} message
     * @returns {Boolean} "true" si l'utilisateur respect les usage ou "false" si ce n'est pas le cas
     */
    checkAuthor(message) {
        if (!this._messages.has(message.author.id)) return true;

        let lastShareMessage = this._messages.get(message.author.id);
        if (Date.now() - lastShareMessage.timestamp <= 10000) return false;
        if (
            Date.now() - lastShareMessage.timestamp <= 21600000 &&
            message.content == lastShareMessage.message.content
        )
            throw new Error(
                `Tu as déjà partagé le même message sur le réseaux, il y a moins de 6 heures\n> ${lastShareMessage.content}`,
            );
        if (Date.now() - lastShareMessage.timestamp <= 3600000)
            throw new Error(
                `Tu as déjà partagé un message sur le réseaux, il y a moins de 60 minutes\n> ${lastShareMessage.content}`,
            );

        return true;
    }

    /**
     * Envoie le embed dans les differents salons partagées
     * @param {Discord.Message} message
     */
    async sendEmbed(message) {
        let shareMessage = this.addMessage(message);
        let embed = await this.createEmbed(message);

        for (var channel of this._channels) {
            try {
                if (message.channel.id === channel.id) continue; // ne pas envoyer dans la meme channel qui a envoyé le message
                channel
                    .send(embed)
                    .then((msg) => shareMessage.addTarget(msg))
                    .catch((err) => {
                        if (err.message == 'Missing Access')
                            console.error(
                                `Pas d'acces au channel ${channel.guild.name}/${channel.name} (${channel.id})`,
                            );
                        else
                            console.error(
                                `ShareChannel ${this.id}`,
                                `Erreur d'envoi pour le channel ${channel.guild.name}/${channel.name} (${channel.id})\n` +
                                err.stack,
                            );
                    });
            } catch (e) {
                console.error(`ShareChannel ${this.id}`, `Erreur majeur\n` + err.stack);
            }
        }
        // Confirmation pour l'utilisateur que son message a été diffusé
        message.react('🌐');
        let confirmEmbed = await this.createConfirmEmbed(message);
        message.channel
            .send(confirmEmbed)
            .then((msg) => setTimeout(() => msg.delete(), 20000))
            .catch(console.error);
    }

    /**
     * Renvoie un embed sur le modele du message fournit
     * @param {Discord.Message} message
     * @returns {MultiBotMessageEmbed} message au format embed
     */
    createConfirmEmbed(message) {
        return new MultiBotMessageEmbed()
            .setDescription(
                `Ton annonce a été publié dans **${
                    this._channels.length - 1
                    // } autres channels**.\n\nParticipez à la Dragons LAN 2024 les 24-25 Août ! Rendez-vous à l'Alsace Esport Arena de Strasbourg.\nPlus d'informations : [[Annonce Officielle]](<https://x.com/dragons__esport/status/1805164895253471313>)`
                    // } autres channels**.\n\nLa finale du Championnat de France d’Overwatch arrive le **4 et 5 mai**, prend vite ta place et joins toi à la fête.\n👉 **Infos & billets :** [playallforone.com > event](https://www.playallforone.com/event)`
                } autres channels**.\n[=> Invite GetiBot](https://discord.com/oauth2/authorize?client_id=357980843001511937)`,
            )
            .setThumbnail(message.client.user.avatarURL());
    }
}

module.exports = ShareChannels;
