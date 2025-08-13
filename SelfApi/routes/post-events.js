module.exports = {
    path: /\/events/,
    method: 'post',
    handler: (req, res, bot, user, app) => {
        res.send('post-events');
    },
};
