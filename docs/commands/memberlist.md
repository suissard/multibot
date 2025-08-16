---
title: memberlist
layout: default
---

# Commande `memberlist`

## Description

Renvoie la liste des utilisateurs qui ont le rôle mentiionné

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `memberlist` |
| **Description** | Renvoie la liste des utilisateurs qui ont le rôle mentiionné |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

La commande requiert un unique argument obligatoire :

-   `role` (rôle, obligatoire) : Le rôle dont vous souhaitez obtenir la liste des membres.

## Fonctionnement du Code

Cette commande est utilisée pour obtenir la liste de tous les membres d'un serveur qui possèdent un rôle spécifique.

1.  **Mise à jour des données** : La commande commence par rafraîchir la liste des membres du serveur pour garantir l'exactitude des informations.

2.  **Récupération des membres** : Elle identifie le rôle spécifié dans les arguments et récupère la collection de tous les membres qui le possèdent.

3.  **Gestion du cas vide** : Si aucun membre ne possède ce rôle, la commande retourne un simple message indiquant que le rôle n'est attribué à personne.

4.  **Construction de la liste** : Si des membres sont trouvés, la commande parcourt la liste de ces membres et construit une chaîne de caractères contenant la mention de chaque utilisateur, les séparant par des virgules.

5.  **Création de l'Embed** : Une fois la liste textuelle prête, la commande crée un message "embed" (un format de message Discord riche) :
    -   Le **titre** de l'embed indique le nombre total de membres trouvés et le nom du rôle concerné.
    -   La **description** de l'embed contient la liste des mentions des membres.

6.  **Envoi du résultat** : L'embed ainsi créé est retourné et envoyé dans le canal, affichant de manière claire et organisée la liste des membres du rôle.
