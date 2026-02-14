module.exports = [
    "Match Notifier Configuration",
    "Settings for match notifications.",
    null,
    {
        "notifRoleId": [
            "Notification Roles",
            "Roles to notify for matches.",
            "{ 'game': 'roleId' }",
            null
        ],
        "competitions": [
            "Competitions",
            "List of tracked competitions.",
            "['LFL', 'DIV2']",
            null
        ],
        "cronSchedule": [
            "CRON Schedule",
            "Schedule for checking matches.",
            "*/15 * * * *",
            null
        ],
        "notifMessage": [
            "Notification Message",
            "Message template for notifications.",
            "Match starting soon!",
            null
        ],
        "casterStatFormUrl": [
            "Caster Stat Form URL",
            "URL for caster statistics form.",
            "https://forms.google.com/...",
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
            "24",
            null
        ]
    }
];
