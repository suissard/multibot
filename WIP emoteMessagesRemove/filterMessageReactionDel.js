module.exports = function(reaction, user) {
    let message = reaction.message;
    let emoteMessage = bot.EmoteMessages.get(message.id);

    if (!emoteMessage) return;

    try {
        emoteMessage[`del${emoteMessage.categorie}`](reaction, user);
    } catch (e) {
        bot.error('messagereactiondel', `Bug de messageReaction.del${emoteMessage.categorie}\n${e.stack}`);
    }
    return;
};