/**
 * Object de roles discord trié par Id de challenge > catégorie de role (club, coach, manager, player) > segments/divisions
 * @param {*} competition  {99:{club:"division 1":"01234567890124567"}}
 */
module.exports = class RolesSegmentsId {
    constructor(club, coach, manager, player){
        this.club = club
        this.coach = coach
        this.manager = manager
        this.player = player
    }
}