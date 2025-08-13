const MessageCheckSecretary = require('./MessageCheckSecretary.js');
const ReadyCreateSecretary = require('./ReadyCreateSecretary.js');
const Secretary = require('./Secretary.js');

module.exports = (bot) => {
    return {
        MessageCheckSecretary,
        ReadyCreateSecretary,
        Secretary,
    };
};