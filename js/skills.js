/* ==========================================================================
   Technical expertise: data, rendering, category tabs, search, ecosystem view.
   Every skill lives once in SKILLS; the grid, counts and ecosystem are all derived from it.
   Icons: Simple Icons (CC0), self-hosted in images/icons; "fa:" entries are Font Awesome glyphs
   used where no official brand icon exists (AI concepts, ASP.NET MVC, Azure services, CI/CD).
   ========================================================================== */
(function () {
  'use strict';

  // Source of truth: "Abdul Samad - Resume.pdf" (TECHNICAL SKILLS + WORK EXPERIENCE). Nothing here is added from outside the resume.
  var CATS = [
    { id: 'all', label: 'All Skills', tag: '' },
    { id: 'languages', label: 'Languages', tag: 'Language' },
    { id: 'frameworks', label: 'Frameworks', tag: 'Framework' },
    { id: 'databases', label: 'Databases', tag: 'Database' },
    { id: 'ai', label: 'AI & Intelligent Systems', tag: 'AI' },
    { id: 'cloud', label: 'Cloud & DevOps', tag: 'Cloud / DevOps' },
    { id: 'tools', label: 'Tools & Platforms', tag: 'Tool' },
    { id: 'design', label: 'Design & Prototyping', tag: 'Design' },
    { id: 'concepts', label: 'Concepts & Methodologies', tag: 'Concept' },
    { id: 'soft', label: 'Soft Skills', tag: 'Soft skill' }
  ];

  // [name, category, ecosystem group, icon, extra search keywords]
  // Ecosystem group 'none' = not a technology (soft skills), so it is not drawn in the ecosystem view.
  var SKILLS = [
    // Programming Languages
    ['C#', 'languages', 'back', 'si:csharp', 'csharp dotnet .net'],
    ['JavaScript', 'languages', 'front', 'si:javascript', 'js ecmascript'],
    ['TypeScript', 'languages', 'front', 'si:typescript', 'ts'],
    ['Dart', 'languages', 'front', 'si:dart', 'flutter'],
    ['Python', 'languages', 'back', 'si:python', 'py scripting'],
    ['HTML', 'languages', 'front', 'si:html5', 'html5 markup web'],
    ['CSS / SCSS', 'languages', 'front', 'si:css3', 'css3 scss sass styling'],
    ['JSON', 'languages', 'data', 'si:json', 'data format api'],

    // Frameworks & Libraries
    ['ASP.NET Core', 'frameworks', 'back', 'si:dotnet', 'aspnet .net web api rest backend'],
    ['ASP.NET MVC', 'frameworks', 'back', 'fa:fa-solid fa-sitemap', 'aspnet mvc razor .net'],
    ['Blazor', 'frameworks', 'back', 'si:blazor', '.net maui webassembly'],
    ['Angular', 'frameworks', 'front', 'si:angular', 'typescript spa frontend'],
    ['Flutter', 'frameworks', 'front', 'si:flutter', 'dart mobile cross-platform android ios'],
    ['Bootstrap', 'frameworks', 'front', 'si:bootstrap', 'css responsive'],
    ['jQuery', 'frameworks', 'front', 'si:jquery', 'javascript dom'],
    ['Chart.js', 'frameworks', 'front', 'si:chartdotjs', 'charts graphs visualisation analytics'],

    // Databases
    ['Microsoft SQL Server', 'databases', 'data', 'si:microsoftsqlserver', 'ms sql server mssql t-sql relational'],
    ['MySQL', 'databases', 'data', 'si:mysql', 'sql relational'],
    ['PostgreSQL', 'databases', 'data', 'si:postgresql', 'postgres sql relational'],
    ['SQLite', 'databases', 'data', 'si:sqlite', 'sql embedded local'],
    ['MongoDB', 'databases', 'data', 'si:mongodb', 'nosql document unstructured'],

    // AI & Intelligent Systems
    ['Azure AI Foundry', 'ai', 'ai', 'si:microsoftazure', 'azure ai llm foundry'],
    ['Google Gemini AI', 'ai', 'ai', 'si:googlegemini', 'gemini google llm'],
    ['Large Language Models (LLMs)', 'ai', 'ai', 'fa:fa-solid fa-brain', 'llm generative ai'],
    ['AI Assistant Development', 'ai', 'ai', 'fa:fa-solid fa-comments', 'assistant copilot chatbot'],
    ['Retrieval-Augmented Generation (RAG)', 'ai', 'ai', 'fa:fa-solid fa-book-open-reader', 'rag retrieval augmented embeddings vector'],
    ['Prompt Engineering', 'ai', 'ai', 'fa:fa-solid fa-wand-magic-sparkles', 'prompts llm'],
    ['Contextual AI Systems', 'ai', 'ai', 'fa:fa-solid fa-layer-group', 'context aware'],
    ['Enterprise AI Integration', 'ai', 'ai', 'fa:fa-solid fa-building', 'enterprise ai integrate'],
    ['Conversational AI', 'ai', 'ai', 'fa:fa-solid fa-message', 'chat dialogue bot'],
    ['AI Powered Search', 'ai', 'ai', 'fa:fa-solid fa-magnifying-glass-chart', 'ai search intelligent'],
    ['Semantic Search', 'ai', 'ai', 'fa:fa-solid fa-magnifying-glass', 'vector embeddings retrieval'],
    ['Vector-Based Knowledge Retrieval', 'ai', 'ai', 'fa:fa-solid fa-database', 'vector embeddings knowledge retrieval'],
    ['AI Workflow Automation', 'ai', 'ai', 'fa:fa-solid fa-gears', 'automation workflow ai'],

    // Cloud & DevOps
    ['Microsoft Azure', 'cloud', 'cloud', 'si:microsoftazure', 'cloud'],
    ['Azure App Services', 'cloud', 'cloud', 'fa:fa-solid fa-window-maximize', 'azure hosting paas web apps'],
    ['Azure Storage', 'cloud', 'cloud', 'fa:fa-solid fa-hard-drive', 'azure blob storage files'],
    ['Azure Monitoring', 'cloud', 'cloud', 'fa:fa-solid fa-chart-line', 'azure monitor logging observability'],
    ['Azure DevOps', 'cloud', 'cloud', 'si:azuredevops', 'azure pipelines boards'],
    ['Azure Repos', 'cloud', 'cloud', 'fa:fa-solid fa-code-branch', 'azure git repositories'],
    ['CI/CD Pipelines', 'cloud', 'cloud', 'fa:fa-solid fa-arrows-spin', 'cicd continuous integration delivery deployment'],
    ['GitHub Actions', 'cloud', 'cloud', 'si:githubactions', 'workflows automation ci'],
    ['Docker', 'cloud', 'cloud', 'si:docker', 'containers containerization'],
    ['Environment Configuration', 'cloud', 'cloud', 'fa:fa-solid fa-sliders', 'config settings environments'],
    ['Secret Management', 'cloud', 'cloud', 'fa:fa-solid fa-key', 'secrets security keys'],

    // Tools & Platforms
    ['Git', 'tools', 'cloud', 'si:git', 'version control'],
    ['GitHub', 'tools', 'cloud', 'si:github', 'git repository'],
    ['GitLab', 'tools', 'cloud', 'si:gitlab', 'git repository ci'],
    ['RabbitMQ', 'tools', 'back', 'si:rabbitmq', 'message queue broker messaging'],
    ['Firebase', 'tools', 'cloud', 'si:firebase', 'google push notifications analytics'],
    ['Visual Studio', 'tools', 'cloud', 'si:visualstudio', 'ide microsoft .net'],
    ['Visual Studio Code', 'tools', 'cloud', 'si:visualstudiocode', 'vs code vscode editor ide'],
    ['Android Studio', 'tools', 'front', 'si:androidstudio', 'ide android flutter'],
    ['Eclipse', 'tools', 'cloud', 'si:eclipseide', 'ide java'],
    ['Postman', 'tools', 'back', 'si:postman', 'api testing http'],
    ['Swagger', 'tools', 'back', 'si:swagger', 'openapi api documentation'],
    ['Trello', 'tools', 'cloud', 'si:trello', 'kanban agile project management'],
    ['NPM', 'tools', 'front', 'si:npm', 'node package manager'],
    ['Google DevTools', 'tools', 'front', 'si:googlechrome', 'chrome devtools browser debugging'],

    // Design & Prototyping
    ['Figma', 'design', 'front', 'si:figma', 'ui ux prototype design'],
    ['Photoshop', 'design', 'front', 'si:adobephotoshop', 'adobe image editing design'],
    ['Diagrams (draw.io)', 'design', 'front', 'si:diagramsdotnet', 'drawio draw.io system diagrams'],

    // Concepts & Methodologies
    ['MVC Architecture', 'concepts', 'back', 'fa:fa-solid fa-diagram-project', 'model view controller architecture'],
    ['RESTful APIs', 'concepts', 'back', 'fa:fa-solid fa-plug', 'rest api http'],
    ['IoT & Device Integration', 'concepts', 'back', 'fa:fa-solid fa-microchip', 'iot rfid qr hardware devices'],
    ['SDLC', 'concepts', 'cloud', 'fa:fa-solid fa-arrows-rotate', 'software development life cycle'],
    ['Agile Methodologies', 'concepts', 'cloud', 'fa:fa-solid fa-bars-progress', 'agile scrum sprint'],
    ['System Analysis', 'concepts', 'cloud', 'fa:fa-solid fa-magnifying-glass-chart', 'requirements analysis'],
    ['Database Design & Normalization', 'concepts', 'data', 'fa:fa-solid fa-table', 'database schema normalisation'],
    ['Version Control (Git Workflow)', 'concepts', 'cloud', 'fa:fa-solid fa-code-merge', 'git branching workflow'],

    // Soft Skills
    ['Problem Solving', 'soft', 'none', 'fa:fa-solid fa-puzzle-piece', 'solve problems'],
    ['Time Management', 'soft', 'none', 'fa:fa-solid fa-clock', 'planning deadlines'],
    ['Debugging & Troubleshooting', 'soft', 'none', 'fa:fa-solid fa-bug', 'debug troubleshoot'],
    ['Team Collaboration', 'soft', 'none', 'fa:fa-solid fa-people-group', 'teamwork collaborate'],
    ['Leadership', 'soft', 'none', 'fa:fa-solid fa-user-tie', 'lead'],
    ['Growth Mindset', 'soft', 'none', 'fa:fa-solid fa-seedling', 'learning growth']
  ];

  // Ecosystem groups (original hub layout). Every skill belongs to exactly one group (column 3 of SKILLS).
  var ECO = {
    back: { title: 'Backend', sub: 'APIs & services', icon: 'fa-server' },
    front: { title: 'Frontend & Mobile', sub: 'Interfaces & apps', icon: 'fa-display' },
    data: { title: 'Data', sub: 'Storage & formats', icon: 'fa-database' },
    ai: { title: 'AI', sub: 'Intelligent systems', icon: 'fa-brain' },
    cloud: { title: 'Cloud, DevOps & Tooling', sub: 'Delivery & workflow', icon: 'fa-cloud' }
  };

  // What the collapsed "All Skills" view shows, in priority order (no ratings or percentages: order is the only signal).
  // The first CORE_COUNT entries are the core stack and get restrained visual emphasis.
  var FEATURED = [
    'C#', 'ASP.NET Core', 'Angular', 'Microsoft SQL Server', 'Microsoft Azure', 'Flutter', 'Python', 'Azure AI Foundry', 'Docker',
    'TypeScript', 'JavaScript', 'PostgreSQL', 'Retrieval-Augmented Generation (RAG)', 'Large Language Models (LLMs)', 'Dart',
    'CI/CD Pipelines', 'GitHub Actions', 'Git'
  ];
  var CORE_COUNT = 9;
  var FEAT = {};
  FEATURED.forEach(function (n, i) { FEAT[n] = i; });
  var LIMIT_MIN = 12, LIMIT_MAX = 18; // collapsed view always ends on a full row and stays within 12-18 cards

  var root = document.getElementById('skills-app');
  if (!root) return;
  var $ = function (s, c) { return (c || root).querySelector(s); };
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = { cat: 'all', q: '', view: 'grid', expanded: false };
  var grid = $('#sk-grid'), empty = $('#sk-empty'), meta = $('#sk-meta'), input = $('#sk-q'), searchWrap = $('.sk-search');
  var tabsEl = $('#cat-tabs'), ind = $('#cat-ind'), scroller = $('.cat-scroll');
  var moreWrap = $('#sk-more'), moreBtn = $('#sk-more-btn'), moreLabel = $('#sk-more-label'), moreCount = $('#sk-more-count'), moreIcon = $('#sk-more-icon');
  var eco = $('#eco'), tabsWrap = $('#sk-tabswrap'), searchBox = $('#sk-searchwrap'), panelEl = $('#sk-panel');

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  // custom-property URLs resolve against the stylesheet, so build absolute URLs from the page base
  var ICON_BASE = new URL('images/icons/', document.baseURI).href;
  function iconHtml(ic) {
    var p = ic.split(':');
    if (p[0] === 'si') return '<span class="ico" aria-hidden="true" style="--ico:url(' + ICON_BASE + p[1] + '.svg)"></span>';
    return '<i class="' + p[1] + '" aria-hidden="true"></i>';
  }
  function tagOf(cat) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === cat) return CATS[i].tag; return ''; }
  function norm(s) { return s.toLowerCase().replace(/[.\-_/()]/g, ' ').replace(/\s+/g, ' ').trim(); }

  /* ---------- render once ---------- */
  var cards = SKILLS.map(function (s, i) {
    var li = document.createElement('li');
    li.className = 'sk-card pre';
    li.dataset.cat = s[1];
    li.dataset.hay = norm(s[0] + ' ' + s[4] + ' ' + tagOf(s[1]));
    li.innerHTML = '<div class="sk-top"><span class="sk-ico">' + iconHtml(s[3]) + '</span><span class="sk-tag">' + esc(tagOf(s[1])) + '</span></div><span class="sk-name">' + esc(s[0]) + '</span>';
    li._name = s[0]; li._idx = i; li._rank = FEAT.hasOwnProperty(s[0]) ? FEAT[s[0]] : 999;
    if (li._rank < CORE_COUNT) li.classList.add('core');
    grid.appendChild(li);
    return li;
  });

  // tabs
  var counts = {};
  SKILLS.forEach(function (s) { counts[s[1]] = (counts[s[1]] || 0) + 1; });
  counts.all = SKILLS.length;
  CATS.forEach(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'cat-tab'; b.id = 'cat-' + c.id; b.setAttribute('role', 'tab'); b.dataset.cat = c.id;
    b.setAttribute('aria-controls', 'sk-panel');
    b.innerHTML = esc(c.label) + '<span class="count">' + counts[c.id] + '</span>';
    tabsEl.appendChild(b);
  });
  var tabs = Array.prototype.slice.call(tabsEl.querySelectorAll('.cat-tab'));

  function placeIndicator(instant) {
    var t = tabs.filter(function (b) { return b.dataset.cat === state.cat; })[0];
    if (!t) return;
    if (instant) ind.style.transition = 'none';
    ind.style.width = t.offsetWidth + 'px';
    ind.style.transform = 'translateX(' + (t.offsetLeft) + 'px)';
    if (instant) { void ind.offsetWidth; ind.style.transition = ''; }
    // keep the active tab visible inside the horizontal scroller (never scrolls the page)
    var target = t.offsetLeft - (scroller.clientWidth - t.offsetWidth) / 2;
    if (scroller.scrollWidth > scroller.clientWidth) scroller.scrollTo({ left: Math.max(0, target), behavior: instant || reduce ? 'auto' : 'smooth' });
  }

  /* ---------- ordering, collapsed limit, filtering ---------- */
  var settleTimer = 0;
  function highlight(li, q) {
    var name = li._name, out = esc(name), nameEl = li.querySelector('.sk-name');
    if (q) {
      var i = name.toLowerCase().indexOf(q.toLowerCase());
      if (i > -1) out = esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + q.length)) + '</mark>' + esc(name.slice(i + q.length));
    }
    if (nameEl.innerHTML !== out) nameEl.innerHTML = out;
  }

  // "All" lists the featured skills first (so the collapsed view is simply the first N cards); categories keep data order.
  // The DOM itself is reordered, so keyboard and screen-reader order always matches what is on screen.
  var orderKey = '';
  function orderCards(key) {
    if (orderKey === key) return;
    orderKey = key;
    var arr = cards.slice();
    if (key === 'all') arr.sort(function (a, b) { return (a._rank - b._rank) || (a._idx - b._idx); });
    var frag = document.createDocumentFragment();
    arr.forEach(function (c) { frag.appendChild(c); });
    grid.appendChild(frag);
  }

  // complete rows only: 12 on 2/3/4/6 columns, 15 on 5, 14 on 7, 16 on 8 (never above 18)
  function visibleLimit() {
    var cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(function (v) { return v && v !== 'none'; }).length || 2;
    cols = Math.max(2, cols);
    return Math.min(LIMIT_MAX, cols * Math.ceil(LIMIT_MIN / cols));
  }

  function isCollapsed(tokens) { return state.cat === 'all' && !tokens.length && !state.expanded; }

  function apply(animate, onlyNew) {
    // word-prefix matching: "rag" finds RAG but not "Sto-rag-e"
    var tokens = norm(state.q).split(' ').filter(Boolean);
    var searching = tokens.length > 0;
    var before = grid.offsetHeight;
    grid.hidden = false;
    orderCards(state.cat === 'all' ? 'all' : 'cat');
    // Search and category filters always look at the FULL list; only the untouched "All" view is ever truncated,
    // so a match can never be hidden behind the collapsed state.
    var limit = isCollapsed(tokens) ? visibleLimit() : Infinity;
    var shown = 0, total = 0;
    Array.prototype.forEach.call(grid.children, function (li) {
      var match = (state.cat === 'all' || li.dataset.cat === state.cat) && tokens.every(function (t) { return (' ' + li.dataset.hay).indexOf(' ' + t) > -1; });
      if (match) total++;
      var ok = match && shown < limit;
      var wasHidden = li.hidden;
      li.hidden = !ok;
      li.classList.remove('leaving');
      if (ok) {
        highlight(li, state.q.trim());
        if (animate && (!onlyNew || wasHidden)) {
          li.classList.remove('enter'); void li.offsetWidth;
          li.style.setProperty('--i', onlyNew ? Math.min(shown - Math.min(limitPrev, shown), 22) : Math.min(shown, 24));
          li.classList.add('enter');
        }
        shown++;
      }
    });
    // smooth height change for filter switches: hold the old height, then ease to the new one
    if (animate && !onlyNew && !reduce && before) {
      grid.style.minHeight = '0px';
      var after = grid.offsetHeight;
      grid.style.minHeight = before + 'px'; void grid.offsetHeight;
      grid.style.minHeight = after + 'px';
      clearTimeout(settleTimer);
      settleTimer = setTimeout(function () { grid.style.minHeight = ''; }, 500);
    }
    limitPrev = shown;
    grid.hidden = shown === 0;
    empty.classList.toggle('show', shown === 0);
    $('#sk-empty-q').textContent = state.q.trim();
    meta.innerHTML = 'Showing <b>' + shown + '</b> of ' + SKILLS.length + ' skills';
    searchWrap.classList.toggle('has-value', !!state.q);
    var current = CATS.filter(function (c) { return c.id === state.cat; })[0];
    grid.setAttribute('aria-label', current.label + ' – ' + shown + ' skills');

    // Explore / Show Less is only meaningful for the plain "All" view
    var canToggle = state.cat === 'all' && !searching && state.view === 'grid';
    moreWrap.hidden = !canToggle;
    if (canToggle) {
      moreBtn.setAttribute('aria-expanded', String(state.expanded));
      moreLabel.textContent = state.expanded ? 'Show Less' : 'Explore All Skills';
      moreCount.textContent = state.expanded ? '' : '+' + (SKILLS.length - shown);
      moreCount.hidden = state.expanded;
      moreIcon.className = 'fa-solid ' + (state.expanded ? 'fa-arrow-up' : 'fa-arrow-right');
    }
  }
  var limitPrev = 0;

  function setCat(id, focus) {
    state.cat = id;
    tabs.forEach(function (b) {
      var on = b.dataset.cat === id;
      b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus({ preventScroll: true });
    });
    panelEl.setAttribute('aria-labelledby', 'cat-' + id);
    placeIndicator(false);
    apply(true);
  }

  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { setCat(b.dataset.cat); });
    b.addEventListener('keydown', function (e) {
      var n = -1;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n > -1) { e.preventDefault(); setCat(tabs[n].dataset.cat, true); }
    });
  });

  input.addEventListener('input', function () { state.q = input.value; apply(true); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Escape' && input.value) { e.stopPropagation(); clearSearch(); } });
  function clearSearch() { input.value = ''; state.q = ''; apply(true); input.focus(); }
  $('#sk-clear').addEventListener('click', clearSearch);
  $('#sk-reset').addEventListener('click', function () { input.value = ''; state.q = ''; setCat('all'); });

  /* ---------- Explore All Skills / Show Less ---------- */
  var busy = false;
  // Animate the grid's height between its old and new natural height so nothing jumps.
  function resizeAnimated(mutate, done) {
    var h0 = grid.offsetHeight;
    grid.style.height = h0 + 'px'; grid.style.overflow = 'hidden';
    mutate();
    grid.style.height = 'auto';
    var h1 = grid.offsetHeight;
    grid.style.height = h0 + 'px'; void grid.offsetHeight;
    grid.style.transition = 'height .6s cubic-bezier(.22,1,.36,1)';
    grid.style.height = h1 + 'px';
    var finished = false;
    function end() {
      if (finished) return; finished = true;
      grid.style.height = ''; grid.style.overflow = ''; grid.style.transition = '';
      busy = false; if (done) done();
    }
    grid.addEventListener('transitionend', function te(e) { if (e.propertyName === 'height') { grid.removeEventListener('transitionend', te); end(); } });
    setTimeout(end, 750);
  }

  function toggleExpand() {
    if (busy) return;
    var expanding = !state.expanded;
    if (reduce) { state.expanded = expanding; apply(false); return; }
    busy = true;
    if (expanding) {
      resizeAnimated(function () { state.expanded = true; apply(true, true); });
    } else {
      // fade the extra cards out first, then collapse the box
      var visible = Array.prototype.filter.call(grid.children, function (c) { return !c.hidden; });
      var extras = visible.slice(visibleLimit());
      extras.forEach(function (c) { c.classList.add('leaving'); });
      setTimeout(function () {
        resizeAnimated(function () { state.expanded = false; apply(false); }, function () {
          // keep the button in view after the page got shorter
          var r = moreBtn.getBoundingClientRect();
          if (r.bottom > window.innerHeight || r.top < 80) moreBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        });
      }, 230);
    }
  }
  moreBtn.addEventListener('click', toggleExpand);

  // pointer glow on cards (single delegated listener, rAF-throttled)
  if (finePointer) {
    var raf = 0, last = null;
    grid.addEventListener('pointermove', function (e) {
      last = e; if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var c = last.target.closest && last.target.closest('.sk-card'); if (!c) return;
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (last.clientX - r.left) + 'px'); c.style.setProperty('--my', (last.clientY - r.top) + 'px');
      });
    }, { passive: true });
  }

  /* ---------- ecosystem view: hub with connected groups ---------- */
  var ecoBuilt = false, svg, hub;
  function buildEco() {
    if (ecoBuilt) return; ecoBuilt = true;
    var html = '<svg class="eco-lines" aria-hidden="true"></svg>' +
      '<div class="eco-hub glass"><span class="core"><i class="fa-solid fa-code"></i></span><div><b>Abdul Samad P R</b><span>Software Engineer</span></div></div>';
    Object.keys(ECO).forEach(function (k) {
      var e = ECO[k], list = SKILLS.filter(function (s) { return s[2] === k; });
      html += '<section class="eco-node glass" data-eco="' + k + '" aria-label="' + esc(e.title) + ' ecosystem"><header><span class="ic"><i class="fa-solid ' + e.icon + '"></i></span><div><h3>' + esc(e.title) + '</h3><small>' + esc(e.sub) + ' · ' + list.length + '</small></div></header><ul class="eco-chips">' +
        list.map(function (s) { return '<li class="eco-chip">' + iconHtml(s[3]) + esc(s[0]) + '</li>'; }).join('') + '</ul></section>';
    });
    eco.innerHTML = html;
    svg = eco.querySelector('.eco-lines'); hub = eco.querySelector('.eco-hub');
    Array.prototype.forEach.call(eco.querySelectorAll('.eco-node'), function (n) {
      n.addEventListener('pointerenter', function () { hot(n.dataset.eco); });
      n.addEventListener('pointerleave', function () { hot(null); });
      n.addEventListener('focusin', function () { hot(n.dataset.eco); });
      n.addEventListener('focusout', function () { hot(null); });
    });
    if ('ResizeObserver' in window) new ResizeObserver(drawLines).observe(eco);
  }
  function hot(k) {
    if (!svg) return;
    Array.prototype.forEach.call(svg.querySelectorAll('path'), function (p) {
      p.classList.toggle('hot', !!k && p.dataset.eco === k);
      p.classList.toggle('dim', !!k && p.dataset.eco !== k);
    });
  }
  function edge(r, cx, cy, tx, ty) { // point where the ray from (cx,cy) toward (tx,ty) leaves rect r
    var dx = tx - cx, dy = ty - cy, w = r.width / 2, h = r.height / 2;
    var s = Math.min(dx ? w / Math.abs(dx) : Infinity, dy ? h / Math.abs(dy) : Infinity);
    return [cx + dx * s, cy + dy * s];
  }
  function drawLines() {
    if (!svg || !eco.classList.contains('show') || window.getComputedStyle(svg).display === 'none') return;
    var base = eco.getBoundingClientRect(), hr = hub.getBoundingClientRect();
    var hx = hr.left - base.left + hr.width / 2, hy = hr.top - base.top + hr.height / 2;
    svg.setAttribute('viewBox', '0 0 ' + base.width + ' ' + base.height);
    var d = '';
    Array.prototype.forEach.call(eco.querySelectorAll('.eco-node'), function (n) {
      var r = n.getBoundingClientRect(), nx = r.left - base.left + r.width / 2, ny = r.top - base.top + r.height / 2;
      var a = edge(hr, hx, hy, nx, ny), b = edge(r, nx, ny, hx, hy);
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      var cxp = mx + (-(b[1] - a[1]) / len) * len * 0.1, cyp = my + ((b[0] - a[0]) / len) * len * 0.1;
      d += '<path data-eco="' + n.dataset.eco + '" d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' Q' + cxp.toFixed(1) + ' ' + cyp.toFixed(1) + ' ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + '"/>';
    });
    svg.innerHTML = d;
  }

  var viewBtns = Array.prototype.slice.call(root.querySelectorAll('.view-toggle button'));
  function setView(v) {
    state.view = v;
    viewBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.view === v)); });
    var isEco = v === 'eco';
    tabsWrap.hidden = isEco; searchBox.hidden = isEco;
    if (isEco) { buildEco(); panelEl.hidden = true; moreWrap.hidden = true; eco.classList.add('show'); requestAnimationFrame(drawLines); }
    else { eco.classList.remove('show'); panelEl.hidden = false; apply(true); placeIndicator(true); }
  }
  viewBtns.forEach(function (b) { b.addEventListener('click', function () { setView(b.dataset.view); }); });
  var rt = 0;
  window.addEventListener('resize', function () {
    placeIndicator(true); drawLines();
    clearTimeout(rt); // column count changes the collapsed limit, so re-apply once resizing settles
    rt = setTimeout(function () { if (state.view === 'grid' && !busy && isCollapsed(norm(state.q).split(' ').filter(Boolean))) apply(false); }, 150);
  }, { passive: true });

  /* ---------- initial state + entrance when scrolled into view ---------- */
  setCat('all');
  placeIndicator(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placeIndicator(true); });
  var started = false;
  function start() {
    if (started) return; started = true;
    cards.forEach(function (li) { li.classList.remove('pre'); });
    apply(true);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { start(); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(grid);
  } else start();

  // expose for tests / other modules
  window.SKILLS_DATA = SKILLS;
})();
