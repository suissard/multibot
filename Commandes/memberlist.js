const Command = require('../Class/Command.js');
const { EmbedBuilder } = require('discord.js');

module.exports = class MemberList extends Command {
    static id = 'memberlist';
    static devBoss = false;
    static home = true;
    static userPermissions = ['ManageRoles'];
    static botPermissions = [];
    static description = 'Renvoie la liste des utilisateurs qui ont le rôle mentiionné';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [{ options: [{ name: 'role', value: '990974790615564339' }] }];
    static arguments = [
        {
            type: 'ROLE',
            name: 'role',
            description: 'Role dont on doit renvoyer les membres',
            required: true,
        },
    ];

    async methode(args = {}) {
        await this.guild.members.fetch();
        let role = this.guild.roles.cache.get(args.role);
        if (role.members.size == 0) {
            return 'Personne n\'a ce rôle';
        }
        let listemembre2 = '';
        let i = 1;
        for (let [index, value] of role.members) {
            if (i < role.members.size) {
                listemembre2 = listemembre2 + `<@${index}>, `;
            } else if (i >= role.members.size) {
                listemembre2 = listemembre2 + `<@${index}>`;
            }
            i += 1;
        }
        let embed = new EmbedBuilder()
            .setTitle(`Liste des ${role.members.size} membres ayant le rôle ${role.name}`)
            .setDescription(listemembre2);
        return embed;
    }
};
