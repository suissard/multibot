const RolesSegmentsId = require('./RolesSegmentsId.js');

/**
 * Structure les IDs de rôles pour les différentes compétitions.
 * Contient les rôles globaux (pour tous, capitaine, caster) et les rôles spécifiques
 * à chaque compétition, organisés par segment.
 * @class
 */
module.exports = class ChallengesRolesId {
	/**
	 * @param {string} ALL - L'ID du rôle Discord donné à tous les participants.
	 * @param {string} captain - L'ID du rôle Discord donné à tous les capitaines.
	 * @param {string} caster - L'ID du rôle Discord donné à tous les casters.
	 * @param {object} competitions - Un objet où les clés sont les ID de challenge et les valeurs sont les configurations de rôles pour ce challenge.
	 */
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
	 * Récupère de manière récursive tous les ID de rôle contenus dans l'objet.
	 * @param {object} [object=this] - L'objet à parcourir.
	 * @param {Array<string>} [target=[]] - Le tableau pour accumuler les IDs.
	 * @returns {Array<string>} Un tableau plat de tous les ID de rôle.
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
