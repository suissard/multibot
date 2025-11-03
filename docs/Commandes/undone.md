---
title: undone
layout: default
---

# `undone`

Rouvre un ticket

## Narrative


- Cette commande est conçue pour être utilisée dans un salon (canal) qui représente un "ticket" qui a été fermé.
- Son but est de rouvrir un ticket.
- Elle vérifie si le nom du salon actuel commence déjà par l'emoji "❌".
- Si ce n'est pas le cas, elle modifie le nom du salon :
    - Elle supprime tout emoji "✅" qui pourrait exister dans le nom (provenant de la commande \`/done\`).
    - Elle ajoute l'emoji "❌" au début du nom pour indiquer que le ticket est de nouveau ouvert ou en attente.
- Elle retourne ensuite un message "Ticket réouvert ! ✅" pour confirmer l'action.
- Si le salon est déjà marqué comme non résolu (commence par "❌"), elle ne fait rien et retourne un message d'échec.


Exécute la commande pour marquer un ticket comme "non terminé" ou le rouvrir. Renomme le salon actuel en ajoutant un préfixe "❌" pour indiquer qu'il est en cours.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `string` - message de confirmation ou d'échec.

