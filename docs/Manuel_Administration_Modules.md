# Manuel d'Administration des Modules Olympe

Ce document fournit une vue d'ensemble fonctionnelle et un guide de dépannage pour les modules **AutoRole**, **ChannelManager** et **MatchNotifier**. Il est destiné aux administrateurs du bot pour comprendre le fonctionnement automatique et savoir comment intervenir manuellement en cas de problème.

---

## 1. Module AutoRole

### Fonctionnement Automatique
Ce module synchronise les rôles Discord des membres avec les données de l'API Olympe.
- **Fréquence :** La synchronisation s'exécute automatiquement toutes les **8 heures** (par défaut) et au démarrage du bot.
- **Action :** Il vérifie les équipes, les capitaines et les casters enregistrés sur Olympe et attribue les rôles Discord correspondants.

### Commandes Manuelles (Secours)
En cas de dysfonctionnement (ex: un nouveau membre n'a pas ses rôles immédiatement), utilisez ces commandes.

| Commande | Arguments | Description |
| :--- | :--- | :--- |
| `!autorole` | *Aucun* | Lance une synchronisation **globale** de tout le serveur. <br>⚠️ Peut être long si le serveur a beaucoup de membres. |
| `!autorole` | `user=<@User>` | Synchronise uniquement l'utilisateur mentionné. <br>Ex: `!autorole user=@Jules` |
| `!autorole` | `teamid=<ID_Team>` | Synchronise tous les membres d'une équipe Olympe spécifique. |
| `!givecasterrole` | *Aucun* | Force la mise à jour spécifique des rôles "Caster". |

### Dysfonctionnements & Solutions

**Scénario 1 : Un joueur a rejoint le serveur mais n'a pas son rôle d'équipe.**
- **Cause possible :** Le cycle automatique de 8h n'est pas encore passé.
- **Solution :** Lancez `!autorole user=@LeJoueur`.

**Scénario 2 : Une équipe entière n'a pas ses rôles.**
- **Cause possible :** L'équipe vient d'être créée sur Olympe.
- **Solution :** Récupérez l'ID de l'équipe sur Olympe et lancez `!autorole teamid=L_ID_DE_L_EQUIPE`.

**Scénario 3 : Les casters n'ont pas leur rôle.**
- **Solution :** Lancez `!givecasterrole`.

---

## 2. Module ChannelManager

### Fonctionnement Automatique
Ce module gère le cycle de vie des salons de match (textuels et vocaux).
- **Création :** Un Cron vérifie régulièrement les matchs à venir et crée les salons nécessaires avec les permissions adéquates pour les équipes.
- **Nettoyage :** Il supprime automatiquement les salons des matchs terminés après un certain délai.

### Commandes Manuelles (Secours)

| Commande | Arguments | Description |
| :--- | :--- | :--- |
| `!autochannel` | *Aucun* | Force le cycle complet de vérification (création des futurs matchs et nettoyage des anciens). |
| `!creatematch` | `matchid=<ID_Match>` | Crée manuellement les salons pour un match spécifique (utile si le bot a raté un match). <br>Ex: `!creatematch matchid=12345` |
| `!washmatchs` | *Aucun* | Force la suppression des anciens salons de match. |

> **Note :** Les commandes `!addusertochannel` et `!removeuserfromchannel` sont actuellement **désactivées** dans le code.

### Dysfonctionnements & Solutions

**Scénario 1 : Les salons d'un match ne se sont pas créés.**
- **Cause possible :** Le bot était éteint au moment de la vérification ou l'API Olympe était inaccessible.
- **Solution :** Récupérez l'ID du match et lancez `!creatematch matchid=ID_DU_MATCH`.

**Scénario 2 : Les anciens salons ne se suppriment pas.**
- **Solution :** Lancez `!washmatchs`.

**Scénario 3 : Le bot ne semble plus rien gérer.**
- **Solution :** Lancez `!autochannel` pour forcer une "mise à jour" de l'état des salons.

---

## 3. Module MatchNotifier

### Fonctionnement Automatique
Ce module notifie la communauté des matchs à venir.
- **Action :** Il scanne les matchs futurs et poste une annonce dans le salon dédié (avec mention des équipes, heure, et casters) si le match est proche.
- **Condition :** Le match doit avoir des casters assignés pour être notifié (selon la logique actuelle).

### Commandes Manuelles (Secours)
Bien que le module soit principalement automatique, la commande de notification se trouve techniquement dans le gestionnaire de salons.

| Commande | Arguments | Description |
| :--- | :--- | :--- |
| `!notifymatch` | `matchid=<ID>` `[role=<@Role>]` | Envoie manuellement l'annonce d'un match dans le salon courant. <br>Ex: `!notifymatch matchid=12345` |

### Dysfonctionnements & Solutions

**Scénario 1 : Un match important n'a pas été annoncé.**
- **Cause possible :** Pas de casters assignés ou problème temporaire d'API.
- **Solution :**
    1. Allez dans le salon d'annonces approprié.
    2. Lancez `!notifymatch matchid=ID_DU_MATCH`.
    3. (Optionnel) Vous pouvez spécifier un rôle à mentionner en plus.

**Scénario 2 : Le bot annonce le match deux fois.**
- **Cause possible :** Le cache de "déjà notifié" a été perdu (redémarrage du bot).
- **Solution :** Pas d'action immédiate possible pour annuler, mais le système est conçu pour éviter cela en temps normal via un cache mémoire.
