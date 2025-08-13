/**
 * Structure les IDs de rôles pour une compétition, triés par catégorie de rôle
 * (club, coach, manager, player) puis par segment/division.
 * @class
 */
module.exports = class RolesSegmentsId {
    /**
     * @param {object} club - Un objet où les clés sont les noms de division et les valeurs sont les IDs de rôle "club".
     * @param {object} coach - Un objet où les clés sont les noms de division et les valeurs sont les IDs de rôle "coach".
     * @param {object} manager - Un objet où les clés sont les noms de division et les valeurs sont les IDs de rôle "manager".
     * @param {object} player - Un objet où les clés sont les noms de division et les valeurs sont les IDs de rôle "player".
     */
    constructor(club, coach, manager, player){
        this.club = club
        this.coach = coach
        this.manager = manager
        this.player = player
    }
}