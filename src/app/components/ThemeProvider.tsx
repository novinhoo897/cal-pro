'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
  themeColors: {
    gradient: string
    primary: string
    secondary: string
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themeConfig = {
  light: {
    gradient: 'from-purple-500 to-pink-500',
    primary: '#a855f7',
    secondary: '#ec4899'
  },
  dark: {
    gradient: 'from-purple-600 to-pink-600',
    primary: '#9333ea',
    secondary: '#db2777'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light')

  useEffect(() => {
    // Carregar tema salvo do localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeMode
    if (savedTheme) {
      setMode(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    // Aplicar tema no documento
    document.documentElement.classList.toggle('dark', mode === 'dark')
    localStorage.setItem('theme', mode)
    
    // Aplicar cores CSS customizadas dinamicamente
    const root = document.documentElement
    const colors = themeConfig[mode]
    
    root.style.setProperty('--theme-primary', colors.primary)
    root.style.setProperty('--theme-secondary', colors.secondary)
  }, [mode])

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const themeColors = themeConfig[mode]

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, themeColors }}>
      <div data-theme={mode}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
