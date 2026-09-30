// Runs before `vite-react-ssg build`. Downloads the published news and gallery
// sheets so the built pages already contain the latest content (good for search
// engines and slow connections). If a sheet is not configured or cannot be
// reached, the previous snapshot is kept and the build carries on.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const out = 'data/generated/snapshot.json';

function readEnv() {
  const env = { ...process.env };
  for (const file of ['.env', '.env.production', '.env.local', '.env.production.local']) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in process.env)) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

const env = readEnv();
let snap = { news: '', gallery: '', events: '', board: '', programs: '', hero: '' };
try { snap = { ...snap, ...JSON.parse(readFileSync(out, 'utf8')) }; } catch { /* first run */ }

for (const [key, envName] of [['news', 'VITE_NEWS_CSV_URL'], ['gallery', 'VITE_GALLERY_CSV_URL'], ['events', 'VITE_EVENTS_CSV_URL'], ['board', 'VITE_BOARD_CSV_URL'], ['programs', 'VITE_PROGRAMS_CSV_URL'], ['hero', 'VITE_HERO_CSV_URL']]) {
  const url = env[envName];
  if (!url) { snap[key] = ''; console.log(`fetch-content: ${envName} not set, ${key} snapshot left empty`); continue; }
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    snap[key] = await res.text();
    console.log(`fetch-content: ${key} updated (${snap[key].length} bytes)`);
  } catch (err) {
    console.warn(`fetch-content: could not fetch ${key} (${err.message}); keeping previous snapshot`);
  }
}
writeFileSync(out, JSON.stringify(snap, null, 2) + '\n');
