---
title: createslashcommands
layout: default
---

# Commande `createslashcommands`

## Description

Donne le nombre de channel du serveur

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `createslashcommands` |
| **Description** | Donne le nombre de channel du serveur |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
		{
			type: 'STRING',
			name: 'commandename',
			description: 'Nom de la commande a créer',
			required: true,
		},
	]
```

## Fonctionnement

- Cette commande permet de forcer la création ou la mise à jour d'une commande slash (commande d'interaction) spécifique auprès de l'API de Discord.
- C'est un outil de développement/administration utile si une commande ne s'est pas enregistrée correctement au démarrage du bot.
- L'utilisateur doit fournir le nom de la commande à créer en argument.

- **Fonctionnement :**
    1.  La commande récupère la liste de toutes les commandes chargées par le bot.
    2.  Elle parcourt cette liste pour trouver la commande dont le nom (ID) correspond à celui fourni en argument.
    3.  Une fois la commande trouvée, elle instancie cette commande et appelle sa méthode interne \`createSlashCommand()\`. Cette méthode est responsable de l'envoi de la requête à l'API de Discord pour enregistrer la structure de la commande (nom, description, arguments).
    4.  Si la commande est créée avec succès, un message de confirmation est renvoyé.
    5.  Si aucune commande correspondant au nom fourni n'est trouvée, un message d'erreur est renvoyé.
