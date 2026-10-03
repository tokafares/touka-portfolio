// Runs after `vite build` (Node strips the types natively).
// - Syncs the name and site URL in dist/index.html with src/data.
// - Writes dist/projects/<slug>/index.html with page-specific title, description and social tags,
//   so crawlers and link previews get the right metadata without running JavaScript.
// - Writes sitemap.xml and robots.txt.
import fs from 'node:fs'
import path from 'node:path'
import { profile } from '../src/data/profile.ts'
import { projects } from '../src/data/projects.ts'
import { SITE_URL } from '../src/data/site.ts'
import { en } from '../src/i18n/en.ts'

const DIST = 'dist'
const TEMPLATE_URL = 'https://tokafares.vercel.app'
const TEMPLATE_NAME = 'Toka Fares'

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function setMeta(html: string, attr: 'name' | 'property', key: string, content: string): string {
  const pattern = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`)
  if (!pattern.test(html)) throw new Error(`index.html is missing <meta ${attr}="${key}">`)
  return html.replace(pattern, `$1${escapeHtml(content)}$2`)
}

function withPage(html: string, page: { title: string; description: string; url: string; image: string }): string {
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${page.url}$2`)
  out = setMeta(out, 'name', 'description', page.description)
  out = setMeta(out, 'property', 'og:title', page.title)
  out = setMeta(out, 'property', 'og:description', page.description)
  out = setMeta(out, 'property', 'og:url', page.url)
  out = setMeta(out, 'property', 'og:image', page.image)
  out = setMeta(out, 'name', 'twitter:title', page.title)
  out = setMeta(out, 'name', 'twitter:description', page.description)
  out = setMeta(out, 'name', 'twitter:image', page.image)
  return out
}

const indexPath = path.join(DIST, 'index.html')
const template = fs.readFileSync(indexPath, 'utf8').replaceAll(TEMPLATE_URL, SITE_URL).replaceAll(TEMPLATE_NAME, profile.name)
fs.writeFileSync(indexPath, template)

for (const project of projects) {
  const copy = en.projects[project.slug]
  const html = withPage(template, {
    title: `${copy.name} · ${profile.name}`,
    description: copy.oneLiner,
    url: `${SITE_URL}/projects/${project.slug}`,
    // Social previews need PNG/JPEG for the widest support; the WebP cover works on most platforms
    // and keeps the repo small, so the site card is used as a safe default.
    image: `${SITE_URL}/og-image.png`,
  })
  const dir = path.join(DIST, 'projects', project.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

const today = new Date().toISOString().slice(0, 10)
const urls = ['/', ...projects.map((p) => `/projects/${p.slug}`)]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`postbuild: ${projects.length} project pages, sitemap with ${urls.length} URLs for ${SITE_URL}`)
