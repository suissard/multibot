---
title: autorole
layout: default
---

# Commande `autorole`

## Description

Ajoute les roles discord dun utilisateur en lien avec la competition Olympe

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `autorole` |
| **Description** | Ajoute les roles discord dun utilisateur en lien avec la competition Olympe |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
		{
			type: 'USER',
			name: 'user',
			description: 'Utilisateur a mettre a jour',
			required: false,
		},
		{
			type: 'STRING',
			name: 'teamid',
			description: 'Identifiant de team a mettre a jour',
			required: false,
		},
	]
```

## Fonctionnement

- Cette commande permet de lancer manuellement le processus d'attribution automatique des rôles liés à la compétition Olympe.
- Elle offre trois modes de fonctionnement :

- **1. Mode général (aucun argument) :**
    - Si aucun argument n'est fourni, la commande lance la fonction \`autoRole()\` pour l'ensemble du serveur.
    - Cette fonction va probablement scanner tous les membres et mettre à jour leurs rôles en fonction des données de la compétition.
    - Elle renvoie un message immédiat indiquant que le processus est en cours, puis un message de confirmation une fois terminé.

- **2. Mode par utilisateur (\`user\`) :**
    - Si un utilisateur est mentionné, la commande exécute \`processFromDiscordUserId()\` pour cet utilisateur spécifique.
    - Elle met à jour les rôles uniquement pour cet utilisateur.
    - Si l'utilisateur n'est pas trouvé dans les données de la compétition, un message d'erreur est renvoyé.

- **3. Mode par équipe (\`teamid\`) :**
    - Si un ID d'équipe Olympe est fourni, la commande exécute \`processFromOlympeTeamId()\`.
    - Elle met à jour les rôles pour tous les membres de cette équipe spécifique.
    - Si l'équipe n'est pas trouvée, un message d'erreur est renvoyé.
