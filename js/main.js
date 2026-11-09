/* ==========================================================================
   Portfolio behaviour – vanilla JS, no dependencies.
   Sections: navigation · reveal · projects · AI · hero motion · form  (theme, skills, cursor and background effects live in their own files)
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  
  /* ---------------- NAVIGATION + SCROLL ----------------
     Native smooth scrolling only (no scroll library, no wheel hijacking): anchors are intercepted just to
     update the URL, active state and keyboard focus. Offsets come from CSS (scroll-padding / scroll-margin). */
  if ('scrollRestoration' in history) history.scrollRestoration = 'auto'; // let the browser restore position on reload / back

  var nav = $('#nav'), navLinks = $('#nav-links'), menuBtn = $('#menu-btn');
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(!navLinks.classList.contains('open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('pointerdown', function (e) {
    if (navLinks.classList.contains('open') && !nav.contains(e.target)) setMenu(false);
  });

  var progress = $('#progress'), toTop = $('#to-top'), ticking = false;
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0).toFixed(4) + ')';
    progress.classList.toggle('on', y > 2);
    nav.classList.toggle('scrolled', y > 8);
    toTop.classList.toggle('show', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // active section indicator
  var links = {};
  $$('a', navLinks).forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  function setActive(id) {
    Object.keys(links).forEach(function (k) {
      var on = k === id;
      links[k].classList.toggle('active', on);
      if (on) links[k].setAttribute('aria-current', 'true'); else links[k].removeAttribute('aria-current');
    });
  }

  // While a click-initiated smooth scroll is travelling, ignore the observer so the highlight doesn't
  // flicker through every section on the way; release once scrolling has been idle for a moment.
  var locked = false, idleTimer = 0, maxTimer = 0;
  function release() {
    locked = false; clearTimeout(idleTimer); clearTimeout(maxTimer);
    window.removeEventListener('scroll', bump);
  }
  function bump() { clearTimeout(idleTimer); idleTimer = setTimeout(release, 160); }
  function lock() {
    locked = true; window.addEventListener('scroll', bump, { passive: true });
    clearTimeout(idleTimer); idleTimer = setTimeout(release, 320); // no scroll event at all => nothing to wait for
    clearTimeout(maxTimer); maxTimer = setTimeout(release, 2000);
  }

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      if (locked) return;
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach(function (s) { spy.observe(s); });
  }

  function goTo(id) {
    var t = document.getElementById(id);
    if (!t) return false;
    lock(); setActive(id);
    t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    try { history.replaceState(history.state, '', id === 'home' ? location.pathname + location.search : '#' + id); } catch (e) { /* file:// etc. */ }
    // keyboard + screen-reader users continue from the section they navigated to
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    t.focus({ preventScroll: true });
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var id = a.getAttribute('href').slice(1);
    if (id && goTo(id)) { e.preventDefault(); setMenu(false); }
  });
  toTop.addEventListener('click', function () { goTo('home'); });

  // deep link / reload with a hash: re-align after fonts and images settle so the heading isn't off by a few px
  window.addEventListener('load', function () {
    var id = location.hash.slice(1), t = id && document.getElementById(id);
    if (t) { setActive(id); t.scrollIntoView({ behavior: 'auto', block: 'start' }); }
  });

  /* ---------------- REVEAL ON SCROLL ---------------- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------------- PROJECTS ---------------- */
  $$('.filters .tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      $$('.filters .tab').forEach(function (b) { b.classList.toggle('active', b === btn); });
      var f = btn.dataset.filter;
      $$('.proj-card').forEach(function (c) {
        var show = f === 'all' || (' ' + c.dataset.cat + ' ').indexOf(' ' + f + ' ') > -1;
        c.classList.toggle('hide', !show);
        if (show) c.classList.add('in');
      });
    });
  });

  // spotlight follows pointer on cards
  if (finePointer) {
    $$('.proj-card').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  var dlg = $('#pd'), lastTrigger = null;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function block(title, html) { return '<div class="pd-block"><h4>' + title + '</h4>' + html + '</div>'; }

  function renderArch(a) {
    if (!a) return '';
    var nodes = a.nodes.map(function (n, i) {
      var arrow = a.type === 'flow' && i < a.nodes.length - 1 ? '<i class="fa-solid fa-arrow-right arch-arrow" aria-hidden="true"></i>' : '';
      return '<div class="arch-node"><b>' + esc(n[0]) + '</b><span>' + esc(n[1]) + '</span></div>' + arrow;
    }).join('');
    return block(a.type === 'flow' ? 'Architecture / workflow' : 'Architecture layers',
      '<div class="arch"><div class="arch-flow ' + (a.type === 'layers' ? 'arch-layers' : '') + '">' + nodes + '</div></div>');
  }

  function openProject(id, trigger) {
    var p = window.PROJECTS && window.PROJECTS[id];
    if (!p || !dlg.showModal) return;
    lastTrigger = trigger || null;
    $('#pd-tags').innerHTML = p.tags.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
    $('#pd-title').textContent = p.title;
    $('#pd-sub').textContent = p.sub;
    var h = '';
    h += block('Overview', '<p>' + esc(p.overview) + '</p>');
    h += '<div class="pd-cols">' + block('Business problem', '<p>' + esc(p.problem) + '</p>') + block('Solution', '<p>' + esc(p.solution) + '</p>') + '</div>';
    h += block('My role & contributions', '<p>' + esc(p.role) + '</p>');
    h += renderArch(p.arch);
    h += block('Key features', '<ul>' + p.features.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>'); // f is trusted local markup
    if (p.impact) h += block('Results', '<ul>' + p.impact.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>');
    h += block('Tech stack', '<div class="chip-row">' + p.stack.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>');
    if (p.note) h += '<div class="pd-note"><i class="fa-solid fa-circle-info"></i> ' + esc(p.note) + '</div>';
    if (p.links && p.links.length) {
      h += '<div class="pd-foot">' + p.links.map(function (l) { return '<a class="btn btn-primary" target="_blank" rel="noopener" href="' + esc(l.href) + '">' + esc(l.label) + ' <i class="fa-solid fa-arrow-up-right-from-square"></i></a>'; }).join('') + '</div>';
    }
    var body = $('#pd-body'); body.innerHTML = h; body.scrollTop = 0;
    dlg.showModal();
    document.body.style.overflow = 'hidden';
  }
  function closeProject() { if (dlg.open) dlg.close(); }
  dlg.addEventListener('close', function () { document.body.style.overflow = ''; if (lastTrigger) lastTrigger.focus(); });
  $('#pd-close').addEventListener('click', closeProject);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeProject(); }); // backdrop click
  $$('[data-project]').forEach(function (el) { el.addEventListener('click', function () { openProject(el.dataset.project, el); }); });

  /* ---------------- AI PIPELINE ---------------- */
  var steps = $$('.pipe-step'), detail = $('#ai-detail');
  function showStep(i) {
    var s = window.AI_STEPS && window.AI_STEPS[i]; if (!s) return;
    steps.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
    var lis = s.items.map(function (it) {
      return '<li><span class="status ' + it[0] + '">' + (it[0] === 'impl' ? 'Implemented' : 'Learning') + '</span><span>' + esc(it[1]) + '</span></li>';
    }).join('');
    detail.innerHTML = '<div><span class="eyebrow">Stage ' + (i + 1) + ' of ' + steps.length + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p><ul>' + lis + '</ul></div>';
  }
  steps.forEach(function (b, i) { b.addEventListener('click', function () { showStep(i); }); });
  showStep(0);

  /* ---------------- MOTION (desktop pointer only, skipped for reduced motion) ---------------- */
  if (finePointer && !reduceMotion) {
    // magnetic buttons
    $$('.magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px');
        b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', function () { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
    });

    // hero photo tilt / parallax
    var frame = $('#hero-frame');
    if (frame) {
      var hero = $('#home');
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        frame.style.transform = 'perspective(900px) rotateY(' + (x * 6).toFixed(2) + 'deg) rotateX(' + (-y * 5).toFixed(2) + 'deg)';
      });
      hero.addEventListener('pointerleave', function () { frame.style.transform = ''; });
    }
  }

  /* ---------------- CONTACT FORM ---------------- */
  // Existing Google Apps Script endpoint from the previous site. Replies are opaque (no-cors),
  // so "resolved" means the request was sent; failures fall back to a direct email link.
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbw8iCT0f2M5hrTKbuWB_D9FtK9HXftjSFeEcZnWXyf9C5GLzytgtAAfmmTYGxICW9bqCw/exec';
  var form = $('#contact-form'), status = $('#f-status'), fbtn = $('#f-btn');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form-status'; status.textContent = '';
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var data = new URLSearchParams(new FormData(form));
    if (data.get('website')) { status.className = 'form-status ok'; status.textContent = 'Thanks!'; form.reset(); return; } // honeypot
    data.delete('website');
    var label = fbtn.innerHTML; fbtn.disabled = true; fbtn.textContent = 'Sending…';
    var ctrl = new AbortController(); var to = setTimeout(function () { ctrl.abort(); }, 15000);
    fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body: data, signal: ctrl.signal })
      .then(function () {
        status.className = 'form-status ok';
        status.textContent = 'Message sent. Thank you, I\'ll get back to you soon.';
        form.reset();
      })
      .catch(function () {
        var subj = encodeURIComponent(data.get('subject') || 'Portfolio enquiry');
        var body = encodeURIComponent((data.get('message') || '') + '\n\n– ' + (data.get('name') || ''));
        status.className = 'form-status err';
        status.innerHTML = 'Could not send right now. Please <a href="mailto:abdulsamadpr.dev@gmail.com?subject=' + subj + '&body=' + body + '">email me directly</a>.';
      })
      .then(function () { clearTimeout(to); fbtn.disabled = false; fbtn.innerHTML = label; });
  });

  /* ---------------- MISC ---------------- */
  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
  var loader = $('#loader');
  function hideLoader() { loader.classList.add('done'); }
  if (document.readyState === 'complete') hideLoader(); else window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 2500); // never block the page on a slow asset
})();
