'use client'

import { Crown, Settings, Bell, Shield, Heart, Zap, Star, ChevronRight, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ProfileScreen() {
  const { themeColors } = useTheme()

  const themes = [
    { id: 'purple', name: 'Roxo', color: 'from-purple-500 to-pink-500' },
    { id: 'blue', name: 'Azul', color: 'from-blue-500 to-cyan-500' },
    { id: 'green', name: 'Verde', color: 'from-green-500 to-emerald-500' },
    { id: 'orange', name: 'Laranja', color: 'from-orange-500 to-red-500' },
    { id: 'red', name: 'Vermelho', color: 'from-red-500 to-pink-600' }
  ]

  return (
    <div className="max-w-md mx-auto pb-6">
      {/* Header */}
      <div className={`bg-gradient-to-br ${themeColors.gradient} px-6 pt-6 pb-12`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Perfil</h1>
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <Settings className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <div className="text-white">
            <h2 className="text-xl font-bold">João Silva</h2>
            <p className="text-sm opacity-90">joao.silva@email.com</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                Plano Gratuito
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-4">
        {/* Theme Selector - Removido temporariamente pois só temos modo claro/escuro */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personalização</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Use o botão de lua/sol no topo da tela inicial para alternar entre modo claro e escuro.
          </p>
        </div>

        {/* Premium Card */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-6 h-6" />
                <h3 className="text-xl font-bold">Seja Premium</h3>
              </div>
              <p className="text-sm opacity-90">Desbloqueie todos os recursos e análises ilimitadas</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Análises ilimitadas de alimentos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="text-sm">Estatísticas avançadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Planos de refeição personalizados</span>
            </div>
          </div>

          <button className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold hover:shadow-lg transition-shadow">
            Assinar Agora - R$ 29,90/mês
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Suas Estatísticas</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">127</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Refeições</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">14</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dias Seguidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">3,0</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">kg Perdidos</div>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors duration-300">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">Notificações</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">Privacidade e Segurança</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">Metas de Saúde</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">Configurações do App</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
          Sair
        </button>
      </div>
    </div>
  )
}
