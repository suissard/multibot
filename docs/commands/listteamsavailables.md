---
title: listteamsavailables
layout: default
---

# Commande `listteamsavailables`

## Description

Renvoie la liste des teams disponibles pour un challenge donné

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `listteamsavailables` |
| **Description** | Renvoie la liste des teams disponibles pour un challenge donné |
| **Permissions User** | `[]` |
| **Permissions Bot** | `['SEND_MESSAGES']` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'INTEGER',
            name: 'challengeid',
            description: 'ID du challenge pour lequel lister les équipes',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
methode(args) {
        const challengeId = args.challengeid;

        if (!this.bot.olympe || !this.bot.olympe.api) {
            return "Le module Olympe n'est pas correctement initialisé. Veuillez contacter un administrateur.";
        }

        if (!challengeId) {
            try {
                const challenges = await this.bot.olympe.api.GET('challenges');
                if (!challenges || challenges.length === 0) {
                    return "Aucun challenge n'a été trouvé.";
                }

                let response = "Veuillez spécifier un ID de challenge. Voici les challenges disponibles :\n";
                // The API returns an object with a 'challenges' property which is the array
                const challengesArray = challenges.challenges || challenges;
                for (const challenge of challengesArray) {
                    response += `\n**${challenge.id}** : ${challenge.name}`;
                }
                return response;
            } catch (error) {
                console.error(error);
                return "Une erreur est survenue en récupérant la liste des challenges.";
            }
        }

        try {
            const teams = await getAllTeamsFromChallenge(this.bot, String(challengeId));
            if (!teams || teams.length === 0) {
                return `Aucune équipe disponible trouvée pour le challenge ID ${challengeId}.`;
            }

            const teamNames = teams.map(team => team.name);

            let response = `--- Équipes disponibles pour le challenge n°${challengeId} ---\n`;
            while (teamNames.length > 0) {
                const nextTeam = teamNames.shift();
                // Check if adding the next team exceeds the Discord message limit
                if (response.length + nextTeam.length + 1 > 2000) {
                    await this.answerToUser(response);
                    response = "";
                }
                response += nextTeam + "\n";
            }

            if (response) {
                await this.answerToUser(response + `\n--- Fin de la liste ---`);
            }

            return '✅ La liste des équipes a été envoyée.'; // Final confirmation message
        } catch (error) {
            console.error(error);
            return `Une erreur est survenue lors de la récupération des équipes pour le challenge ID ${challengeId}.`;
        }
    }
```
