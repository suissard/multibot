/**
 * Génère un entier aléatoire dans un intervalle donné (inclusif).
 * @param {number} [max=1] - La valeur maximale de l'intervalle.
 * @param {number} [min=0] - La valeur minimale de l'intervalle.
 * @returns {number} Un entier aléatoire entre min et max.
 */
module.exports = function(max = 1, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
