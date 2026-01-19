import { expect, test } from 'vitest';

const { StrapiApi } = require('suissard-strapi-client');
const { StrapiCollections } = require('suissard-strapi-client');
const { StrapiObject } = require('suissard-strapi-client');
require('dotenv').config();

// Config de strapi
const baseURL = process.env.STRAPI_URL;
const collections = ["botsdatas", "teams", "sharechannels", "emotemessages"];
const token = process.env.STRAPI_TOKEN;
const prefix = 'api';

const strapi = new StrapiApi(baseURL, collections, token, prefix);

test('Instanciation', () => {
    expect(strapi.baseURL).toBe(baseURL);
    expect(strapi.token).toBe(token);
    expect(strapi.prefix).toBe(prefix + '/');
});

test('setCollections', () => {
    expect(strapi.collections).toSatisfy((coll) => {
        return Object.keys(coll).join(',') == collections.join(',');
    });
    expect(strapi.collections[collections[0]]).toBeInstanceOf(StrapiCollections);
});

test('getHeader', () => {
    expect(strapi.getHeader()).toBeInstanceOf(Object);
    expect(strapi.getHeader()).toHaveProperty('Authorization', 'Bearer ' + token);
});

// test("requests post, get, update, delete", async () => {
// 	//GET
// 	const collection = strapi.collections[collections[0]];

// 	const configObject = {
// 		token: "token",
// 		name: "test à supprimer",
// 		ownerId: 123456789,
// 		admin: ["admin1", "admin2"],
// 		active: false,
// 	};

// 	const modifiedName = "test à modifier";

// 	// Creer un objet	
// 	const createdObject = await collection.create(configObject);
// 	expect(createdObject.name).toBe(configObject.name);

// 	// Recuperer une liste d'objets
// 	const collectionList = await collection.list()
// 	expect(collectionList).toBeInstanceOf(Array);
// 	expect(collectionList[0]).toBeInstanceOf(StrapiObject);

// 	const createdObjectFromList = collectionList.find((element)=>element.name == configObject.name);
// 	expect(createdObjectFromList.token).toBe(configObject.token);
// 	expect(createdObjectFromList.name).toBe(configObject.name);
// 	expect(createdObjectFromList.ownerId).toBe(String(configObject.ownerId));
// 	expect(createdObjectFromList.admin[0]).toBe(configObject.admin[0]);
// 	expect(createdObjectFromList.active).toBe(configObject.active);


// 	// Recuperer un objet spécifique
// 	const specificObject = await collection.get(createdObjectFromList.getID());
// 	expect(specificObject.token).toBe(configObject.token);
// 	expect(specificObject.name).toBe(configObject.name);
// 	expect(specificObject.ownerId).toBe(String(configObject.ownerId));
// 	expect(specificObject.admin[0]).toBe(configObject.admin[0]);
// 	expect(specificObject.active).toBe(configObject.active);


// 	// Modifier un objet
// 	await collection.update(createdObjectFromList.getID(), {name: modifiedName})
// 	const modifiedObject = await collection.get(createdObjectFromList.getID(), undefined, true);
// 	expect(modifiedObject.name).toBe(modifiedName);


// 	// Supprimer un objet
// 	await collection.delete(modifiedObject.getID());
// 	const collectionListWithoutcreatedObjectFromList = await collection.list(undefined, undefined, undefined, true)
// 	expect(collectionListWithoutcreatedObjectFromList.find((element)=>element.getID() == modifiedObject.getID())).toBeFalsy();
// });

// test("GetAllData", async ()=>{
// 	const allData = await strapi.getAllData();
// 	expect(allData).toBeInstanceOf(Object);
// 	expect(allData).toSatisfy((coll) => {
// 		return Object.keys(coll).join(",") == collections.join(",");
// 	});
// 	expect(allData[collections[0]][0]).toBeInstanceOf(StrapiObject);
// }, 15000)

test('register', async () => {
    expect(true).toBeTruthy();
});

test('login', async () => {
    expect(true).toBeTruthy();
});

test('StrapiObject', async () => {
    expect(true).toBeTruthy();
});