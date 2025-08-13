module.exports = {
    path: '/',
    method: 'post',
    /**
     * Gère les requêtes POST sur la racine de l'API.
     * @todo Cette route est un placeholder et sa fonctionnalité n'est pas claire.
     * @param {import('express').Request} req - L'objet de la requête Express.
     * @param {import('express').Response} res - L'objet de la réponse Express.
     */
    handler: (req, res, bot, user, app) => {
        res.send('Vous etes maintenant admin');
    },
};