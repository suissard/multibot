---
title: sharepromo
layout: default
---

# Commande `sharepromo`

## Description

Partager un message format embed sur ce salon partagé

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `sharepromo` |
| **Description** | Partager un message format embed sur ce salon partagé |
| **Permissions User** | `['ADMINISTRATOR']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'Message à envoyer',
            required: true,
        },
        {
            type: 'STRING',
            name: 'imageurl',
            description: 'Ajouter une URL d\'image au message',
            required: false,
        },
    ]
```

## Fonctionnement

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
