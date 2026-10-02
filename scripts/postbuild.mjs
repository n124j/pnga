// Runs after `vite-react-ssg build`. Writes sitemap.xml and robots.txt into dist/
// using the pages that were actually built, so they can never drift out of date.
import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const dist = 'dist';

function readEnv() {
  const out = { ...process.env };
  for (const file of ['.env', '.env.production', '.env.local', '.env.production.local']) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in process.env)) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return out;
}

function findPages(dir, base = '') {
  const pages = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      pages.push(...findPages(full, `${base}/${name}`));
    } else if (name === 'index.html') {
      pages.push(base === '' ? '/' : base);
    }
  }
  return pages;
}

// The site's security policy (public/_headers) only allows scripts that come from the site itself,
// so the small inline scripts the static build puts in every page are moved into files. Same code,
// same order, no need to weaken the policy.
function externalizeInlineScripts(dir) {
  let count = 0;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const full = join(d, name);
      if (statSync(full).isDirectory()) { walk(full); continue; }
      if (!name.endsWith('.html')) continue;
      const html = readFileSync(full, 'utf8');
      const out = html.replace(/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")([^>]*)>([\s\S]*?)<\/script>/g, (m, attrs, code) => {
        if (!code.trim()) return m;
        const id = createHash('sha256').update(code).digest('hex').slice(0, 16);
        mkdirSync(join(dir, '_inline'), { recursive: true });
        writeFileSync(join(dir, '_inline', `${id}.js`), code);
        count++;
        return `<script${attrs} src="/_inline/${id}.js"></script>`;
      });
      if (out !== html) writeFileSync(full, out);
    }
  };
  walk(dir);
  return count;
}

const env = readEnv();
const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
// Static hosts (Cloudflare Pages, Netlify) show /404.html for unknown addresses.
if (existsSync(join(dist, '404', 'index.html'))) copyFileSync(join(dist, '404', 'index.html'), join(dist, '404.html'));
console.log(`[postbuild] moved ${externalizeInlineScripts(dist)} inline scripts into /_inline files`);
// Nepali pages (under /ne) must say lang="ne" so screen readers and browsers pick the right voice and font.
function markNepaliPages(dir) {
  let count = 0;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const full = join(d, name);
      if (statSync(full).isDirectory()) { walk(full); continue; }
      if (!name.endsWith('.html')) continue;
      const html = readFileSync(full, 'utf8');
      const out = html.replace(/<html([^>]*?)\blang="en"/, '<html$1lang="ne"');
      if (out !== html) { writeFileSync(full, out); count++; }
    }
  };
  if (existsSync(dir)) walk(dir);
  return count;
}
console.log(`[postbuild] set lang="ne" on ${markNepaliPages(join(dist, 'ne'))} Nepali pages`);

// Pages that ask search engines to stay away (404 pages, Nepali pages that are still English) are left out of the sitemap.
const isHidden = (p) => {
  const file = join(dist, p === '/' ? '' : p, 'index.html');
  return existsSync(file) && /<meta[^>]+name="robots"[^>]+noindex/i.test(readFileSync(file, 'utf8'));
};
const pages = findPages(dist).filter((p) => p !== '/404' && !isHidden(p)).sort();

if (!siteUrl) {
  console.warn(
    '\n[postbuild] VITE_SITE_URL is not set. Built pages have no canonical links and no sitemap.xml.\n' +
      '            Set it in .env.local (or your host\'s environment variables) before going live.\n',
  );
  writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n');
} else {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`[postbuild] sitemap.xml with ${pages.length} pages, robots.txt written for ${siteUrl}`);
}
