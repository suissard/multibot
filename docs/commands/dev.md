---
title: dev
layout: default
---

# Commande `dev`

## Description

Execute le code javascript indiqué dans le message

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `dev` |
| **Description** | Execute le code javascript indiqué dans le message |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- Cette commande est réservée exclusivement au propriétaire du bot (devBoss).
- Elle prend en entrée une chaîne de caractères qui est du code JavaScript.
- Elle exécute ce code directement en utilisant \`eval()\`.
- **AVERTISSEMENT :** L'utilisation de \`eval()\` est extrêmement dangereuse et ne doit être utilisée qu'en toute connaissance de cause, car elle peut exposer le bot et le système à des risques de sécurité majeurs.
- Si le code exécuté retourne un résultat, celui-ci est renvoyé à l'utilisateur.
- En cas d'erreur lors de l'exécution, la commande renvoie le message d'erreur et la pile d'appels (stack trace) à l'utilisateur.
