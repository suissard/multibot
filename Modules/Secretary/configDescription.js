module.exports = [
    "Secretary Configuration",
    "Settings for the Secretary module.",
    null,
    {
        "secretaryRoleId": [
            "Secretary Roles",
            "Roles with access to secretary features.",
            "['123456789']",
            null
        ],
        "secretaryCategorieId": [
            "Secretary Categories",
            "Category IDs for tickets.",
            "['987654321']",
            null
        ],
        "suppRole": [
            "Support Roles",
            "Roles to ping or add to tickets.",
            "[['123456789']]",
            null
        ],
        "notifKeywords": [
            "Notification Keywords",
            "Keywords that trigger alerts.",
            "'SOS'",
            null
        ],
        "staffEmbedColor": [
            "Staff Embed Color",
            "Color for staff messages.",
            "'Green'",
            null
        ],
        "userEmbedColor": [
            "User Embed Color",
            "Color for user messages.",
            "'DarkGrey'",
            null
        ],
        "aiSuggestionUrl": [
            "AI Suggestion Webhook URL",
            "URL of the webhook (e.g. n8n) to generate AI suggestions for tickets. If set, AI suggestions are active.",
            "'https://n8n.clavier.dev/webhook/1c5f9a43-3440-40ad-8bb6-4386f921d6c7'",
            null
        ]
    }
];
