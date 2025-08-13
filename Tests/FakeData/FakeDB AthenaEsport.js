//SCRIPT de création de fauss db pour athena esport
const { OlympeMember, OlympeTeam, OlympeUser, OlympeMatch } = require('./FakeClass.js');

// const user = require("./user.json"); // https://www.playallforone.com/api/users/Enravota%2345724?fields=thirdpartiesDiscord
// const team = require("./team.json"); // https://www.playallforone.com/api/teams/Nu.age?userFields=battlenetBtag%2CthirdpartiesDiscord
// const match = require("./match.json"); // https://www.playallforone.com/api/matchs/bf5d883b-9735-4a7d-9f76-8fa8733cc931-e2631b64-344d-4521-ba65-c89845353d16?userFields=battlenetBtag%2CthirdpartiesDiscord // ! ATTENTION match dejà jouée, le format peut différer si dejà réalisé (pas critique)

// const olympeMatch = new OlympeMatch( match)
// const olympeTeam = new OlympeTeam( team)
// const olympeMember = new OlympeMember( team.members[0])
// const olympeUser = new OlympeUser( user)


/**
 * Générer des données olympe de teams aléatoires
 */
const generateFakeData = (classArg, numberOfItem = 100) => {
    const result = [];
    for (let i = 0; i < numberOfItem; i++) {
        result.push(new classArg());
    }
    return result;
};

/**
 * Remplace toute les entrée d'un object par les valeurs contenu dans un array
 * @param {Object} object Object qui se fait remplacer des entries
 * @param {String} entrieName Le nom des entries
 * @param {Array} array Les données a mettre
 * @param {Boolean} erase Si tout els donnée du array on été placé, remplace alors par undefined (si True) ou ne fait rien (False)
 */
const replaceObjectEntrieWithArrayData = (object, entrieName, array, erase=true) => {
	for (const e in object){
		if (e === entrieName && array.length) object[e] = array.shift()
		else if (e === entrieName && !array.length && erase) object[e] = undefined
		if (object[e] instanceof Object) object[e] = replaceObjectEntrieWithArrayData(object[e], entrieName, array)
	}
	return object
}


// let test = generateFakeData(OlympeMatch, 10)
// let replacementArray = [1,2,3,4,5,6,7,8,9]
// let result = replaceObjectEntrieWithArrayData(test, "discordID", replacementArray)
// console.log(result)
module.exports = { generateFakeData, replaceObjectEntrieWithArrayData }