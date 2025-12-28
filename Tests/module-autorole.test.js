import { describe, expect, test } from 'vitest';
import { OlympeApi } from 'olympe-client-api';

const { Headers } = require('node-fetch');

const token = 'token';
const domain = 'prod.api.olympe.xyz'; // https://prod.api.olympe.xyz/api/
const xDomain = 'www.playallforone.com';
const url = 'token';
const method = 'GET';
const body = { test: 'testing, testing' };
const bodyIsFile = true;

describe("Test de l'api", () => {
	test('Instanciation', () => {
		const api = new OlympeApi(token, domain, xDomain);

		expect(api).toBeInstanceOf(OlympeApi);
		expect(api.getApiUrl()).toBe(`https://${domain}/api/`);
		expect(api.getDomain()).toBe(`https://${domain}`);
		expect(api.getHeader()).toBeInstanceOf(Headers);
		expect(api.getHeader().get('Content-Type')).toBe('application/x-www-form-urlencoded');
		expect(api.getHeader().get('Authorization')).toBe(`Bearer ${token}`);
		const headers = api.getHeader();

		expect(api.getFields()).toBe('');
		expect(api.getFields({})).toBe('');
		expect(api.getFields({ test: ['test'] })).toBe('?test=test');
		expect(api.getFields({ test: ['test', 'test2'] })).toBe('?test=test%2Ctest2');
		expect(api.jsonToFormUrlEncoder(body)).toBe('test=testing%2C%20testing');

		expect(api.getRequestObject({ url, method, body, headers, bodyIsFile })).toBeInstanceOf(
			Object
		);
		expect(api.getRequestObject({ method, body, headers, bodyIsFile }).method).toBe(method);
		expect(api.getRequestObject({ method, body, headers, bodyIsFile }).body).toBeInstanceOf(
			URLSearchParams
		);
		expect(api.getRequestObject({ method, body, headers, bodyIsFile }).headers).toBe(headers);
	});

	test('Tests requetes', () => {
		const api = new OlympeApi(token, domain);

		expect(api.GET('test')).toBeInstanceOf(Promise);
		expect(api.POST('test')).toBeInstanceOf(Promise);
		expect(api.PUT('test')).toBeInstanceOf(Promise);
		expect(api.DELETE('test')).toBeInstanceOf(Promise);
	});

	test('Tests en interaction', () => {
		let result = 4;
		expect(result).toBe(4);
	});
});

describe("Test du module d'autorole", () => {
	test('Instanciation', () => {
		let result = 4;
		expect(result).toBe(4);
	});
	test('Tests unitaires', () => {
		let result = 4;
		expect(result).toBe(4);
	});
	test('Tests en interaction', () => {
		let result = 4;
		expect(result).toBe(4);
	});
});
