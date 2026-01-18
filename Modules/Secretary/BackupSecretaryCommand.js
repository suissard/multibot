const Command = require('../../Class/Command.js');
const Discord = require('discord.js');
const { AttachmentBuilder } = require('discord.js');

module.exports = class BackupSecretary extends Command {
    static id = 'backupsecretary';
    static devBoss = false;
    static home = false;
    static userPermissions = []; // Needs admin or relevant permissions, handled by "passing" check like other cmds
    static botPermissions = [];
    static description = 'Sauvegarde les discussions du secrétariat en JSON';
    static help = true;
    static howTo = 'PREFIXCMD';
    static arguments = [
        {
            type: 'CHANNEL',
            name: 'category',
            description: 'La catégorie principale du secrétariat (Optionnel)',
            required: false,
            channel_types: [4] // 4 is GuildCategory
        }
    ];

    static test = [{ options: { category: '123456789012345678' } }]; // Dummy test data

    static narrative = `
- Cette commande permet de sauvegarder l'historique complet des discussions de secrétariat.
- Si une catégorie est fournie :
    - Elle est considérée comme la base.
    - La commande cherche toutes les catégories dérivées (ex: "Nom", "Nom - 1").
- Si aucune catégorie n'est fournie :
    - La commande utilise la configuration du module Secretary pour trouver tous les secrétariats de ce serveur.
- Elle génère un fichier JSON contenant tous les messages.
- Affiche une barre de progression.
`;

    async methode(args = {}) {
        const { interaction } = args;
        const categoryInput = interaction.options.getChannel('category');

        await interaction.deferReply();

        try {
            let targetBases = []; // Array of strings (Base Names)

            // 1. Determine Target Bases
            if (categoryInput) {
                // Mode: Manual Override
                targetBases.push(categoryInput.name);
                await interaction.editReply(`🔍 Mode Manuel : Base sur **${categoryInput.name}**...`);
            } else {
                // Mode: Auto Config
                const secretaryConfig = this.bot.modules.Secretary.secretary;

                if (!secretaryConfig || secretaryConfig.length === 0) {
                    await interaction.editReply("❌ Le module Secrétariat n'est pas actif ou aucune configuration trouvée.");
                    return;
                }

                // Filter for current guild
                const guildConfig = secretaryConfig.filter(c => c.guild.id === interaction.guild.id);

                if (guildConfig.length === 0) {
                    await interaction.editReply("❌ Aucun secrétariat configuré sur ce serveur.");
                    return;
                }

                targetBases = guildConfig.map(c => c.name);
                await interaction.editReply(`🔍 Mode Auto : ${targetBases.length} secrétariat(s) détecté(s) (${targetBases.join(', ')})...`);
            }

            // 2. Discovery
            const allCategories = [];
            await interaction.guild.channels.fetch();
            const channels = interaction.guild.channels.cache;

            const addedIds = new Set();

            for (const baseName of targetBases) {
                for (const [id, channel] of channels) {
                    if (channel.type !== Discord.ChannelType.GuildCategory) continue;
                    if (addedIds.has(channel.id)) continue;

                    if (channel.name === baseName) {
                        allCategories.push(channel);
                        addedIds.add(channel.id);
                        continue;
                    }
                    if (logoLikeMatch(channel.name, baseName)) {
                        allCategories.push(channel);
                        addedIds.add(channel.id);
                    }
                }
            }

            if (allCategories.length === 0) {
                await interaction.editReply("❌ Aucune catégorie trouvée.");
                return;
            }

            // 3. Scraping with Progress
            const backupData = {
                timestamp: new Date().toISOString(),
                targetBases: targetBases,
                categories: [],
                totalMessages: 0
            };

            let totalMessagesCount = 0;
            let totalChannelsProcessed = 0;
            const totalCategories = allCategories.length;

            let estimatedChannels = 0;
            allCategories.forEach(c => estimatedChannels += c.children.cache.filter(ch => ch.type === Discord.ChannelType.GuildText).size);

            const updateProgress = async (currentChanName) => {
                try {
                    await interaction.editReply(
                        `📥 **Sauvegarde en cours...**\n` +
                        `Catégories: ${backupData.categories.length + 1}/${totalCategories}\n` +
                        `Salons traités: ${totalChannelsProcessed}/${estimatedChannels}\n` +
                        `Messages récupérés: ${totalMessagesCount}\n` +
                        `Actuel: #${currentChanName}`
                    );
                } catch (e) {
                    console.error("Failed to update progress:", e);
                }
            };

            for (const cat of allCategories) {
                const catData = {
                    id: cat.id,
                    name: cat.name,
                    channels: []
                };

                const textChannels = cat.children.cache.filter(c => c.type === Discord.ChannelType.GuildText);

                for (const [cid, textChannel] of textChannels) {
                    await updateProgress(textChannel.name);

                    const channelBackup = {
                        id: textChannel.id,
                        name: textChannel.name,
                        topic: textChannel.topic,
                        messages: []
                    };

                    const messages = await fetchAllMessages(textChannel, async (count) => {
                        if (count % 500 === 0) {
                            await interaction.editReply(
                                `📥 **Sauvegarde en cours...**\n` +
                                `Catégories: ${backupData.categories.length + 1}/${totalCategories}\n` +
                                `Salons traités: ${totalChannelsProcessed}/${estimatedChannels}\n` +
                                `Messages récupérés: ${totalMessagesCount + count}\n` +
                                `Actuel: #${textChannel.name} (${count} msgs)`
                            );
                        }
                    });

                    for (const msg of messages) {
                        const msgData = {
                            id: msg.id,
                            createdAt: msg.createdAt,
                            author: {
                                id: msg.author.id,
                                username: msg.author.username,
                                bot: msg.author.bot
                            },
                            content: msg.content,
                            embeds: [],
                            attachments: []
                        };

                        if (msg.embeds.length > 0) {
                            msgData.embeds = msg.embeds.map(e => ({
                                title: e.title,
                                description: e.description,
                                footer: e.footer ? e.footer.text : null
                            }));
                        }

                        if (msg.attachments.size > 0) {
                            msgData.attachments = msg.attachments.map(a => ({
                                url: a.url,
                                name: a.name,
                                contentType: a.contentType
                            }));
                        }

                        channelBackup.messages.push(msgData);
                        totalMessagesCount++;
                    }

                    channelBackup.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    catData.channels.push(channelBackup);

                    totalChannelsProcessed++;
                }

                backupData.categories.push(catData);
            }

            backupData.totalMessages = totalMessagesCount;

            // 4. Output
            await interaction.editReply("💾 Génération du fichier JSON...");

            const buffer = Buffer.from(JSON.stringify(backupData, null, 2), 'utf-8');
            const attachment = new AttachmentBuilder(buffer, { name: `secretary_backup_${Date.now()}.json` });

            await interaction.editReply({
                content: `✅ **Sauvegarde terminée !**\n${totalMessagesCount} messages sauvegardés depuis ${allCategories.length} catégories basées sur [${targetBases.join(', ')}].`,
                files: [attachment]
            });

            return;

        } catch (e) {
            console.error(e);
            await interaction.editReply("❌ Une erreur est survenue lors de la sauvegarde : " + e.message);
            return;
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

async function fetchAllMessages(channel, progressCallback) {
    let messages = [];
    let lastId;
    let count = 0;

    while (true) {
        const options = { limit: 100 };
        if (lastId) {
            options.before = lastId;
        }

        const fetched = await channel.messages.fetch(options);
        if (fetched.size === 0) break;

        messages.push(...fetched.values());
        lastId = fetched.last().id;
        count += fetched.size;

        if (progressCallback) await progressCallback(count);
    }
    return messages;
}
