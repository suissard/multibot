---
title: help
layout: default
---

# `help`

Permet d\'obtenir le détail des commandes

## Narrative


- Cette commande a deux modes de fonctionnement :
    1.  **Afficher la liste de toutes les commandes :** Si aucun nom de commande spécifique n'est fourni.
    2.  **Afficher les détails d'une commande :** Si un nom de commande est passé en argument.

- **Mode Liste :**
    - La commande récupère la liste de toutes les commandes enregistrées dans le bot.
    - Elle filtre les commandes qui ne sont pas destinées à être affichées publiquement (celles avec \`help = false\`), à moins que l'utilisateur ne soit un développeur.
    - Elle construit un ou plusieurs messages "embed" pour afficher la liste. Si la liste est trop longue (plus de 20 commandes), elle est automatiquement divisée en plusieurs messages.
    - Chaque commande dans la liste est affichée avec son nom et sa description.

- **Mode Détail :**
    - Si l'utilisateur fournit un nom de commande valide, la commande recherche cette commande spécifique.
    - Elle génère un message "embed" détaillé qui inclut :
        - Le nom de la commande.
        - Sa description.
        - Des instructions sur comment l'utiliser (\`howTo\`), en remplaçant les placeholders comme 'PREFIX' par la configuration actuelle du bot.


Construit et retourne une liste de noms de commandes à afficher. Filtre les commandes qui ne sont pas censées être affichées dans l'aide, sauf pour les développeurs.

**Returns:** `Array<string>` - tableau trié des noms de commandes.

Crée un ou plusieurs `EmbedBuilder` à partir d'une liste de noms de commandes. Sépare les commandes en plusieurs embeds si la liste dépasse 20 champs.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `arrayHelp` | `Array<string>` | - Un tableau contenant les noms des commandes à afficher. |

**Returns:** `Array<Discord.EmbedBuilder>` - tableau d'objets EmbedBuilder prêts à être envoyés.

Crée un `EmbedBuilder` pour afficher l'aide détaillée d'une commande spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `command` | `string` | - Le nom de la commande pour laquelle afficher les détails. |

**Returns:** `Discord.EmbedBuilder` - objet EmbedBuilder avec les détails de la commande.

Exécute la commande d'aide. Affiche l'aide détaillée si un nom de commande est fourni, sinon affiche la liste de toutes les commandes.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `options` | `object` | - Les options de l'interaction (non utilisé ici, semble basé sur un ancien système d'args). |

