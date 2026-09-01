// Regenerate the Open Graph cards in public/ (og*.png, 1200x630).
// Needs the dev server running (npm run dev) and Google Chrome installed.
// Copies scripts/og-template.html into public/ so Vite serves it, shoots each
// card with headless Chrome, then removes the copy.
import { copyFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve } from 'node:path'

const ORIGIN = process.env.OG_ORIGIN || 'http://localhost:5173'
const PUBLIC = 'public'
const TEMPLATE_SRC = join('scripts', 'og-template.html')
const TEMPLATE_PUB = join(PUBLIC, 'og-template.html')

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

// title accepts \n for a hard line break (encoded as %0A in the URL).
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
]

const qs = (o) =>
  Object.entries(o)
    .filter(([k]) => k !== 'out')
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&')

await copyFile(TEMPLATE_SRC, TEMPLATE_PUB)
try {
  for (const card of cards) {
    const url = `${ORIGIN}/og-template.html?${qs(card)}`
    const out = resolve(PUBLIC, card.out).replace(/\\/g, '/')
    execFileSync(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-color-profile=srgb',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=8000',
      '--window-size=1200,630',
      `--screenshot=${out}`,
      url,
    ])
    console.log('wrote', out)
  }
} finally {
  await rm(TEMPLATE_PUB, { force: true })
}
