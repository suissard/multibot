const getTextChannelName = function (channelName) {
	return channelName.toLowerCase().replace(/[^a-zA-Z\-0-9\_]/g, '-').replace(/\-+/g, '-');
};

module.exports = getTextChannelName;
