import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import LegalPage from './LegalPage.jsx'
import { useTheme, ThemeToggle } from './theme.jsx'
import { Backdrop } from './Backdrop.jsx'
import caseRoleweave from './assets/case-roleweave.jpg'
import caseUniquePredict from './assets/case-uniquepredict.jpg'
import caseVoiceIQ from './assets/case-voiceiq.jpg'
import caseWorkflowAuth from './assets/case-workflowauth.jpg'

const CONTACT_EMAIL = 'genkstudios05@gmail.com'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CountUp({ value, duration = 1400 }) {
  const raw = String(value)

  // Parse once: a leading number + trailing unit (12+, 98%, 4).
  // Anything else (e.g. "24/7") renders as-is.
  const { isCount, target, suffix, decimals } = useMemo(() => {
    const m = raw.match(/^(\d+(?:\.\d+)?)([^/]*)$/s)
    if (!m) return { isCount: false, target: 0, suffix: raw, decimals: 0 }
    return {
      isCount: true,
      target: parseFloat(m[1]),
      suffix: m[2],
      decimals: m[1].includes('.') ? m[1].split('.')[1].length : 0,
    }
  }, [raw])

  const [display, setDisplay] = useState(isCount ? 0 : target)

  useEffect(() => {
    if (!isCount) return

    if (prefersReducedMotion()) {
      setDisplay(target)
      return
    }

    let frame = 0
    let startTime = 0

    const step = (now) => {
      // Seed the clock on the first real frame. If the tab was
      // backgrounded, rAF is paused and simply resumes here.
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      setDisplay(target * (1 - Math.pow(1 - progress, 3)))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const kickoff = setTimeout(() => {
      frame = requestAnimationFrame(step)
    }, 150)

    return () => {
      clearTimeout(kickoff)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [isCount, target, duration])

  return (
    <span>
      {isCount ? display.toFixed(decimals) : ''}
      {suffix}
    </span>
  )
}

function Brand() {
  return (
    <a href="#top" className="brand" aria-label="Genk Studios home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 28 28" fill="none">
          <path
            d="M19.9 9.1a6.6 6.6 0 1 0 1.4 6.1h-5"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>
        Genk <span className="brand-dim">Studios</span>
      </span>
    </a>
  )
}

const navItems = [
  { label: 'Services', href: '#services', delay: 0 },
  { label: 'Work', href: '#work', delay: 60 },
  { label: 'Process', href: '#process', delay: 120 },
  { label: 'About', href: '#about', delay: 180 },
  { label: 'Contact', href: '#contact', delay: 240 },
]

const services = [
  {
    number: '01',
    title: 'Websites',
    description: 'Marketing sites and landing pages that load fast and are built to convert.',
  },
  {
    number: '02',
    title: 'Web Apps',
    description: 'Dashboards, SaaS platforms and internal tools designed around how people actually use them.',
  },
  {
    number: '03',
    title: 'UI/UX Design',
    description: 'Interfaces that are clear to use and quick to learn, with a reason behind every screen.',
  },
  {
    number: '04',
    title: 'Branding',
    description: 'Identity systems — logo, type, colour and the rules that keep them consistent everywhere.',
  },
  {
    number: '05',
    title: 'AI & Automation',
    description: 'AI features and workflows that take the repetitive work off your team.',
  },
  {
    number: '06',
    title: 'Voice Agents',
    description: 'Voice agents that answer calls, qualify leads and handle support around the clock.',
  },
]

const stats = [
  { value: '12+', label: 'Projects shipped' },
  { value: '4', label: 'Industries served' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '24/7', label: 'Digital presence' },
]

const workItems = [
  {
    label: 'Strategy',
    text: 'Positioning, naming and the shape of the opportunity, decided before anything gets designed.',
  },
  {
    label: 'Design',
    text: 'Identity, interface and the small decisions that make a product feel considered.',
  },
  {
    label: 'Build',
    text: 'Production code deployed on your stack, fast and built to last.',
  },
]

const caseStudies = [
  {
    title: 'Roleweave',
    category: 'AI career tool',
    url: 'https://roleweave.vercel.app/',
    summary:
      'Reads a job posting and rewrites your CV to match it, then generates the cover letter, recruiter note and interview brief from the same evidence. Every export is ATS-safe.',
    result: 'Built end to end: tailoring engine, Match and Parse scoring, document export and billing.',
    image: caseRoleweave,
  },
  {
    title: 'UniquePredict',
    category: 'Sports data platform',
    url: 'https://unique-preditz.vercel.app/',
    summary:
      'Free daily football predictions across 30 leagues, every tip generated by a Poisson and Dixon-Coles model from recent form, each with a confidence rating and a public, unedited results archive.',
    result: 'A live model pipeline, results tracking and a premium tier, fast and mobile-first.',
    image: caseUniquePredict,
  },
  {
    title: 'VoiceIQ',
    category: 'AI QA platform',
    url: 'https://aivoiceagenttesting.com',
    summary:
      'A QA and certification platform for AI voice agents: it builds test scenarios, places real calls, and verifies the agent actually does what it promises, from emails sent to actions confirmed.',
    result: 'Scenario generation, live call orchestration and action verification via Gmail and Twilio.',
    image: caseVoiceIQ,
  },
  {
    title: 'WorkflowAuth',
    category: 'AI voice agent',
    url: 'https://app.workflowauth.com',
    summary:
      'A done-for-you AI front desk for local service businesses. One voice agent answers every call, qualifies and books the lead, and calls back the ones that slip to voicemail.',
    result: 'A productized service with CRM-integrated calls, deployed for clients in about three days.',
    image: caseWorkflowAuth,
  },
]

const processSteps = [
  'Discover — We understand your business, audience and goals.',
  'Strategize — We define the structure, features and visual direction.',
  'Design — We create the interface and experience around the user journey.',
  'Build — We turn the design into a responsive, production-ready product.',
  'Launch — We test, optimize and ship with confidence.',
  'Grow — We continue improving the product based on performance and feedback.',
]

const engagement = [
  {
    title: 'One team, start to finish',
    text: 'The person who scopes your project is the person who designs and builds it. No handoffs, no account managers, one thread to reply to.',
  },
  {
    title: 'You see it as it’s built',
    text: 'Short async updates every few days — a working link you can click and a note on what changed, not a status meeting.',
  },
  {
    title: 'You own everything',
    text: 'Code, design files and accounts are yours, deployed on your stack and documented so any developer can pick it up later.',
  },
]

const buildOptions = [
  'Website',
  'Web App',
  'E-commerce',
  'SaaS',
  'AI Product',
  'Something else',
]

const goalOptions = [
  'Launch something new',
  'Redesign an existing product',
  'Get more customers',
  'Automate my business',
]

function App() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const pointerFrame = useRef(0)
  const [selectedBuild, setSelectedBuild] = useState('Website')
  const [selectedGoal, setSelectedGoal] = useState('Launch something new')
  const [formState, setFormState] = useState('idle') // idle | submitting | success | error

  useEffect(() => {
    // Opt in to the hide-then-reveal behaviour only once JS is running,
    // so the content stays visible if the script is slow or fails.
    document.documentElement.classList.add('js-reveal')

    const revealItems = document.querySelectorAll('.reveal-up')
    if (!revealItems.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -6% 0px',
      }
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  // Deep links (/#services, /#contact …) — jump to the target once it exists.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }, 120)
    return () => clearTimeout(t)
  }, [])

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  // Parallax the hero orbs via a CSS var written straight to the DOM,
  // rAF-throttled — no React re-render per mousemove.
  const handleHeroPointerMove = (event) => {
    if (prefersReducedMotion()) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    pointerRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    if (pointerFrame.current) return
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = 0
      const el = heroRef.current
      if (!el) return
      el.style.setProperty('--pointer-x', `${pointerRef.current.x * 16}px`)
      el.style.setProperty('--pointer-y', `${pointerRef.current.y * 14}px`)
    })
  }

  const openMailClient = (name, email, message) => {
    const subject = encodeURIComponent(`Project inquiry from ${name || 'the website'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${selectedBuild}\nGoal: ${selectedGoal}\n\nProject details:\n${message}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleProjectInquiry = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot tripped — ignore silently

    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    // No form service configured — fall back to the visitor's mail client.
    if (!WEB3FORMS_KEY) {
      openMailClient(name, email, message)
      setFormState('success')
      return
    }

    setFormState('submitting')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Project inquiry from ${name}`,
          from_name: 'Genk Studios website',
          name,
          email,
          'Project type': selectedBuild,
          Goal: selectedGoal,
          message,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFormState('success')
        form.reset()
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  if (window.location.pathname === '/terms') {
    return <LegalPage type="terms" />
  }

  if (window.location.pathname === '/privacy') {
    return <LegalPage type="privacy" />
  }

  return (
    <div className="page-shell">
        <Backdrop />
        <header className="site-header">
          <div className="container nav-wrap">
            <Brand />

            <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  style={{ animationDelay: `${item.delay}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="nav-end">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <a href="#contact" className="btn btn-primary nav-cta">
                Start a project
              </a>
              <button
                type="button"
                className={`menu-toggle ${menuOpen ? 'open' : ''}`}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={toggleMenu}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="hero" ref={heroRef} onMouseMove={handleHeroPointerMove}>
            <div className="hero-orb orb-one" />
            <div className="hero-orb orb-two" />
            <div className="scroll-indicator">
              <span />
            </div>

            <div className="container hero-layout">
              <div className="hero-copy">
                <div className="hero-intro hero-enter">Digital product studio</div>
                <h1
                  className="hero-title"
                  aria-label="Build a digital presence that moves your business forward."
                >
                  <span className="hero-title-inner" aria-hidden="true">
                    <span className="hero-title-line">Build a digital presence</span>
                    <span className="hero-title-line dim">that moves your business forward.</span>
                  </span>
                </h1>

                <div className="hero-meta hero-enter hero-enter-2">
                  <p>
                    Genk Studios designs and builds websites, web apps, brands and AI products — the strategy, the interface and the code that ships them.
                  </p>
                  <div className="hero-actions">
                    <a href="#contact" className="btn btn-primary">
                      Start a project
                    </a>
                    <a href="#work" className="btn btn-secondary">
                      View our work
                    </a>
                  </div>
                </div>

                <div className="hero-tagline hero-enter hero-enter-3">
                  Web Design • Development • Branding • Digital Products • AI Automation • Voice Agents
                </div>
              </div>

              <div className="hero-showcase" aria-label="Recent work">
                {caseStudies.map((study, index) => (
                  <a
                    key={study.title}
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hero-shot hero-shot-${index + 1}`}
                    style={{ '--shot': `url(${study.image})` }}
                    aria-label={`${study.title} — open the live site`}
                  >
                    <span className="hero-shot-label">{study.title}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="container hero-strip">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="metric-pill hero-enter"
                  style={{ animationDelay: `${0.34 + index * 0.08}s` }}
                >
                  <CountUp value={stat.value} />
                  <small>{stat.label}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="showcase section" id="selected-work">
            <div className="container">
              <div className="section-header split-header">
                <div className="eyebrow">Our approach</div>
                <h2>Strategy, design and build, handled as one continuous process.</h2>
              </div>

              <div className="work-grid">
                {workItems.map((item, index) => (
                  <article
                    key={item.label}
                    className={`work-card reveal-up reveal-delay-${index + 1}`}
                  >
                    <span className="work-index">0{index + 1}</span>
                    <div className="work-card-body">
                      <h3>{item.label}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="case-studies section" id="work">
            <div className="container">
              <div className="section-header">
                <div className="eyebrow">Selected work</div>
                <h2>Products we&apos;ve designed, built and shipped.</h2>
              </div>

              <div className="case-study-grid">
                {caseStudies.map((study, index) => (
                  <a
                    key={study.title}
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`case-study-card reveal-up reveal-delay-${index + 1}`}
                    aria-label={`${study.title} — open the live site`}
                  >
                    <div
                      className="case-study-image"
                      style={{ '--cs-img': `url(${study.image})` }}
                      aria-hidden="true"
                    />
                    <div className="case-study-copy">
                      <span className="case-study-meta">
                        {study.category}
                        <span className="case-study-visit" aria-hidden="true">
                          Live site ↗
                        </span>
                      </span>
                      <h3>{study.title}</h3>
                      <p>{study.summary}</p>
                      <strong>{study.result}</strong>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="about section" id="about">
            <div className="container about-layout">
              <div className="about-head">
                <div className="eyebrow">About</div>
                <h2>An independent studio, small on purpose.</h2>
              </div>
              <div className="about-body reveal-up">
                <p>
                  Genk Studios takes on a handful of projects at a time and carries each one from the
                  first conversation to launch — strategy, interface and the code that ships it.
                </p>
                <p>
                  Fewer people between you and the work means faster decisions and less lost in
                  translation. We build for founders and small teams who treat their product as the
                  thing that represents them, and every build is handed over documented so your own
                  developers can take it from there.
                </p>
              </div>
            </div>
          </section>

          <section className="capabilities section" id="services">
            <div className="container">
              <div className="section-header">
                <div className="eyebrow">What we do</div>
                <h2>From a landing page to a shipped product, handled in one place.</h2>
              </div>

              <div className="service-grid">
                {services.map((service, index) => (
                  <article key={service.number} className={`service-item reveal-up reveal-delay-${index + 1}`}>
                    <div className="service-index">{service.number}</div>
                    <div className="service-copy">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="process section" id="process">
            <div className="container process-layout">
              <div className="process-copy">
                <div className="eyebrow">How we work</div>
                <h2>A clear process that keeps projects focused and momentum high.</h2>
              </div>

              <div className="process-steps">
                {processSteps.map((step, index) => (
                  <div key={step} className={`reveal-up reveal-delay-${index + 1}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="engagement section">
            <div className="container">
              <div className="section-header narrow-header">
                <div className="eyebrow">Working with Genk</div>
                <h2>One studio from the first call to launch — no handoffs.</h2>
              </div>

              <div className="engagement-grid">
                {engagement.map((item, index) => (
                  <article key={item.title} className={`engagement-card reveal-up reveal-delay-${index + 1}`}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="build-quiz section">
            <div className="container build-quiz-box reveal-up">
              <div className="section-header narrow-header">
                <div className="eyebrow">What are you building?</div>
                <h2>Tell us a little about the idea and we&apos;ll shape the right next step.</h2>
              </div>

              <div className="quiz-grid">
                <div className="quiz-panel">
                  <p className="quiz-label">I need a</p>
                  <div className="choice-list">
                    {buildOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={selectedBuild === option ? 'choice-button active' : 'choice-button'}
                        onClick={() => setSelectedBuild(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quiz-panel">
                  <p className="quiz-label">Main goal</p>
                  <div className="choice-list">
                    {goalOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={selectedGoal === option ? 'choice-button active' : 'choice-button'}
                        onClick={() => setSelectedGoal(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="quiz-summary">
                <p>
                  {selectedBuild} for {selectedGoal.toLowerCase()}.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    `Project inquiry: ${selectedBuild} to ${selectedGoal.toLowerCase()}`
                  )}`}
                  className="btn btn-primary"
                >
                  Let&apos;s build it
                </a>
              </div>
            </div>
          </section>

          <section className="cta section" id="contact">
            <div className="container cta-box">
              <div>
                <div className="eyebrow">Have an idea?</div>
                <h2>Let&apos;s turn it into something people want to use.</h2>
                <p>Tell us where you are now, what you want to build and the outcome you are aiming for.</p>
              </div>
              <form className="project-form" onSubmit={handleProjectInquiry}>
                <input
                  type="text"
                  name="botcheck"
                  className="form-honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <label>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label className="form-message">
                  <span>Tell us about the project</span>
                  <textarea name="message" rows="4" required />
                </label>
                <button type="submit" className="btn btn-primary" disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Sending…' : 'Start a project'}
                </button>
                {formState === 'success' && (
                  <p className="form-status" role="status">
                    {WEB3FORMS_KEY
                      ? 'Thanks — your brief is on its way. We usually reply within a day.'
                      : 'Your mail app is opening with the brief attached.'}
                  </p>
                )}
                {formState === 'error' && (
                  <p className="form-status form-status--error" role="alert">
                    That didn&apos;t send. Email us directly at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </p>
                )}
              </form>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-main">
            <div className="footer-intro">
              <Brand />
              <p>Independent product studio. Strategy, design and build, in one place.</p>
              <a className="footer-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>

            <div className="footer-column">
              <p className="footer-column-title">Explore</p>
              <a href="#work">Work</a>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-column">
              <p className="footer-column-title">Capabilities</p>
              <a href="#services">Websites</a>
              <a href="#services">Web Apps</a>
              <a href="#services">UI/UX Design</a>
              <a href="#services">Branding</a>
              <a href="#services">AI &amp; Automation</a>
            </div>

            <div className="footer-column">
              <p className="footer-column-title">Connect</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>Email us</a>
              <a href="#contact">Start a project</a>
            </div>
          </div>

          <div className="container footer-bottom">
            <p>© 2026 Genk Studios. All rights reserved.</p>
            <div className="footer-legal">
              <a href="/terms">Terms of Use</a>
              <a href="/privacy">Privacy</a>
            </div>
            <a href="#top" className="back-to-top" aria-label="Back to top" title="Back to top">↑</a>
          </div>
        </footer>
    </div>
  )
}

export default App
