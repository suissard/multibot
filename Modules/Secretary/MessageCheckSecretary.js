const Event = require('../../Class/Event.js');
const { ChannelType } = require('discord.js');

module.exports = class CheckSecretary extends Event {
    static id = 'checkSecretary';
    static listener = 'messageCreate';

    handleEvent(message) {
        try {
            // detecter message de secretariat
            if (!this.bot.modules.Secretary.secretary || message.author.bot) return;
            if (message.channel.type == ChannelType.DM && !message.content.startsWith(this.bot.prefix)) //message privé a destination du secretariat
                return this.bot.emit('secretary', message, true);
            if (this.bot.modules.Secretary.secretary.find(x => x.guild.id == message.guild.id) && message.channel.name.match(/.+\-[0-9]+$/))
                return this.bot.emit('secretary', message, false);
        } catch (err) {
            this.handleError(err);
        }
    }
};
