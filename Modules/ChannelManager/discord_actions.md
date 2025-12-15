# Documentation Technique : ChannelManager

Ce document détaille le fonctionnement du module **ChannelManager**, en listant les fonctions majeures avec leurs déclencheurs et données nécessaires, ainsi que les actions techniques effectuées sur l'API Discord.

## Fonctions Majeures : Triggers & Data

### 1. `autoChannel(bot, guild)`
Fonction principale gérant le cycle de vie complet des salons de matchs (création et nettoyage).

*   **Déclencheurs (Triggers) :**
    *   **Tâche planifiée (Cron)** : Exécution périodique (ex: toutes les X minutes, défini par `cronSchedule`).
    *   **Commande manuelle** : Via `!autochannel`.
*   **Données nécessaires (Data) :**
    *   **API Olympe** : Récupération des `getFutureMatchs` (à venir) et `getPastMatchs` (passés).
    *   **Configuration** : `maximumNumberOfHoursToRetrieveFutureMatches` (anticipation création) et `maximumMatchDuration` (délai suppression).

### 2. `createMatchChannels(bot, match, guild)`
Crée l'infrastructure de salons pour un match spécifique (Catégorie, Vocaux, Textuel).

*   **Déclencheurs :** Appelé par `autoChannel` pour chaque match imminent, ou manuellement via `!creatematch`.
*   **Données nécessaires (Data) :**
    *   **Objet Match** : Date (pour le nom), Équipes (noms), Casters (IDs), Segment (pour la catégorie).
    *   **Config AutoRole** : IDs des rôles (`roleIds`) pour configurer les permissions d'accès (`permissionOverwrites`) des joueurs et casters.

### 3. `washOldChannels(guild, exceptionName)`
Supprime les salons devenus obsolètes.

*   **Déclencheurs :** Appelé par `autoChannel` à la fin du processus de création, ou manuellement via `!washmatch`.
*   **Données nécessaires (Data) :**
    *   **Exceptions** : Liste des noms de salons valides (venant d'être créés/vérifiés) à ne PAS supprimer.
    *   **Metadonnées Salon** : `createdTimestamp` (âge du salon) et `members.size` (occupation actuelle) pour éviter de supprimer un salon actif.

### 4. `washEmptyCategory(bot, guild)`
Nettoie les catégories de division vides.

*   **Déclencheurs :** Appelé par `autoChannel` après le nettoyage des salons.
*   **Données nécessaires (Data) :**
    *   **Structure Discord** : Analyse des catégories (`GuildCategory`) pour identifier celles n'ayant plus de salons enfants (`children.cache.size === 0`).

---

## Actions Discord

Liste des méthodes de l'API `discord.js` utilisées pour interagir avec Discord.

| Méthode | Contexte |
| :--- | :--- |
| `guild.channels.create(options)` | Création de catégories, salons vocaux (équipes, casters, gradins) et salons textuels pour les matchs. |
| `guild.channels.delete(channel)` | Suppression des salons de matchs expirés et des catégories vides. |
| `channel.permissionOverwrites.set(permissions)` | Configuration des permissions d'accès (View, Connect, Speak) pour les joueurs, casters et rôles spécifiques. |
| `guild.members.fetch(id)` | Récupération des objets membres pour les ajouter aux permissions des salons privés. |
| `guild.channels.fetch()` | Mise en cache de la structure actuelle des salons du serveur. |
| `channel.send(message)` | Envoi de messages (automatisé via `mentionUsersInChannel`) dans les salons textuels de match pour pinger les participants. |
| `category.children.create(...)` | Création de salons enfants directement rattachés à une catégorie de division spécifique. |
