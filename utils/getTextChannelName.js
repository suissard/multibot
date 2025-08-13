/**
 * Formate une chaîne de caractères pour qu'elle soit un nom de salon textuel Discord valide.
 * Remplace les espaces et les caractères non alphanumériques par des tirets.
 * @param {string} channelName - Le nom de salon à formater.
 * @returns {string} Le nom de salon formaté.
 */
const getTextChannelName = function (channelName) {
	return channelName.toLowerCase().replace(/[^a-zA-Z\-0-9\_]/g, '-').replace(/\-+/g, '-');
};

module.exports = getTextChannelName;
