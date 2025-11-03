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

    // Extract static properties from the class
    const staticDescriptionMatch = fileContent.match(/static description = '([^']*)'/);
    const staticNarrativeMatch = fileContent.match(/static narrative = `([^`]*)`/);

    if (staticDescriptionMatch) {
        content += `## Description\n\n${staticDescriptionMatch[1]}\n\n`;
    }

    if (staticNarrativeMatch) {
        content += `## Narrative\n\n${staticNarrativeMatch[1]}\n\n`;
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
    } else if (!staticDescriptionMatch && !staticNarrativeMatch) {
        content += `*No JSDoc comments or static properties found in this file.*\n`;
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

generateDocs();
