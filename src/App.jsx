import { useEffect, useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Services', href: '#services', delay: 0 },
  { label: 'Work', href: '#work', delay: 60 },
  { label: 'Process', href: '#process', delay: 120 },
  { label: 'Contact', href: '#contact', delay: 180 },
]

const services = [
  {
    number: '01',
    title: 'AI Strategy & Execution',
    description:
      'Product strategy, transformation programs, and digital systems built to help ambitious teams move faster.',
  },
  {
    number: '02',
    title: 'Product Innovation',
    description:
      'Interfaces, product direction, and customer journeys shaped around what people actually need and love.',
  },
  {
    number: '03',
    title: 'Brand & Identity',
    description:
      'Positioning, expression, and design systems that turn a business into a recognizable force.',
  },
]

const stats = [
  { value: '2-4 weeks', label: 'Typical launch window' },
  { value: '100%', label: 'Custom-built experiences' },
  { value: 'Strategy', label: 'Built into every decision' },
  { value: 'Clear process', label: 'From story to launch' },
]

const workItems = [
  { 
    label: 'Strategy', 
    text: 'Naming, vision, and opportunity shaping',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop' 
  },
  { 
    label: 'Design', 
    text: 'Identity systems and digital expressions',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop' 
  },
  { 
    label: 'Build', 
    text: 'Accessible, responsive, conversion-ready products',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop' 
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  return (
    <>
      <div className="custom-cursor" aria-hidden="true" />
      <div className="page-shell" onPointerMove={handleGlobalPointerMove}>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="Genk Studios home">
            <span className="brand-mark">G</span>
            <span>Genk Studios</span>
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
            Book a call
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
            '--scroll-parallax': `${scrollY * 0.3}px`,
          }}
        >
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="scroll-indicator">
            <span />
          </div>

          <div className="container">
            <div className="hero-intro reveal-up">Creative partner for a new era of brands</div>
            <h1 className="reveal-up reveal-delay-1">
              We build digital experiences that shape <span>what comes next.</span>
            </h1>

            <div className="hero-meta reveal-up reveal-delay-2">
              <p>
                Genk Studios helps ambitious businesses turn vision into momentum through strategy,
                design, and product experiences built to stand out and scale with confidence.
              </p>
              <a href="#contact" className="btn btn-primary">
                Start a project
              </a>
            </div>
          </div>

          <div className="container hero-strip">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`metric-pill reveal-up reveal-delay-${index + 3}`}>
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
              <h2>We turn big ideas into memorable digital presence.</h2>
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

        <section className="capabilities section" id="services">
          <div className="container">
            <div className="section-header">
              <div className="eyebrow">Capabilities</div>
              <h2>Strategy, design, and digital execution for modern brands.</h2>
            </div>

            <div className="service-list">
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
              <div className="eyebrow">Our process</div>
              <h2>Focused, collaborative, and built around momentum.</h2>
            </div>

            <div className="process-steps">
              <div className="reveal-up reveal-delay-1">
                <span>01</span>
                <p>Discover the opportunity, audience, and business objective.</p>
              </div>
              <div className="reveal-up reveal-delay-2">
                <span>02</span>
                <p>Shape the message, direction, and visual system around the story.</p>
              </div>
              <div className="reveal-up reveal-delay-3">
                <span>03</span>
                <p>Design and build responsive product experiences with clarity and precision.</p>
              </div>
              <div className="reveal-up reveal-delay-4">
                <span>04</span>
                <p>Launch, refine, and support the growth of the experience beyond day one.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta section" id="contact">
          <div className="container cta-box">
            <div>
              <div className="eyebrow">Let’s build what’s next</div>
              <h2>Need a digital presence that feels bold, premium, and built for growth?</h2>
            </div>
            <a href="mailto:hello@genkstudios.com" className="btn btn-primary">
              hello@genkstudios.com
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© 2026 Genk Studios</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}

export default App
