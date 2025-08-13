/**
 * Catégorie et jeu par defaut avec leur pattern
 */
let defaultGameCategory = {
    overwatch: {
        scrim: /(lfs|cherche.+scrim)/i,
        team: /(lft|cherche.+(team|quipe))/i,
        player: /(lfp|lfsub|lf sub|cherche.+joueu)/i,
        staff: /(cherche)|(recrute)/i,
        tournoi: /lfs/i,
        caster: /lfc/i,
        geti: /123456789azerty/i,
    },
    tekken: {
        scrim: /(lfs|cherche.+scrim)/i,
        team: /(lft|cherche.+(team|quipe))/i,
        player: /(lfp|lfsub|lf sub|cherche.+joueu)/i,
        staff: /(cherche)|(recrute)/i,
        tournoi: /lfs/i,
        caster: /lfc/i,
        geti: /123456789azerty/i,
    },
    valorant: {
        scrim: /(lfs|cherche.+scrim)/i,
        team: /(lft|cherche.+(team|quipe))/i,
        player: /(lfp|lfsub|lf sub|cherche.+joueu)/i,
        staff: /(cherche)|(recrute)/i,
        tournoi: /lfs/i,
        caster: /lfc/i,
        geti: /123456789azerty/i,
    },
    leagueOfLegend: {
        scrim: /(lfs|cherche.+scrim)/i,
        team: /(lft|cherche.+(team|quipe))/i,
        player: /(lfp|lfsub|lf sub|cherche.+joueu)/i,
        staff: /(cherche)|(recrute)/i,
        tournoi: /lfs/i,
        caster: /lfc/i,
        geti: /123456789azerty/i,
    },
};

/**
 * Pattern pour reconnaitre le jeu dans les commandes de salon
 */
let gamePattern = {
    overwatch: /(ow)|(overwatch)/i,
    tekken: /(tk)|(tekken)/i,
    valorant: /(val)|(valorant)/i,
    leagueOfLegend: /(lol)|(league *of *legends)/i,
    geti: /geti/i,
};

let categoryPattern = {
    scrim: /scrim/i,
    player: /player/i,
    team: /team/i,
    staff: /staff/i,
    caster: /caster/i,
    geti: /geti/i,
};
module.exports = { defaultGameCategory, gamePattern, categoryPattern };