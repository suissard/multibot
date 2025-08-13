const fetch = require('node-fetch');

class WebHook {
    /**
     * Crée une nouvelle instance de WebHook.
     * @param {string} postURL - L'URL du webhook Discord.
     */
    constructor(postURL) {
        this.postURL = postURL;
    }

    /**
     * Récupère les informations sur le webhook.
     * @returns {Promise<object>} Un objet contenant les informations du webhook.
     */
    async getInfo() {
        return await fetch(this.postURL).then(async (res) => {
            return await res.json();
        });
    }

    /**
     * Envoie des données brutes au webhook.
     * @param {object} data - Le payload à envoyer au webhook.
     * @returns {Promise<Response>} La réponse de l'API Discord.
     */
    async send(data) {
        var options = {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data),
        };
        return await fetch(this.postURL, options);
    }

    /**
     * Envoie un message simple au webhook.
     * @param {string} content - Le contenu du message à envoyer.
     * @returns {Promise<Response>} La réponse de l'API Discord.
     */
    sendMessage(content) {
        return this.send({ 'content': content });
    }

    /**
     * Envoie un message "embed" simple au webhook.
     * @param {string} title - Le titre de l'embed.
     * @param {string} description - La description de l'embed.
     * @returns {Promise<Response>} La réponse de l'API Discord.
     */
    sendEmbed(title, description) {
        return this.send({ embeds: [{ title, description }] });
    }
}

//EXEMPLE : WebHook relié au salon "inscription" du discord "GeekingTime"
// let inscription = new WebHook("https://discord.com/api/webhooks/737714272540426310/Ano04LUlAIA8Q0hgVyvRLl1deD4QBHR13IocJHAzLI6pU1FOFm-V2x0e11oxaylGmBz3")
// inscription.send('test de message')

module.exports = WebHook;