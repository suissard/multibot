/**
 * Vérifie si un match commence dans une période de temps donnée.
 * @param {number} timestamp - Le timestamp Unix du début du match.
 * @param {number} maxHoursToRetrieveMatchs - Le nombre d'heures dans le futur à vérifier.
 * @returns {boolean} `true` si le match commence bientôt, sinon `false`.
 * @todo Cette fonction est un duplicata de celle dans `Modules/ChannelManager/utils/utils.js`.
 */
const isMatchStartedSoon = (timestamp, maxHoursToRetrieveMatchs) => {
	if (!timestamp || typeof timestamp !== 'number') {
		console.error('Invalid timestamp provided.');
		return false;
	}

	const now = new Date();
	const nextHours = new Date(
		now.getTime() + (maxHoursToRetrieveMatchs * 60 * 60 * 1000),
	);

	const givenDate = new Date(timestamp * 1000);
	return givenDate > now && givenDate < nextHours;
};

module.exports = {
	isMatchStartedSoon,
};