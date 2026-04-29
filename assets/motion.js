/* VirtualWorld 360 — Motion primitives (zero deps).
   Provides: scroll-reveal, magnetic buttons, parallax, smooth navigation
   with View Transitions API, toast host, number counters. */

(() => {
  'use strict';

  /* ──────────────────────  SCROLL REVEAL  ────────────────────── */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  function observeFx(root = document) {
    root.querySelectorAll('[data-fx]:not(.in-view)').forEach((el, i) => {
      if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', i);
      io.observe(el);
    });
  }

  /* ──────────────────────  MAGNETIC HOVER  ────────────────────── */
  function bindMagnetic(el, strength = 0.25) {
    let raf = 0;
    el.addEventListener('pointermove', (ev) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left - r.width / 2) * strength;
      const y = (ev.clientY - r.top - r.height / 2) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { el.style.transform = `translate(${x}px, ${y}px)`; });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  }
  function bindMagnetics(root = document) {
    root.querySelectorAll('[data-magnetic]').forEach((el) => {
      if (el.__bound) return; el.__bound = true;
      bindMagnetic(el, parseFloat(el.dataset.magnetic) || 0.25);
    });
  }

  /* ──────────────────────  PARALLAX  ────────────────────── */
  function bindParallax(root = document) {
    const items = [...root.querySelectorAll('[data-parallax]')];
    if (!items.length) return;
    const onMove = (ev) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (ev.clientX - cx) / cx;
      const dy = (ev.clientY - cy) / cy;
      for (const el of items) {
        const k = parseFloat(el.dataset.parallax) || 20;
        el.style.transform = `translate3d(${dx * k}px, ${dy * k}px, 0)`;
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
  }

  /* ──────────────────────  VIEW TRANSITIONS  ────────────────────── */
  // Intercept clicks on links marked [data-view-transition] and animate the navigation.
  // Falls back to normal navigation when API not available.
  function bindViewTransitions() {
    const supports = typeof document.startViewTransition === 'function';
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-view-transition]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || a.target === '_blank' || a.hasAttribute('download')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!supports) return;                        // graceful fallback
      e.preventDefault();
      document.documentElement.classList.add('is-transitioning');
      document.startViewTransition(() => { window.location.href = href; });
    });
  }

  /* ──────────────────────  NUMBER COUNTERS  ────────────────────── */
  function animateNumber(el, to, dur = 900) {
    const from = parseFloat(el.dataset.from || '0') || 0;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const v = from + (to - from) * ease(t);
      el.textContent = (to % 1 === 0) ? Math.round(v).toLocaleString('pl-PL') : v.toFixed(1);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function bindCounters(root = document) {
    root.querySelectorAll('[data-count]').forEach((el) => {
      if (el.__counted) return; el.__counted = true;
      const target = parseFloat(el.dataset.count);
      // Trigger only when on screen
      const local = new IntersectionObserver((es, ob) => {
        for (const e of es) if (e.isIntersecting) { animateNumber(el, target); ob.disconnect(); }
      }, { threshold: 0.4 });
      local.observe(el);
    });
  }

  /* ──────────────────────  TOAST  ────────────────────── */
  function ensureToastHost() {
    let host = document.getElementById('toast-host');
    if (!host) { host = document.createElement('div'); host.id = 'toast-host'; document.body.appendChild(host); }
    return host;
  }
  function toast(msg, kind = 'ok', ms = 3200) {
    const host = ensureToastHost();
    const el = document.createElement('div');
    el.className = `toast ${kind}`;
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .25s, transform .25s';
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(() => el.remove(), 280);
    }, ms);
  }

  /* ──────────────────────  RIPPLE  ────────────────────── */
  function bindRipple(root = document) {
    root.querySelectorAll('[data-ripple]').forEach((el) => {
      if (el.__ripple) return; el.__ripple = true;
      el.style.position = 'relative'; el.style.overflow = 'hidden';
      el.addEventListener('pointerdown', (ev) => {
        const r = el.getBoundingClientRect();
        const d = Math.max(r.width, r.height) * 2;
        const ring = document.createElement('span');
        ring.style.cssText = `
          position:absolute; left:${ev.clientX - r.left - d/2}px; top:${ev.clientY - r.top - d/2}px;
          width:${d}px; height:${d}px; border-radius:50%;
          background: radial-gradient(circle, rgba(255,255,255,.35), rgba(255,255,255,0) 60%);
          transform: scale(0); pointer-events: none;
          transition: transform .55s cubic-bezier(.16,1,.3,1), opacity .55s;
          opacity:.7;
        `;
        el.appendChild(ring);
        requestAnimationFrame(() => { ring.style.transform = 'scale(1)'; ring.style.opacity = '0'; });
        setTimeout(() => ring.remove(), 600);
      });
    });
  }

  /* ──────────────────────  PUBLIC API  ────────────────────── */
  const VW = {
    observeFx, bindMagnetics, bindParallax, bindCounters, bindRipple,
    toast, animateNumber,
    refresh(root) { observeFx(root); bindMagnetics(root); bindCounters(root); bindRipple(root); },
  };
  window.VW = VW;

  /* auto-init */
  function init() {
    bindViewTransitions();
    VW.refresh(document);
    bindParallax(document);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
