/**
 * VirtualWorld 360 – API Server v3
 * Pure Node.js 18+, no external dependencies.
 *
 * Endpoints:
 *   POST   /api/generate                  → text-only, OpenAI images.generations
 *   POST   /api/generate-with-reference   → multipart, OpenAI images.edits (1–4 ref images)
 *   GET    /api/generated                 → list of generated panoramas with metadata
 *   GET    /api/stats                     → aggregated stats for dashboard
 *   DELETE /api/generated/:filename       → remove a panorama
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 4360;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const GENERATED_DIR = path.join(__dirname, 'generated');
if (!fs.existsSync(GENERATED_DIR)) fs.mkdirSync(GENERATED_DIR);

const MIME = {
  '.html':'text/html','.js':'application/javascript','.css':'text/css',
  '.json':'application/json','.png':'image/png','.jpg':'image/jpeg',
  '.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon',
  '.woff':'font/woff','.woff2':'font/woff2'
};

const MAX_REF_BYTES = 4 * 1024 * 1024;          // 4MB per reference image
const MAX_REF_COUNT = 4;
const MAX_PROMPT    = 4000;

/* ───────────────────────────  HELPERS  ─────────────────────────── */

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}
function sendJSON(res, status, obj) {
  send(res, status, { 'Content-Type': 'application/json' }, JSON.stringify(obj));
}
function sendError(res, status, message) {
  sendJSON(res, status, { error: message });
}

function readJSONBody(req) {
  return new Promise((resolve, reject) => {
    let d = '';
    req.on('data', (c) => { d += c; if (d.length > 1024 * 1024) { req.destroy(); reject(new Error('Body too large')); } });
    req.on('end', () => { try { resolve(JSON.parse(d || '{}')); } catch { resolve({}); } });
    req.on('error', reject);
  });
}

function readRawBody(req, maxBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (c) => {
      total += c.length;
      if (total > maxBytes) { req.destroy(); reject(new Error('Payload too large')); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function build360Prompt(userPrompt) {
  return [
    // ── Projection & format ──────────────────────────────────────────
    'EQUIRECTANGULAR 360° SPHERICAL PANORAMA — full 360×180 degree immersive environment.',
    'This image will be mapped onto the inside of a sphere for VR/360° viewing.',
    'The camera is placed at the exact CENTER of the scene, capturing every direction simultaneously.',

    // ── Scene content ────────────────────────────────────────────────
    userPrompt + '.',

    // ── Composition rules ────────────────────────────────────────────
    'COMPOSITION: The horizon line runs perfectly horizontal through the vertical center of the image.',
    'Upper half: sky, ceiling, or overhead elements. Lower half: ground, floor, or surface.',
    'The left and right edges of the image MUST connect seamlessly — they form a single continuous panoramic wrap.',
    'Full environmental detail visible in ALL directions: front, back, left, right, up, down.',
    'No flat perspective or single vanishing point — this is a spherical omnidirectional capture.',

    // ── Technical quality ─────────────────────────────────────────────
    'TECHNICAL: Shot with Insta360 Pro 2 / Ricoh Theta Z1 professional 360° spherical camera.',
    'Ultra-high resolution, tack-sharp focus, zero chromatic aberration, no lens flare artifacts.',
    'Perfect equirectangular mapping — poles correct, no stretching at top and bottom.',

    // ── Visual quality ────────────────────────────────────────────────
    'VISUAL QUALITY: Cinematic photorealism, HDR exposure, physically-based volumetric lighting.',
    'Rich atmospheric depth, professional color grading, ultra-detailed textures at every scale.',
    'Award-winning architectural/environmental photography quality. 8K photoreal render.',
  ].join(' ');
}

function safeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
}

/** gpt-image-2 returns b64_json inline. Older models return URLs. Handle both. */
async function extractB64Images(dataArray) {
  const results = [];
  for (const item of (dataArray || [])) {
    if (item.b64_json) {
      results.push(item.b64_json);
    } else if (item.url) {
      const r = await fetch(item.url);
      const buf = await r.arrayBuffer();
      results.push(Buffer.from(buf).toString('base64'));
    }
  }
  return results;
}

function writeResultFiles({ b64Images, templateId, prompt, quality, size, mode }) {
  const ts = Date.now();
  const written = [];
  b64Images.forEach((b64, i) => {
    const idx = b64Images.length > 1 ? `-v${i + 1}` : '';
    const filename = `world-${safeFilename(templateId || 'custom')}-${ts}${idx}.png`;
    const fp = path.join(GENERATED_DIR, filename);
    fs.writeFileSync(fp, Buffer.from(b64, 'base64'));
    const meta = { filename, templateId, prompt, quality, size, mode, created: new Date().toISOString() };
    fs.writeFileSync(fp + '.json', JSON.stringify(meta, null, 2));
    written.push({ filename, url: `/generated/${filename}`, ...meta });
  });
  return written;
}

/* ───────────────────────────  HANDLERS  ─────────────────────────── */

async function handleGenerate(req, res) {
  if (!OPENAI_API_KEY) return sendError(res, 400, 'Brak OPENAI_API_KEY. Ustaw zmienną środowiskową i restartuj serwer.');
  const body = await readJSONBody(req);
  const prompt = (body.prompt || '').toString().slice(0, MAX_PROMPT).trim();
  if (!prompt) return sendError(res, 400, 'Brak promptu.');
  const quality = ['low', 'medium', 'high'].includes(body.quality) ? body.quality : 'high';
  const size = '1536x1024'; // widest supported by gpt-image-2 — best for 360° panoramas
  const templateId = (body.templateId || '').toString().slice(0, 40);
  const n = Math.min(4, Math.max(1, parseInt(body.n) || 1));

  const fullPrompt = build360Prompt(prompt);
  console.log(`\n[GEN] mode=text  template=${templateId || 'custom'}  q=${quality}  size=${size}  n=${n}`);

  try {
    const apiRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-image-2', prompt: fullPrompt, size, quality, output_format: 'png', n }),
    });
    const json = await apiRes.json();
    if (!apiRes.ok) {
      const msg = json?.error?.message || `HTTP ${apiRes.status}`;
      console.error('[GEN] OpenAI Error:', msg);
      return sendError(res, 500, msg);
    }
    const b64Images = await extractB64Images(json.data);
    const written = writeResultFiles({
      b64Images, templateId, prompt, quality, size, mode: 'text',
    });
    console.log(`[GEN] ✅ wrote ${written.length} file(s): ${written.map(w => w.filename).join(', ')}`);
    sendJSON(res, 200, { success: true, results: written, url: written[0].url, filename: written[0].filename, meta: written[0] });
  } catch (err) {
    console.error('[GEN] Error:', err.message);
    sendError(res, 500, err.message);
  }
}

