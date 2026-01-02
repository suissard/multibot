const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

let botReady = 0;

module.exports = class BotsReady extends Event {
    static id = 'botsReady';
    static listener = 'clientReady';
    static description = 'Détermine quand tous les bots sont prêts et émet un événement global.';
    static narrative = "Cet événement écoute l'événement `clientReady` de chaque bot. Il incrémente un compteur et, une fois que tous les bots sont prêts, il émet un événement `botsReady` sur le `BotManager` pour signaler que le système est pleinement opérationnel.";

    /**
     * Gère l'événement 'clientReady' de chaque bot pour déterminer quand tous les bots sont prêts.
     * Incrémente un compteur à chaque fois qu'un bot est prêt. Lorsque tous les bots
     * sont prêts, émet un événement global 'botsReady' sur le BotManager.
     */
    handleEvent() {
        try {
            botReady++;
            if (botReady == BOTS.size) BOTS.event.emit('botsReady');
        } catch (err) {
            this.handleError(err);
        }
    }
};
