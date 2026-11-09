/* ==========================================================================
   Appearance panel: mode (light / dark / system) + accent palette.
   - state lives on <html data-mode data-theme data-accent>; an inline <head> script
     applies it before first paint, this file owns every change afterwards
   - hover over an accent card previews it live and reverts on leave; click commits
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var btn = document.getElementById('theme-btn'), panel = document.getElementById('ap'), backdrop = document.getElementById('ap-backdrop');
  if (!btn || !panel) return;
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dark = window.matchMedia('(prefers-color-scheme: dark)');
  var mobileMQ = window.matchMedia('(max-width: 640px)');
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var MODES = ['light', 'dark', 'system'];
  var ACCENTS = ['blue', 'teal', 'violet', 'emerald', 'orange', 'rose'];
  var NAMES = { blue: 'Electric Blue', teal: 'Teal', violet: 'Violet', emerald: 'Emerald', orange: 'Sunset', rose: 'Rose' };

  var seg = panel.querySelector('.seg'), segBtns = $$('.seg button', panel), accBtns = $$('.acc-card', panel);
  var modeOut = document.getElementById('ap-mode-out'), accOut = document.getElementById('ap-acc-out');

  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  var state = {
    mode: MODES.indexOf(root.dataset.mode) > -1 ? root.dataset.mode : 'system',
    accent: ACCENTS.indexOf(root.dataset.accent) > -1 ? root.dataset.accent : 'blue'
  };

  /* smooth colour transition window (single timer so rapid hovering never stacks) */
  var animTimer = 0;
  function smooth(ms) {
    if (reduce) return;
    root.classList.add('theme-anim');
    clearTimeout(animTimer);
    animTimer = setTimeout(function () { root.classList.remove('theme-anim'); }, ms || 450);
  }

  function resolved(mode) { return mode === 'dark' || (mode === 'system' && dark.matches) ? 'dark' : 'light'; }

  function paintMode() {
    seg.style.setProperty('--seg', MODES.indexOf(state.mode));
    segBtns.forEach(function (b) { var on = b.dataset.mode === state.mode; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; });
    modeOut.textContent = state.mode === 'system' ? 'System · ' + (resolved('system') === 'dark' ? 'Dark' : 'Light') : state.mode === 'dark' ? 'Dark' : 'Light';
  }
  function paintAccent() {
    accBtns.forEach(function (b) { var on = b.dataset.accent === state.accent; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; });
    accOut.textContent = NAMES[state.accent];
  }

  function setMode(mode, persist) {
    state.mode = mode;
    smooth();
    root.dataset.mode = mode; root.dataset.theme = resolved(mode);
    if (persist) save('sp-mode', mode);
    paintMode();
  }
  function setAccent(accent, persist) {
    state.accent = accent;
    smooth();
    root.dataset.accent = accent;
    if (persist) save('sp-accent', accent);
    paintAccent();
  }

  var onSystem = function () { if (state.mode === 'system') { smooth(); root.dataset.theme = resolved('system'); paintMode(); } };
  if (dark.addEventListener) dark.addEventListener('change', onSystem); else if (dark.addListener) dark.addListener(onSystem);

  /* radio-group behaviour: click + arrow keys (roving tabindex) */
  function radioGroup(items, key, apply) {
    items.forEach(function (b, i) {
      b.addEventListener('click', function () { apply(b.dataset[key], true); });
      b.addEventListener('keydown', function (e) {
        var n = -1, cols = items.length === 6 ? 3 : items.length;
        if (e.key === 'ArrowRight') n = (i + 1) % items.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + items.length) % items.length;
        else if (e.key === 'ArrowDown' && items.length === 6) n = (i + cols) % items.length;
        else if (e.key === 'ArrowUp' && items.length === 6) n = (i - cols + items.length) % items.length;
        if (n > -1) { e.preventDefault(); apply(items[n].dataset[key], true); items[n].focus(); }
      });
    });
  }
  radioGroup(segBtns, 'mode', setMode);
  radioGroup(accBtns, 'accent', setAccent);

  /* live preview: hover only, on real pointers; committed accent is restored on leave/close */
  var previewing = false;
  function preview(a) {
    if (a === root.dataset.accent) return;
    previewing = true; smooth(500);
    root.dataset.accent = a;
    accOut.textContent = 'Previewing ' + NAMES[a];
  }
  function endPreview() {
    if (!previewing) return;
    previewing = false; smooth(500);
    root.dataset.accent = state.accent;
    accOut.textContent = NAMES[state.accent];
  }
  if (canHover) {
    accBtns.forEach(function (b) { b.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') preview(b.dataset.accent); }); });
    panel.querySelector('.acc-grid').addEventListener('pointerleave', endPreview);
  }

  /* ---------- open / close / placement ---------- */
  var isOpen = false, lockedScroll = false;

  function place() {
    if (mobileMQ.matches) {
      panel.style.removeProperty('--ap-x'); panel.style.removeProperty('--ap-y'); panel.style.maxHeight = ''; return;
    }
    var b = btn.getBoundingClientRect(), m = 12, gap = 10, w = panel.offsetWidth;
    var left = Math.max(m, Math.min(b.right - w, window.innerWidth - w - m));
    var top = b.bottom + gap;
    panel.style.maxHeight = Math.max(260, window.innerHeight - top - m) + 'px';
    panel.style.setProperty('--ap-x', left + 'px');
    panel.style.setProperty('--ap-y', top + 'px');
    panel.style.transformOrigin = Math.round(b.left + b.width / 2 - left) + 'px 0';
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    place();
    panel.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
    if (mobileMQ.matches) {
      backdrop.classList.add('open'); panel.setAttribute('aria-modal', 'true');
      document.body.style.overflow = 'hidden'; lockedScroll = true;
    }
    var target = panel.querySelector('.seg button[aria-checked="true"]');
    setTimeout(function () { if (target) target.focus({ preventScroll: true }); }, 30);
  }
  function close(returnFocus) {
    if (!isOpen) return;
    isOpen = false; endPreview();
    panel.classList.remove('open'); backdrop.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); panel.removeAttribute('aria-modal');
    if (lockedScroll) { document.body.style.overflow = ''; lockedScroll = false; }
    if (returnFocus) btn.focus({ preventScroll: true });
  }

  btn.addEventListener('click', function (e) { e.stopPropagation(); isOpen ? close(true) : open(); });
  document.getElementById('ap-close').addEventListener('click', function () { close(true); });
  backdrop.addEventListener('click', function () { close(true); });
  document.addEventListener('pointerdown', function (e) { if (isOpen && !panel.contains(e.target) && !btn.contains(e.target)) close(false); });
  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
    if (e.key === 'Tab' && mobileMQ.matches) { // bottom sheet is modal: keep focus inside
      var f = $$('button:not([disabled])', panel).filter(function (x) { return x.tabIndex >= 0; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  panel.addEventListener('focusout', function (e) { // desktop popover closes when focus tabs away
    if (!isOpen || mobileMQ.matches) return;
    var to = e.relatedTarget;
    if (to && !panel.contains(to) && to !== btn) close(false);
  });
  window.addEventListener('resize', function () { if (isOpen) { if (!mobileMQ.matches) { backdrop.classList.remove('open'); if (lockedScroll) { document.body.style.overflow = ''; lockedScroll = false; } } place(); } }, { passive: true });

  paintMode(); paintAccent();
  window.Appearance = { setMode: setMode, setAccent: setAccent, open: open, close: close, get state() { return state; } };
})();
