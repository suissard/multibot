/**
 * Utility functions for formatting conversation history for Gemini context
 */

/**
 * Formats a time difference into a readable string
 * @param {number} timestamp 
 * @returns {string} e.g. [il y a 2h]
 */
const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `[il y a ${days}j]`;
    if (hours > 0) return `[il y a ${hours}h]`;
    if (minutes > 0) return `[il y a ${minutes}m]`;
    return '[à l\'instant]';
};

/**
 * Formats raw Discord messages into a context array for Gemini
 * @param {Array<Object>} messages - Array of message objects
 * @returns {Array<{role: string, content: string}>}
 */
const formatConversation = (messages) => {
    // Assuming messages are ordered [oldest, ..., newest]
    // Taking last 50 is typically done before calling this, but we can enforce it here too?
    // The previous logic sliced first. Let's assume the input is already the slice of interest 
    // or we slice here to be safe if the caller dumps everything.
    // The caller code was: messages.slice(-50).map...
    // Let's keep the slice behavior consistent if we want this function to "do it all".
    const messagesToProcess = messages.length > 50 ? messages.slice(-50) : messages;

    return messagesToProcess.map(msg => {
        const timeAgo = formatTimeAgo(msg.timestamp);

        // Default role based on bot status
        let role = msg.author.bot ? 'Organisateur' : 'Utilisateur';
        let content = msg.content || '';

        let embedRole = null;
        let embedContent = null;

        if (msg.embeds && msg.embeds.length > 0) {
            // Prioritize the first embed for role/content extraction if message is empty
            const firstEmbed = msg.embeds[0];

            // Check for Author Name in Embed
            if (firstEmbed.author && firstEmbed.author.name) {
                embedRole = firstEmbed.author.name;
            }
            // Check for Title as Author (if no explicit author found yet)
            else if (firstEmbed.title) {
                embedRole = firstEmbed.title;
            }

            // Check for Description as Content
            if (firstEmbed.description) {
                embedContent = firstEmbed.description;
            }

            // Handle "via Dashboard" specifically to keep it associated with user if needed,
            // or just treat the name as the role.
            // The previous logic had a flag isUserViaDashboard to force 'Utilisateur'.
            // Now we prefer using the specific name if available.
        }

        // If message content is empty, try to use embed content
        if (!content.trim()) {
            if (embedContent) {
                content = embedContent;
            } else if (msg.attachments && msg.attachments.length > 0) {
                content = '[Image/Fichier]';
            }

            // If we are using embed content, update role if we found a specific one
            if (embedRole) {
                role = embedRole;
            }
        } else {
            // If content exists, we might append embed info?
            // User just wanted clean proper formatting for the embed case.
            // If both exist, we might keep appending or just leave it. 
            // Existing logic appended. Let's keep it simple for now: 
            // If content is present, stick to it. If empty, use embed.
        }

        // Clean up role (remove "via Dashboard" for cleaner prompt if desired, 
        // or keep to give context to Gemini? User asked for standard format output.
        // "suissard (via Dashboard)" is fine as a role name.

        // Fallback role fix: if it was "Organisateur" but we found a specific role (even from title), use it.
        // The previous logic used 'Utilisateur' if "via Dashboard".
        // Now "suissard (via Dashboard)" -> Role is "suissard (via Dashboard)". 
        // Gemini will see "suissard (via Dashboard): content". precise.

        // Check for explicit "msg" prefix override
        if (content && (content.startsWith('msg') || content.startsWith('Msg'))) {
            role = 'Organisateur';
        }

        return {
            role: role,
            content: content,
            timeAgo: timeAgo
        };
    }).filter(msg => {
        // Filter empty
        const realContent = (msg.content || '').replace(/^\[il y a.*?\]\s*/, '').trim();
        return realContent.length > 0;
    });
};

module.exports = {
    formatConversation,
    formatTimeAgo
};
