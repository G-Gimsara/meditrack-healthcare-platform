import { useState, useEffect } from 'react'

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('meditrack_theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('meditrack_theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('meditrack_theme', 'light')
    }
  }, [darkMode])

  const toggle = () => setDarkMode((d) => !d)

  return { darkMode, toggle }
}
