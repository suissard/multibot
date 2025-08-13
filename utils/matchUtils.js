const getMatchDivisionName = (match) => {
	return match?.segment?.name;
};

const getChallengeDivision = (match) => {
	return match.segment.challengeID;
};

module.exports = {
	getMatchDivisionName,
	getChallengeDivision,
};