// Manejo del tema. Por defecto: oscuro. Los valores viven en src/styles/tokens.css.
const STORAGE_KEY = 'theme'
const THEMES = ['dark', 'light']
export const DEFAULT_THEME = 'dark'

export function getTheme () {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (THEMES.includes(saved)) return saved
  } catch { /* storage no disponible */ }
  return DEFAULT_THEME
}

export function setTheme (theme) {
  const next = THEMES.includes(theme) ? theme : DEFAULT_THEME
  document.documentElement.setAttribute('data-theme', next)
  try { window.localStorage.setItem(STORAGE_KEY, next) } catch { /* ignorar */ }
  return next
}

export function initTheme () {
  return setTheme(getTheme())
}
