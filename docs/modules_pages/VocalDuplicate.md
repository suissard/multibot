---
title: "Module: VocalDuplicate"
layout: default
---

# Module: `VocalDuplicate`

## Rôle

Le module `VocalDuplicate` est un gestionnaire de canaux vocaux intelligent. Son rôle est de créer dynamiquement des copies de canaux vocaux prédéfinis lorsque ceux-ci sont utilisés, et de les supprimer lorsqu'ils ne le sont plus. Il permet de maintenir une liste de canaux vocaux propre et organisée, tout en s'assurant qu'il y a toujours assez de place pour tout le monde.

## Déroulé et Cas d'Usage

Le fonctionnement est simple et transparent pour les utilisateurs. Un administrateur désigne un ou plusieurs canaux vocaux comme étant des "canaux modèles".

### 1. Création de Canaux à la Volée

Lorsqu'un utilisateur rejoint un canal vocal modèle, le module entre en action.

*   **Exemple de situation :** Vous avez un canal vocal nommé "➕ Créer un salon". C'est un canal modèle.
    1.  Un utilisateur, "Alex", rejoint le canal "➕ Créer un salon".
    2.  Le module `VocalDuplicate` le détecte instantanément.
    3.  Il crée immédiatement un nouveau canal vocal nommé "Salon de Alex".
    4.  Il déplace automatiquement Alex dans ce nouveau canal.
    5.  Le canal "➕ Créer un salon" est de nouveau libre pour qu'un autre utilisateur puisse créer son propre salon.

### 2. Duplication de Canaux de Jeu

Cette fonctionnalité est particulièrement utile pour les jeux en équipe.

*   **Exemple de situation :** Vous avez une catégorie "Jeux en équipe" avec un canal vocal modèle nommé "Duo".
    1.  Deux joueurs rejoignent le canal "Duo" pour jouer ensemble.
    2.  Le module `VocalDuplicate` crée une copie du canal, "Duo #2", et y déplace les deux joueurs.
    3.  Un autre groupe de deux joueurs arrive et rejoint à son tour le canal "Duo" original.
    4.  Le module crée "Duo #3" et les y déplace.
    Cela permet à plusieurs groupes de jouer en même temps sans avoir à créer manuellement 15 canaux "Duo" qui resteraient vides la plupart du temps.

### 3. Nettoyage Automatique

La partie la plus importante du module est sa capacité à nettoyer derrière lui. Il surveille en permanence les canaux qu'il a créés.

*   **Exemple de situation :** Le groupe dans "Duo #2" a fini de jouer et tous les membres ont quitté le canal vocal. Le canal est maintenant vide. Après une courte période (par exemple, 5 minutes), le module `VocalDuplicate` détecte que le canal est inactif et le supprime automatiquement. La liste des canaux reste ainsi toujours propre et ne contient que les canaux activement utilisés.

En résumé, `VocalDuplicate` est un outil d'organisation qui offre une grande flexibilité aux utilisateurs tout en garantissant que le serveur ne soit jamais encombré de dizaines de canaux vocaux vides. Il automatise entièrement le cycle de vie des canaux vocaux temporaires.
