---
title: Secretary
layout: default
---

# `Secretary`

Gère la logique du module de secrétariat.

Gère l'événement 'secretary', qui est déclenché pour les messages privés ou les réponses du staff.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message à traiter. |
| `isDm` | `boolean` | - `true` si le message provient d'un message privé, `false` sinon. |

Traite un message reçu en message privé par le bot. Trouve ou crée un salon de secrétariat dédié à l'utilisateur et y transfère le message.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message privé reçu. |

Traite un message envoyé dans un salon de secrétariat sur le serveur. S'il commence par 'msg', transfère le contenu à l'utilisateur concerné en message privé.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message du salon de secrétariat. |

Construit une chaîne de caractères pour le pied de page d'un embed, contenant les informations Olympe d'un utilisateur (équipes, rôles, etc.).

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` | - L'instance du bot. |
| `user` | `import('discord.js').User` | - L'utilisateur Discord. |

**Returns:** `string|undefined` - chaîne formatée pour le pied de page, ou undefined si l'utilisateur n'est pas trouvé.

Cherche un serveur de secrétariat qui n'est pas plein (moins de 480 salons).

**Returns:** `Promise<object|false>` - de configuration du serveur disponible, ou `false` si aucun n'est libre.

Crée un nouveau salon de secrétariat pour un utilisateur.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message original de l'utilisateur. |
| `parentChannel` | `import('discord.js').CategoryChannel` | - La catégorie où créer le salon. |
| `serv` | `object` | - L'objet de configuration du serveur de secrétariat. |

**Returns:** `Promise<import('discord.js').TextChannel>` - salon de secrétariat qui a été créé.

Crée une nouvelle catégorie de secrétariat lorsqu'une catégorie existante est pleine.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `allCategorieSize` | `number` | - Le nombre total de catégories de secrétariat existantes pour nommer la nouvelle. |
| `serv` | `object` | - L'objet de configuration du serveur de secrétariat. |

**Returns:** `Promise<import('discord.js').CategoryChannel>` - catégorie de secrétariat qui a été créée.

Vérifie s'il existe une catégorie de secrétariat avec de l'espace disponible. Si c'est le cas, la renvoie. Sinon, en crée une nouvelle.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `serv` | `object` | - L'objet de configuration du serveur de secrétariat. |

**Returns:** `Promise<import('discord.js').CategoryChannel>` - catégorie disponible ou nouvellement créée.

Vérifie si un salon de secrétariat existe déjà pour un utilisateur. Si c'est le cas, le renvoie. Sinon, en crée un nouveau.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message de l'utilisateur, pour obtenir son ID. |
| `serv` | `object` | - L'objet de configuration du serveur de secrétariat où chercher/créer le salon. |

**Returns:** `Promise<import('discord.js').TextChannel>` - salon de secrétariat existant ou nouvellement créé.

Gère la réponse d'un membre du staff depuis un salon de secrétariat vers un utilisateur en message privé.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message de réponse envoyé par le staff. |

