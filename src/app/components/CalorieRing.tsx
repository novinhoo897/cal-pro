'use client'

import { useTheme } from './ThemeProvider'

interface CalorieRingProps {
  consumed: number
  goal: number
  percentage: number
}

export function CalorieRing({ consumed, goal, percentage }: CalorieRingProps) {
  const { themeColors } = useTheme()
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="90"
            stroke="#f3f4f6"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="96"
            cy="96"
            r="90"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={themeColors.primary} />
              <stop offset="100%" stopColor={themeColors.secondary} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className="text-4xl font-bold bg-gradient-to-br bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${themeColors.primary}, ${themeColors.secondary})`
            }}
          >
            {consumed}
          </div>
          <div className="text-sm text-gray-500 mt-1">de {goal} kcal</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{goal - consumed}</div>
          <div className="text-xs text-gray-500 mt-1">Restante</div>
        </div>
        <div className="w-px h-12 bg-gray-200"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">245</div>
          <div className="text-xs text-gray-500 mt-1">Queimadas</div>
        </div>
      </div>
    </div>
  )
}
