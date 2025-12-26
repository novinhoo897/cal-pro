'use client'

import { useState } from 'react'
import { Home, Camera, TrendingUp, User, Plus, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react'
import { CalorieRing } from './components/CalorieRing'
import { MacroCard } from './components/MacroCard'
import { MealCard } from './components/MealCard'
import { CameraScreen } from './components/CameraScreen'
import { ProgressScreen } from './components/ProgressScreen'
import { ProfileScreen } from './components/ProfileScreen'
import { ThemeProvider, useTheme } from './components/ThemeProvider'

function AppContent() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'camera' | 'progress' | 'profile'>('home')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { themeColors, mode, toggleTheme } = useTheme()

  // Dados mockados
  const caloriesConsumed = 1842
  const caloriesGoal = 2400
  const caloriesPercentage = (caloriesConsumed / caloriesGoal) * 100

  const macros = {
    protein: { consumed: 98, goal: 120, color: 'from-red-500 to-orange-500' },
    carbs: { consumed: 180, goal: 250, color: 'from-orange-400 to-yellow-500' },
    fat: { consumed: 65, goal: 80, color: 'from-blue-400 to-cyan-500' }
  }

  const recentMeals = [
    {
      id: 1,
      name: 'Salada de Frango Grelhado',
      time: '12:30',
      calories: 420,
      protein: 35,
      carbs: 25,
      fat: 18,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Smoothie Bowl de Proteína',
      time: '9:00',
      calories: 380,
      protein: 28,
      carbs: 45,
      fat: 12,
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Salmão com Arroz',
      time: '19:00',
      calories: 580,
      protein: 42,
      carbs: 55,
      fat: 22,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop'
    }
  ]

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const currentDay = selectedDate.getDay()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
      {/* Home Screen */}
      {activeScreen === 'home' && (
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-6 py-4 shadow-sm transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CalPro</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>245 kcal queimadas</span>
                </div>
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                  aria-label="Alternar tema"
                >
                  {mode === 'light' ? (
                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Calendar Week Selector */}
            <div className="flex items-center justify-between">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="flex gap-2">
                {weekDays.map((day, index) => (
                  <button
                    key={day}
                    className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
                      index === currentDay
                        ? `bg-gradient-to-br ${themeColors.gradient} text-white shadow-lg`
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-xs font-medium">{day}</span>
                    <span className="text-sm font-bold mt-1">
                      {new Date(selectedDate.getTime() - (currentDay - index) * 86400000).getDate()}
                    </span>
                  </button>
                ))}
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Calorie Ring */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm transition-colors duration-300">
              <CalorieRing
                consumed={caloriesConsumed}
                goal={caloriesGoal}
                percentage={caloriesPercentage}
              />
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3">
              <MacroCard
                label="Proteína"
                consumed={macros.protein.consumed}
                goal={macros.protein.goal}
                color={macros.protein.color}
                unit="g"
              />
              <MacroCard
                label="Carboidratos"
                consumed={macros.carbs.consumed}
                goal={macros.carbs.goal}
                color={macros.carbs.color}
                unit="g"
              />
              <MacroCard
                label="Gordura"
                consumed={macros.fat.consumed}
                goal={macros.fat.goal}
                color={macros.fat.color}
                unit="g"
              />
            </div>

            {/* Recent Meals */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Refeições Recentes</h2>
                <button 
                  className="text-sm font-medium"
                  style={{ color: themeColors.primary }}
                >
                  Ver Todas
                </button>
              </div>
              <div className="space-y-3">
                {recentMeals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camera Screen */}
      {activeScreen === 'camera' && (
        <CameraScreen onClose={() => setActiveScreen('home')} />
      )}

      {/* Progress Screen */}
      {activeScreen === 'progress' && (
        <ProgressScreen />
      )}

      {/* Profile Screen */}
      {activeScreen === 'profile' && (
        <ProfileScreen />
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
        <div className="max-w-md mx-auto flex items-center justify-around px-6 py-3">
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center gap-1 transition-colors`}
            style={{ color: activeScreen === 'home' ? themeColors.primary : mode === 'dark' ? '#9ca3af' : '#9ca3af' }}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Início</span>
          </button>

          <button
            onClick={() => setActiveScreen('progress')}
            className={`flex flex-col items-center gap-1 transition-colors`}
            style={{ color: activeScreen === 'progress' ? themeColors.primary : mode === 'dark' ? '#9ca3af' : '#9ca3af' }}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Progresso</span>
          </button>

          {/* Camera Button (Center) */}
          <button
            onClick={() => setActiveScreen('camera')}
            className="relative -mt-8"
          >
            <div 
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${themeColors.gradient} flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow`}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
          </button>

          <button
            onClick={() => setActiveScreen('profile')}
            className={`flex flex-col items-center gap-1 transition-colors`}
            style={{ color: activeScreen === 'profile' ? themeColors.primary : mode === 'dark' ? '#9ca3af' : '#9ca3af' }}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>

          <button 
            className="flex flex-col items-center gap-1 text-gray-400 transition-colors"
            style={{ color: '#9ca3af' }}
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs font-medium">Mais</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CalProApp() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
