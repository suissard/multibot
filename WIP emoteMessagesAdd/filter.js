module.exports = function(messageReaction, user) {

    if (user.bot) return false;
    if (bot.EmoteMessages.get(messageReaction.message.id) == undefined) return false;
    if (bot.EmoteMessages.get(messageReaction.message.id).channel.id != messageReaction.message.channel.id) return false;
    return true;

};