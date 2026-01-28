const Event = require('../../Class/Event.js');
const SecretaryManager = require('./SecretaryManager.js');

module.exports = class SecretaryMessageUpdate extends Event {
    static id = 'secretaryMessageUpdate';
    static listener = 'messageUpdate';
    static description = 'Synchronise l\'édition des messages du secrétariat.';
    static narrative = "Cet événement surveille les modifications de messages pour mettre à jour les DMs correspondants via le SecretaryManager.";

    async handleEvent(oldMessage, newMessage) {
        if (!this.bot.secretaryManager) return;
        const manager = this.bot.secretaryManager;

        try {
            if (newMessage.partial) await newMessage.fetch();
            if (newMessage.author.bot) return;
            if (manager.messageLinks.has(newMessage.id)) {
                const userMessageId = manager.messageLinks.get(newMessage.id);
                if (newMessage.channel && newMessage.channel.name) {
                    const idUser = newMessage.channel.name.split('-').pop();
                    const user = await this.bot.users.fetch(idUser).catch(() => null);
                    if (user) {
                        const dm = user.dmChannel || await user.createDM();
                        const userMsg = await dm.messages.fetch(userMessageId).catch(() => null);
                        if (userMsg) {
                            const { embeds, extraContent } = manager.formatSecretaryEmbed(newMessage, 'Discord', newMessage.author);
                            await userMsg.edit({ content: extraContent, embeds: embeds });
                            await newMessage.react('📝');
                            this.bot.log(`Synced edit for message ${newMessage.id} -> ${userMessageId}`, "Secretary");
                        }
                    }
                }
            }
        } catch (e) {
            console.error('[Secretary] Error handling message update:', e);
        }
    }
};
