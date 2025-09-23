---
title: index
layout: default
---

# `index`

Ce module a pour but de notifier les membres de la communauté des matchs à venir. À l'aide d'une tâche planifiée (cron), il interroge régulièrement l'API pour obtenir la liste des futurs matchs. Pour chaque match, il vérifie si la date de début est proche et si des casters y ont été assignés. Si c'est le cas, et qu'aucune notification n'a déjà été envoyée pour ce match, il publie un message dans le salon de notification approprié. Ce message mentionne les équipes, la division, l'heure du match, les casters, et notifie également le rôle Discord correspondant pour assurer une visibilité maximale.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` | - L'instance du bot. |

