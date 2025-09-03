---
title: createslashcommands
layout: default
---

# Commande `createslashcommands`

## Description

Donne le nombre de channel du serveur

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `createslashcommands` |
| **Description** | Donne le nombre de channel du serveur |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
		{
			type: 'STRING',
			name: 'commandename',
			description: 'Nom de la commande a créer',
			required: true,
		},
	]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
		try {
			let bot = this.bot;
			let commandName;
			await bot.application.commands.fetch();
			let i = 0;
			for (let y in args) i++;
			if (i == 0) commandName = 'createslashcommands';
			else commandName = args.commandename;
			for (let [commandId, Command] of BOTS.Commands.getAll()) {
				try {
					if (commandId == args.commandename) {
						await new Command(bot).createSlashCommand();
						return `La commande ${args.commandename} a bien été créée`;
	}
```
