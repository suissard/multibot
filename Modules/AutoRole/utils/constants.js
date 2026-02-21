// PROD Constants
const roleCategories = {
    club: 'club',
    coach: 'coach',
    player: 'player',
    manager: 'manager',
    caster: 'caster'
};

const roleCategoriesList = Object.values(roleCategories).filter(r => r !== 'caster');

const clubRolesList = [
    'owner',
    'president',
    'vice president',
    'staff',
    'communication',
    'esport director',
    'video analyst',
];
const managerRolesList = ['manager', 'assistant manager'];
const coachRolesList = ['head coach', 'mental coach'];

const apiQueueConfig = {
    delay: 2500,
    concurrency: 1
};

const discordQueueConfig = {
    delay: 200,
    concurrency: 4
};

const prodConstants = {
    roleCategories,
    roleCategoriesList,
    clubRolesList,
    managerRolesList,
    coachRolesList,
    apiQueueConfig,
    discordQueueConfig
};

// DEV Constants
const devConstants = {
    ...prodConstants,
    apiQueueConfig: {
        delay: 2500,
        concurrency: 1
    },
    discordQueueConfig: {
        delay: 200,
        concurrency: 4
    }
};

module.exports = process.env.BOT_MODE === 'DEV' ? devConstants : prodConstants;
