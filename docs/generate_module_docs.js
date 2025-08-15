const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../Modules');
const outputDir = path.join(__dirname, 'modules_pages');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const moduleDirs = fs.readdirSync(modulesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

for (const moduleName of moduleDirs) {
    const modulePath = path.join(modulesDir, moduleName);
    const indexPath = path.join(modulePath, 'index.js');

    if (!fs.existsSync(indexPath)) {
        console.warn(`Skipping ${moduleName}: could not find index.js.`);
        continue;
    }

    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const filesInModule = fs.readdirSync(modulePath).join(', ');

    // Simple analysis of index.js
    const registeredComponents = indexContent.match(/return\s*\{([\s\S]*?)\};/);
    let componentsList = 'N/A';
    if (registeredComponents) {
        componentsList = registeredComponents[1].replace(/\s/g, '').split(',').filter(Boolean).join(', ');
    }

    const markdownContent = `---
title: "Module: ${moduleName}"
layout: default
---

# Module: \`${moduleName}\`

## Description

*Documentation à compléter*

## Fichiers du Module

\`\`\`
${filesInModule}
\`\`\`

## Composants Enregistrés

Ce module enregistre les composants suivants (commandes, événements) :
\`\`\`
${componentsList}
\`\`\`

## Contenu de \`index.js\`

\`\`\`javascript
${indexContent}
\`\`\`
`;

    const outputFilePath = path.join(outputDir, `${moduleName}.md`);
    fs.writeFileSync(outputFilePath, markdownContent);
    console.log(`Generated documentation for module ${moduleName} at ${outputFilePath}`);
}
