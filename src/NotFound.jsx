import { useEffect } from 'react'
import './CaseStudyPage.css'
import { useTheme, ThemeToggle } from './theme.jsx'
import { Backdrop } from './Backdrop.jsx'

function BrandMark() {
  return (
    <span className="cs-mark" aria-hidden="true">
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
  )
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/#work', label: 'Selected work' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact', label: 'Start a project' },
]

function NotFound() {
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const previous = document.title
    document.title = 'Page not found — Genk Studios'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="cs-page">
      <Backdrop />

      <header className="cs-header">
        <a href="/" className="cs-brand" aria-label="Genk Studios home">
          <BrandMark />
          <span>
            Genk <span className="cs-brand-dim">Studios</span>
          </span>
        </a>
        <div className="cs-header-end">
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="theme-toggle cs-theme-toggle" />
          <a href="/#work" className="cs-back">All work</a>
        </div>
      </header>

      <section className="nf-body">
        <p className="nf-code">Error 404</p>
        <h1 className="nf-title">This page took a wrong turn.</h1>
        <p className="nf-text">
          The link is broken or the page has moved. Here&apos;s the way back.
        </p>
        <nav className="nf-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label} →
            </a>
          ))}
        </nav>
      </section>

      <footer className="cs-footer">
        <span>© 2026 Genk Studios</span>
        <a href="/#contact">Start a project</a>
      </footer>
    </main>
  )
}

export default NotFound
