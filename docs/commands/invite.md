---
title: invite
layout: default
---

# Commande `invite`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `invite` |
| **Description** | N/A |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

L'objectif de cette commande est de fournir un lien d'invitation pour permettre aux utilisateurs d'ajouter le bot à leurs propres serveurs Discord. Le processus est rendu plus interactif et amusant :

1.  **Préparation des réponses** : La commande dispose d'une liste prédéfinie de réponses textuelles. Ces réponses sont conçues pour être humoristiques, engageantes ou surprenantes.

2.  **Sélection aléatoire** : À chaque fois que la commande est appelée, elle choisit une de ces réponses de manière complètement aléatoire.

3.  **Génération du lien** : La commande construit dynamiquement le lien d'invitation OAuth2 de Discord. Ce lien est unique au bot et inclut les permissions nécessaires (`permissions=8`, ce qui correspond à "Administrateur").

4.  **Envoi de la réponse** : Finalement, la commande combine la réponse aléatoire avec le lien d'invitation et envoie le tout à l'utilisateur, créant ainsi une expérience plus personnelle et divertissante.
