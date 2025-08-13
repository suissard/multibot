/**
 * Représente une équipe dans le contexte de l'API Olympe.
 * @class
 */
class OlympeTeam {
    /**
     * @param {string} name - Le nom de l'équipe.
     * @param {Array<OlympeMember>} members - Une liste des membres de l'équipe.
     * @param {Array<object>} segments - Une liste des segments (divisions, compétitions) auxquels l'équipe participe.
     */
    constructor(name, members, segments) {
        this.name = name;
        this.members = members;
        this.segments = segments;
    }
}