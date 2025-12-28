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
  getContrastText: (backgroundColor: string) => string
  getAccessibleColor: (color: string, background: string) => string
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

// Função para converter hex para RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// Função para calcular luminância relativa (WCAG)
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// Função para calcular contraste entre duas cores (WCAG)
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  
  if (!rgb1 || !rgb2) return 1
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
  
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

// Função para ajustar cor até atingir contraste adequado
function adjustColorForContrast(
  color: string,
  background: string,
  targetRatio: number = 4.5
): string {
  let rgb = hexToRgb(color)
  if (!rgb) return color
  
  let currentRatio = getContrastRatio(color, background)
  
  // Se já tem contraste adequado, retorna a cor original
  if (currentRatio >= targetRatio) return color
  
  // Determina se deve clarear ou escurecer
  const bgRgb = hexToRgb(background)
  if (!bgRgb) return color
  
  const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b)
  const shouldLighten = bgLum < 0.5
  
  // Ajusta a cor iterativamente
  let iterations = 0
  const maxIterations = 100
  
  while (currentRatio < targetRatio && iterations < maxIterations) {
    if (shouldLighten) {
      rgb.r = Math.min(255, rgb.r + 5)
      rgb.g = Math.min(255, rgb.g + 5)
      rgb.b = Math.min(255, rgb.b + 5)
    } else {
      rgb.r = Math.max(0, rgb.r - 5)
      rgb.g = Math.max(0, rgb.g - 5)
      rgb.b = Math.max(0, rgb.b - 5)
    }
    
    const newColor = `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`
    currentRatio = getContrastRatio(newColor, background)
    iterations++
  }
  
  return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`
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
    
    // Definir cores de texto com alto contraste
    const bgColor = mode === 'light' ? '#ffffff' : '#1f2937'
    const textColor = mode === 'light' ? '#111827' : '#f9fafb'
    const mutedTextColor = mode === 'light' ? '#6b7280' : '#9ca3af'
    
    root.style.setProperty('--text-primary', textColor)
    root.style.setProperty('--text-muted', mutedTextColor)
    root.style.setProperty('--bg-primary', bgColor)
  }, [mode])

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Retorna cor de texto com alto contraste baseado no fundo
  const getContrastText = (backgroundColor: string): string => {
    const rgb = hexToRgb(backgroundColor)
    if (!rgb) return mode === 'light' ? '#111827' : '#f9fafb'
    
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b)
    
    // WCAG recomenda: luminância > 0.5 = texto escuro, caso contrário texto claro
    return luminance > 0.5 ? '#111827' : '#ffffff'
  }

  // Retorna cor ajustada para ter contraste adequado com o fundo
  const getAccessibleColor = (color: string, background: string): string => {
    return adjustColorForContrast(color, background, 4.5)
  }

  const themeColors = themeConfig[mode]

  return (
    <ThemeContext.Provider value={{ 
      mode, 
      toggleTheme, 
      themeColors,
      getContrastText,
      getAccessibleColor
    }}>
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
