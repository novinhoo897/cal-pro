'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Flame, Target } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ProgressScreen() {
  const { themeColors } = useTheme()
  
  const weightData = [
    { date: '1 Jan', weight: 82 },
    { date: '8 Jan', weight: 81.5 },
    { date: '15 Jan', weight: 81 },
    { date: '22 Jan', weight: 80.5 },
    { date: '29 Jan', weight: 80 },
    { date: '5 Fev', weight: 79.5 },
    { date: '12 Fev', weight: 79 }
  ]

  return (
    <div className="max-w-md mx-auto pb-6">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm mb-6">
        <h1 className="text-2xl font-bold">Progresso</h1>
        <p className="text-sm text-gray-500 mt-1">Acompanhe sua jornada</p>
      </div>

      <div className="px-6 space-y-4">
        {/* Current Weight Card */}
        <div 
          className={`bg-gradient-to-br ${themeColors.gradient} rounded-3xl p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90">Peso Atual</p>
              <h2 className="text-4xl font-bold mt-1">79,0 kg</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <span className="text-sm font-medium">-3,0 kg</span>
            </div>
            <span className="text-sm opacity-90">desde o início</span>
          </div>
        </div>

        {/* Weight Progress Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Progresso de Peso</h3>
            <button 
              className="text-sm font-medium"
              style={{ color: themeColors.primary }}
            >
              7 Dias
            </button>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                domain={[78, 83]}
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke={themeColors.primary}
                strokeWidth={3}
                dot={{ fill: themeColors.primary, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <button 
            className={`w-full mt-4 py-3 bg-gradient-to-r ${themeColors.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-shadow`}
          >
            Registrar Peso
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Streak Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">14</div>
            <div className="text-sm text-gray-500">Dias Seguidos</div>
          </div>

          {/* Goal Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">75%</div>
            <div className="text-sm text-gray-500">Progresso da Meta</div>
          </div>
        </div>

        {/* Average Calories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Média de Calorias Diárias</h3>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-bold text-gray-900">1.842</div>
              <div className="text-sm text-gray-500 mt-1">kcal por dia</div>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">No caminho certo</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${themeColors.gradient} rounded-full`}
              style={{ width: '76%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
