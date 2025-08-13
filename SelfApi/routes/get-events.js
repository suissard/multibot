module.exports = {
    path: /\/events/,
    method: 'get',
    handler: (req, res, bot, user, app) => {
        res.send('get-events');
    },
};
