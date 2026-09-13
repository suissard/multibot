---
title: testCommand
layout: default
---

# `testCommand`

## Narrative


- Cette commande sert à lancer des tests automatisés pour d'autres commandes du bot.
- **Sécurité :** L'exécution est réservée au propriétaire du bot (\`devBoss = true\`).
- Elle peut tester soit une seule commande, soit une liste de commandes.

- **Fonctionnement :**
    1.  L'utilisateur fournit le nom d'une commande (\`nom_de_commande\`) ou une liste de noms de commandes séparées par des espaces (\`noms_des_commandes\`).
    2.  Pour chaque nom de commande fourni :
        a.  La commande vérifie d'abord si la commande cible existe.
        b.  Elle vérifie ensuite si cette commande cible possède une propriété statique \`test\` qui contient des scénarios de test.
        c.  Si la commande est testable, elle appelle la méthode \`testProcess()\` de la commande cible. Cette méthode exécute les scénarios de test définis dans la propriété \`test\`.
    3.  Si une commande n'existe pas ou n'a pas de tests définis, un message d'erreur est renvoyé.
    4.  Une fois tous les tests effectués, un message de confirmation est envoyé.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `nom_de_commande` | <span class="badge badge-type">STRING</span> | Nom de la commande a tester | <span class="badge badge-optional">Optionnel</span> |
| `noms_des_commandes` | <span class="badge badge-type">STRING</span> | Noms des commandes a tester, séparées par un espace | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande de test pour d'autres commandes. Peut tester une seule commande ou une liste de commandes.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.nom_de_commande` | <span class="badge badge-type">string</span> | - Le nom de la commande unique à tester. |
| `args.noms_des_commandes` | <span class="badge badge-type">string</span> | - Une chaîne contenant les noms de plusieurs commandes à tester, séparés par des espaces. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

Vérifie si une commande existe et si elle a un protocole de test défini.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `commandName` | <span class="badge badge-type">string</span> | - Le nom de la commande à vérifier. |

**Retour :** <span class="badge badge-type">boolean</span> - si la commande est testable, sinon `false`.

Lance le processus de test pour une commande spécifiée.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `commandName` | <span class="badge badge-type">string</span> | - Le nom de la commande à tester. |

**Retour :** <span class="badge badge-type">Promise<any></span> - résultat du processus de test de la commande.

