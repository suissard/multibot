const Command = require('../Class/Command.js');
const fetch = require('node-fetch');

module.exports = class TicketDev extends Command {
    static id = 'ticketdev';
    static description = 'Envoie une demande de ticket au développeur.';
    static arguments = [
        {
            type: 'STRING',
            name: 'message',
            description: 'Le contenu du ticket',
            required: true
        }
    ];

    async methode(args) {
        const { interaction, message } = args;

        // Defer reply immediately since the webhook might take time
        await interaction.deferReply();

        try {
            const webhookUrl = 'https://n8n.clavier.dev:5678/webhook-test/9f8efa2e-e76e-43c6-aea2-404ae8fad17c';

            const response = await fetch(webhookUrl, {
                method: 'POST',
                body: JSON.stringify({
                    message: message,
                    user: interaction.user.tag,
                    userId: interaction.user.id,
                    guild: interaction.guild?.name,
                    guildId: interaction.guild?.id
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
            }

            // The user requested to send back the response from the webhook (which is JSON)
            let responseData;
            try {
                responseData = await response.json();
            } catch (jsonError) {
                // Fallback if not JSON
                responseData = await response.text();
            }

            // Determine what to show
            let replyContent = '';
            if (typeof responseData === 'object' && responseData !== null) {
                // If it has a 'message' or 'content' field, prioritize that
                if (responseData.message) replyContent = String(responseData.message);
                else if (responseData.content) replyContent = String(responseData.content);
                else replyContent = JSON.stringify(responseData, null, 2);
            } else {
                replyContent = String(responseData);
            }

            // Ensure we don't exceed Discord's message length limit
            if (replyContent.length > 1900) {
                replyContent = replyContent.substring(0, 1900) + '...';
            }

            await interaction.editReply({ content: replyContent });

        } catch (error) {
            console.error('Error in ticketdev command:', error);
            await interaction.editReply({ content: `❌ Une erreur est survenue lors de l'envoi du ticket : ${error.message}` });
        }
    }
};
