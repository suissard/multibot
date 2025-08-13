const Event = require('../../Class/Event.js');
const { ChannelType } = require('discord.js');

module.exports = class CheckSecretary extends Event {
    static id = 'checkSecretary';
    static listener = 'messageCreate';

    /**
     * Gère l'événement `messageCreate` pour détecter les messages liés au secrétariat.
     * Si un message est un DM (et n'est pas une commande), il est routé vers le gestionnaire du secrétariat.
     * Si un message est dans un salon de secrétariat, il est également routé.
     * @param {import('discord.js').Message} message - Le message créé.
     */
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
