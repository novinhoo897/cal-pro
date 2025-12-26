'use client'

interface MacroCardProps {
  label: string
  consumed: number
  goal: number
  color: string
  unit: string
}

export function MacroCard({ label, consumed, goal, color, unit }: MacroCardProps) {
  const percentage = (consumed / goal) * 100
  const circumference = 2 * Math.PI * 30
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col items-center">
        {/* Mini Ring */}
        <div className="relative w-20 h-20 mb-3">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#f3f4f6"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="url(#gradient-${label})"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            <defs>
              <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color.includes('red') ? '#ef4444' : color.includes('orange') ? '#f97316' : '#3b82f6'} />
                <stop offset="100%" stopColor={color.includes('red') ? '#f97316' : color.includes('orange') ? '#fbbf24' : '#06b6d4'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold">{Math.round(percentage)}%</span>
          </div>
        </div>

        {/* Label */}
        <div className="text-xs font-medium text-gray-600 mb-1">{label}</div>
        
        {/* Values */}
        <div className="text-center">
          <span className="text-lg font-bold text-gray-900">{consumed}</span>
          <span className="text-xs text-gray-400">/{goal}{unit}</span>
        </div>
      </div>
    </div>
  )
}
