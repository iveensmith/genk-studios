// Post-build: write a static HTML file per route with the correct
// <title>, description, canonical and Open Graph tags in the raw head.
// The app is still client-rendered; this fixes link previews and gives
// crawlers per-page metadata without a headless browser in the build.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'

const DIST = 'dist'
const SITE = 'https://genkstudios.netlify.app'

// Per-project OG cards live in public/og-<slug>.png (1200×630). To regenerate,
// copy scripts/og-template.html into public/, load it with ?title=&cat=&desc=&slug=
// params, screenshot the 1200×630 frame, then move the template back out.
// Routes without an `image` keep the site default card in the base head (/og.png).
const routes = {
  '/terms': {
    title: 'Terms of Use | Genk Studios',
    description: 'The terms that govern your use of the Genk Studios website.',
  },
  '/privacy': {
    title: 'Privacy Policy | Genk Studios',
    description: 'How Genk Studios collects, uses and protects your information.',
  },
  '/work/roleweave': {
    title: 'Roleweave | Genk Studios',
    description:
      'Case study: an AI career tool that rewrites a CV to match a job posting and generates the whole application, from cover letter to recruiter note to interview brief, off the same evidence.',
    image: '/og-roleweave.png',
    imageAlt: 'Roleweave, a Genk Studios case study',
  },
  '/work/uniquepredict': {
    title: 'UniquePredict | Genk Studios',
    description:
      'Case study: a football prediction platform where every tip across 30 leagues comes from a Poisson and Dixon-Coles model, published daily with a public, unedited results archive.',
    image: '/og-uniquepredict.png',
    imageAlt: 'UniquePredict, a Genk Studios case study',
  },
  '/work/voiceiq': {
    title: 'VoiceIQ | Genk Studios',
    description:
      'Case study: a QA and certification platform that tests AI voice agents with real phone calls and verifies the actions they claim to take.',
    image: '/og-voiceiq.png',
    imageAlt: 'VoiceIQ, a Genk Studios case study',
  },
  '/work/workflowauth': {
    title: 'WorkflowAuth | Genk Studios',
    description:
      'Case study: a done-for-you AI front desk that answers every call for local service businesses, qualifies the lead and books the job.',
    image: '/og-workflowauth.png',
    imageAlt: 'WorkflowAuth, a Genk Studios case study',
  },
}

const base = await readFile(join(DIST, 'index.html'), 'utf8')

const setTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    console.warn('prerender: pattern not found:', pattern)
    return html
  }
  return html.replace(pattern, replacement)
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const [route, { title, description, image, imageAlt }] of Object.entries(routes)) {
  const url = SITE + route
  const t = esc(title)
  const d = esc(description)

  let html = base
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
  html = setTag(html, /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/, `<meta name="description" content="${d}" />`)
  html = setTag(html, /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/, `<link rel="canonical" href="${url}" />`)
  html = setTag(html, /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/, `<meta property="og:title" content="${t}" />`)
  html = setTag(html, /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/, `<meta property="og:description" content="${d}" />`)
  html = setTag(html, /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/, `<meta property="og:url" content="${url}" />`)
  html = setTag(html, /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/, `<meta name="twitter:title" content="${t}" />`)
  html = setTag(html, /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/, `<meta name="twitter:description" content="${d}" />`)

  if (image) {
    const img = SITE + image
    const alt = esc(imageAlt || title)
    html = setTag(html, /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/>/, `<meta property="og:image" content="${img}" />`)
    html = setTag(html, /<meta\s+property="og:image:alt"\s+content="[\s\S]*?"\s*\/>/, `<meta property="og:image:alt" content="${alt}" />`)
    html = setTag(html, /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/>/, `<meta name="twitter:image" content="${img}" />`)
  }

  const out = join(DIST, route, 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, html)
  console.log('prerendered', route)
}
