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
    delay: 500,
    concurrency: 1
};

module.exports = {
    roleCategories,
    roleCategoriesList,
    clubRolesList,
    managerRolesList,
    coachRolesList,
    apiQueueConfig
};
