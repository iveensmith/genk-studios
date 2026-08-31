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

function CaseStudyPage({ study, all }) {
  const { theme, toggleTheme } = useTheme()
  const index = all.findIndex((s) => s.slug === study.slug)
  const next = all[(index + 1) % all.length]

  useEffect(() => {
    const previous = document.title
    document.title = `${study.title} — Genk Studios`
    return () => {
      document.title = previous
    }
  }, [study.title])

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

      <article className="cs-body">
        <div className="cs-intro">
          <div className="eyebrow">{study.category}</div>
          <h1>{study.title}</h1>
          <div className="cs-meta">
            <span>{study.role}</span>
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="cs-visit">
              Visit the live site ↗
            </a>
          </div>
        </div>

        <div className="cs-lead">
          <img src={study.image} alt={`${study.title} website`} />
        </div>

        <section className="cs-section">
          <h2>The problem</h2>
          <p>{study.problem}</p>
        </section>

        <section className="cs-section">
          <h2>What we did</h2>
          <ul>
            {study.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="cs-section">
          <h2>Outcome</h2>
          <ul>
            {study.outcome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="cs-shot">
          <img src={study.detailImage} alt={`${study.title} — product screen`} loading="lazy" />
        </div>

        <a href={`/work/${next.slug}`} className="cs-next">
          <span>Next case study</span>
          <strong>{next.title} →</strong>
        </a>
      </article>

      <footer className="cs-footer">
        <span>© 2026 Genk Studios</span>
        <a href="/#contact">Start a project</a>
      </footer>
    </main>
  )
}

export default CaseStudyPage