/**
 * Step 1 of reference generation: call GPT-4o mini Vision to analyze
 * the reference image(s) and return a rich visual description.
 */
async function analyzeRefImages(images) {
  const content = [
    {
      type: 'text',
      text: 'Analyze these reference image(s) in detail. Describe: color palette, lighting style, mood/atmosphere, architectural elements, environment type, time of day, weather, key visual objects, textures, materials. Be very specific and detailed — your description will be used to generate a matching 360° panoramic world.',
    },
    ...images.map((img) => ({
      type: 'image_url',
      image_url: { url: `data:${img.mime || 'image/png'};base64,${img.data}`, detail: 'high' },
    })),
  ];

  const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 600,
      messages: [{ role: 'user', content }],
    }),
  });
  const json = await apiRes.json();
  if (!apiRes.ok) throw new Error(json?.error?.message || `Vision API HTTP ${apiRes.status}`);
  return json.choices?.[0]?.message?.content?.trim() || '';
}

async function handleGenerateWithReference(req, res) {
  if (!OPENAI_API_KEY) return sendError(res, 400, 'Brak OPENAI_API_KEY.');

  // Receives JSON: { prompt, quality, size, templateId, n, images:[{data:base64,mime,name}] }
  let body;
  try {
    const raw = await readRawBody(req, MAX_REF_COUNT * MAX_REF_BYTES * 2 + 65536);
    body = JSON.parse(raw.toString('utf8'));
  } catch (e) { return sendError(res, 400, 'Nieprawidłowe dane: ' + e.message); }

  const userPrompt = (body.prompt || '').slice(0, MAX_PROMPT).trim();
  if (!userPrompt) return sendError(res, 400, 'Brak promptu.');
  const quality    = ['low', 'medium', 'high'].includes(body.quality) ? body.quality : 'high';
  const size       = ['1024x1024', '1536x1024', '1024x1536'].includes(body.size) ? body.size : '1536x1024';
  const templateId = (body.templateId || '').slice(0, 40);
  const n          = Math.min(4, Math.max(1, parseInt(body.n) || 1));
  const images     = (body.images || []).slice(0, MAX_REF_COUNT);

  if (!images.length) return sendError(res, 400, 'Brak obrazów referencyjnych.');
  console.log(`\n[GEN] mode=ref+vision  refs=${images.length}  q=${quality}  size=${size}  n=${n}`);

  try {
    // ── Step 1: Vision analysis ────────────────────────────────────────
    console.log('[GEN] Analyzing reference images with GPT-4o mini vision...');
    const visualDescription = await analyzeRefImages(images);
    console.log('[GEN] Visual description:', visualDescription.slice(0, 120) + '...');

    // ── Step 2: Build enhanced 360° prompt ────────────────────────────
    const enhancedUserPrompt = userPrompt
      ? `${userPrompt}. VISUAL REFERENCE STYLE: ${visualDescription}`
      : `Create a 360° environment matching this reference style: ${visualDescription}`;
    const fullPrompt = build360Prompt(enhancedUserPrompt);

    // ── Step 3: Generate with gpt-image-2 ────────────────────────────
    console.log('[GEN] Generating with gpt-image-2...');
    const apiRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-image-2', prompt: fullPrompt, size, quality, output_format: 'png', n }),
    });
    const json = await apiRes.json();
    if (!apiRes.ok) {
      const msg = json?.error?.message || `HTTP ${apiRes.status}`;
      console.error('[GEN] OpenAI Error:', msg);
      return sendError(res, 500, msg);
    }
    const b64s = await extractB64Images(json.data);
    if (!b64s.length) return sendError(res, 500, 'Brak danych obrazu z API.');
    const written = writeResultFiles({ b64Images: b64s, templateId, prompt: userPrompt, quality, size, mode: `ref:${images.length}` });
    console.log(`[GEN] ✅ wrote ${written.length} file(s)`);
    sendJSON(res, 200, { success: true, results: written, url: written[0].url, filename: written[0].filename, meta: written[0] });
  } catch (err) {
    console.error('[GEN] Error:', err.message);
    sendError(res, 500, err.message);
  }
}

