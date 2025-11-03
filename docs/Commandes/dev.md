---
title: dev
layout: default
---

# `dev`

Execute le code javascript indiqué dans le message

## Narrative


- Cette commande est réservée exclusivement au propriétaire du bot (devBoss).
- Elle prend en entrée une chaîne de caractères qui est du code JavaScript.
- Elle exécute ce code directement en utilisant \`eval()\`.
- **AVERTISSEMENT :** L'utilisation de \`eval()\` est extrêmement dangereuse et ne doit être utilisée qu'en toute connaissance de cause, car elle peut exposer le bot et le système à des risques de sécurité majeurs.
- Si le code exécuté retourne un résultat, celui-ci est renvoyé à l'utilisateur.
- En cas d'erreur lors de l'exécution, la commande renvoie le message d'erreur et la pile d'appels (stack trace) à l'utilisateur.


Exécute du code JavaScript fourni en argument. Commande réservée au développeur du bot.

