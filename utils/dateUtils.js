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