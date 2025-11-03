---
title: mute
layout: default
---

# `mute`

## Narrative


- Cette commande permet de rendre un utilisateur muet sur le serveur.
- Elle nécessite la permission "Bannir des membres" (\`BanMembers\`).

- **Fonctionnement :**
    1.  La commande cible un utilisateur spécifié en argument.
    2.  Elle recherche un rôle nommé "mute". Si ce rôle n'existe pas, elle le crée.
    3.  Elle recherche un salon textuel nommé "tu-as-été-mute". Si ce salon n'existe pas, il est créé avec des permissions qui le rendent privé.
    4.  Si l'utilisateur n'est pas déjà muet (ne possède pas le rôle "mute"), la commande procède :
        a.  Elle ajoute le rôle "mute" à l'utilisateur.
        b.  Elle envoie un message dans le salon "tu-as-été-mute" pour informer l'utilisateur qu'il peut y communiquer avec les administrateurs.
        c.  Elle parcourt **tous les salons** du serveur pour modifier les permissions de l'utilisateur rendu muet :
            - Elle lui retire la permission de voir le salon.
        d.  Elle accorde explicitement à l'utilisateur la permission de voir et d'envoyer des messages dans le salon "tu-as-été-mute".
    5.  Si une raison est fournie, elle est incluse dans le message de confirmation.
    6.  Si l'utilisateur possède déjà le rôle "mute", la commande renvoie un message indiquant qu'il est déjà muet.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `user` | `USER` | User à mute | Yes |
| `raison` | `STRING` | Raison du mute | No |

Exécute la commande pour rendre un utilisateur muet sur le serveur. Applique un rôle "mute" à l'utilisateur, ce qui restreint son accès aux salons, et lui donne accès à un salon spécial pour communiquer avec les modérateurs. Crée le rôle et le salon s'ils n'existent pas.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur à rendre muet. |
| `args.raison` | `string` | - La raison pour laquelle l'utilisateur est rendu muet. |

**Returns:** `Promise<string>` - message de confirmation ou un message indiquant que l'utilisateur est déjà muet.

