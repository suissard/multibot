const fs = require('fs');
const path = require('path');
const { parse } = require('comment-parser');

const rootDir = path.join(__dirname, '..');
const outputDir = __dirname;
const includesDir = path.join(__dirname, '_includes');

const excludedDirs = [
    '.git',
    '.github',
    '.idea',
    'node_modules',
    'docs',
    'Front',
    'jules-scratch',
    'Tests',
    'WIP emoteMessagesAdd',
    'WIP emoteMessagesRemove'
];

function shouldDocumentFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('class ') || content.includes('extends Command') || content.includes('extends Event')) {
        return true;
    }
    if (path.basename(filePath) === 'index.js') {
        return true;
    }
    return false;
}

function generateDocs() {
    console.log('Starting documentation generation...');
    const sitemap = generateSitemap(rootDir, '');
    writeSitemap(sitemap);
    writeNavigation(sitemap);
	generateModuleAndCommandLists();
    console.log('Documentation generation finished.');
}

function generateSitemap(dir, prefix) {
    const entries = fs.readdirSync(dir);
    const sitemap = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        const entryPrefix = path.join(prefix, entry);

        if (stat.isDirectory()) {
            if (excludedDirs.includes(entry)) {
                continue;
            }
            const children = generateSitemap(fullPath, entryPrefix);
            if (children.length > 0) {
                sitemap.push({
                    name: entry,
                    path: entryPrefix,
                    children: children
                });
            }
        } else {
            if (entry.endsWith('.js') && shouldDocumentFile(fullPath)) {
                generateDocFile(fullPath, entryPrefix);
                sitemap.push({
                    name: entry,
                    path: entryPrefix.replace(/\\/g, '/')
                });
            }
        }
    }
    return sitemap;
}

function generateDocFile(sourcePath, relativePath) {
    const docPath = path.join(outputDir, relativePath.replace('.js', '.md'));
    const docDir = path.dirname(docPath);

    if (!fs.existsSync(docDir)) {
        fs.mkdirSync(docDir, { recursive: true });
    }

    const fileName = path.basename(sourcePath, '.js');
    const fileContent = fs.readFileSync(sourcePath, 'utf8');
    const parsed = parse(fileContent);

    let content = `---
title: ${fileName}
layout: default
---

# \`${fileName}\`

`;

    const descriptionMatch = fileContent.match(/static description = '(.+)'/);
    if (descriptionMatch) {
        content += `${descriptionMatch[1]}\n\n`;
    }

    const narrativeMatch = fileContent.match(/static narrative = \`([\s\S]*?)\`;/);
    if (narrativeMatch) {
        content += `## Narrative\n\n${narrativeMatch[1]}\n\n`;
    }

    const argsMatch = fileContent.match(/static arguments = (\[[\s\S]*?\]);/);
    if (argsMatch && argsMatch[1]) {
        try {
            const args = eval(argsMatch[1]);
            if (args && args.length > 0) {
                content += `## Arguments\n\n`;
                content += `| Name | Type | Description | Required |\n`;
                content += `| ---- | ---- | ----------- | -------- |\n`;
                args.forEach(arg => {
                    content += `| \`${arg.name}\` | \`${arg.type}\` | ${arg.description} | ${arg.required ? 'Yes' : 'No'} |\n`;
                });
                content += `\n`;
            }
        } catch (e) {
            console.error(`Could not parse arguments for ${fileName}: ${e}`);
        }
    }

    if (parsed.length > 0) {
        parsed.forEach(block => {
            if (block.tags.some(tag => tag.tag === 'class')) {
                const classTag = block.tags.find(tag => tag.tag === 'class');
                content += `## Class: ${classTag.name}\n\n`;
                content += `${block.description}\n\n`;
            } else {
                const method = block.tags.find(tag => tag.tag === 'method' || tag.tag === 'function');
                if (method) {
                    content += `### ${method.name}\n\n`;
                }
                content += `${block.description}\n\n`;

                const params = block.tags.filter(tag => tag.tag === 'param');
                if (params.length > 0) {
                    content += `**Parameters:**\n\n`;
                    content += `| Name | Type | Description |\n`;
                    content += `| ---- | ---- | ----------- |\n`;
                    params.forEach(param => {
                        content += `| \`${param.name}\` | \`${param.type}\` | ${param.description} |\n`;
                    });
                    content += `\n`;
                }

                const returns = block.tags.find(tag => tag.tag === 'returns');
                if (returns) {
                    content += `**Returns:** \`${returns.type}\` - ${returns.description}\n\n`;
                }
            }
        });
    } else {
        content += `*No JSDoc comments found in this file.*\n`;
    }

    // LISTER LES COMMANDES ET EVENTS SI C'EST UN MODULE (index.js)
    if (relativePath.startsWith('Modules') && path.basename(sourcePath) === 'index.js') {
        const moduleDir = path.dirname(sourcePath);
        
        // --- 1. COMMANDES ---
        let commandFiles = [];
        // A. Chercher dans le dossier 'commands'
        const commandsDir = path.join(moduleDir, 'commands');
        if (fs.existsSync(commandsDir) && fs.statSync(commandsDir).isDirectory()) {
            commandFiles = commandFiles.concat(
                 fs.readdirSync(commandsDir)
                   .filter(f => f.endsWith('.js'))
                   .map(f => ({ name: path.basename(f, '.js'), path: `./commands/${path.basename(f, '.js')}.html` }))
            );
        }
        // B. Chercher à la racine du module (ex: AutoRoleCommand.js)
        const rootFiles = fs.readdirSync(moduleDir);
        rootFiles.filter(f => f.endsWith('Command.js') && f !== 'index.js').forEach(f => {
             commandFiles.push({ name: path.basename(f, '.js'), path: `./${path.basename(f, '.js')}.html` });
        });

        if (commandFiles.length > 0) {
            content += `## Commandes du Module\n\n`;
            commandFiles.forEach(cmd => {
                content += `* [${cmd.name}](${cmd.path})\n`;
            });
            content += `\n`;
        }

        // --- 2. CONFIGURATION ---
        // Chercher des fichiers contenant 'Config' dans le nom
        const configFiles = rootFiles.filter(f => f.includes('Config') && f.endsWith('.js'));
        if (configFiles.length > 0) {
            content += `## Configuration\n\n`;
            content += `Ce module contient des fichiers de configuration spécifiques. Cliquez ci-dessous pour voir les détails des classes et options.\n\n`;
            configFiles.forEach(f => {
                const configName = path.basename(f, '.js');
                content += `* [${configName}](./${configName}.html)\n`;
            });
            content += `\n`;
        }

        // --- 3. ÉVÉNEMENTS ---
        const eventsDir = path.join(moduleDir, 'events');
        if (fs.existsSync(eventsDir) && fs.statSync(eventsDir).isDirectory()) {
            const eventFiles = fs.readdirSync(eventsDir).filter(f => f.endsWith('.js'));
            if (eventFiles.length > 0) {
                content += `## Événements du Module\n\n`;
                eventFiles.forEach(f => {
                    const evtName = path.basename(f, '.js');
                    content += `* [${evtName}](./events/${evtName}.html)\n`;
                });
                content += `\n`;
            }
        }
    }

    fs.writeFileSync(docPath, content);
    console.log(`Generated doc for ${relativePath}`);
}

