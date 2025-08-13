const { EmbedBuilder } = require('discord.js');

module.exports = class MultiBotMessageEmbed {
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
