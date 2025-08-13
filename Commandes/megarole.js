const Command = require('../Class/Command.js');

module.exports = class Ping extends Command {
    static id = 'megarole';
    static devBoss = false;
    static home = true;
    static userPermissions = ['ManageRoles'];
    static botPermissions = [];
    static description = 'Supprime un rôle à tout les utilisateurs du serveur';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [{ options: [{ name: 'role', value: '996499512099094648' }, { name: 'del', value: 'true' }] }];
    static arguments = [
        {
            type: 'BOOLEAN',
            name: 'del',
            description: 'True = Supprimer les rôles / False = Ajouter les rôles',
            required: true,
        }, {
            type: 'ROLE',
            name: 'role',
            description: 'Role à supprimer',
            required: false,
        },
        {
            type: 'STRING',
            name: 'multipleroles',
            description: 'Mettre plusieurs roles à supprimer',
            required: false,
        },
    ];

    async methode(args = {}) {
        await this.guild.members.fetch();
        let roles = [];
        let userlist = this.guild.members.cache;
        if (!args.role && !args.multipleroles) {
            return 'Il faut mentionner un rôle à supprimer';
        }
        if (args.role) {
            roles.push(args.role);
        }
        if (args.multipleroles) {
            roles = await this.getRoleFromMultipleRoles(args.multipleroles);
        }
        this.removeRolesToUser(userlist, roles, args);
        return 'Commande effectué !';
    }


    async getRoleFromMultipleRoles(string) {
        let rolesID = string.match(/<@&[0-9]{18}>/g);
        rolesID = rolesID.map((x) => x.replace(/(<@&)|>/g, ''));
        return rolesID;
    }

    async removeRolesToUser(user, role, args) {
        let error = [];
        let listeUser = [];
        for (let [index, value] of user) {
            listeUser.push(value);
        }
        if (args.del == true) {
            await this.loading(listeUser, async (membre) => {
                try {
                    await membre.roles.remove(role);
                } catch (e) {
                    console.log(e.stack);
                    error.push(e);
                }
            });
        } else if (args.del == false) {
            await this.loading(listeUser, async (membre) => {
                try {
                    await membre.roles.add(role);
                } catch (e) {
                    console.log(e.stack);
                    error.push(e);
                }
            });
        }
        if (error.length > 0) {
            this.channel.send(`liste des erreurs de role \n${error.join(', ')}`);
        }
        return `Sur les ${user.length}, ${Number(user.length) - Number(error.length)} ont été modifié`;
    }
};