/* ==========================================================================
   Technology cursor: instant dot + eased ring.
   - only on (hover: hover) and (pointer: fine), never with prefers-reduced-motion
   - hover states are resolved by event delegation on `pointerover`, not on every move
   - the rAF loop runs only while the ring is still catching up with the pointer
   - hidden over inputs/textareas (native text cursor is kept) and while a modal <dialog> is open
   ========================================================================== */
(function () {
  'use strict';

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || reduce.matches) return;

  var root = document.documentElement;
  var dot = document.createElement('div'), ring = document.createElement('div');
  dot.className = 'cur cur-dot'; ring.className = 'cur cur-ring';
  dot.innerHTML = '<i></i>'; ring.innerHTML = '<i></i>';
  dot.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring); document.body.appendChild(dot);

  var TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea, select, [contenteditable="true"]';
  var CARD = '.proj-card, .social, .pipe-step, .sk-card, .eco-node, .cap';
  var LINK = 'a[href], button, [role="button"], [role="tab"], [role="radio"], summary, label[for]';
  var MEDIA = '.hero-frame';
  // how strongly the ring is pulled toward the centre of the hovered element
  var PULL = { link: 0.28, card: 0.06 };

  var px = -100, py = -100;        // pointer
  var rx = -100, ry = -100;        // ring (eased)
  var tx = -100, ty = -100;        // ring target (pointer, possibly pulled toward an element)
  var raf = 0, state = '', pulled = null, pullRect = null, active = false, modalOpen = false;

  function setState(s) { if (s !== state) { state = s; root.dataset.cursor = s || ''; } }

  function loop() {
    raf = 0;
    rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2;
    ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
    if (Math.abs(tx - rx) > 0.15 || Math.abs(ty - ry) > 0.15) raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }

  function retarget() {
    if (pulled && pullRect) {
      var k = PULL[state] || 0;
      tx = px + (pullRect.left + pullRect.width / 2 - px) * k;
      ty = py + (pullRect.top + pullRect.height / 2 - py) * k;
    } else { tx = px; ty = py; }
  }

  function enable() {
    if (active || modalOpen) return;
    active = true; root.classList.add('has-cursor'); dot.classList.add('vis'); ring.classList.add('vis');
  }
  function disable() { active = false; root.classList.remove('has-cursor'); dot.classList.remove('vis'); ring.classList.remove('vis'); }

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    px = e.clientX; py = e.clientY;
    if (!active && !modalOpen) { rx = tx = px; ry = ty = py; enable(); }
    dot.style.transform = 'translate3d(' + px + 'px,' + py + 'px,0)';
    retarget(); kick();
  }, { passive: true });

  // state resolution only when the element under the pointer changes
  document.addEventListener('pointerover', function (e) {
    var t = e.target; if (!(t instanceof Element)) return;
    var s = '', el = null;
    if (t.closest(TEXT)) s = 'text';
    else if ((el = t.closest(CARD))) s = 'card';
    else if ((el = t.closest(LINK))) s = 'link';
    else if ((el = t.closest(MEDIA))) s = 'media';
    setState(s);
    if (el && PULL[s]) { pulled = el; pullRect = el.getBoundingClientRect(); } else { pulled = null; pullRect = null; }
    retarget(); kick();
  }, { passive: true });

  document.addEventListener('pointerdown', function () { root.classList.add('cur-down'); }, { passive: true });
  ['pointerup', 'pointercancel', 'dragend'].forEach(function (n) { window.addEventListener(n, function () { root.classList.remove('cur-down'); }, { passive: true }); });
  document.documentElement.addEventListener('pointerleave', function () { dot.classList.remove('vis'); ring.classList.remove('vis'); });
  document.documentElement.addEventListener('pointerenter', function () { if (active) { dot.classList.add('vis'); ring.classList.add('vis'); } });
  window.addEventListener('scroll', function () { if (pulled) { pullRect = pulled.getBoundingClientRect(); retarget(); kick(); } }, { passive: true });
  window.addEventListener('blur', function () { root.classList.remove('cur-down'); });

  // modal <dialog> lives in the top layer, so nothing can render above it: hand the native cursor back
  var dlg = document.getElementById('pd');
  if (dlg) new MutationObserver(function () {
    modalOpen = dlg.hasAttribute('open');
    if (modalOpen) { disable(); setState('off'); } else { setState(''); if (px > 0) { active = false; enable(); } }
  }).observe(dlg, { attributes: true, attributeFilter: ['open'] });

  // user flips reduced-motion on at runtime: remove everything
  var off = function () { if (reduce.matches) { disable(); dot.remove(); ring.remove(); } };
  if (reduce.addEventListener) reduce.addEventListener('change', off);
})();
