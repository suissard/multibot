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

## Fonctionnement

- Au moment du chargement initial du fichier de commande (et non à chaque exécution), le contenu du fichier \`PRIVACY.md\` situé à la racine du projet est lu et stocké en mémoire.
- Lorsque la commande est exécutée, elle retourne simplement le contenu de ce fichier qui a été préalablement chargé.
- Cela permet d'afficher la politique de confidentialité du bot directement dans Discord.
