/**
 * Récupère le nom de la division (segment) d'un match.
 * @param {object} match - L'objet match.
 * @returns {string|undefined} Le nom de la division, ou undefined.
 */
const getMatchDivisionName = (match) => {
	return match?.segment?.name;
};

/**
 * Récupère l'ID du challenge d'un match.
 * @param {object} match - L'objet match.
 * @returns {string} L'ID du challenge.
 */
const getChallengeDivision = (match) => {
	return match.segment.challengeID;
};

module.exports = {
	getMatchDivisionName,
	getChallengeDivision,
};