function writeSitemap(sitemap) {
    const sitemapPath = path.join(outputDir, 'sitemap.md');
    let content = `---
title: Plan du site
layout: default
---

# Plan du site

`;

    content += generateSitemapMarkdown(sitemap, 0);

    fs.writeFileSync(sitemapPath, content);
    console.log(`Generated sitemap at ${sitemapPath}`);
}

function generateSitemapMarkdown(sitemap, level) {
    let markdown = '';
    const indent = '  '.repeat(level);

    for (const item of sitemap) {
        if (item.children) {
            markdown += `${indent}* **${item.name}**\n`;
            markdown += generateSitemapMarkdown(item.children, level + 1);
        } else {
            const docPath = `./${item.path.replace('.js', '.html')}`;
            markdown += `${indent}* [${item.name}](${docPath})\n`;
        }
    }
    return markdown;
}

function writeNavigation(sitemap) {
    const navPath = path.join(includesDir, 'navigation.html');
    let content = `<nav class="mdl-navigation">
    <a class="mdl-navigation__link" href="{{ '/' | relative_url }}">Accueil</a>
    <a class="mdl-navigation__link" href="{{ '/modules-list.html' | relative_url }}">Modules</a>
    <a class="mdl-navigation__link" href="{{ '/commands-list.html' | relative_url }}">Commandes</a>
    <a class="mdl-navigation__link" href="{{ '/classes-list.html' | relative_url }}">Classes</a>
    <a class="mdl-navigation__link" href="{{ '/events-list.html' | relative_url }}">Events</a>
    <div class="mdl-layout-spacer"></div>
    <a class="mdl-navigation__link" href="{{ '/sitemap.html' | relative_url }}">Plan du site</a>
`;

    content += '</nav>';

    fs.writeFileSync(navPath, content);
    console.log(`Generated navigation at ${navPath}`);
}

function generateModuleAndCommandLists() {
    generateList('Modules', 'Modules', true, './Modules/');
    generateList('Commandes', 'Commandes', false, './Commandes/');
    generateList('Class', 'Classes', false, './Class/');
    generateList('Events', 'Events', false, './Events/');
}

function generateList(srcDirName, title, isDirMode, urlPrefix) {
    const srcDir = path.join(rootDir, srcDirName);
    if (!fs.existsSync(srcDir)) return;

    let items;
    if (isDirMode) {
        items = fs.readdirSync(srcDir).filter(item => fs.statSync(path.join(srcDir, item)).isDirectory());
    } else {
        items = fs.readdirSync(srcDir)
            .filter(item => item.endsWith('.js'))
            .map(item => path.basename(item, '.js'));
    }

    const docFileName = `${title.toLowerCase()}-list.md`;
    let content = `---
title: Liste des ${title}
layout: default
---

# Liste des ${title}

`;

    items.forEach(item => {
        // Pour les modules (dossiers), on pointe vers index.html
        // Pour les fichiers (JS), on pointe vers NomFichier.html
        const linkTarget = isDirMode ? `${urlPrefix}${item}/index.html` : `${urlPrefix}${item}.html`;
        content += `* [${item}](${linkTarget})\n`;
    });

    fs.writeFileSync(path.join(outputDir, docFileName), content);
    console.log(`Generated ${docFileName}`);
}

generateDocs();
