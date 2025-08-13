import { describe, it, expect } from "vitest";
import { OlympeMember, OlympeTeam, OlympeUser, OlympeMatch } from "./FakeData/FakeClass.js";
import {
	generateFakeData,
	replaceObjectEntrieWithArrayData,
} from "./FakeData/FakeDB AthenaEsport.js"; // Remplacer par le nom correct du fichier

describe("Test de génération et remplacement de données fictives", () => {
	describe("generateFakeData", () => {
		it("devrait générer le bon nombre d'instances pour une classe donnée", () => {
			const numberOfItems = 10;
			const generatedMatches = generateFakeData(OlympeMatch, numberOfItems);

			expect(generatedMatches).toHaveLength(numberOfItems);
			generatedMatches.forEach((item) => {
				expect(item).toBeInstanceOf(OlympeMatch);
			});
		});

		it("devrait renvoyer un tableau vide si numberOfItem est 0", () => {
			const generatedUsers = generateFakeData(OlympeUser, 0);
			expect(generatedUsers).toHaveLength(0);
		});
	});

	describe("replaceObjectEntrieWithArrayData", () => {
		it("devrait remplacer les entrées spécifiées par les valeurs du tableau fourni", () => {
			const testData = generateFakeData(OlympeUser, 3);
			const replacementArray = [ { discordID: "12345" } , { discordID: "67890" } , { discordID: "112233" } ];
			const modifiedData = replaceObjectEntrieWithArrayData(
				testData,
				"discord",
				replacementArray
			);

			modifiedData.forEach((user, index) => {
				expect(user.discord?.discordID).toBe(replacementArray[index]);
			});
		});

		it("devrait laisser les entrées restantes inchangées si le tableau est épuisé et erase est false", () => {
			const testData = generateFakeData(OlympeMember, 3);
			const replacementArray = [{ discord: { discordID: "11111" } }];
			const modifiedData = replaceObjectEntrieWithArrayData(
				testData,
				"thirdparties",
				replacementArray,
				false
			);

			expect(modifiedData[0].user.thirdparties.discord.discordID).toBe("11111");
			expect(modifiedData[1].user.thirdparties?.discord.discordID).not.toBe("11111");
		});

		it("devrait remplacer les entrées restantes par undefined si le tableau est épuisé et erase est true", () => {
			const testData = generateFakeData(OlympeTeam, 2);
			const replacementArray = [{ discord: { discordID: "54321" } }];
			const modifiedData = replaceObjectEntrieWithArrayData(
				testData,
				"thirdparties",
				replacementArray,
				true
			);

			expect(modifiedData[0].members[0].user.thirdparties.discord.discordID).toBe(
				"54321"
			);
			expect(
				modifiedData[1].members[0]?.user.thirdparties?.discord.discordID
			).not.toBe("54321");
		});
	});
});
