---
title: numberofchans
layout: default
---

# Commande `numberofchans`

## Description

Donne le nombre de channel du serveur

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `numberofchans` |
| **Description** | Donne le nombre de channel du serveur |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- La commande récupère le nombre total de salons (channels) actuellement présents sur le serveur.
- Elle accède à la collection \`channels.cache\` de l'objet \`guild\` (serveur) pour en obtenir la taille.
- Elle retourne une simple chaîne de caractères indiquant ce nombre, avec un rappel de la limite de 500 salons par serveur sur Discord.
