import { useEffect, useMemo, useState } from 'react'
import './App.css'
import LegalPage from './LegalPage.jsx'
import caseRoleweave from './assets/case-roleweave.jpg'
import caseUniquePredict from './assets/case-uniquepredict.jpg'
import caseVoiceIQ from './assets/case-voiceiq.jpg'
import caseWorkflowAuth from './assets/case-workflowauth.jpg'

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
    description:
      'Marketing websites, landing pages and conversion-focused brand experiences for ambitious businesses.',
  },
  {
    number: '02',
    title: 'Web Apps',
    description:
      'Dashboards, SaaS platforms and custom web applications designed around real user needs and growth goals.',
  },
  {
    number: '03',
    title: 'UI/UX Design',
    description:
      'Interfaces built for clarity, usability, and conversion, with thoughtful decisions behind every interaction.',
  },
  {
    number: '04',
    title: 'Branding',
    description:
      'Visual identities, logos and digital brand systems that give businesses a more recognizable presence.',
  },
  {
    number: '05',
    title: 'AI & Automation',
    description:
      'AI-powered tools, workflows and digital products that reduce repetitive work and unlock faster execution.',
  },
  {
    number: '06',
    title: 'Voice Agents',
    description:
      'Conversational voice agents that answer calls, qualify leads and give customers useful support around the clock.',
  },
]

const principles = [
  {
    number: '01',
    title: 'Strategy first',
    description: 'We understand the business, audience and opportunity before we touch the interface.',
  },
  {
    number: '02',
    title: 'Design that feels intentional',
    description: 'Every interaction, spacing decision and component is shaped with purpose and clarity.',
  },
  {
    number: '03',
    title: 'Built to perform',
    description: 'Fast, responsive and technically solid experiences that are ready for real-world use.',
  },
  {
    number: '04',
    title: 'Designed for growth',
    description: 'Your website should evolve with your business, not need a reset every year.',
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
    text: 'Naming, vision and opportunity-shaping for ambitious brands.',
  },
  {
    label: 'Design',
    text: 'Identity systems and digital expressions built to stand out.',
  },
  {
    label: 'Build',
    text: 'Responsive, conversion-ready products crafted for real business goals.',
  },
]

