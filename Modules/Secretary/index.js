const MessageCheckSecretary = require('./MessageCheckSecretary.js');
const ReadyCreateSecretary = require('./ReadyCreateSecretary.js');
const SecretaryReceived = require('./SecretaryReceived.js');
const SecretarySent = require('./SecretarySent.js');
const SecretaryMessageUpdate = require('./SecretaryMessageUpdate.js');
const SecretaryMessageDelete = require('./SecretaryMessageDelete.js');
const BackupSecretaryCommand = require('./BackupSecretaryCommand.js');
const SecretaryManager = require('./SecretaryManager.js');

/**
 * Le module "Secretary" met en place un système de support par message privé.
 * ...
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 * @returns {object} Un objet contenant les classes du module.
 */
module.exports = (bot) => {
    // Single instantiation of Manager
    if (!bot.secretaryManager) {
        bot.secretaryManager = new SecretaryManager(bot);
    }

    return {
        MessageCheckSecretary,
        ReadyCreateSecretary,
        SecretaryReceived,
        SecretarySent,
        SecretaryMessageUpdate,
        SecretaryMessageDelete,
        BackupSecretaryCommand
    };
};