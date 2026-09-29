// Runs after `vite-react-ssg build`. Writes sitemap.xml and robots.txt into dist/
// using the pages that were actually built, so they can never drift out of date.
import { copyFileSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
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

const env = readEnv();
const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
// Static hosts (Cloudflare Pages, Netlify) show /404.html for unknown addresses.
if (existsSync(join(dist, '404', 'index.html'))) copyFileSync(join(dist, '404', 'index.html'), join(dist, '404.html'));
const pages = findPages(dist).filter((p) => p !== '/404').sort();

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
