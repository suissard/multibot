const { initOlympe } = require('./utils/utils');

/**
 * Le module Olympe gère la connexion à l'API Olympe et le cache des données.
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 */
module.exports = (bot) => {

    // Initialisation immédiate ou via un événement clientReady ? 
    // Mieux vaut attendre clientReady pour être sûr que tout est chargé, 
    // mais pour l'API pure, on peut initier tout de suite si la config est là.
    // AutoRole attendait clientReady.

    bot.on('clientReady', async () => {
        try {
            await initOlympe(bot);
            bot.log('Olympe API initialized.', 'Olympe');
            bot.emit('olympeReady');
        } catch (error) {
            bot.error(`Failed to initialize Olympe API: ${error.message}`, 'Olympe');
        }
    });

    return {
        // Return verification function or object?
        // User wants "trigger error if module not ok".
        // This will be handled by the dependency system checking existence.
        // We can expose a helper to check status if needed.
    };
};
