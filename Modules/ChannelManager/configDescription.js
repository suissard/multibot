module.exports = [
    "Channel Manager Configuration",
    "Settings for dynamic channels.",
    null,
    {
        "userLimit": [
            "User Limit",
            "Default user limit for voice channels.",
            "10",
            null
        ],
        "cronSchedule": [
            "CRON Schedule",
            "Schedule for the manager task.",
            "*/30 * * * *",
            null
        ],
        "matchCacheDuration": [
            "Match Cache Duration",
            "How long to cache match data (hours).",
            "2",
            null
        ],
        "maximumMatchDuration": [
            "Max Match Duration",
            "Max expected match length (hours).",
            "4",
            null
        ],
        "maximumNumberOfHoursToRetrieveFutureMatches": [
            "Future Match Lookahead",
            "How far ahead to look for matches (hours).",
            "4",
            null
        ],
        "notifMessage": [
            "Notification Message",
            "Custom message for notifications.",
            "Your channel is ready!",
            null
        ],
        "createTextChannels": [
            "Create Text Channels",
            "Enable or disable the creation of match text channels.",
            "true",
            null
        ],
        "customMatchText": [
            "Custom Match Text",
            "Custom message to send in the match text channel. Leave empty to use default.",
            "",
            null
        ],
        "createTeamVoiceChannels": [
            "Create Team Voice Channels",
            "Enable or disable the creation of voice channels for teams.",
            "true",
            null
        ],
        "createCasterVoiceChannels": [
            "Create Caster Voice Channels",
            "Enable or disable the creation of voice channels for casters.",
            "true",
            null
        ]
    }
];
