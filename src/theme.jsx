import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

function readTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    const bg = theme === 'light' ? '#e8e3d8' : '#0b0b0c'
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.background = bg
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', bg)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  return { theme, toggleTheme }
}

export function ThemeToggle({ theme, onToggle, className = 'theme-toggle' }) {
  const nextIsLight = theme === 'dark'
  return (
    <button
      type="button"
      className={className}
      onClick={onToggle}
      aria-label={nextIsLight ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {nextIsLight ? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3.6" fill="none" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.4 19.6l1.6-1.6M18 6l1.6-1.6" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3a9 9 0 1 0 9 9c0-.35-.02-.7-.06-1.04a5.6 5.6 0 0 1-7.9-7.9C12.7 3.02 12.35 3 12 3z"
          />
        </svg>
      )}
    </button>
  )
}
