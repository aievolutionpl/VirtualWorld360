/* VirtualWorld 360 — tiny API client (zero deps).
   Wraps the api-server.js endpoints. */

(() => {
  'use strict';

  async function jsonOrThrow(res) {
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  }

  const API = {
    /** Generate panorama from prompt only. */
    async generate({ prompt, quality = 'medium', size = '1536x1024', templateId = '', n = 1 }) {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, quality, size, templateId, n }),
      });
      return jsonOrThrow(res);
    },

    /** Generate panorama from prompt + reference images (base64 JSON — avoids multipart boundary issues). */
    async generateWithReference({ prompt, quality = 'high', size = '1536x1024', templateId = '', n = 1, files = [] }) {
      // Convert File objects → base64 strings in the browser
      const images = await Promise.all(files.map((f) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ data: e.target.result.split(',')[1], mime: f.type || 'image/png', name: f.name });
        reader.onerror = reject;
        reader.readAsDataURL(f);
      })));
      const res = await fetch('/api/generate-with-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, quality, size, templateId, n, images }),
      });
      return jsonOrThrow(res);
    },

    /** List previously generated panoramas with metadata. */
    async list() {
      const res = await fetch('/api/generated');
      return jsonOrThrow(res); // { images: [...] }
    },

    /** Aggregate stats from generated/. */
    async stats() {
      const res = await fetch('/api/stats');
      return jsonOrThrow(res); // { count, totalBytes, last24h, last7d, byTemplate }
    },

    /** Delete a generated file. */
    async remove(filename) {
      const res = await fetch(`/api/generated/${encodeURIComponent(filename)}`, { method: 'DELETE' });
      return jsonOrThrow(res);
    },
  };

  /** Estimate generation time (ms) for progress UI. */
  API.estimateTime = ({ quality = 'medium', n = 1, hasReference = false } = {}) => {
    // ref mode = Vision analysis (~5s) + generation, text mode = generation only
    const base = quality === 'low' ? 14000 : quality === 'high' ? 42000 : 25000;
    const refOverhead = hasReference ? 8000 : 0;   // GPT-4o Vision analysis
    return Math.round((base * Math.max(1, n)) + refOverhead);
  };

  /** Progress bar driver: smoothly fills toward 90% over `eta`,
   *  then jumps to 100% when `done()` is called. Returns a cancel fn. */
  API.driveProgress = (fillEl, txtEl, steps, eta) => {
    const start = performance.now();
    let raf = 0;
    let stepIx = 0;
    function tick(now) {
      const t = Math.min(1, (now - start) / eta);
      const eased = 1 - Math.pow(1 - t, 2.4);
      const pct = Math.min(90, eased * 90);
      fillEl.style.width = pct + '%';
      const targetIx = Math.min(steps.length - 1, Math.floor(t * steps.length));
      if (targetIx !== stepIx) { stepIx = targetIx; if (txtEl) txtEl.textContent = steps[stepIx]; }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return {
      done(label = 'Wygenerowano!') {
        cancelAnimationFrame(raf);
        fillEl.style.width = '100%';
        if (txtEl) txtEl.textContent = label;
      },
      fail(label) {
        cancelAnimationFrame(raf);
        fillEl.style.width = '100%';
        fillEl.style.background = 'rgba(244,63,94,.85)';
        if (txtEl) txtEl.textContent = label;
      },
    };
  };

  window.VW_API = API;
})();
