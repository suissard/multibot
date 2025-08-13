/**
 * Représente un membre d'une équipe dans le contexte de l'API Olympe.
 * @class
 */
class OlympeMember {
    /**
     * @param {OlympeUser} user - L'objet utilisateur Olympe associé à ce membre.
     * @param {object} tags - Les tags associés au membre, comme les rôles en jeu.
     * @param {Array<string>} roles - Les rôles administratifs ou de statut du membre dans l'équipe (ex: 'captain').
     * @todo La variable `gameRoles` est utilisée sans être définie, ce qui causera une erreur. Le constructeur doit être corrigé.
     */
    constructor(user, tags, roles) {
        this.user = user;
        this.tags = { gameRoles };
        this.roles = roles;
    }
}