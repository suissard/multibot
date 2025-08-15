const fs = require('fs');
const path = require('path');

const commandsDir = path.join(__dirname, '../Commandes');
const outputDir = path.join(__dirname, 'commands');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const idMatch = content.match(/static id = '([^']+)';/);
    if (!idMatch) {
        console.warn(`Skipping ${file}: could not find command id.`);
        continue;
    }
    const id = idMatch[1];

    const descriptionMatch = content.match(/static description = '([^']*)';/);
    const userPermissionsMatch = content.match(/static userPermissions = (\[.*?\]);/s);
    const botPermissionsMatch = content.match(/static botPermissions = (\[.*?\]);/s);
    const devBossMatch = content.match(/static devBoss = (true|false);/);
    const homeMatch = content.match(/static home = (true|false);/);
    const argsMatch = content.match(/static arguments = (\[[\s\S]*?\]);/);
    const methodeMatch = content.match(/methode\s*\(([^)]*)\)\s*\{([\s\S]*?)\n    \}/);

    const description = descriptionMatch ? descriptionMatch[1] : 'N/A';
    const userPermissions = userPermissionsMatch ? userPermissionsMatch[1] : '[]';
    const botPermissions = botPermissionsMatch ? botPermissionsMatch[1] : '[]';
    const devBoss = devBossMatch ? devBossMatch[1] : 'false';
    const home = homeMatch ? homeMatch[1] : 'false';
    const argsString = argsMatch ? argsMatch[1] : '[]';
    const methode = methodeMatch ? methodeMatch[0] : 'N/A';

    let argsTable = 'Cette commande n\'accepte aucun argument.';
    if (argsString.trim() !== '[]') {
        argsTable = `\`\`\`javascript\n${argsString}\n\`\`\``;
    }

    const markdownContent = `---
title: ${id}
layout: default
---

# Commande \`${id}\`

## Description

${description}

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | \`${id}\` |
| **Description** | ${description} |
| **Permissions User** | \`${userPermissions}\` |
| **Permissions Bot** | \`${botPermissions}\` |
| **Dev Boss Only** | \`${devBoss}\` |
| **Home Server Only** | \`${home}\` |

## Arguments

${argsTable}

## Fonctionnement du Code

\`\`\`javascript
${methode}
\`\`\`
`;

    const outputFilePath = path.join(outputDir, `${id}.md`);
    fs.writeFileSync(outputFilePath, markdownContent);
    console.log(`Generated documentation for ${id} at ${outputFilePath}`);
}