function handleListGenerated(res) {
  fs.readdir(GENERATED_DIR, (err, files) => {
    if (err) return sendJSON(res, 500, { images: [] });
    const images = files
      .filter((f) => /\.png$/i.test(f))
      .map((f) => {
        const fp = path.join(GENERATED_DIR, f);
        let stat = {};
        try { stat = fs.statSync(fp); } catch {}
        let meta = {};
        try { meta = JSON.parse(fs.readFileSync(fp + '.json', 'utf8')); } catch {}
        return {
          filename: f,
          url: `/generated/${f}`,
          size: stat.size || 0,
          created: meta.created || (stat.mtime ? stat.mtime.toISOString() : null),
          ...meta,
        };
      })
      .sort((a, b) => (b.created || '').localeCompare(a.created || ''));
    sendJSON(res, 200, { images });
  });
}

function handleStats(res) {
  fs.readdir(GENERATED_DIR, (err, files) => {
    if (err) return sendJSON(res, 200, { count: 0, totalBytes: 0, last24h: 0, last7d: 0, byTemplate: {} });
    const now = Date.now();
    const day = 86400000;
    let totalBytes = 0, last24h = 0, last7d = 0;
    const byTemplate = {};
    let count = 0;
    for (const f of files) {
      if (!/\.png$/i.test(f)) continue;
      const fp = path.join(GENERATED_DIR, f);
      try {
        const stat = fs.statSync(fp);
        totalBytes += stat.size;
        const ts = stat.mtime.getTime();
        if (now - ts < day) last24h++;
        if (now - ts < 7 * day) last7d++;
        let tpl = 'custom';
        try { tpl = (JSON.parse(fs.readFileSync(fp + '.json', 'utf8')).templateId) || 'custom'; } catch {}
        byTemplate[tpl] = (byTemplate[tpl] || 0) + 1;
        count++;
      } catch {}
    }
    sendJSON(res, 200, { count, totalBytes, last24h, last7d, byTemplate });
  });
}

function handleDelete(res, filename) {
  const safe = path.basename(filename);
  if (!/\.png$/i.test(safe)) return sendError(res, 400, 'Niedozwolony plik.');
  const fp = path.join(GENERATED_DIR, safe);
  fs.unlink(fp, (err) => {
    if (err) return sendError(res, 404, 'Nie znaleziono.');
    fs.unlink(fp + '.json', () => {}); // best-effort
    sendJSON(res, 200, { success: true });
  });
}

function serveFile(fp, res) {
  const ext = path.extname(fp).toLowerCase();
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': /\.(png|jpe?g|webp|woff2?)$/i.test(ext) ? 'public, max-age=86400' : 'no-cache',
    });
    res.end(data);
  });
}

/* ───────────────────────────  ROUTER  ─────────────────────────── */

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const p = url.pathname;

  try {
    if (req.method === 'POST'   && p === '/api/generate')                return handleGenerate(req, res);
    if (req.method === 'POST'   && p === '/api/generate-with-reference') return handleGenerateWithReference(req, res);
    if (req.method === 'GET'    && p === '/api/generated')               return handleListGenerated(res);
    if (req.method === 'GET'    && p === '/api/stats')                   return handleStats(res);
    if (req.method === 'DELETE' && p.startsWith('/api/generated/'))      return handleDelete(res, decodeURIComponent(p.slice('/api/generated/'.length)));
  } catch (err) {
    console.error('[ROUTE] Error:', err);
    return sendError(res, 500, err.message || 'Server error');
  }

  // static
  let fp = path.join(__dirname, p === '/' ? 'index.html' : p);
  if (!fp.startsWith(__dirname)) { res.writeHead(403); return res.end('Forbidden'); }
  if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) fp = path.join(fp, 'index.html');
  serveFile(fp, res);
});

server.listen(PORT, () => {
  console.log('\n  ╔══════════════════════════════════════════╗');
  console.log('  ║   VirtualWorld 360  ·  API Server v3     ║');
  console.log(`  ║   http://localhost:${PORT}                  ║`);
  console.log('  ╠══════════════════════════════════════════╣');
  console.log(`  ║   OpenAI Key: ${OPENAI_API_KEY ? '✅ Aktywny  ' : '❌ Brak     '}                    ║`);
  console.log('  ║   Model: gpt-image-2 (text + ref edits)  ║');
  console.log('  ╚══════════════════════════════════════════╝\n');
});
