---
title: addusertochannel
layout: default
---

# Commande `addusertochannel`

## Description

Add a user to a channel

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `addusertochannel` |
| **Description** | Add a user to a channel |
| **Permissions User** | `['ManageChannels']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
		{
			type: 'CHANNEL',
			name: 'channel',
			description: 'The channel to add the users to',
			required: true,
		},
		{
			type: 'USER',
			name: 'user1',
			description: 'The user to add',
			required: true,
		},
		{
			type: 'USER',
			name: 'user2',
			description: 'The user to add',
			required: false,
		},
		{
			type: 'USER',
			name: 'user3',
			description: 'The user to add',
			required: false,
		},
	]
```

## Fonctionnement

- **ATTENTION : Cette commande est actuellement désactivée (le \`module.exports\` est en commentaire).**
- L'objectif de cette commande est d'ajouter jusqu'à trois utilisateurs à un salon spécifique.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande prend en argument un salon cible (\`channel\`) et au moins un utilisateur (\`user1\`). Deux autres utilisateurs (\`user2\`, \`user3\`) sont optionnels.
    2.  Elle identifie le salon sur le serveur.
    3.  Elle parcourt la liste des utilisateurs fournis en argument.
    4.  Pour chaque utilisateur, elle appelle la fonction \`addUserToChannel\` du service Discord. Cette fonction est responsable de modifier les permissions du salon pour y ajouter l'utilisateur.
    5.  Une fois tous les utilisateurs traités, elle renvoie un message de confirmation.
