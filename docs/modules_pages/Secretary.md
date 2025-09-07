---
title: "Module: Secretary"
layout: default
---

# Module: `Secretary`

## Rôle

Le module `Secretary` met en place un système de "secrétariat" ou de "messagerie privée" qui permet aux utilisateurs d'envoyer des messages privés au bot, lesquels sont ensuite transférés dans des salons textuels privés sur un serveur dédié. Cela permet aux membres du staff de voir et de répondre aux demandes des utilisateurs de manière centralisée et confidentielle, sans que l'utilisateur n'ait besoin d'être sur le même serveur que le staff.

## Déroulé et Cas d'Usage

Ce module est conçu pour la gestion de support, les demandes d'aide, ou toute autre communication qui doit être privée entre un utilisateur et l'équipe de modération.

### 1. L'Utilisateur envoie un Message Privé

-   Un utilisateur envoie un message privé (DM) au bot.
-   Le module `Secretary` intercepte ce message.

### 2. Création d'un Salon de Secrétariat

-   Si c'est la première fois que cet utilisateur contacte le secrétariat, le module crée un nouveau salon textuel sur un serveur de secrétariat configuré.
-   Ce salon est nommé avec le nom et l'ID de l'utilisateur (par exemple, `❌Utilisateur-123456789012345678`). Le ❌ indique qu'il y a un message en attente de réponse.
-   Le salon n'est visible que par les rôles de staff configurés.
-   Si un salon existe déjà pour cet utilisateur, le module utilise simplement ce salon existant.

### 3. Transfert du Message

-   Le contenu du message de l'utilisateur (texte, images, vidéos) est formaté dans un "embed" et envoyé dans le salon de secrétariat qui lui est dédié.
-   Le message de l'utilisateur en DM est marqué d'une réaction 📩 pour confirmer sa bonne réception.

### 4. Réponse du Staff

-   Un membre du staff voit le message dans le salon de secrétariat.
-   Pour répondre, il utilise une commande simple dans ce même salon, généralement en commençant son message par `msg`.
-   Le module `Secretary` prend le contenu de cette réponse et l'envoie en message privé à l'utilisateur d'origine.
-   Le salon change de nom pour indiquer qu'une réponse a été apportée (par exemple, en remplaçant ❌ par ✅).

## Configuration

La configuration de ce module se fait dans le fichier `configs.json`, sous la clé `modules.Secretary`.

```json
"Secretary": {
    "secretary": [
        {
            "guild": "ID_DU_SERVEUR_DE_SECRETARIAT",
            "name": "Nom de la catégorie",
            "idRole": "ID_ROLE_NOTIFICATION_SOS",
            "idRoleAdmin": ["ID_ROLE_STAFF_1", "ID_ROLE_STAFF_2"]
        }
    ],
    "notifKeywords": true
}
```

-   `secretary`: Un tableau d'objets, où chaque objet représente un serveur de secrétariat. Vous pouvez en avoir plusieurs.
    -   `guild`: L'ID du serveur Discord où les salons de secrétariat seront créés.
    -   `name`: Le nom de base pour les catégories qui contiendront les salons.
    -   `idRole`: (Optionnel) Un rôle à notifier si le message de l'utilisateur contient des mots-clés d'urgence (comme "SOS").
    -   `idRoleAdmin`: Un tableau d'ID de rôles qui auront la permission de voir et de répondre dans les salons de secrétariat.
-   `notifKeywords`: Si `true`, active la notification pour les mots-clés d'urgence.

Ce module est essentiel pour centraliser la communication et assurer un suivi efficace des demandes des utilisateurs.
