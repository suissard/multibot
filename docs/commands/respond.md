---
title: respond
layout: default
---

# Commande `respond`

## Description

Répond au message du secretary

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `respond` |
| **Description** | Répond au message du secretary |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande est utilisée pour répondre à un utilisateur dans le cadre du module "Secretary".

-   `texte` (texte, optionnel) : Le message textuel à envoyer en réponse.
-   `fichier` (pièce jointe, optionnel) : Un fichier (par exemple, une image) à joindre à la réponse.

*Note : Vous devez fournir au moins un texte ou un fichier.*

## Fonctionnement du Code

Cette commande est un outil spécialisé pour permettre au staff de répondre à un utilisateur via le système de "secrétariat" (qui fonctionne probablement comme un système de tickets).

1.  **Vérification des Permissions** : Avant tout, la commande vérifie que l'utilisateur a le droit d'utiliser cette fonctionnalité en s'assurant qu'il opère depuis un serveur géré par le module Secretary.

2.  **Extraction du Destinataire** : La commande est conçue pour être utilisée dans des canaux ayant un format de nom spécifique (par exemple, `ticket-ID_UTILISATEUR`). Elle utilise une expression régulière pour extraire l'ID de l'utilisateur directement depuis le nom du canal. Si le nom du canal ne correspond pas à ce format, la commande échoue.

3.  **Préparation de la Réponse** : La réponse est construite sous la forme d'un message "embed" :
    -   Si un fichier est joint à la commande, il est ajouté comme image dans l'embed.
    -   Si un message texte est fourni, il est formaté et ajouté comme description de l'embed.

4.  **Double Envoi** : C'est la partie la plus importante. La réponse est envoyée à deux endroits :
    -   **En Message Privé** : L'embed est envoyé directement à l'utilisateur identifié à l'étape 2. C'est la réponse privée.
    -   **Dans le Canal** : Le même embed est envoyé dans le canal où la commande a été tapée. Cela sert de journal public pour le staff, montrant la réponse qui a été envoyée.

5.  **Confirmation** : Une fois les messages envoyés, une confirmation finale est affichée dans le canal du staff.
