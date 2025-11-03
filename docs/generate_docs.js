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
            const docPath = `./${item.path.replace('.js', '.md')}`;
            markdown += `${indent}* [${item.name}](${docPath})\n`;
        }
    }
    return markdown;
}

function writeNavigation(sitemap) {
    const navPath = path.join(includesDir, 'navigation.html');
    let content = `<nav class="mdl-navigation">
    <a class="mdl-navigation__link" href="{{ '/' | relative_url }}">Accueil</a>
    <a class="mdl-navigation__link" href="{{ '/sitemap.html' | relative_url }}">Plan du site</a>
`;

    content += generateNavigationHtml(sitemap, 0);
    content += '</nav>';

    fs.writeFileSync(navPath, content);
    console.log(`Generated navigation at ${navPath}`);
}

function generateNavigationHtml(sitemap, level) {
    let html = '';
    for (const item of sitemap) {
        if (item.children) {
            html += `<div class="mdl-navigation__link" style="padding-left: ${level * 20}px">${item.name}</div>\n`;
            html += generateNavigationHtml(item.children, level + 1);
        } else {
            const docPath = `{{ '/${item.path.replace('.js', '.html')}' | relative_url }}`;
            html += `<a class="mdl-navigation__link" href="${docPath}" style="padding-left: ${level * 20}px">${item.name}</a>\n`;
        }
    }
    return html;
}

function generateModuleAndCommandLists() {
    const modulesDir = path.join(rootDir, 'Modules');
    const commandsDir = path.join(rootDir, 'Commandes');

    const modules = fs.readdirSync(modulesDir).filter(item => fs.statSync(path.join(modulesDir, item)).isDirectory());
    const commands = fs.readdirSync(commandsDir).filter(item => item.endsWith('.js'));

    let modulesListContent = `---
title: Liste des Modules
layout: default
---

# Liste des Modules

`;
    modules.forEach(module => {
        const docPath = `./Modules/${module}/index.md`;
        modulesListContent += `* [${module}](${docPath})\\n`;
    });
    fs.writeFileSync(path.join(outputDir, 'modules-list.md'), modulesListContent);
    console.log('Generated modules-list.md');

    let commandsListContent = `---
title: Liste des Commandes
layout: default
---

# Liste des Commandes

`;
    commands.forEach(command => {
        const commandName = path.basename(command, '.js');
        const docPath = `./Commandes/${commandName}.md`;
        commandsListContent += `* [${commandName}](${docPath})\\n`;
    });
    fs.writeFileSync(path.join(outputDir, 'commands-list.md'), commandsListContent);
    console.log('Generated commands-list.md');
}

generateDocs();
