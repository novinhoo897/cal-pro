'use client'

import { useState } from 'react'
import { X, HelpCircle, Camera, Maximize, Minimize, ScanBarcode, FileText } from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface CameraScreenProps {
  onClose: () => void
}

export function CameraScreen({ onClose }: CameraScreenProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { themeColors } = useTheme()

  const handleScan = () => {
    setAnalyzing(true)
    // Simular análise de IA
    setTimeout(() => {
      setResult({
        food: 'Peito de Frango Grelhado',
        calories: 420,
        protein: 35,
        carbs: 25,
        fat: 18,
        confidence: 95
      })
      setAnalyzing(false)
    }, 2000)
  }

  if (result) {
    return (
      <div className="fixed inset-0 bg-white z-50">
        <div className="max-w-md mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold">Nutrição</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Food Image */}
            <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
                alt="Alimento"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {result.confidence}% Correspondência
              </div>
            </div>

            {/* Food Name & Quantity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{result.food}</h2>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-lg">-</span>
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">1</span>
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              {/* Calories Bar */}
              <div 
                className={`bg-gradient-to-r ${themeColors.gradient} rounded-xl p-4 text-white mb-4`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Calorias Totais</span>
                  <span className="text-2xl font-bold">{result.calories} kcal</span>
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4">
                  <div className="text-xs text-gray-600 mb-1">Proteína</div>
                  <div className="text-2xl font-bold text-gray-900">{result.protein}g</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4">
                  <div className="text-xs text-gray-600 mb-1">Carboidratos</div>
                  <div className="text-2xl font-bold text-gray-900">{result.carbs}g</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                  <div className="text-xs text-gray-600 mb-1">Gordura</div>
                  <div className="text-2xl font-bold text-gray-900">{result.fat}g</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-6 border-t space-y-3">
            <button className="w-full py-4 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              Corrigir Resultados
            </button>
            <button 
              className={`w-full py-4 bg-gradient-to-r ${themeColors.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-shadow`}
            >
              Concluir
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="max-w-md mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 text-white">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Cal AI</h1>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Camera View */}
        <div className="flex-1 relative">
          {analyzing ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <div 
                  className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                  style={{ borderColor: `${themeColors.primary} transparent transparent transparent` }}
                ></div>
                <p className="text-white font-medium">Analisando alimento...</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-white/30 rounded-3xl"></div>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="p-6 space-y-4">
          {/* Mode Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button className="px-6 py-3 bg-white text-black rounded-xl font-medium flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Escanear
            </button>
            <button className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium flex items-center gap-2">
              <ScanBarcode className="w-5 h-5" />
              Código
            </button>
            <button className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Rótulo
            </button>
          </div>

          {/* Capture Button */}
          <div className="flex items-center justify-center gap-8">
            <button className="p-3 bg-white/10 rounded-full">
              <Minimize className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={handleScan}
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 rounded-full border-4 border-gray-300"></div>
            </button>

            <button className="p-3 bg-white/10 rounded-full">
              <Maximize className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
