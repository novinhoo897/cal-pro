'use client'

import { ChevronRight } from 'lucide-react'

interface Meal {
  id: number
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fat: number
  image: string
}

interface MealCardProps {
  meal: Meal
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Meal Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Meal Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{meal.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{meal.time}</p>
          
          {/* Macros */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500"></div>
              <span className="text-xs text-gray-600">{meal.protein}g</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500"></div>
              <span className="text-xs text-gray-600">{meal.carbs}g</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500"></div>
              <span className="text-xs text-gray-600">{meal.fat}g</span>
            </div>
          </div>
        </div>

        {/* Calories & Arrow */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">{meal.calories}</div>
            <div className="text-xs text-gray-500">kcal</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
