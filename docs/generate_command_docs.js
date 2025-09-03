const fs = require('fs');
const path = require('path');

const commandsDir = path.join(__dirname, '../Commandes');
const modulesDir = path.join(__dirname, '../Modules');
const outputDir = path.join(__dirname, 'commands');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function findCommandFiles(dir) {
    let commandFiles = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            commandFiles = commandFiles.concat(findCommandFiles(filePath));
        } else if (file.endsWith('.js')) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('extends Command') || content.includes('extends Commande')) {
                commandFiles.push(filePath);
            }
        }
    }
    return commandFiles;
}

const commandFiles = fs.readdirSync(commandsDir)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(commandsDir, file));

const moduleCommandFiles = findCommandFiles(modulesDir);
const allCommandFiles = commandFiles.concat(moduleCommandFiles);


for (const filePath of allCommandFiles) {
    const content = fs.readFileSync(filePath, 'utf8');

    const idMatch = content.match(/static id = '([^']+)';/);
    if (!idMatch) {
        console.warn(`Skipping ${filePath}: could not find command id.`);
        continue;
    }
    const id = idMatch[1];

    const descriptionMatch = content.match(/static description =\s*([\s\S]*?);/);
    const userPermissionsMatch = content.match(/static userPermissions = (\[.*?\]);/s);
    const botPermissionsMatch = content.match(/static botPermissions = (\[.*?\]);/s);
    const devBossMatch = content.match(/static devBoss = (true|false);/);
    const homeMatch = content.match(/static home = (true|false);/);
    const argsMatch = content.match(/static arguments = (\[[\s\S]*?\]);/);
    const methodeMatch = content.match(/(?:async\s+)?methode\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/);

    const descriptionRaw = descriptionMatch ? descriptionMatch[1] : 'N/A';
    const description = descriptionRaw.replace(/[`'"]/g, '').replace(/\s+/g, ' ').trim();
    const userPermissions = userPermissionsMatch ? userPermissionsMatch[1] : '[]';
    const botPermissions = botPermissionsMatch ? botPermissionsMatch[1] : '[]';
    const devBoss = devBossMatch ? devBossMatch[1] : 'false';
    const home = homeMatch ? homeMatch[1] : 'false';
    const argsString = argsMatch ? argsMatch[1] : '[]';
    let methode = 'N/A';
    if(methodeMatch) {
        methode = methodeMatch[0].replace(/(\n\s*\}\s*$)/, '\n\t}');
    }


    let argsTable = 'Cette commande n\'accepte aucun argument.';
    if (argsString && argsString.trim() !== '[]') {
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
