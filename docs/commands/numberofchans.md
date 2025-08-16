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

## Fonctionnement du Code

Le fonctionnement de cette commande est très direct. Lorsqu'elle est exécutée, elle accède à la liste des canaux du serveur mise en cache par le bot, compte le nombre total de canaux (textuels, vocaux, catégories, etc.), et retourne un message simple indiquant ce nombre.

La réponse est formatée pour montrer le nombre actuel de canaux par rapport à la limite de 500 imposée par Discord.
