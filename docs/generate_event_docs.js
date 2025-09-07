const fs = require('fs');
const path = require('path');

const eventsDir = path.join(__dirname, '../Events');
const modulesDir = path.join(__dirname, '../Modules');
const outputDir = path.join(__dirname, 'events');
const projectRoot = path.join(__dirname, '..');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function findEventFiles(dir) {
    let eventFiles = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            eventFiles = eventFiles.concat(findEventFiles(filePath));
        } else if (file.endsWith('.js')) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('extends Event')) {
                eventFiles.push(filePath);
            }
        }
    }
    return eventFiles;
}

const eventFiles = findEventFiles(eventsDir);
const moduleEventFiles = findEventFiles(modulesDir);
const allEventFiles = eventFiles.concat(moduleEventFiles);

for (const filePath of allEventFiles) {
    const content = fs.readFileSync(filePath, 'utf8');

    const idMatch = content.match(/static id = '([^']+)';/);
    if (!idMatch) {
        console.warn(`Skipping ${filePath}: could not find event id.`);
        continue;
    }
    const id = idMatch[1];

    const listenerMatch = content.match(/static listener = '([^']+)';/);
    const descriptionMatch = content.match(/static description =\s*([\s\S]*?);/);
    const narrativeMatch = content.match(/static narrative = `([\s\S]*?)`;/);

    const listener = listenerMatch ? listenerMatch[1] : 'N/A';
    const descriptionRaw = descriptionMatch ? descriptionMatch[1] : 'N/A';
    const description = descriptionRaw.replace(/[`'"]/g, '').replace(/\s+/g, ' ').trim();
    const narrative = narrativeMatch ? narrativeMatch[1].trim() : 'N/A';
    const relativePath = path.relative(projectRoot, filePath);

    const markdownContent = `---
title: "Événement : ${id}"
layout: default
---

# Événement : ${id}

## Description

${description}

## Déroulement

${narrative}

## Informations techniques

- **ID de l'événement :** \`${id}\`
- **Événement discord.js :** \`${listener}\`
- **Fichier source :** \`${relativePath}\`
`;

    const outputFilePath = path.join(outputDir, `${id}.md`);
    fs.writeFileSync(outputFilePath, markdownContent);
    console.log(`Generated documentation for ${id} at ${outputFilePath}`);
}
