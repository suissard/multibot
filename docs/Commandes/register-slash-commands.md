---
title: register-slash-commands
layout: default
---

# `register-slash-commands`

## Description

Registers slash commands with Discord.

Executes the command to manually (re)create one or all slash commands. Searches for a command by its name in the CommandManager and calls its \`createSlashCommand\` method to register or update it with the Discord API. If no command name is specified, it registers all commands.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - The arguments for the command. |
| `args.command_name` | `string` | - The name of the slash command to create. |

**Returns:** `Promise<string>` - confirmation or error message.

