const { EmbedBuilder } = require('discord.js');

/**
 * Une classe wrapper pour `discord.js/EmbedBuilder` afin de fournir une interface personnalisée.
 * @class
 * @todo Cette classe semble réimplémenter une grande partie de l'interface chainable de `EmbedBuilder`.
 * Elle contient également des méthodes dupliquées (`setDescription`, `setThumbnail`) et utilise une méthode
 * dépréciée (`addField` au lieu de `addFields`). Une simplification ou une suppression pourrait être envisagée.
 */
module.exports = class MultiBotMessageEmbed {
    /**
     * @param {string} [title] - Le titre initial de l'embed.
     * @param {string} [description] - La description initiale de l'embed.
     */
    constructor(title, description) {
        this.embed = new EmbedBuilder();
        this.embeds = [this.embed];

        if (title) this.setTitle(title);
        if (description) this.setDescription(description);
        return this;
    }

    setDescription(description) {
        this.embed.setDescription(description);
        return this;
    }

    setThumbnail(thumbnail) {
        this.embed.setThumbnail(thumbnail);
        return this;
    }

    addField(name, value) {
        this.embed.addField(name, value);
        return this;
    }

    setColor(value) {
        this.embed.setColor(value);
        return this;
    }

    setTitle(value) {
        this.embed.setTitle(value);
        return this;
    }

    setURL(value) {
        this.embed.setURL(value);
        return this;
    }

    setAuthor(name, iconURL, url) {
        this.embed.setAuthor({ name, iconURL, url });
        return this;
    }

    setDescription(value) {
        this.embed.setDescription(value);
        return this;
    }

    setThumbnail(value) {
        this.embed.setThumbnail(value);
        return this;
    }

    addFields(name, value, inline) {
        this.embed.addFields({ name, value, inline });
        return this;
    }

    setImage(value) {
        this.embed.setImage(value);
        return this;
    }

    setTimestamp() {
        this.embed.setTimestamp();
        return this;
    }

    setFooter(text, iconURL) {
        this.embed.setFooter({ text, iconURL });
        return this;
    }
};
