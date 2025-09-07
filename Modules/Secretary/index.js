const MessageCheckSecretary = require('./MessageCheckSecretary.js');
const ReadyCreateSecretary = require('./ReadyCreateSecretary.js');
const Secretary = require('./Secretary.js');

/**
 * @description Initialise le module Secretary pour un bot.
 * @narrative Ce module gère un système de "secrétariat" pour transférer les messages privés des utilisateurs vers des salons privés sur un serveur, où le staff peut y répondre. Il est composé de plusieurs événements qui gèrent la création des salons, la détection des messages et la logique de transfert.
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 * @returns {object} Un objet contenant les classes du module.
 */
module.exports = (bot) => {
    return {
        MessageCheckSecretary,
        ReadyCreateSecretary,
        Secretary,
    };
};