---
title: register-slash-commands
layout: default
---

# `register-slash-commands`

## Description

Registers slash commands with Discord.

## Narrative


- This command forces the creation or update of a specific slash command (interaction command) with the Discord API.
- It is a useful development/administration tool if a command did not register correctly at bot startup.
- The user can provide the name of the command to create as an argument. If no command is specified, all commands will be registered.

- **How it works:**
    1. The command retrieves the list of all commands loaded by the bot.
    2. If a command name is provided, it searches for that command and calls its internal \

Executes the command to manually (re)create one or all slash commands. Searches for a command by its name in the CommandManager and calls its \`createSlashCommand\` method to register or update it with the Discord API. If no command name is specified, it registers all commands.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - The arguments for the command. |
| `args.command_name` | `string` | - The name of the slash command to create. |

**Returns:** `Promise<string>` - confirmation or error message.

