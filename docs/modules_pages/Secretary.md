---
title: "Module: Secretary"
layout: default
---

# Module: `Secretary`

## Rôle

Le module `Secretary` gère des messages interactifs, souvent appelés "messages à réaction" ou "reaction roles". Il permet aux administrateurs de créer des messages spéciaux où les utilisateurs peuvent réagir avec des émoticônes pour obtenir des rôles, accéder à des informations, ou déclencher d'autres actions.

## Déroulé et Cas d'Usage

C'est un module hautement interactif qui repose sur la participation des utilisateurs. Un administrateur configure le message, et le module se charge de surveiller et de réagir aux interactions des membres.

### 1. Attribution de Rôles par Réaction (Reaction Roles)

C'est l'utilisation la plus courante. Les utilisateurs peuvent s'auto-attribuer des rôles sans avoir à demander à un administrateur.

*   **Exemple de situation :** Dans le canal `#roles`, un administrateur poste un message géré par le module `Secretary` :

    > **Choisissez vos jeux préférés pour être notifié des actualités !**
    >
    > :video_game: - Pour les news sur les jeux en général
    > :rocket: - Pour les news sur "Starship Odyssey"
    > :dragon: - Pour les news sur "Dragon's Lair RPG"

    Un utilisateur qui réagit avec :rocket: se verra instantanément attribuer le rôle "Starship Odyssey Fans" par le module. S'il retire sa réaction, le rôle lui est automatiquement retiré.

### 2. Validation des Règles

Le module peut être utilisé pour s'assurer que les nouveaux membres ont lu et accepté les règles du serveur.

*   **Exemple de situation :** Le canal `#regles` contient un message décrivant toutes les règles du serveur. À la fin du message, une instruction demande de réagir avec :white_check_mark: pour accepter les règles. Tant qu'un nouveau membre n'a pas réagi, il ne peut voir que le canal des règles. Une fois qu'il a réagi, le module `Secretary` lui attribue le rôle "Membre Vérifié", qui lui débloque l'accès au reste du serveur.

### 3. Sondages et Votes Simples

Le module peut également être utilisé pour créer des sondages simples et rapides.

*   **Exemple de situation :** Un administrateur veut savoir quel jour organiser le prochain événement communautaire. Il poste un message :

    > **Quel jour préférez-vous pour notre prochain tournoi ?**
    >
    > :regional_indicator_l: - Lundi
    > :regional_indicator_m: - Mercredi
    > :regional_indicator_v: - Vendredi

    Les utilisateurs votent en réagissant, et le nombre de réactions sur chaque émoticône donne une indication claire du choix de la communauté.

En résumé, le module `Secretary` est un outil puissant pour l'engagement communautaire et l'automatisation de la gestion des rôles. Il donne aux utilisateurs plus de contrôle sur leur expérience tout en allégeant la charge de travail des modérateurs.
