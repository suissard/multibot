try {
    const sc = require('suissard-strapi-client');
    console.log('suissard-strapi-client:', sc);
    const { StrapiObject } = sc;
    console.log('StrapiObject:', StrapiObject);
} catch (e) {
    console.error(e);
}
