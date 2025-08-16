---
title: privacypolicy
layout: default
---

# Commande `privacypolicy`

## Description

Fournit la politique de confidentialité du bot

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `privacypolicy` |
| **Description** | Fournit la politique de confidentialité du bot |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

L'exécution de cette commande est très simple. Elle a pour unique but d'afficher la politique de confidentialité du bot.

Le texte de cette politique est stocké dans une variable au sein du code du bot. Lorsque la commande est appelée, elle retourne simplement le contenu de cette variable, qui est ensuite affiché à l'utilisateur.
