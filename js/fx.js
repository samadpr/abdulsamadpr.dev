/* ==========================================================================
   Ambient effects: particle field, parallax, timeline progress, 3D tilt, sliding nav underline.
   Everything is skipped for prefers-reduced-motion; pointer effects only on fine pointers.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- sliding nav underline (works even with reduced motion) ---------------- */
  var navLinks = document.getElementById('nav-links');
  if (navLinks) {
    var ind = document.createElement('span'); ind.className = 'nav-ind'; ind.setAttribute('aria-hidden', 'true');
    navLinks.appendChild(ind);
    var placeInd = function () {
      var a = navLinks.querySelector('a.active');
      if (!a || navLinks.offsetParent === null || window.getComputedStyle(ind).display === 'none') { if (ind.classList.contains('on')) ind.classList.remove('on'); return; }
      ind.style.width = a.offsetWidth + 'px';
      ind.style.transform = 'translateX(' + a.offsetLeft + 'px)';
      if (!ind.classList.contains('on')) ind.classList.add('on');
    };
    // ignore mutations on the indicator itself, otherwise updating it re-triggers this observer forever
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) if (list[i].target !== ind) { placeInd(); return; }
    }).observe(navLinks, { subtree: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', placeInd, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeInd);
    placeInd();
  }

  if (reduce) return;

  /* ---------------- scroll-driven: parallax + timeline progress ---------------- */
  var par = $$('[data-parallax]'), timeline = document.querySelector('.xp-list'), ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    if (y < vh * 1.6) par.forEach(function (el) { el.style.setProperty('--py', (-y * parseFloat(el.dataset.parallax)).toFixed(1) + 'px'); });
    if (timeline) {
      var r = timeline.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) timeline.style.setProperty('--tp', Math.max(0, Math.min(1, (vh * 0.65 - r.top) / r.height)).toFixed(3));
    }
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------------- 3D tilt (cards flagged with data-tilt) ---------------- */
  if (fine) {
    $$('[data-tilt]').forEach(function (el) {
      var raf = 0, ev = null;
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        ev = e; el.classList.add('tilting');
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0; var r = el.getBoundingClientRect();
          var x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
          el.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg'); el.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
        });
      });
      el.addEventListener('pointerleave', function () {
        el.classList.remove('tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------------- particle field ---------------- */
  var canvas = document.getElementById('fx-canvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), pts = [], color = '#5b9bff', running = true, last = 0;

  function readColor() { color = (getComputedStyle(root).getPropertyValue('--accent') || '#5b9bff').trim(); }
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = W < 700 ? 16 : Math.max(18, Math.min(44, Math.round(W * H / 42000)));
    while (pts.length < n) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.3 + .6 });
    pts.length = n;
  }
  function frame(t) {
    if (!running) return;
    requestAnimationFrame(frame);
    if (t - last < 33) return; last = t; // ~30fps is plenty for slow drifting dots
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = color; ctx.strokeStyle = color;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
      ctx.globalAlpha = .45; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
        if (d2 < 14400) { ctx.globalAlpha = (1 - d2 / 14400) * .13; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
    }
  }
  readColor(); resize();
  new MutationObserver(readColor).observe(root, { attributes: true, attributeFilter: ['data-accent', 'data-theme'] });
  var rt = 0; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 150); }, { passive: true });
  document.addEventListener('visibilitychange', function () { if (document.hidden) running = false; else if (!running) { running = true; requestAnimationFrame(frame); } });
  requestAnimationFrame(frame);
})();
