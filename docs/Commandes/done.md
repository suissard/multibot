---
title: done
layout: default
---

# `done`

## Description

Clos un ticket

## Narrative


- La commande est conçue pour être utilisée dans un salon (canal) qui représente un "ticket".
- Elle vérifie si le nom du salon actuel commence déjà par l'emoji "✅".
- Si ce n'est pas le cas, elle modifie le nom du salon :
    - Elle supprime tout emoji "❌" qui pourrait exister dans le nom.
    - Elle ajoute l'emoji "✅" au début du nom.
- Elle retourne ensuite un message "Ticket clos ! ✅" pour confirmer l'action.
- Si le salon est déjà marqué comme clos (commence par "✅"), elle ne fait rien et retourne un message d'échec.


Exécute la commande pour marquer un ticket comme "terminé". Renomme le salon actuel en ajoutant un préfixe "✅" pour indiquer qu'il est clos.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `string` - message de confirmation ou d'échec.

