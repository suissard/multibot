const fetch = require('node-fetch');

class WebHook {
    constructor(postURL) {
        this.postURL = postURL;
    }

    async getInfo() {
        return await fetch(this.postURL).then(async (res) => {
            return await res.json();
        });
    }

    async send(data) {
        var options = {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data),
        };
        return await fetch(this.postURL, options);
    }

    sendMessage(content) {
        return this.send({ 'content': content });
    }

    sendEmbed(title, description) {
        return this.send({ embeds: [{ title, description }] });
    }
}

//EXEMPLE : WebHook relié au salon "inscription" du discord "GeekingTime"
// let inscription = new WebHook("https://discord.com/api/webhooks/737714272540426310/Ano04LUlAIA8Q0hgVyvRLl1deD4QBHR13IocJHAzLI6pU1FOFm-V2x0e11oxaylGmBz3")
// inscription.send('test de message')

module.exports = WebHook;