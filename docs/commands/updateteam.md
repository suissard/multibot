---
title: updateteam
layout: default
---

# Commande `updateteam`

## Description

Met à jour une équipe

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `updateteam` |
| **Description** | Met à jour une équipe |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'teamname',
            description: 'Nom de la team à modifier',
            required: true,
        },
        {
            type: 'STRING',
            name: 'newteamname',
            description: 'Nouveau nom de la team',
            required: false,
        },
        {
            type: 'USER',
            name: 'newcap',
            description: 'Nouveau capitaine de la team',
            required: false,
        },
        {
            type: 'STRING',
            name: 'newbtag',
            description: 'Nouveau battleTag du capitaine de la team',
            required: false,
        },
        {
            type: 'INTEGER',
            name: 'newrank',
            description: 'Nouveau rank de la team',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
methode(args = {}) {
        await this.guild.roles.fetch();
        await this.guild.members.fetch();
        let roleTeam = this.guild.roles.cache.find((role) => {
            if (role.name == `Team [${args.teamname}]`) return role;
        });
        let roleCap = this.guild.roles.cache.find((r) => r.name === 'Capitaine');
        let channelTeam = this.guild.channels.cache.find((chan) => {
            if (chan.name == `Team [${args.teamname}]`) return chan;
        });
        let newTeamCap = this.guild.members.cache.get(args.newcap);
        let teamCap = this.guild.members.cache.find((cap) => {
            if (cap.roles.cache.has(roleTeam.id) && cap.roles.cache.has(roleCap.id)) return cap;
        });

        let team = DATAS.collections.teams.cache.find((t) => {
            return t.name == args.teamname;
        });
        if (!team) return 'Le nom de la team n\'est pas correct';
        if (!roleTeam) return 'Le role de la team n\'est pas disponible';
        if (!channelTeam) return 'Le channel de la team n\'est pas disponible';

        let saveUpdateTeamData = async (id, teamname, cap, elo, btag) => {
            return await DATAS.collections.teams.update(id, {
                capitaine: { User: cap },
                name: teamname,
                elo,
                battleTag: btag,
            });
        };

        saveUpdateTeamData(team.getID(), args.teamname, args.capitaine, args.elo, args.btag);

        if (args.newteamname) {
            await teamManager.updateChannelTeam(channelTeam, args.newteamname);
            await teamManager.updateRoleTeam(roleTeam, args.newteamname);
        }
        if (args.newcap && args.newbtag) {
            await teamManager.updateTeamCap(teamCap, newTeamCap, roleCap, roleTeam);
            await teamManager.updateCapBtag(team, args.newbtag);
        } else if (args.newcap && !args.newbtag) {
            return 'Si tu veux changer de capitaine, tu dois changer le btag renseigné';
        }
        if (args.newrank) {
            await teamManager.updateTeamRank(team, args.newrank);
        }
        if (!args.newteamname && !args.newcap && !args.newbtag && !args.newrank) {
            return 'Tu dois mettre au moins une informations à modifier';
        }


        return 'Team mis-à-jour';
    }
```
