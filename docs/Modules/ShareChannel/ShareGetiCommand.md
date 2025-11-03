---
title: ShareGetiCommand
layout: default
---

# `ShareGetiCommand`

Définit ce salon pour partager les annonces Geti

## Narrative


- Cette commande est un raccourci pour désigner le salon actuel comme un salon de partage pour les annonces "Geti" (probablement GeekingTime).
- Elle ne nécessite aucune permission particulière pour être utilisée.
- Elle ne prend aucun argument.

- **Fonctionnement :**
    1.  La commande cible directement le groupe de partage "overwatch-geti".
    2.  Elle ajoute le salon dans lequel la commande a été exécutée à ce groupe de partage spécifique.
    3.  Elle renvoie ensuite un message confirmant que les annonces GeekingTime seront désormais publiées dans ce salon.


Exécute la commande pour définir le salon actuel comme un salon de partage pour les annonces "Geti". Ajoute le salon au groupe de partage "overwatch-geti".

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `Promise<string>` - message de confirmation.

