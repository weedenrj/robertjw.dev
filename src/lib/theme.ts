type Theme = 'light' | 'dark'

const THEME_KEY = 'theme'
const DEFAULT_THEME: Theme = 'light'

export function getTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const stored = localStorage.getItem(THEME_KEY)
  return (stored === 'light' || stored === 'dark') ? stored : DEFAULT_THEME
}

export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(THEME_KEY, theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function toggleTheme(): Theme {
  const current = getTheme()
  const next: Theme = current === 'light' ? 'dark' : 'light'
  setTheme(next)
  return next
}
