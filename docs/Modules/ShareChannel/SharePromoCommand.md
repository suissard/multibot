---
title: SharePromoCommand
layout: default
---

# `SharePromoCommand`

> **Description :** Partager un message format embed sur ce salon partagé

## Narrative


- Cette commande permet d'envoyer un message promotionnel (un "embed") à tous les salons faisant partie du même groupe de partage que le salon actuel.
- Elle nécessite la permission "Administrateur" (\`ADMINISTRATOR\`).

- **Arguments :**
    - \`texte\` (requis) : Le contenu principal du message. Les séquences spéciales comme \`%%\` sont converties en sauts de ligne.
    - \`imageurl\` (optionnel) : L'URL d'une image à inclure dans le message.

- **Fonctionnement :**
    1.  La commande vérifie si le salon actuel fait bien partie d'un groupe de partage.
    2.  Si c'est le cas, elle identifie le groupe et construit un message "embed" avec le texte et l'image fournis.
    3.  Elle parcourt ensuite la liste de tous les salons de ce groupe.
    4.  Elle envoie l'embed dans chaque salon du groupe, propageant ainsi le message sur tous les serveurs connectés.
    5.  Une barre de chargement est affichée pendant le processus d'envoi.
    6.  Si le salon actuel n'est pas un salon partagé, elle renvoie un message d'erreur.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `texte` | <span class="badge badge-type">STRING</span> | Message à envoyer | <span class="badge badge-required">Requis</span> |
| `imageurl` | <span class="badge badge-type">STRING</span> | Ajouter une URL d'image au message | <span class="badge badge-optional">Optionnel</span> |

Commande de gestion des shareChannel

Exécute la commande pour envoyer un message promotionnel à un groupe de partage. Le message est envoyé sous forme d'embed et peut contenir une image.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.texte` | <span class="badge badge-type">string</span> | - Le texte du message promotionnel. |
| `args.imageurl` | <span class="badge badge-type">string</span> | - L'URL d'une image à inclure dans l'embed. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

