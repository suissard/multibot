Discord = require('discord.js');

module.exports = function(reaction, user) {
    let message = reaction.message;
    let emoteMessage = bot.EmoteMessages.get(message.id);

    if (!emoteMessage) return;
    try {
        emoteMessage[`add${emoteMessage.categorie}`](reaction, user);

    } catch (e) {
        bot.error('messagereactionadd', `Bug de messageReaction.add${emoteMessage.categorie}\n${e.stack}`);
    }
    return;
};