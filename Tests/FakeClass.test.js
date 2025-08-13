// test/olympeClasses.test.js
import { describe, it, expect } from "vitest";
import { OlympeMember, OlympeTeam, OlympeUser, OlympeMatch } from "./FakeData/FakeClass.js";

// Utilitaire pour vérifier que chaque propriété d'un objet n'est pas undefined
function checkPropertiesAreDefined(obj, properties) {
	properties.forEach((prop) => {
		expect(obj[prop]).toBeDefined();
	});
}

describe("OlympeMember Class", () => {
	it("should create an OlympeMember instance with correct properties", () => {
		const member = new OlympeMember();
		checkPropertiesAreDefined(member, ["user", "tags", "roles", "ticketsPurchased"]);
		expect(Array.isArray(member.roles)).toBe(true);
		expect(Array.isArray(member.ticketsPurchased)).toBe(true);
	});
});

describe("OlympeTeam Class", () => {
	it("should create an OlympeTeam instance with correct properties", () => {
		const team = new OlympeTeam();
		checkPropertiesAreDefined(team, [
			"id",
			"name",
			"nationality",
			"recruitment",
			"registerDate",
			"externalLinks",
			"members",
			"membersLent",
			"segments",
			"followers",
		]);
		expect(Array.isArray(team.members)).toBe(true);
		expect(Array.isArray(team.segments)).toBe(true);
	});
});

describe("OlympeUser Class", () => {
	it("should create an OlympeUser instance with correct properties", () => {
		const user = new OlympeUser();
		checkPropertiesAreDefined(user, [
			"id",
			"username",
			"publicEmail",
			"publicBattlenetBtag",
			"nationality",
			"marketplaceTransfer",
			"marketplaceLent",
			"thirdparties",
			"followers",
			"subscriptions",
			"registerDate",
			"teams",
			"teamsLent",
		]);
		expect(Array.isArray(user.teams)).toBe(true);
		expect(Array.isArray(user.teamsLent)).toBe(true);
	});
});

describe("OlympeMatch Class", () => {
	it("should create an OlympeMatch instance with correct properties", () => {
		const match = new OlympeMatch();
		checkPropertiesAreDefined(match, [
			"id",
			"challenge",
			"segment",
			"matchDate",
			"team1",
			"team2",
			"teamID_winner",
			"team1forfeit",
			"team2forfeit",
			"scores",
			"casters",
			"matchDateProposals",
			"pool",
			"steps",
		]);
		expect(Array.isArray(match.scores)).toBe(true);
		expect(Array.isArray(match.steps)).toBe(true);
	});
});
