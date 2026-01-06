export type ThemeId = 'desert-sand' | 'oasis' | 'night-sky'

export interface Theme {
  id: ThemeId
  name: string
  icon: string
}

export const themes: Theme[] = [
  { id: 'desert-sand', name: 'theme.desertSand', icon: '🏜️' },
  { id: 'oasis', name: 'theme.oasis', icon: '🌴' },
  { id: 'night-sky', name: 'theme.nightSky', icon: '🌙' }
]

const THEME_KEY = 'khamlia-theme'

export function useTheme() {
  const currentTheme = useState<ThemeId>('theme', () => 'desert-sand')

  // Initialize theme from localStorage on client
  if (import.meta.client) {
    const stored = localStorage.getItem(THEME_KEY) as ThemeId | null
    if (stored && themes.some(t => t.id === stored)) {
      currentTheme.value = stored
    }
  }

  function setTheme(theme: ThemeId) {
    currentTheme.value = theme
    if (import.meta.client) {
      localStorage.setItem(THEME_KEY, theme)
    }
  }

  function nextTheme() {
    const currentIndex = themes.findIndex(t => t.id === currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    const nextThemeItem = themes[nextIndex]
    if (nextThemeItem) {
      setTheme(nextThemeItem.id)
    }
  }

  const currentThemeData = computed(() => themes.find(t => t.id === currentTheme.value)!)

  return {
    themes,
    currentTheme,
    currentThemeData,
    setTheme,
    nextTheme
  }
}
