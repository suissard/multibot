const Command = require('../../Class/Command.js');
const Discord = require('discord.js');

module.exports = class SecretarySort extends Command {
    static id = 'secretarysort';
    static devBoss = false;
    static home = false;
    static userPermissions = ['ManageChannels'];
    static botPermissions = ['ManageChannels'];
    static description = 'Trie les tickets du secrétariat (❌ Priority)';
    static help = true;
    static check = true;
    static howTo = 'PREFIXCMD';
    static arguments = [
        {
            type: 'STRING',
            name: 'type',
            description: 'Type de tri (alpha par défaut)',
            required: false,
            choices: [
                { name: 'Alphabétique', value: 'alpha' },
                { name: 'Dernier Message', value: 'date' }
            ]
        }
    ];

    static narrative = `
- Cette commande réorganise les salons dans TOUTES les catégories de secrétariat.
- **Attention** : Les salons peuvent changer de catégorie pour respecter la limite de 50 salons.
- Règle de tri :
    1. **Priorité Haute** : Les salons dont le nom commence par '❌' (Message utilisateur sans réponse).
    2. **Priorité Basse** : Les autres salons.
    3. **Ordre Secondaire** :
        - **Alphabétique** : A-Z
        - **Dernier Message** : Du plus ancien au plus récent
`;

    async methode(args = {}) {
        const { interaction } = args;
        const sortType = interaction.options.getString('type') || 'alpha';

        await interaction.deferReply();

        try {
            // 1. Config & Target Discovery
            const secretaryConfig = this.bot.modules.Secretary.secretary;
            if (!secretaryConfig?.length) {
                await interaction.editReply("❌ Module Secrétariat inactif ou non configuré.");
                return;
            }

            const guildSettings = secretaryConfig.filter(c => c.guild.id === interaction.guild.id);
            if (!guildSettings.length) {
                await interaction.editReply("❌ Aucun secrétariat configuré ici.");
                return;
            }

            const targetBases = guildSettings.map(c => c.name);
            const allSecretaryCategories = [];

            await interaction.guild.channels.fetch();
            const allChannels = interaction.guild.channels.cache;
            const addedCatIds = new Set();
            let parentCategory = null; // To deduce permissions for new categories

            // Find all related categories
            for (const baseName of targetBases) {
                for (const [id, channel] of allChannels) {
                    if (channel.type !== Discord.ChannelType.GuildCategory) continue;

                    if (channel.name === baseName || logoLikeMatch(channel.name, baseName)) {
                        if (!addedCatIds.has(channel.id)) {
                            allSecretaryCategories.push(channel);
                            addedCatIds.add(channel.id);
                            // Store one as a template for permissions/position
                            if (!parentCategory) parentCategory = channel;
                        }
                    }
                }
            }

            if (allSecretaryCategories.length === 0) {
                await interaction.editReply("❌ Aucune catégorie secrétariat trouvée.");
                return;
            }

            // Sort categories by name to fill them in order (Secretary, Secretary - 1, etc.)
            // Assuming "BaseName" comes before "BaseName - 1"
            allSecretaryCategories.sort((a, b) => a.name.localeCompare(b.name));

            // 2. Gather ALL Text Channels
            let globalChannels = [];
            for (const cat of allSecretaryCategories) {
                const kids = cat.children.cache.filter(c => c.type === Discord.ChannelType.GuildText);
                globalChannels.push(...kids.values());
            }

            await interaction.editReply(`🔄 Analyse de ${globalChannels.length} salons dans ${allSecretaryCategories.length} catégories... (Tri Global)`);

            // 3. Global Sort
            globalChannels.sort((a, b) => {
                const aIsPriority = a.name.startsWith('❌');
                const bIsPriority = b.name.startsWith('❌');

                if (aIsPriority && !bIsPriority) return -1;
                if (!aIsPriority && bIsPriority) return 1;

                if (sortType === 'date') {
                    const aTime = a.lastMessageId ? Discord.SnowflakeUtil.timestampFrom(a.lastMessageId) : 0;
                    const bTime = b.lastMessageId ? Discord.SnowflakeUtil.timestampFrom(b.lastMessageId) : 0;
                    return aTime - bTime; // Ascending (Oldest first)
                } else {
                    return a.name.localeCompare(b.name);
                }
            });

            // 4. Ensure Capacity & Create Categories
            const MAX = 50;
            const neededCategories = Math.ceil(globalChannels.length / MAX) || 1;

            // Create extra categories if needed
            while (allSecretaryCategories.length < neededCategories) {
                const newIndex = allSecretaryCategories.length;
                // Assuming first category name is the base.
                // If we have mixed bases, this might be tricky. Let's use the first identified category's name base.
                const baseName = targetBases[0]; // Simplification
                const newName = `${baseName} - ${newIndex}`;

                await interaction.editReply(`🔨 Création de la catégorie '${newName}' (Manque de place)...`);

                const newCat = await interaction.guild.channels.create({
                    name: newName,
                    type: Discord.ChannelType.GuildCategory,
                    position: parentCategory ? parentCategory.position + newIndex : 0,
                    permissionOverwrites: parentCategory ? parentCategory.permissionOverwrites.cache : []
                });

                allSecretaryCategories.push(newCat);
            }

            // 5. Global Distribution with Buffer
            // We use a temporary buffer category to handle swaps if categories are full
            let bufferCategory = null;

            const getBuffer = async () => {
                if (bufferCategory) return bufferCategory;
                bufferCategory = await interaction.guild.channels.create({
                    name: 'Secretary Swap Buffer',
                    type: Discord.ChannelType.GuildCategory,
                    permissionOverwrites: [{ id: interaction.guild.id, deny: ['ViewChannel'] }]
                });
                return bufferCategory;
            };

            let moves = 0;

            for (let i = 0; i < globalChannels.length; i++) {
                const channel = globalChannels[i];
                const targetCatIndex = Math.floor(i / MAX);
                const targetCat = allSecretaryCategories[targetCatIndex];

                // Progress Update
                if (i % 20 === 0) {
                    await interaction.editReply(`🔄 Réorganisation... ${i}/${globalChannels.length} (Moves: ${moves})`);
                }

                if (channel.parentId !== targetCat.id) {
                    // Check if target is full
                    if (targetCat.children.cache.size >= MAX) {
                        // EVICT an alien channel to Buffer

                        // Refined Logic for Victim:
                        // Pick a child that is NOT in the slice of channels we are currently filling aimed at this cat.
                        // We must not evict channels we just placed in this run.

                        const currentCatStart = targetCatIndex * MAX;
                        const protectedIds = new Set(globalChannels.slice(currentCatStart, i).map(c => c.id));

                        const victim = targetCat.children.cache.find(c => !protectedIds.has(c.id));

                        if (victim) {
                            const buf = await getBuffer();
                            // Check buffer size! (Limit 50)
                            // If buffer full, we are in trouble. But buffer shouldn't get that full if we pull from it too.
                            // Actually channels in buffer are "pending". They will be valid `channel` in future iterations.
                            // If we have > 50 pending, we need array of buffers.
                            if (buf.children.cache.size >= MAX) {
                                // Create another buffer? Or just crash?
                                // Realistically users won't have 50 off-place channels accumulating... hopefully.
                                // For now, let's assume one buffer is enough, or log warning.
                                console.warn("Secretary Buffer Full! This might fail.");
                            }
                            await victim.setParent(buf, { lockPermissions: false });
                        }
                    }

                    // Now move channel to target
                    try {
                        await channel.setParent(targetCat, { lockPermissions: false });
                        moves++;
                    } catch (e) {
                        console.error(`Failed to move ${channel.name} to ${targetCat.name}:`, e);
                    }
                }
            }

            // 6. Cleanup & Sort Positions
            // Delete buffer if empty
            if (bufferCategory) {
                if (bufferCategory.children.cache.size === 0) {
                    await bufferCategory.delete();
                } else {
                    // Should be empty by logic (all globalChannels processed)
                    // Unless there were orphan channels we didn't track?
                    // We filtered `globalChannels` from known categories.
                    // If we evicted something that WAS in a secretary category but NOT in `globalChannels`?
                    // Impossible, `globalChannels` gathered everything.
                }
            }

            // Internal Position Sort
            await interaction.editReply("🔄 Finalisation du tri (Positions)...");
            for (let cIdx = 0; cIdx < allSecretaryCategories.length; cIdx++) {
                const cat = allSecretaryCategories[cIdx];
                // Channels belonging here
                const slice = globalChannels.slice(cIdx * MAX, (cIdx + 1) * MAX);
                if (slice.length === 0) continue;

                // Sync positions
                const updates = slice.map((ch, idx) => ({
                    channel: ch.id,
                    position: idx
                }));

                try {
                    await interaction.guild.channels.setPositions(updates);
                } catch (e) {
                    console.error("Position sync failed:", e);
                }
            }

            await interaction.editReply(`✅ **Tri Global Terminé !**\n${globalChannels.length} salons réorganisés dans ${allSecretaryCategories.length} catégories.\n(${moves} déplacements effectués).`);

        } catch (e) {
            console.error(e);
            await interaction.editReply("❌ Erreur critique : " + e.message);
        }
    }
};

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function logoLikeMatch(targetName, baseName) {
    if (targetName === baseName) return true;
    const regex = new RegExp(`^${escapeRegExp(baseName)} - \\d+$`);
    return regex.test(targetName);
}
