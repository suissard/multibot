const Event = require('../../Class/Event.js');
const SecretaryManager = require('./SecretaryManager.js');

module.exports = class SecretaryReceived extends Event {
    static id = 'secretaryReceived';
    static listener = 'secretaryReceived';
    static description = 'Gère la réception des messages privés pour le secrétariat.';
    static narrative = "Cet événement est déclenché lorsqu'un utilisateur envoie un MP au bot. Il délègue le traitement au SecretaryManager.";

    async handleEvent(message) {
        // Ensure Manager exists (It should be instantiated in index.js, but check just in case or use bot.secretaryManager)
        if (!this.bot.secretaryManager) {
            // Fallback or Error? index.js handles it.
            // this.bot.secretaryManager = new SecretaryManager(this.bot);
            return console.error("SecretaryManager not initialized!");
        }

        const manager = this.bot.secretaryManager;

        try {
            let freeServ = await manager.checkFreeServ();
            let secretaryChannel = await manager.checkSecretaryChannel(message, freeServ);

            if (!freeServ && !secretaryChannel) {
                for (let i in this.bot.admin) {
                    let admin = this.bot.users.cache.get(this.bot.admin[i]);
                    if (admin) admin.send('Tout vos serveurs de secrétariat sont pleins ! Personnes ne peux envoyer de nouveaux message !');
                }
                throw new Error('Le message n\'a pas pu être envoyé car les servers du secrétariat sont complet !');
            }

            const { embeds, extraContent } = manager.formatSecretaryEmbed(message, 'User', message.author);

            if (this.bot.modules.Secretary.notifKeywords) {
                if (message.content.match(/SOS/g)) {
                    secretaryChannel.send(`<@&${freeServ.idRole}>`);
                }
            }

            await secretaryChannel.send({ content: extraContent, embeds: embeds }).then(sentMsg => {
                manager.emitSocketMessage(message, secretaryChannel.id, sentMsg.id);
                message.react('📩');
                this.bot.log(`${message.author.username} - ${message.content}`, '📥Secretary');

                // Auto-Sort on new message
                const SecretarySortCommand = require('./SecretarySortCommand.js');
                SecretarySortCommand.sort(secretaryChannel.guild).catch(err => console.error("Auto-Sort Check Failed:", err));
            });

        } catch (e) {
            this.bot.error(e, 'SecretaryReceived');
            message.react('❌');
        }
    }
};
