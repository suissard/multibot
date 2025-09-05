---
title: invite
layout: default
---

# Commande `invite`

## Description

Récupérer un lien d\invitation pour faire venir le Getibot dans ton discord

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `invite` |
| **Description** | Récupérer un lien d\invitation pour faire venir le Getibot dans ton discord |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- La commande a pour but de fournir un lien d'invitation pour que les utilisateurs puissent ajouter ce bot à leur propre serveur Discord.
- Elle contient une liste de réponses textuelles amusantes et prédéfinies.
- À chaque exécution, elle choisit une de ces réponses de manière aléatoire.
- Elle construit ensuite le lien d'invitation OAuth2 du bot en utilisant l'ID client du bot actuellement connecté. Le lien demande des permissions d'administrateur (\`permissions=8\`).
- Finalement, elle renvoie une chaîne de caractères combinant la réponse amusante choisie et le lien d'invitation généré.
