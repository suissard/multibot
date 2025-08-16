---
title: help
layout: default
---

# Commande `help`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `help` |
| **Description** | N/A |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

La commande `help` est conçue pour assister les utilisateurs en fournissant des informations sur les commandes du bot. Son comportement s'adapte en fonction de la demande de l'utilisateur.

1.  **Aide ciblée** : Si un utilisateur passe le nom d'une commande en argument (par exemple, `/help ping`), la commande `help` recherche cette commande spécifique. Si elle la trouve, elle génère et envoie un message "embed" contenant les détails de cette commande (description, arguments, etc.).

2.  **Aide générale** : Si aucun argument n'est fourni, la commande `help` dresse une liste de toutes les commandes disponibles. Elle formate cette liste dans un ou plusieurs messages "embeds" intitulés "Liste des commandes" et les envoie à l'utilisateur. Cette approche garantit que même une longue liste de commandes peut être affichée de manière lisible.
