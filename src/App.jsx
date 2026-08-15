import { useEffect, useState } from 'react'
import './App.css'
import LegalPage from './LegalPage.jsx'

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
    title: 'E-commerce',
    description:
      'High-converting online stores and product experiences that feel premium and help customers buy with confidence.',
  },
  {
    number: '06',
    title: 'AI & Automation',
    description:
      'AI-powered tools, workflows and digital products that reduce repetitive work and unlock faster execution.',
  },
  {
    number: '07',
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
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
  {
    label: 'Design',
    text: 'Identity systems and digital expressions built to stand out.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
  },
  {
    label: 'Build',
    text: 'Responsive, conversion-ready products crafted for real business goals.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
  },
]

const caseStudies = [
  {
    title: 'MediPlus',
    category: 'Healthcare platform',
    summary:
      'A digital platform experience designed to simplify patient access, improve trust and support a more premium healthcare journey.',
    result: 'Improved digital clarity and engagement across the customer journey.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=900&fit=crop',
  },
  {
    title: 'Asterra',
    category: 'Brand concept',
    summary:
      'A brand and website concept for a modern wellbeing company moving from an early-stage idea to a more established digital presence.',
    result: 'A clear identity system and launch-ready website direction.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=900&fit=crop',
  },
  {
    title: 'Relay',
    category: 'Product concept',
    summary:
      'An AI workflow concept that helps service teams automate repetitive tasks, route requests and keep daily operations moving.',
    result: 'A focused product story and interface system ready for prototyping.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=900&fit=crop',
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

  const handleGlobalPointerMove = (event) => {
    const cursor = document.querySelector('.custom-cursor')
    if (!cursor) return
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
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
    <>
      <div className="custom-cursor" aria-hidden="true" />
      <div className="page-shell" onPointerMove={handleGlobalPointerMove}>
        <header className="site-header">
          <div className="container nav-wrap">
            <a href="#top" className="brand" aria-label="Genk Studios home">
              <img className="brand-mark" src="/gemini-svg.svg" alt="" />
              <span>enk studios</span>
            </a>

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
              <h1 className="reveal-up reveal-delay-1">
                Build a digital presence <span>that actually moves your business forward.</span>
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
                  <span>{stat.value}</span>
                  <small>{stat.label}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="showcase section" id="work">
            <div className="container">
              <div className="section-header split-header">
                <div className="eyebrow">Selected work</div>
                <h2>Bold ideas, clear strategy and digital experiences that feel premium.</h2>
              </div>

              <div className="work-grid">
                {workItems.map((item, index) => (
                  <article
                    key={item.label}
                    className={`work-card reveal-up reveal-delay-${index + 1}`}
                    style={{ backgroundImage: `url('${item.image}')` }}
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

          <section className="case-studies section">
            <div className="container">
              <div className="section-header">
                <div className="eyebrow">Case studies</div>
                <h2>Real problems, thoughtful strategy and digital experiences that work.</h2>
              </div>

              <div className="case-study-grid">
                {caseStudies.map((study, index) => (
                  <article key={study.title} className={`case-study-card reveal-up reveal-delay-${index + 1}`}>
                    <div className="case-study-image" style={{ backgroundImage: `url('${study.image}')` }} />
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
              <a href="#top" className="brand" aria-label="Genk Studios home">
                <img className="brand-mark" src="/gemini-svg.svg" alt="" />
                <span>enk studios</span>
              </a>
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
    </>
  )
}

export default App
