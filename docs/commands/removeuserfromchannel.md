---
title: removeuserfromchannel
layout: default
---

# Commande `removeuserfromchannel`

## Description

Remove a user from a channel

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `removeuserfromchannel` |
| **Description** | Remove a user from a channel |
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
			description: 'The channel to remove the users from',
			required: true,
		},
		{
			type: 'USER',
			name: 'user1',
			description: 'The user to remove',
			required: true,
		},
		{
			type: 'USER',
			name: 'user2',
			description: 'The user to remove',
			required: false,
		},
		{
			type: 'USER',
			name: 'user3',
			description: 'The user to remove',
			required: false,
		},
	]
```

## Fonctionnement

- **ATTENTION : Cette commande est actuellement désactivée (le \`module.exports\` est en commentaire).**
- L'objectif de cette commande est de retirer l'accès à un salon spécifique pour un à trois utilisateurs.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande prend en argument un nom de salon (\`channel\`) et au moins un utilisateur (\`user1\`).
    2.  Elle recherche le salon sur le serveur en se basant sur son **nom**, ce qui peut être source d'erreurs si plusieurs salons ont le même nom.
    3.  Elle parcourt la liste des utilisateurs fournis en argument.
    4.  Pour chaque utilisateur, elle appelle la fonction \`removeUserFromChannel\` du service Discord, qui supprime les permissions spécifiques de l'utilisateur sur ce salon, lui en retirant de fait l'accès.
    5.  Une fois tous les utilisateurs traités, elle renvoie un message de confirmation.
