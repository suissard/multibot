---
title: privacypolicy
layout: default
---

# `privacypolicy`

> **Description :** Fournit la politique de confidentialité du bot

## Narrative


- Au moment du chargement initial du fichier de commande (et non à chaque exécution), le contenu du fichier \`PRIVACY.md\` situé à la racine du projet est lu et stocké en mémoire.
- Lorsque la commande est exécutée, elle retourne simplement le contenu de ce fichier qui a été préalablement chargé.
- Cela permet d'afficher la politique de confidentialité du bot directement dans Discord.


Exécute la commande pour afficher la politique de confidentialité. Lit le fichier PRIVACY.md et retourne son contenu.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande (non utilisés ici). |

**Retour :** <span class="badge badge-type">string</span> - contenu du fichier de politique de confidentialité.

