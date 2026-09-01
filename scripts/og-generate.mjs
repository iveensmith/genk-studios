// Regenerate the share images in public/: the OG cards (og*.png, 1200x630)
// and the app icon (icon.png, 512x512). Needs the dev server running
// (npm run dev) and Google Chrome installed. Copies the templates into
// public/ so Vite serves them, shoots each with headless Chrome, then
// removes the copies.
import { copyFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve } from 'node:path'

const ORIGIN = process.env.OG_ORIGIN || 'http://localhost:5173'
const PUBLIC = 'public'

const templates = ['og-template.html', 'icon-template.html']

const CHROME =
  process.env.CHROME_PATH ||
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find((p) => existsSync(p))

if (!CHROME) {
  console.error('Chrome not found. Set CHROME_PATH.')
  process.exit(1)
}

// Each card: out (filename), template (default og-template.html), size
// (default 1200,630), and the template's own query params. title accepts
// \n for a hard line break (encoded as %0A in the URL).
const cards = [
  {
    out: 'og.png',
    mode: 'home',
    eyebrow: 'Digital product studio',
    title: 'We design and build\ndigital products.',
    tag: 'Websites · Web apps · Branding · AI products',
    url: 'genkstudios.netlify.app',
  },
  {
    out: 'og-roleweave.png',
    title: 'Roleweave',
    cat: 'AI career tool',
    slug: 'roleweave',
    desc: 'Rewrites your CV to match the job, then drafts the whole application.',
  },
  {
    out: 'og-uniquepredict.png',
    title: 'UniquePredict',
    cat: 'Sports data platform',
    slug: 'uniquepredict',
    desc: 'Model-built football predictions across 30 leagues, openly tracked.',
  },
  {
    out: 'og-voiceiq.png',
    title: 'VoiceIQ',
    cat: 'AI QA platform',
    slug: 'voiceiq',
    desc: 'QA and certification for AI voice agents, tested on real calls.',
  },
  {
    out: 'og-workflowauth.png',
    title: 'WorkflowAuth',
    cat: 'AI voice agent',
    slug: 'workflowauth',
    desc: 'An AI front desk that answers every call and books the job.',
  },
  { out: 'icon.png', template: 'icon-template.html', size: '512,512' },
]

const META = new Set(['out', 'template', 'size'])
const qs = (o) =>
  Object.entries(o)
    .filter(([k]) => !META.has(k))
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&')

// Optional filter: `node scripts/og-generate.mjs icon` shoots only matching cards.
const filter = process.argv[2]
const selected = filter ? cards.filter((c) => c.out.includes(filter)) : cards

await Promise.all(templates.map((t) => copyFile(join('scripts', t), join(PUBLIC, t))))
try {
  for (const card of selected) {
    const template = card.template || 'og-template.html'
    const query = qs(card)
    const url = `${ORIGIN}/${template}${query ? `?${query}` : ''}`
    const out = resolve(PUBLIC, card.out).replace(/\\/g, '/')
    execFileSync(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-color-profile=srgb',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=8000',
      `--window-size=${card.size || '1200,630'}`,
      `--screenshot=${out}`,
      url,
    ])
    console.log('wrote', out)
  }
} finally {
  await Promise.all(templates.map((t) => rm(join(PUBLIC, t), { force: true })))
}
