const Discord = require('discord.js');
const BOTS = require('../../Class/BOTS.js');

/**
 * Message partagé, avec ses données pour l'identifier et les cibles ouù ont été envoyé les messages
 */
class ShareMessage {
    constructor(message, game, categorie) {
        this.message = message;
        this.id = message.id;
        this.channel = message.channel;
        this.guild = message.guild;
        this.timestamp = message.createdTimestamp;
        this.diffusion = new Map(); //channelId : messageId

        this.game = game;
        this.categorie = categorie;
        this.infos = this.extractInfo();
    }

    /**
     * Recupère via des patterns, les informations contenus dans le message
     * @returns {Object} Renvoie les infos
     */
    extractInfo() {
        let elo = this.message.content.match(/[0-4]([0-9]{3}|k[0-9]{0,1})/i);
        let date = this.message.content.match(
            /(now)|(tonight)|(tomorrow)|(lundi)|(mardi)|(mercredi)|(jeudi)|(vendredi)|(samedi)|(dimanche)|(monday)|(thursday)|(wednesday)|(thursday)|(friday)|(saturday)|(sunday)/i,
        );
        let heure = this.message.content.match(
            /(([1-2])[0-9]{1})(:|h)[0-9]{0,2}( {0,1}(am|pm))*/i,
        );
        let fuseau = this.message.content.match(/c{0,1}est/i);
        let server = this.message.content.match(/(eu)|(na)|(ch)/i);

        elo ? (elo = elo[0]) : (elo = undefined);
        date ? (date = date[0]) : (date = undefined);
        heure ? (heure = heure[0]) : (heure = undefined);
        fuseau ? (fuseau = fuseau[0]) : (fuseau = undefined);
        server ? (server = server[0]) : (server = undefined);

        return { elo, date, heure, fuseau, server };
    }

    /**
     * Ajouter une cible atteinte lors de la diffusion du message
     * @param {Discord.Message} message
     */
    addTarget(message) {
        return this.diffusion.set(message.channel.id, message);
    }

    /**
     * Supprime les cibles atteintes lors de la diffusion du message
     */
    async resetTargets() {
        let shareChannel = BOTS.ShareChannels.get('all').get(this.message.channel.id);
        shareChannel.deleteMessage(this.message.author.id);
        for (let target of this.diffusion) await target[1].delete();
    }

    /**
     * Pour mettre a jour tout les messages qui ont été partagé
     * @param {String} content
     * @returns
     */
    async updateTarget(content) {
        let shareChannel = BOTS.ShareChannels.get('all').get(this.message.channel.id);
        if (!content.match(shareChannel.pattern)) return this.message.react('❌');
        let embed = await shareChannel.createEmbed(this.message);
        embed.embed.data.description = embed.embed.data.description.replace(/\/n\/n.*/, '/n/n>' + content);
        for (let target of this.diffusion) await target[1].edit(embed);
        this.message.react('🔄');
    }

    /**
     * Verifier les abus de diffusion et stock l'objet message en fonction de l'id de l'auteur initial du message
     * @param {Discord.Message} message
     * @returns
     */
    checkShareMessage(message) {
        if (
            this.categorie == 'allforone' ||
            this.categorie == 'geti' /*|| bot.devBoss(message.author.id)*/
        )
            return true; //decsactive le filtere allforone

        let lastShareMessage = BOTS.ShareChannels.get(
            this.categorie + '-' + this.game,
        ).getMessage(this.author.id);
        if (!lastShareMessage) return true;

        // Si le dernier message a été publié il y a moins de 6 heures et a le meme contenu
        if (
            Date.now() - lastShareMessage.timestamp <= 21600000 &&
            message.content == lastShareMessage.message.content
        ) {
            message.delete({ timeout: 8000 });
            throw new Error(
                `Tu as déjà partagé le même message sur le réseaux, il y a moins de 6 heures`,
            );
        }

        if (Date.now() - lastShareMessage.timestamp <= 3600000)
            throw new Error(
                `Tu as déjà partagé un message sur le réseaux, il y a moins de 1 heure`,
            );
        return true;
    }
}


module.exports = ShareMessage;
