
const { StrapiApi } = require('suissard-strapi-client'); // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html

const url = process.env.STRAPI_URL;
const token = process.env.STRAPI_TOKEN;
if (!url || !token) throw new Error(`\x1b[31m[BOTMANAGER]\x1b[0m ${!url && !token ? 'STRAPI_URL and STRAPI_TOKEN' : !url ? 'STRAPI_URL' : 'STRAPI_TOKEN'} is undefined in .env`);

const collections = ['botsdatas', 'teams', 'sharechannels', 'emotemessages'];
const prefix = 'api';

const strapi = new StrapiApi(url, collections, token, prefix);

module.exports = strapi;