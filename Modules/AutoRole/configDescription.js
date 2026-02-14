module.exports = [
    "AutoRole Configuration",
    "Settings for the automatic role assignment module.",
    null,
    {
        "guilds": [
            "Guild Configurations",
            "Map of Guild IDs to their specific configuration.",
            "123456789: { ... }",
            {
                "*": [
                    "Discord Server ID",
                    "Configuration for a specific Discord Server.",
                    "230307992354947072",
                    {
                        "tags": [
                            "Game Tags",
                            "Mapping of game tags to roles.",
                            "{ 'gameRoles': [...] }",
                            {
                                "gameRoles": [
                                    "Game Roles Group",
                                    "List of role groups dependent on tags.",
                                    "[[['tank', 'healer'], {id: '...', name: 'Player'}]]",
                                    null
                                ]
                            }
                        ],
                        "roles": [
                            "Role Mappings",
                            "General role mappings for the guild.",
                            "[[['captain'], {id: '...', name: 'Captain'}]]",
                            null
                        ],
                        "divisions": [
                            "Divisions",
                            "List of divisions and their Role IDs.",
                            "[{id: '...', name: 'Espoir 1'}]",
                            null
                        ],
                        "specialRoles": [
                            "Special Roles",
                            "Specific roles like Orga, Caster, etc.",
                            "{ 'orga': { ... } }",
                            {
                                "orga": [
                                    "Organizer Role",
                                    "Role for event organizers.",
                                    "{ id: '123...', name: 'Organisateur' }",
                                    null
                                ],
                                "caster": [
                                    "Caster Role",
                                    "Role for streamers/casters.",
                                    "{ id: '456...', name: 'Caster' }",
                                    null
                                ],
                                "licence": [
                                    "Licence Role",
                                    "Role for licensed members.",
                                    "{ id: '789...', name: 'Licencié' }",
                                    null
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "olympeAuth": [
            "Olympe Authentication",
            "Token and expiration for Olympe API.",
            "{ value: 'token...', expiration: 123456 }",
            null
        ],
        "olympeMods": [
            "Olympe Moderators",
            "List of User IDs with mod privileges.",
            "['123456789', '987654321']",
            null
        ],
        "everyXhours": [
            "Sync Interval",
            "Time in hours between role syncs.",
            "6",
            null
        ],
        "olympeDomain": [
            "Olympe Domain",
            "API Domain for Olympe.",
            "playallforone.com",
            null
        ],
        "roleIds": [
            "Global Role IDs",
            "Map of internal role names to Discord IDs.",
            "{ 'captain': '123...' }",
            null
        ]
    }
];
