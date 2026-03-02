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

                // AI Suggestion
                if (this.bot.modules.Secretary.aiSuggestionEnabled) {
                    this.bot.log(`Requête envoyée à l'IA pour ${message.author.username}`, '🤖 IA Suggestion');
                    fetch('https://n8n.clavier.dev/webhook/1c5f9a43-3440-40ad-8bb6-4386f921d6c7', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sessionId: message.author.id,
                            text: message.content
                        })
                    })
                        .then(res => res.text())
                        .then(async text => {
                            let suggestion = text;
                            try {
                                const parsed = JSON.parse(text);
                                // Obtenir la suggestion depuis les formats courants de webhook
                                suggestion = parsed.suggestion || parsed.text || parsed.reply || ((parsed.output && typeof parsed.output === 'string') ? parsed.output : text);
                            } catch (e) {
                                // C'est probablement du texte brut (ou l'erreur 404 de n8n par exemple)
                            }

                            if (suggestion && suggestion.trim().length > 0) {
                                const { EmbedBuilder } = require('discord.js');
                                const aiEmbed = new EmbedBuilder()
                                    .setAuthor({ name: 'Suggestion d\'IA', iconURL: 'https://cdn-icons-png.flaticon.com/512/2040/2040946.png' })
                                    .setDescription(`Copiez-collez ce texte pour répondre :\n\`\`\`text\n${suggestion}\n\`\`\``)
                                    .setColor('Orange');
                                await secretaryChannel.send({ embeds: [aiEmbed] });
                            }
                        })
                        .catch(err => {
                            console.error('Erreur lors de la requête Webhook IA :', err);
                        });
                }
            });

        } catch (e) {
            this.bot.error(e, 'SecretaryReceived');
            message.react('❌');
        }
    }
};
