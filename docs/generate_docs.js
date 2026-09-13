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

    const descriptionMatch = fileContent.match(/static description = (['"`])((?:\\.|(?!\1).)*)\1/);
    if (descriptionMatch) {
        const cleanDesc = descriptionMatch[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
        content += `> **Description :** ${cleanDesc}\n\n`;
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
                content += `| Paramètre | Type | Description | Obligatoire |\n`;
                content += `| :-------- | :--- | :---------- | :---------- |\n`;
                args.forEach(arg => {
                    const reqBadge = arg.required ? '<span class="badge badge-required">Requis</span>' : '<span class="badge badge-optional">Optionnel</span>';
                    content += `| \`${arg.name}\` | <span class="badge badge-type">${arg.type || 'any'}</span> | ${arg.description} | ${reqBadge} |\n`;
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
                content += `## Classe : \`${classTag.name}\`\n\n`;
                if (block.description) {
                    content += `${block.description}\n\n`;
                }
            } else {
                const method = block.tags.find(tag => tag.tag === 'method' || tag.tag === 'function');
                if (method) {
                    content += `### Méthode \`${method.name}()\`\n\n`;
                }
                if (block.description) {
                    content += `${block.description}\n\n`;
                }

                const params = block.tags.filter(tag => tag.tag === 'param');
                if (params.length > 0) {
                    content += `**Paramètres :**\n\n`;
                    content += `| Paramètre | Type | Description |\n`;
                    content += `| :-------- | :--- | :---------- |\n`;
                    params.forEach(param => {
                        content += `| \`${param.name}\` | <span class="badge badge-type">${param.type || 'any'}</span> | ${param.description} |\n`;
                    });
                    content += `\n`;
                }

                const returns = block.tags.find(tag => tag.tag === 'returns');
                if (returns) {
                    content += `**Retour :** <span class="badge badge-type">${returns.type || 'void'}</span> - ${returns.description}\n\n`;
                }
            }
        });
    } else if (!descriptionMatch && !narrativeMatch) {
        content += `*Documentation générée automatiquement à partir du code source.*\n\n`;
    }

    // LISTER LES COMMANDES ET EVENTS SI C'EST UN MODULE (index.js)
    if (relativePath.startsWith('Modules') && path.basename(sourcePath) === 'index.js') {
        const moduleDir = path.dirname(sourcePath);
        
        // --- 1. COMMANDES ---
        let commandFiles = [];
        const commandsDir = path.join(moduleDir, 'commands');
        if (fs.existsSync(commandsDir) && fs.statSync(commandsDir).isDirectory()) {
            commandFiles = commandFiles.concat(
                 fs.readdirSync(commandsDir)
                   .filter(f => f.endsWith('.js'))
                   .map(f => ({ name: path.basename(f, '.js'), path: `./commands/${path.basename(f, '.js')}.html` }))
            );
        }
        const rootFiles = fs.readdirSync(moduleDir);
        rootFiles.filter(f => f.endsWith('Command.js') && f !== 'index.js').forEach(f => {
             commandFiles.push({ name: path.basename(f, '.js'), path: `./${path.basename(f, '.js')}.html` });
        });

        if (commandFiles.length > 0) {
            content += `## Commandes du Module\n\n`;
            content += `<div class="explore-grid">\n`;
            commandFiles.forEach(cmd => {
                content += `  <a href="${cmd.path}" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">${cmd.name}</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Détails et paramètres de la commande.</p>
  </a>\n`;
            });
            content += `</div>\n\n`;
        }

        // --- 2. CONFIGURATION ---
        const configFiles = rootFiles.filter(f => f.includes('Config') && f.endsWith('.js'));
        if (configFiles.length > 0) {
            content += `## Configuration Spécifique\n\n`;
            content += `Ce module expose des classes de configuration dédiées :\n\n`;
            content += `<div class="explore-grid">\n`;
            configFiles.forEach(f => {
                const configName = path.basename(f, '.js');
                content += `  <a href="./${configName}.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">${configName}</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Structure de configuration du module.</p>
  </a>\n`;
            });
            content += `</div>\n\n`;
        }

        // --- 3. ÉVÉNEMENTS ---
        const eventsDir = path.join(moduleDir, 'events');
        if (fs.existsSync(eventsDir) && fs.statSync(eventsDir).isDirectory()) {
            const eventFiles = fs.readdirSync(eventsDir).filter(f => f.endsWith('.js'));
            if (eventFiles.length > 0) {
                content += `## Événements du Module\n\n`;
                content += `<div class="explore-grid">\n`;
                eventFiles.forEach(f => {
                    const evtName = path.basename(f, '.js');
                    content += `  <a href="./events/${evtName}.html" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">${evtName}</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">Écouteur d'événement lié au module.</p>
  </a>\n`;
                });
                content += `</div>\n\n`;
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

Retrouvez ci-dessous l'arborescence complète de l'ensemble des modules, commandes, classes et composants documentés pour MultiBot.

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
    const content = `<nav class="sidebar-nav-container">
  <!-- Section: Guide & Démarrage -->
  <div class="sidebar-section">
    <div class="sidebar-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
      <span>Guide & Démarrage</span>
    </div>
    <ul class="sidebar-menu">
      <li>
        <a href="{{ '/' | relative_url }}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Accueil
        </a>
      </li>
      <li>
        <a href="{{ '/configuration.html' | relative_url }}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Configuration
        </a>
      </li>
      <li>
        <a href="{{ '/architecture.html' | relative_url }}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
          Architecture
        </a>
      </li>
    </ul>
  </div>

  <!-- Section: Modules -->
  <div class="sidebar-section">
    <div class="sidebar-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
      <span>Modules du Bot</span>
    </div>
    <ul class="sidebar-menu">
      <li>
        <a href="{{ '/modules-list.html' | relative_url }}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          Tous les modules
        </a>
      </li>
      <li>
        <a href="{{ '/Modules/AutoRole/index.html' | relative_url }}">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-blurple); margin-right: 2px;"></span>
          AutoRole
        </a>
      </li>
      <li>
        <a href="{{ '/Modules/ChannelManager/index.html' | relative_url }}">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-cyan); margin-right: 2px;"></span>
          ChannelManager
        </a>
      </li>
      <li>
        <a href="{{ '/Modules/Secretary/index.html' | relative_url }}">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-emerald); margin-right: 2px;"></span>
          Secretary
        </a>
      </li>
      <li>
        <a href="{{ '/Modules/ShareChannel/index.html' | relative_url }}">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-amber); margin-right: 2px;"></span>
          ShareChannel
        </a>
      </li>
      <li>
        <a href="{{ '/Modules/TeamManager/index.html' | relative_url }}">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-violet); margin-right: 2px;"></span>
          TeamManager
        </a>
      </li>
      <li>
        <a href="{{ '/Modules/VocalDuplicate/index.html' | relative_url }}">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-rose); margin-right: 2px;"></span>
          VocalDuplicate
        </a>
      </li>
    </ul>
  </div>

  <!-- Section: Commandes & Événements -->
  <div class="sidebar-section">
    <div class="sidebar-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
      <span>Interactions</span>
    </div>
    <ul class="sidebar-menu">
      <li>
        <a href="{{ '/commands-list.html' | relative_url }}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
          Commandes
        </a>
      </li>
      <li>
        <a href="{{ '/events-list.html' | relative_url }}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          Événements Discord
        </a>
      </li>
    </ul>
  </div>

  <!-- Section: Framework Core -->
  <div class="sidebar-section">
    <div class="sidebar-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
      <span>Architecture & Classes</span>
    </div>
    <ul class="sidebar-menu">
      <li>
        <a href="{{ '/classes-list.html' | relative_url }}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          Toutes les classes
        </a>
      </li>
      <li>
        <a href="{{ '/Class/Bot.html' | relative_url }}">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">&lt;/&gt;</span>
          Bot
        </a>
      </li>
      <li>
        <a href="{{ '/Class/BotManager.html' | relative_url }}">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">&lt;/&gt;</span>
          BotManager
        </a>
      </li>
      <li>
        <a href="{{ '/Class/CommandManager.html' | relative_url }}">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">&lt;/&gt;</span>
          CommandManager
        </a>
      </li>
      <li>
        <a href="{{ '/Class/EventManager.html' | relative_url }}">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">&lt;/&gt;</span>
          EventManager
        </a>
      </li>
    </ul>
  </div>

  <!-- Section: Index -->
  <div class="sidebar-section">
    <div class="sidebar-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
        <line x1="8" y1="2" x2="8" y2="18"></line>
        <line x1="16" y1="6" x2="16" y2="22"></line>
      </svg>
      <span>Navigation Complète</span>
    </div>
    <ul class="sidebar-menu">
      <li>
        <a href="{{ '/sitemap.html' | relative_url }}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          Plan du site (Sitemap)
        </a>
      </li>
    </ul>
  </div>
</nav>`;

    fs.writeFileSync(navPath, content);
    console.log(`Generated navigation at ${navPath}`);
}

function generateModuleAndCommandLists() {
    generateList('Modules', 'Modules', true, './Modules/');
    generateList('Commandes', 'Commandes', false, './Commandes/');
    generateList('Class', 'Classes', false, './Class/');
    generateList('Events', 'Events', false, './Events/');
}

function getItemDescription(fullPath, isDirMode) {
    try {
        let filePath = fullPath;
        if (isDirMode) {
            const indexFile = path.join(fullPath, 'index.js');
            if (fs.existsSync(indexFile)) {
                filePath = indexFile;
            } else {
                return 'Module fonctionnel pour MultiBot.';
            }
        }
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const descMatch = content.match(/static description = (['"`])((?:\\.|(?!\1).)*)\1/);
            if (descMatch) {
                return descMatch[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
            }
            const jsdocDescMatch = content.match(/\/\*\*[\s\S]*?@description\s+([^\r\n*]+)/);
            if (jsdocDescMatch) {
                return jsdocDescMatch[1].trim();
            }
            const jsdocBlock = content.match(/\/\*\*([\s\S]*?)\*\//);
            if (jsdocBlock) {
                const lines = jsdocBlock[1]
                    .split('\n')
                    .map(l => l.replace(/^\s*\*\s?/, '').trim())
                    .filter(l => l && !l.startsWith('@') && !l.startsWith('{') && !l.startsWith('AutoRole') && !l.includes('Exemple'));
                if (lines.length > 0) {
                    return lines[0];
                }
            }
        }
    } catch (e) {}
    return 'Composant du framework MultiBot.';
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

    let content = `---
title: Liste des ${title}
layout: default
---

# Liste des ${title}

Découvrez ci-dessous l'ensemble des composants répertoriés dans la section **${title}** de MultiBot.

<div class="explore-grid">
`;

    items.forEach(item => {
        const linkTarget = isDirMode ? `${urlPrefix}${item}/index.html` : `${urlPrefix}${item}.html`;
        const fullItemPath = path.join(srcDir, isDirMode ? item : `${item}.js`);
        const desc = getItemDescription(fullItemPath, isDirMode);
        
        content += `  <a href="${linkTarget}" class="explore-card">
    <div class="explore-header">
      <span class="explore-title">${item}</span>
      <span class="explore-arrow">→</span>
    </div>
    <p class="explore-desc">${desc}</p>
  </a>\n`;
    });

    content += `</div>\n`;

    const docFileName = `${title.toLowerCase()}-list.md`;
    fs.writeFileSync(path.join(outputDir, docFileName), content);
    console.log(`Generated ${docFileName}`);

    // If generating Commandes, also write commands-list.md for compatibility
    if (title.toLowerCase() === 'commandes') {
        const altFileName = 'commands-list.md';
        let altContent = content.replace(`title: Liste des Commandes`, `title: Liste des Commandes (Commands)`);
        fs.writeFileSync(path.join(outputDir, altFileName), altContent);
        console.log(`Generated ${altFileName} (alias)`);
    }
}

generateDocs();
