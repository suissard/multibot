/**
 * Représente un utilisateur dans le contexte de l'API Olympe.
 * @class
 */
class OlympeUser {
    /**
     * @param {string} username - Le nom d'utilisateur Olympe.
     * @param {string} id - L'ID de l'utilisateur Olympe.
     * @param {object} thirdparties - Un objet contenant les informations des comptes tiers, comme Discord.
     * @todo La variable `publicDiscordTag` est utilisée sans être définie, ce qui causera une erreur. Le constructeur doit être corrigé.
     */
    constructor(username, id, thirdparties) {
        this.username = username;
        this.id = id;
        this.thirdparties = { discord: { publicDiscordTag } };
    }
}