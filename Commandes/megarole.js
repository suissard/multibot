const Command = require('../Class/Command.js');

module.exports = class Ping extends Command {
    static id = 'megarole';
    static devBoss = false;
    static home = true;
    static userPermissions = ['ManageRoles'];
    static botPermissions = [];
    static description = "Ajoute ou supprime en masse un ou plusieurs rôles à tous les membres du serveur.";
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

    static narrative = `
- Cette commande permet d'ajouter ou de supprimer un ou plusieurs rôles à **tous les membres** du serveur en une seule fois.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`) pour être utilisée.

- **Arguments :**
    - \`del\` (booléen, requis) : Détermine l'action. \`true\` pour supprimer les rôles, \`false\` pour les ajouter.
    - \`role\` (rôle, optionnel) : Un rôle unique à traiter.
    - \`multipleroles\` (texte, optionnel) : Une chaîne de texte contenant les mentions de plusieurs rôles.

- **Fonctionnement :**
    1. La commande commence par récupérer la liste complète de tous les membres du serveur.
    2. Elle collecte les rôles à traiter à partir des arguments \`role\` et/ou \`multipleroles\`.
    3. En fonction de la valeur de l'argument \`del\`, elle parcourt la liste de **tous les membres** :
        - Si \`del\` est \`true\`, elle tente de **supprimer** les rôles spécifiés à chaque membre.
        - Si \`del\` est \`false\`, elle tente d'**ajouter** les rôles spécifiés à chaque membre.
    4. Une barre de chargement visuelle est affichée pendant l'opération.
    5. Après l'opération, si des erreurs se sont produites (par exemple, permissions insuffisantes pour modifier un membre avec un rôle plus élevé), elles sont listées dans un message.
    6. Un message final confirme que la commande a été exécutée.
`;

    /**
     * Exécute la commande "megarole".
     * Prépare la liste des rôles et des utilisateurs, puis lance l'opération d'ajout ou de suppression de masse.
     * @param {object} args - Les arguments de la commande.
     * @param {boolean} args.del - `true` pour supprimer les rôles, `false` pour les ajouter.
     * @param {string} [args.role] - L'ID d'un rôle unique à traiter.
     * @param {string} [args.multipleroles] - Une chaîne contenant les mentions de plusieurs rôles.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async methode(args = {}) {
        await this.guild.members.fetch().catch(console.warn);
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


    /**
     * Extrait les ID de rôle à partir d'une chaîne de mentions de rôles.
     * @param {string} string - La chaîne contenant les mentions de rôles.
     * @returns {Promise<Array<string>>} Un tableau d'IDs de rôles.
     */
    async getRoleFromMultipleRoles(string) {
        let rolesID = string.match(/<@&[0-9]{18}>/g);
        rolesID = rolesID.map((x) => x.replace(/(<@&)|>/g, ''));
        return rolesID;
    }

    /**
     * Ajoute ou supprime en masse une liste de rôles pour une liste d'utilisateurs.
     * Le nom de la fonction est trompeur, car elle gère à la fois l'ajout et la suppression.
     * @param {import('discord.js').Collection<string, import('discord.js').GuildMember>} user - La collection des membres du serveur.
     * @param {Array<string>} role - Un tableau d'IDs de rôles à ajouter ou supprimer.
     * @param {object} args - Les arguments de la commande, principalement `args.del` pour déterminer l'action.
     * @returns {Promise<string>} Un message de résumé de l'opération.
     */
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