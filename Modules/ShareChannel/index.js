module.exports = (bot) => {
    const LoadShareChannels = require('./LoadShareChannelsBotsReady.js');
    const ShareEvent = require('./ShareEvent.js');
    const ShareEventUpdate = require('./ShareEventUpdate.js');
    const ShareEventDelete = require('./ShareEventDelete.js');
    const SalonCommand = require('./SalonCommand.js');
    const ShareInfoCommand = require('./ShareInfoCommand.js');
    const SharePromoCommand = require('./SharePromoCommand.js');
    const ShareStopCommand = require('./ShareStopCommand.js');
    const ShareGetiCommand = require('./ShareGetiCommand.js');

    return {
        ShareEvent,
        ShareEventUpdate,
        ShareEventDelete,
        SalonCommand,
        ShareInfoCommand,
        SharePromoCommand,
        ShareStopCommand,
        LoadShareChannels,
        ShareGetiCommand,
    };
};
