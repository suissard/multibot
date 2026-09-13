---
title: unmute
layout: default
---

# `unmute`

> **Description :** Annule le statut muet d'un utilisateur, restaurant son accès aux salons.

## Narrative


- Cette commande permet de retirer le statut "muet" d'un utilisateur, restaurant son accès normal aux salons.
- Elle nécessite la permission "Bannir des membres" (\`BanMembers\`).

- **Fonctionnement :**
    1.  La commande cible un utilisateur spécifié en argument.
    2.  Elle recherche le rôle "mute" sur le serveur.
    3.  Elle vérifie si l'utilisateur cible possède bien ce rôle.
    4.  Si l'utilisateur est bien muet :
        a.  Elle lui retire le rôle "mute".
        b.  Elle parcourt **tous les salons** du serveur pour supprimer toutes les permissions spécifiques (surécritures) qui avaient été appliquées à cet utilisateur. Cela a pour effet de restaurer ses permissions par défaut, lui redonnant accès aux salons.
        c.  Elle supprime également les permissions spécifiques de l'utilisateur sur le salon "tu-as-été-mute".
    5.  Si l'utilisateur n'était pas muet au départ, la commande renvoie un message l'indiquant et ne fait rien.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `user` | <span class="badge badge-type">USER</span> | User à unmute | <span class="badge badge-required">Requis</span> |

Exécute la commande pour enlever le statut muet d'un utilisateur. Supprime le rôle "mute" de l'utilisateur et restaure ses permissions sur tous les salons.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.user` | <span class="badge badge-type">string</span> | - L'ID de l'utilisateur à démuter. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou un message indiquant que l'utilisateur n'était pas muet.

