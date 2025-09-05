---
title: event
layout: default
---

# Commande `event`

## Description

Gère les événements, incluant laffichage dinfos, la gestion des équipes et le nettoyage.

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `event` |
| **Description** | Gère les événements, incluant laffichage dinfos, la gestion des équipes et le nettoyage. |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'info = tableau des teams, team = ajout de rôle team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'users',
            description: 'user aux quels il faut ajouter le rôle de team',
            required: false,
        },
    ]
```

## Fonctionnement

- Cette commande sert de point d'entrée pour plusieurs sous-commandes liées à la gestion d'événements.
- L'argument 'texte' détermine quelle action effectuer : 'info', 'team', ou 'wash'.

- **Sous-commande 'info' :**
    - Scanne tous les salons du serveur pour trouver ceux dont le nom correspond au format "Team [...]".
    - Pour chaque salon trouvé, récupère les informations de l'équipe correspondante depuis la base de données.
    - Génère et affiche un message "embed" qui liste toutes les équipes trouvées avec leurs détails (capitaine, nom en jeu, rang).
    - S'il n'y a aucune équipe, l'embed l'indique.

- **Sous-commande 'team' :**
    - Permet à un capitaine d'équipe d'ajouter le rôle de son équipe à d'autres membres.
    - L'argument 'users' doit contenir les mentions des utilisateurs à qui ajouter le rôle.
    - La commande identifie le rôle de l'équipe de l'auteur de la commande (le capitaine).
    - Elle applique ensuite ce rôle à tous les utilisateurs mentionnés.
    - Des vérifications sont en place pour s'assurer que le capitaine a bien un seul rôle d'équipe.

- **Sous-commande 'wash' :**
    - **Action réservée aux administrateurs.**
    - Effectue un nettoyage complet de tous les éléments liés aux équipes sur le serveur.
    - Supprime tous les salons de texte dont le nom correspond à "Team [...]".
    - Retire le rôle "Capitaine" de tous les membres qui le possèdent.
    - Supprime tous les rôles dont le nom correspond à "Team [...]".
    - Envoie des messages de confirmation pour chaque type d'élément nettoyé.
