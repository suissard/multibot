const Event = require('../../Class/Event.js');
const SecretaryManager = require('./SecretaryManager.js');

module.exports = class SecretaryMessageDelete extends Event {
    static id = 'secretaryMessageDelete';
    static listener = 'messageDelete';
    static description = 'Synchronise la suppression des messages du secrétariat.';
    static narrative = "Cet événement surveille les suppressions de messages pour supprimer les DMs correspondants via le SecretaryManager.";

    async handleEvent(message) {
        if (!this.bot.secretaryManager) return;
        const manager = this.bot.secretaryManager;

        try {
            if (!message.partial && manager.messageLinks.has(message.id)) {
                if (message.author && message.author.bot) return;
                const userMessageId = manager.messageLinks.get(message.id);
                if (message.channel && message.channel.name) {
                    const idUser = message.channel.name.split('-').pop();
                    const user = await this.bot.users.fetch(idUser).catch(() => null);
                    if (user) {
                        const dm = user.dmChannel || await user.createDM();
                        const userMsg = await dm.messages.fetch(userMessageId).catch(() => null);
                        if (userMsg) {
                            await userMsg.delete();
                            manager.messageLinks.delete(message.id);
                            message.channel.send("🗑️ Message supprimé chez l'utilisateur également.").then(m => setTimeout(() => m.delete(), 3000));
                            console.log(`[Secretary] Synced delete for message ${message.id} -> ${userMessageId}`);
                        }
                    }
                }
            }
        } catch (e) {
            console.error('[Secretary] Error handling message delete:', e);
        }
    }
};
