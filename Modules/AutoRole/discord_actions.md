# Documentation Technique : AutoRole

Ce document détaille le fonctionnement du module **AutoRole**, en listant les fonctions majeures avec leurs déclencheurs et données nécessaires, ainsi que les actions techniques effectuées sur l'API Discord.

## Fonctions Majeures : Triggers & Data

### 1. `autoRole(bot, guildId)`
Fonction principale qui orchestre la synchronisation des rôles.

*   **Déclencheurs (Triggers) :**
    *   **Démarrage du bot (`ready`)** : Exécuté une fois au lancement.
    *   **Intervalle (`setInterval`)** : Exécuté périodiquement (configuré via `everyXhours`).
    *   **Commande manuelle** : Via `!autorole`.
*   **Données nécessaires (Data) :**
    *   **Configuration** : `bot.modules.AutoRole` (Token API Olympe, IDs des rôles).
    *   **API Olympe** : Accès aux endpoints `challenges`, `segments`, `teams`.
    *   **Cache Discord** : L'objet `guild` et ses membres doivent être préchargés (`guild.members.fetch()`).

### 2. `processAllTeams(teams, guild, bot)`
Charge et cache les données des équipes depuis l'API Olympe.

*   **Déclencheurs :** Appelé par `autoRole` après récupération de la liste des équipes.
*   **Données nécessaires :**
    *   **Liste des équipes** : Fournie par l'API Olympe.
    *   **Détails API** : Appels supplémentaires (`bot.olympe.api.teams.get`) pour les équipes non mises en cache.

### 3. `processTeamMembers(team, guild, bot)`
Associe les membres Olympe aux utilisateurs Discord correspondants.

*   **Déclencheurs :** Appelé par `processAllTeams` pour chaque équipe.
*   **Données nécessaires :**
    *   **Membres de l'équipe** : Liste contenue dans l'objet Team.
    *   **ID Discord** : Champ `thirdparties.discord.discordID` de l'utilisateur Olympe (ou via recherche API `users/search`).
    *   **Membres Discord** : Vérification de l'existence via `guild.members.fetch`.

### 4. `processAllUsers(users, guild, bot)` & `processUser(...)`
Applique les modifications (rôles et pseudonymes) sur Discord.

*   **Déclencheurs :** Appelé par `autoRole` une fois le cache rempli.
*   **Données nécessaires :**
    *   **Cache Utilisateurs** : Mapping complet UserOlympe <-> UserDiscord (rempli par `processTeamMembers`).
    *   **Configuration des Rôles** : `challengesRolesId` (correspondance ID Olympe -> ID Rôle Discord).
    *   **Règles de nommage** : Format `Pseudo | Team`.

### 5. `processCasterUsers(bot, guild)`
Gère l'attribution des rôles pour les casters/commentateurs.

*   **Déclencheurs :** Appelé par `autoRole` ou manuellement via `!givecasterrole`.
*   **Données nécessaires :**
    *   **Liste des casters** : Récupérée via API (`getCasterUsers`).
    *   **Rôle Caster** : ID du rôle spécial défini dans la configuration.

---

## Actions Discord

Liste des méthodes de l'API `discord.js` utilisées pour interagir avec Discord.

| Méthode | Contexte |
| :--- | :--- |
| `guild.members.fetch()` / `fetch(id)` | Récupération des membres pour lier les comptes Discord aux profils Olympe et vérifier leur présence. |
| `guild.roles.fetch()` | Mise en cache initiale de tous les rôles du serveur pour s'assurer que les IDs de configuration sont valides. |
| `member.roles.add(roles)` | Ajout de rôles à un utilisateur (ex: rôles de compétition, capitaine, caster) basé sur son profil Olympe. |
| `member.roles.remove(roles)` | Suppression des rôles obsolètes ou ne correspondant plus au profil actuel du membre (nettoyage). |
| `member.setNickname(name)` | Renommage du membre pour respecter la convention `Pseudo | NomDeTeam` (tronqué à 32 chars). |
| `user.send({ embeds: ... })` | Envoi de messages privés (DM) contenant des formulaires personnalisés (commandes `castreward`, `casterstat`, `incident`). |
| `channel.send(...)` / `reply(...)` | Confirmation aux utilisateurs lors de l'exécution de commandes manuelles (ex: confirmation de lancement d'autorole). |
| `guild.roles.cache.get(id)` | Récupération d'un objet Role Discord à partir de son ID stocké en configuration. |
