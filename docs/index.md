---
title: Accueil
layout: default
---

<!-- Hero Section -->
<div class="hero-wrapper">
  <div class="hero-badge-container">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    <span>Framework Discord Modulaire & Multi-Instances</span>
  </div>

  <h1 class="hero-title">
    Pilotez vos bots Discord avec <span class="gradient-text">modularité et élégance</span>
  </h1>

  <p class="hero-subtitle">
    <strong>MultiBot</strong> est un moteur Node.js robuste et découplé conçu pour orchestrer, configurer et exécuter simultanément plusieurs instances indépendantes de bots Discord depuis une unique base de code.
  </p>

  <div class="hero-cta-group">
    <a href="{{ '/configuration.html' | relative_url }}" class="btn btn-primary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
      Guide de Démarrage
    </a>
    <a href="{{ '/architecture.html' | relative_url }}" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
      Explorer l'Architecture
    </a>
    <a href="https://github.com/suissard/multibot" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      GitHub
    </a>
  </div>

  <!-- Terminal Quickstart Preview -->
  <div class="terminal-card">
    <div class="terminal-header">
      <div class="window-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <span class="terminal-title">bash — installation & lancement</span>
      <span></span>
    </div>
    <div class="terminal-body">
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span>git clone git@gitlab.com:suissard/multibot.git</span></div>
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span>cd multibot && npm install</span></div>
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span>npm start</span> <span class="terminal-comment"># Démarre DEV ou PROD selon botMode.json</span></div>
    </div>
  </div>
</div>

<!-- Features Section -->
<div class="features-container">
  <div class="section-headline">
    <div class="section-tag">Points Forts</div>
    <h2 class="section-title">Une architecture taillée pour l'évolutivité</h2>
  </div>

  <div class="features-grid">
    <!-- Card 1 -->
    <div class="feature-card">
      <div class="feature-icon-box icon-blurple">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="16" y1="16" x2="16.01" y2="16"></line></svg>
      </div>
      <h3 class="feature-title">Multi-Instances Isolées</h3>
      <p class="feature-desc">
        Lancez un ou plusieurs bots Discord simultanément, chacun disposant de son propre token, de ses commandes activées et de sa configuration spécifique, le tout sans conflit.
      </p>
    </div>

    <!-- Card 2 -->
    <div class="feature-card">
      <div class="feature-icon-box icon-cyan">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      </div>
      <h3 class="feature-title">Système de Modules à la Carte</h3>
      <p class="feature-desc">
        Ajoutez des fonctionnalités complètes et autonomes (AutoRole, ChannelManager, Secretary, VocalDuplicate) activables ou désactivables par bot sans modifier le noyau.
      </p>
    </div>

    <!-- Card 3 -->
    <div class="feature-card">
      <div class="feature-icon-box icon-emerald">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
      </div>
      <h3 class="feature-title">Commandes & Slash Déclaratives</h3>
      <p class="feature-desc">
        Créez des commandes modernes avec typage automatique des arguments, gestion déclarative des permissions et déploiement fluide sur l'API Discord.
      </p>
    </div>

    <!-- Card 4 -->
    <div class="feature-card">
      <div class="feature-icon-box icon-amber">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </div>
      <h3 class="feature-title">Routage d'Événements Robuste</h3>
      <p class="feature-desc">
        <code>EventManager</code> distribue les événements Discord (messages, réactions, connexions, logs) de manière propre et découplée pour chaque instance de bot active.
      </p>
    </div>

    <!-- Card 5 -->
    <div class="feature-card">
      <div class="feature-icon-box icon-violet">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
      </div>
      <h3 class="feature-title">SelfApi & Webhooks Intégrés</h3>
      <p class="feature-desc">
        Pilotez les bots, déclenchez des messages ou modifiez des configurations à chaud depuis un tableau de bord web grâce à l'API REST et aux sockets intégrés.
      </p>
    </div>

    <!-- Card 6 -->
    <div class="feature-card">
      <div class="feature-icon-box icon-rose">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </div>
      <h3 class="feature-title">Environnement Dual DEV / PROD</h3>
      <p class="feature-desc">
        Passez instantanément du mode développement (chargement de <code>configs.json</code> local) au mode production (chargement depuis la base de données distante) en modifiant <code>botMode.json</code>.
      </p>
    </div>
  </div>
