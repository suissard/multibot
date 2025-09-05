---
title: shareinfo
layout: default
---

# Commande `shareinfo`

## Description

Récuperer les infos sur ce salon partagé

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `shareinfo` |
| **Description** | Récuperer les infos sur ce salon partagé |
| **Permissions User** | `['MANAGE_CHANNELS']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- Cette commande permet d'obtenir des informations sur le groupe de partage auquel le salon actuel appartient.
- Elle nécessite la permission "Gérer les salons" (\`MANAGE_CHANNELS\`).
- Elle ne prend aucun argument.

- **Fonctionnement :**
    1.  La commande recherche l'ID du salon actuel dans la liste de tous les salons partagés.
    2.  Si l'ID est trouvé, cela signifie que le salon fait partie d'un groupe de partage.
    3.  Elle appelle alors la méthode \`channelInfo()\` de l'objet "ShareChannel" correspondant. Cette méthode est responsable de formater et de retourner les informations sur le groupe (nom, nombre de salons, etc.).
    4.  Si l'ID du salon n'est trouvé dans aucun groupe de partage, elle renvoie un message indiquant que le salon n'est pas partagé.
