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

    static narrative = `
- Cette commande permet d'obtenir la liste de tous les membres d'un serveur qui possèdent un rôle spécifique.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`) pour être utilisée.
- L'utilisateur doit fournir un rôle en argument.

- **Fonctionnement :**
    1. La commande récupère d'abord la liste complète des membres du serveur pour s'assurer que les données sont à jour.
    2. Elle identifie le rôle spécifié par l'utilisateur.
    3. Elle parcourt ensuite la liste de tous les membres qui possèdent ce rôle.
    4. Elle construit une chaîne de caractères qui mentionne chaque membre trouvé.
    5. Finalement, elle génère et envoie un message "embed" qui contient :
        - Un titre indiquant le nombre total de membres trouvés et le nom du rôle.
        - La liste des mentions de tous les membres concernés.
    6. Si aucun membre ne possède le rôle, elle renvoie simplement un message l'indiquant.
`;

    /**
     * Exécute la commande pour lister les membres ayant un rôle spécifique.
     * Récupère les membres, formate la liste et la renvoie dans un embed.
     * @param {object} args - Les arguments de la commande.
     * @param {string} args.role - L'ID du rôle dont les membres doivent être listés.
     * @returns {Promise<import('discord.js').EmbedBuilder|string>} Un embed contenant la liste des membres, ou un message si personne n'a le rôle.
     */
    async methode(args = {}) {
        await this.guild.members.fetch().catch(console.warn);
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
