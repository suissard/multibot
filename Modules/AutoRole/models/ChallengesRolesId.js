const RolesSegmentsId = require('./RolesSegmentsId.js');

/**
 *
 * @param {String} ALL Id de role discord donnée a tous
 * @param {String} captain Id de role discord donnée a tout les capitaines
 * @param {RolesSegmentsId} competitions Roles spécifique par challenge, role et segments
 *
 */
module.exports = class ChallengesRolesId {
	constructor(ALL, captain, caster, competitions) {
		this.ALL = ALL;
		this.captain = captain;
		this.caster = caster;
		for (let i in competitions) {
			competitions[i] = new RolesSegmentsId(
				competitions[i].club,
				competitions[i].coach,
				competitions[i].manager,
				competitions[i].player
			);
		}
		this.competitions = competitions;
	}
	/**
	 * Recuperer tout les id fournit par le json de roles de compétition de facon recursive
	 * @param {Object} object Object provenant initialement des config : bot.modules.AutoRole.roleIds.competition[challengeID]
	 * @param {Array} target Array a remplir avec les id de tout les role associé a la compétition
	 * @returns
	 */
	getAllIds(object = this, target = []) {
		for (let entrie in object) {
			let value = object[entrie];
			if (typeof value == 'object') this.getAllIds(value, target);
			else target.push(value);
		}
		return target;
	}
};
