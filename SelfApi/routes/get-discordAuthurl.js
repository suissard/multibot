module.exports = {
    path: '/discord/authurl',
    method: 'get',
    handler: (req, res, bot, user, app) => {
        res.send(app.getDiscordAuthUrl());
    },
};