const caseStudies = [
  {
    title: 'Roleweave',
    category: 'AI career tool',
    summary:
      'Reads a job posting and rewrites your CV to match it, then generates the cover letter, recruiter note and interview brief from the same evidence. Every export is ATS-safe.',
    result: 'Built end to end: tailoring engine, Match and Parse scoring, document export and billing.',
    image: caseRoleweave,
  },
  {
    title: 'UniquePredict',
    category: 'Sports data platform',
    summary:
      'Free daily football predictions across 30 leagues, every tip generated by a Poisson and Dixon-Coles model from recent form, each with a confidence rating and a public, unedited results archive.',
    result: 'A live model pipeline, results tracking and a premium tier, fast and mobile-first.',
    image: caseUniquePredict,
  },
  {
    title: 'VoiceIQ',
    category: 'AI QA platform',
    summary:
      'A QA and certification platform for AI voice agents: it builds test scenarios, places real calls, and verifies the agent actually does what it promises, from emails sent to actions confirmed.',
    result: 'Scenario generation, live call orchestration and action verification via Gmail and Twilio.',
    image: caseVoiceIQ,
  },
  {
    title: 'WorkflowAuth',
    category: 'AI voice agent',
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

const audience = [
  'Startups',
  'SMEs',
  'Established brands',
  'Founders',
]

const testimonials = [
  {
    quote:
      'Genk Studios completely transformed how our product looks and feels. The process was thoughtful, sharp and genuinely collaborative from start to finish.',
    name: 'Kini Smith',
    role: 'Founder, MediPlus',
  },
  {
    quote:
      'They understood the business problem before the design problem. That clarity made all the difference in how we launched and grew.',
    name: 'Sarah Okafor',
    role: 'Marketing Lead, Northstar',
  },
  {
    quote:
      'The final experience felt premium, fast and conversion-focused. It gave our brand a level of confidence we were missing before.',
    name: 'Daniel Mensah',
    role: 'CEO, Vantage Studio',
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [selectedBuild, setSelectedBuild] = useState('Website')
  const [selectedGoal, setSelectedGoal] = useState('Launch something new')
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
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

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  const handleHeroPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    setPointer({ x, y })
  }

  const handleProjectInquiry = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    const subject = encodeURIComponent(`Project inquiry from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${selectedBuild}\nGoal: ${selectedGoal}\n\nProject details:\n${message}`
    )

    window.location.href = `mailto:genkstudios05@gmail.com?subject=${subject}&body=${body}`
    setFormSubmitted(true)
  }

  if (window.location.pathname === '/terms') {
    return <LegalPage type="terms" />
  }

  if (window.location.pathname === '/privacy') {
    return <LegalPage type="privacy" />
  }

  return (
    <div className="page-shell">
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
        </header>

        <main id="top">
          <section
            className="hero"
            onMouseMove={handleHeroPointerMove}
            style={{
              '--pointer-x': `${pointer.x * 16}px`,
              '--pointer-y': `${pointer.y * 14}px`,
            }}
          >
            <div className="hero-orb orb-one" />
            <div className="hero-orb orb-two" />
            <div className="scroll-indicator">
              <span />
            </div>

            <div className="container">
              <div className="hero-intro reveal-up">Digital product studio</div>
              <h1 className="hero-title">
                <span className="hero-title-inner">
                  <span className="hero-title-line">Build a digital presence</span>
                  <span className="hero-title-line dim">that moves your business forward.</span>
                </span>
              </h1>

              <div className="hero-meta reveal-up reveal-delay-2">
                <p>
                  Genk Studios designs and develops high-performance websites, web apps and digital experiences for ambitious brands.
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

              <div className="hero-tagline reveal-up reveal-delay-3">
                Web Design • Development • Branding • Digital Products • AI Automation • Voice Agents
              </div>
            </div>

            <div className="container hero-strip">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`metric-pill reveal-up reveal-delay-${index + 4}`}>
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
                  <article key={study.title} className={`case-study-card reveal-up reveal-delay-${index + 1}`}>
                    <div
                      className="case-study-image"
                      style={{ '--cs-img': `url(${study.image})` }}
                      role="img"
                      aria-label={`${study.title} website`}
                    />
                    <div className="case-study-copy">
                      <span>{study.category}</span>
                      <h3>{study.title}</h3>
                      <p>{study.summary}</p>
                      <strong>{study.result}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="why-genk section" id="about">
            <div className="container">
              <div className="section-header narrow-header">
                <div className="eyebrow">Why Genk?</div>
                <h2>
                  We don&apos;t just build websites.<br />
                  We build digital experiences designed to perform.
                </h2>
              </div>

              <div className="principles-grid">
                {principles.map((principle, index) => (
                  <article key={principle.number} className={`principle-card reveal-up reveal-delay-${index + 1}`}>
                    <span>{principle.number}</span>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="capabilities section" id="services">
            <div className="container">
              <div className="section-header">
                <div className="eyebrow">What we do</div>
                <h2>Websites, apps, strategy and digital systems built for growth.</h2>
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

          <section className="audience section">
            <div className="container">
              <div className="section-header narrow-header">
                <div className="eyebrow">Who we work with</div>
                <h2>Built for ambitious businesses ready to grow.</h2>
              </div>

              <div className="audience-grid">
                {audience.map((item, index) => (
                  <div key={item} className={`audience-pill reveal-up reveal-delay-${index + 1}`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="testimonials section">
            <div className="container">
              <div className="section-header narrow-header">
                <div className="eyebrow">Testimonials</div>
                <h2>Trusted by founders and teams building what&apos;s next.</h2>
              </div>

              <div className="testimonial-grid">
                {testimonials.map((item, index) => (
                  <article key={item.name} className={`testimonial-card reveal-up reveal-delay-${index + 1}`}>
                    <p className="quote">“{item.quote}”</p>
                    <div className="testimonial-author">
                      <div className="avatar">{item.name.charAt(0)}</div>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.role}</span>
                      </div>
                    </div>
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
                <a href="mailto:genkstudios05@gmail.com?subject=Project%20Inquiry" className="btn btn-primary">
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
                <button type="submit" className="btn btn-primary">
                  Start a project
                </button>
                {formSubmitted && <p className="form-status">Your email app is opening with the project brief attached.</p>}
              </form>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-main">
            <div className="footer-intro">
              <Brand />
              <p>Independent digital product studio for ambitious businesses.</p>
              <a className="footer-email" href="mailto:genkstudios05@gmail.com">genkstudios05@gmail.com</a>
            </div>

            <div className="footer-column">
              <h2>Explore</h2>
              <a href="#work">Work</a>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-column">
              <h2>Capabilities</h2>
              <a href="#services">Websites</a>
              <a href="#services">Web Apps</a>
              <a href="#services">UI/UX Design</a>
              <a href="#services">Branding</a>
              <a href="#services">AI &amp; Automation</a>
            </div>

            <div className="footer-column">
              <h2>Connect</h2>
              <a href="mailto:genkstudios05@gmail.com">Email us</a>
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
