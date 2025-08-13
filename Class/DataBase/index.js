// https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html
// const StrapiApi = require("./StrapiAi.js");

const { StrapiApi } = require('suissard-strapi-client');
// Config de strapi
const url = 'https://strapi.xekkcorp.eu'; //TODO Donnée pas dynamique
const collections = ['botsdatas', 'teams', 'sharechannels', 'emotemessages'];
const token = 'be05cd4527b5301622fd7988e7a3fcc7d07e7dd3259795f20ce56d9582ac7f353d28eded1a4635357cf69690c1b1112c5edc54ecc2eb9d5e84f8821b8d6e65bfacdbe5f96dafe830144771ee4fa4523b89d33dbbb26c296228d0b3505aac41ec9528be398c460432a12eeb360fde29e6db269c620026dc75c735ef90be7ca2f5';
const prefix = 'api';

const strapi = new StrapiApi(url, collections, token, prefix);

module.exports = strapi;
