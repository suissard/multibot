module.exports = {
    path: '/',
    method: 'post',
    handler: (req, res, bot, user, app) => {
        res.send('Vous etes maintenant admin');
    },
};