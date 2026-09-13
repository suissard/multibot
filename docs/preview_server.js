const http = require('http');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const PORT = process.env.PORT || 4000;
const docsDir = __dirname;
const layoutPath = path.join(docsDir, '_layouts', 'default.html');
const navPath = path.join(docsDir, '_includes', 'navigation.html');

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false
});

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

function parseFrontmatter(content) {
  let meta = {};
  let body = content;
  if (content.startsWith('---')) {
    const end = content.indexOf('---', 3);
    if (end !== -1) {
      const yaml = content.slice(3, end).trim();
      body = content.slice(end + 3).trim();
      yaml.split('\n').forEach(line => {
        const colon = line.indexOf(':');
        if (colon !== -1) {
          const key = line.slice(0, colon).trim();
          const val = line.slice(colon + 1).trim();
          meta[key] = val;
        }
      });
    }
  }
  return { meta, body };
}

function renderMarkdownWithLayout(mdContent, reqUrl) {
  const { meta, body } = parseFrontmatter(mdContent);
  const layout = fs.readFileSync(layoutPath, 'utf8');
  let nav = fs.existsSync(navPath) ? fs.readFileSync(navPath, 'utf8') : '';

  // Render markdown to HTML
  const parsedHtml = marked.parse(body);

  // Replace Liquid tags
  let html = layout;

  // Title & description
  html = html.replace(/\{\%\s*if page\.title\s*\%\}(.*?)\{\%\s*else\s*\%\}(.*?)\{\%\s*endif\s*\%\}/gs, meta.title ? `${meta.title} | MultiBot` : 'MultiBot - Documentation');
  html = html.replace(/\{\{\s*page\.title\s*\}\}/g, meta.title || 'MultiBot');
  html = html.replace(/\{\{\s*page\.description\s*\}\}/g, meta.description || 'Documentation officielle du framework MultiBot');
  html = html.replace(/\{\%\s*if page\.description\s*\%\}(.*?)\{\%\s*else\s*\%\}(.*?)\{\%\s*endif\s*\%\}/gs, meta.description || 'Documentation officielle du framework MultiBot');

  // Breadcrumbs title check
  const isHome = reqUrl === '/' || reqUrl === '/multibot' || reqUrl === '/multibot/' || reqUrl === '/index.html' || reqUrl === '/multibot/index.html';
  html = html.replace(/\{\%\s*if page\.url != '\/' and page\.url != '\/index\.html'\s*\%\}(.*?)\{\%\s*endif\s*\%\}/gs, isHome ? '' : `$1`);

  // Include navigation
  html = html.replace(/\{\%\s*include navigation\.html\s*\%\}/g, nav);

  // Insert content
  html = html.replace(/\{\{\s*content\s*\}\}/g, parsedHtml);

  // Replace relative_url filters: {{ '/path' | relative_url }} -> /multibot/path
  html = html.replace(/\{\{\s*['"](.*?)['"]\s*\|\s*relative_url\s*\}\}/g, (match, p1) => {
    let cleanPath = p1.startsWith('/') ? p1 : '/' + p1;
    return '/multibot' + cleanPath;
  });

  return html;
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Normalize root redirect
  if (urlPath === '/' || urlPath === '') {
    res.writeHead(302, { 'Location': '/multibot/' });
    res.end();
    return;
  }

  // Remove /multibot prefix for local disk lookup
  let relativePath = urlPath;
  if (relativePath.startsWith('/multibot')) {
    relativePath = relativePath.slice('/multibot'.length);
  }
  if (relativePath === '' || relativePath === '/') {
    relativePath = '/index.html';
  }

  const diskPath = path.join(docsDir, relativePath);

  // 1. Static asset direct match (e.g. /assets/css/custom.css)
  if (fs.existsSync(diskPath) && fs.statSync(diskPath).isFile() && !diskPath.endsWith('.md')) {
    res.writeHead(200, { 'Content-Type': getMimeType(diskPath) });
    fs.createReadStream(diskPath).pipe(res);
    return;
  }

  // 2. HTML match corresponding to a Markdown file
  let mdCandidates = [];
  if (relativePath.endsWith('.html')) {
    mdCandidates.push(path.join(docsDir, relativePath.replace(/\.html$/, '.md')));
  } else if (!path.extname(relativePath)) {
    mdCandidates.push(path.join(docsDir, relativePath + '.md'));
    mdCandidates.push(path.join(docsDir, relativePath, 'index.md'));
  }

  for (const candidate of mdCandidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      try {
        const mdContent = fs.readFileSync(candidate, 'utf8');
        const finalHtml = renderMarkdownWithLayout(mdContent, urlPath);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(finalHtml);
        return;
      } catch (err) {
        console.error(`Erreur rendu pour ${candidate}:`, err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erreur interne lors du rendu : ' + err.message);
        return;
      }
    }
  }

  // 404 Not Found
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><html><body style="background:#090d16;color:#f8fafc;font-family:sans-serif;text-align:center;padding-top:15vh;">
    <h1>404 - Page non trouvée</h1>
    <p style="color:#94a3b8;">La ressource <code>${urlPath}</code> n'a pas été trouvée.</p>
    <a href="/multibot/" style="color:#5865F2;text-decoration:none;">← Retour à l'accueil</a>
  </body></html>`);
});

server.listen(PORT, () => {
  console.log('\n======================================================');
  console.log('🚀 Serveur de documentation MultiBot démarré en local !');
  console.log(`👉 Accessible sur : http://localhost:${PORT}/multibot/`);
  console.log('======================================================\n');
});