</div>

<!-- Architecture Pipeline Card -->
<div class="code-block-wrapper" style="padding: 2rem; background: var(--bg-surface); margin: 3rem 0;">
  <h2 style="margin-top: 0; color: #fff;">Flux d'Exécution & Cycle de Vie</h2>
  <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
    Au démarrage avec <code>npm start</code>, MultiBot initialise sa hiérarchie de manière séquentielle et résiliente :
  </p>
  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
    <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 3px solid var(--accent-blurple);">
      <strong style="color: var(--accent-blurple-light); min-width: 140px;">1. Point d'entrée</strong>
      <span><code>main.js</code> lit <code>botMode.json</code> et charge les données de configuration (locale ou base de données).</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 3px solid var(--accent-cyan);">
      <strong style="color: var(--accent-cyan); min-width: 140px;">2. BotManager</strong>
      <span>Instancie chaque <code>Bot</code> actif et lance les gestionnaires de commandes et d'événements.</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 3px solid var(--accent-emerald);">
      <strong style="color: var(--accent-emerald); min-width: 140px;">3. Modules & Events</strong>
      <span>Initialise les modules spécifiques pour chaque bot et connecte les écouteurs d'événements Discord.</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 3px solid var(--accent-violet);">
      <strong style="color: var(--accent-violet); min-width: 140px;">4. En Ligne</strong>
      <span>Les bots sont connectés, leurs commandes slash synchronisées et l'API interne est disponible.</span>
    </div>
  </div>
</div>

<!-- Explore Hub Section -->
<div style="margin-top: 4rem;">
  <div class="section-headline">
    <div class="section-tag">Documentation & Référence</div>
    <h2 class="section-title">Explorez la documentation</h2>
  </div>

  <div class="explore-grid">
    <a href="{{ '/configuration.html' | relative_url }}" class="explore-card">
      <div class="explore-header">
        <span class="explore-title">Configuration</span>
        <span class="explore-arrow">→</span>
      </div>
      <p class="explore-desc">Configurez vos tokens de bots, préfixes, rôles d'administration et serveurs cibles.</p>
    </a>

    <a href="{{ '/architecture.html' | relative_url }}" class="explore-card">
      <div class="explore-header">
        <span class="explore-title">Architecture</span>
        <span class="explore-arrow">→</span>
      </div>
      <p class="explore-desc">Comprenez le rôle de BotManager, Bot, CommandManager et EventManager en détail.</p>
    </a>

    <a href="{{ '/modules-list.html' | relative_url }}" class="explore-card">
      <div class="explore-header">
        <span class="explore-title">Modules</span>
        <span class="explore-arrow">→</span>
      </div>
      <p class="explore-desc">Explorez les modules intégrés : AutoRole, ChannelManager, Secretary, VocalDuplicate, etc.</p>
    </a>

    <a href="{{ '/commands-list.html' | relative_url }}" class="explore-card">
      <div class="explore-header">
        <span class="explore-title">Commandes</span>
        <span class="explore-arrow">→</span>
      </div>
      <p class="explore-desc">Découvrez l'ensemble des commandes disponibles, leurs paramètres et leurs permissions.</p>
    </a>

    <a href="{{ '/classes-list.html' | relative_url }}" class="explore-card">
      <div class="explore-header">
        <span class="explore-title">Classes Core</span>
        <span class="explore-arrow">→</span>
      </div>
      <p class="explore-desc">Documentation technique des classes et services du framework MultiBot.</p>
    </a>

    <a href="{{ '/sitemap.html' | relative_url }}" class="explore-card">
      <div class="explore-header">
        <span class="explore-title">Plan du site</span>
        <span class="explore-arrow">→</span>
      </div>
      <p class="explore-desc">Accédez à l'arborescence complète de tous les fichiers et documentations générés.</p>
    </a>
  </div>
</div>
