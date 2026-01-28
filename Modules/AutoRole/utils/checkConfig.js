const { roleCategoriesList } = require('./constants');

/**
 * Checks if the segment names in the configuration match the actual segments from Olympe.
 * @param {import('../../../Class/Bot')} bot
 * @param {Array<Object>} olympeSegments - All segments fetched from Olympe
 * @param {Object} challengesRolesId - The configuration object
 */
const checkConfigMatch = (bot, olympeSegments, challengesRolesId) => {
    const competitions = challengesRolesId.competitions;

    for (const challengeID in competitions) {
        const configRoles = competitions[challengeID];
        const actualSegments = olympeSegments.filter(s => s.challengeID == challengeID);
        const actualSegmentNames = actualSegments.map(s => s.name);

        // We need to collect all segment names used in the config for this challenge
        // The config structure is: competition -> roleCategory (club, player...) -> segmentName -> roleID
        const configuredSegmentNames = new Set();

        roleCategoriesList.forEach(cat => {
            if (configRoles[cat]) {
                Object.keys(configRoles[cat]).forEach(segName => {
                    if (segName !== 'ALL') {
                        configuredSegmentNames.add(segName);
                    }
                });
            }
        });

        configuredSegmentNames.forEach(confName => {
            if (!actualSegmentNames.includes(confName)) {
                bot.error(
                    `[AutoRole Config Check] Mismatch! Configured segment "${confName}" not found in Olympe segments for challenge ${challengeID}. Available segments: ${actualSegmentNames.join(', ')}`,
                    'AutoRole'
                );
            }
        });
    }
};

module.exports = checkConfigMatch;
