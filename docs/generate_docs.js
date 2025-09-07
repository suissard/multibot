const fs = require('fs');
const path = require('path');

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
    const content = `---
title: ${fileName}
layout: default
---

# ${fileName}

Documentation for \`${relativePath}\`.
`;
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
            html += `<div class="mdl-navigation__link" style="padding-left: ${level * 20}px">${item.name}</div>`;
            html += generateNavigationHtml(item.children, level + 1);
        } else {
            const docPath = `{{ '/${item.path.replace('.js', '.html')}' | relative_url }}`;
            html += `<a class="mdl-navigation__link" href="${docPath}" style="padding-left: ${level * 20}px">${item.name}</a>`;
        }
    }
    return html;
}

generateDocs();
