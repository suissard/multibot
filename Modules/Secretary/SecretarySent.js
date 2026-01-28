const Event = require('../../Class/Event.js');
const SecretaryManager = require('./SecretaryManager.js');

module.exports = class SecretarySent extends Event {
    static id = 'secretarySent';
    static listener = 'secretarySent';
    static description = 'Gère l\'envoi de messages depuis le secrétariat.';
    static narrative = "Cet événement est déclenché lorsque le staff répond dans un salon de secrétariat. Il délègue le traitement au SecretaryManager.";

    async handleEvent(message) {
        if (!this.bot.secretaryManager) {
            return console.error("SecretaryManager not initialized!");
        }

        if (!message.content.toLowerCase().startsWith('msg')) return;

        await this.answer(message);
    }

    /**
     * Envoie la réponse à l'utilisateur
     * @param {import('discord.js').Message} message 
     */
    async answer(message) {
        if (!message.channel) return;
        const manager = this.bot.secretaryManager;
        const cleanContent = message.content.replace(/^msg\s*/i, '').trim();

        // Map attachments to expected format { attachment: url, name: name }
        const files = Array.from(message.attachments.values()).map(a => ({
            attachment: a.url,
            name: a.name
        }));

        await manager.sendStaffResponse(message.channel, cleanContent, message.author, files, message);
    }
};
