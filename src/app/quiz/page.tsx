'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface QuizData {
  name: string
  gender: string
  age: string
  height: string
  currentWeight: string
  goalWeight: string
  mainGoal: string
  activityLevel: string
  source: string
  email: string
  password: string
  confirmPassword: string
}

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<QuizData>({
    name: '',
    gender: '',
    age: '',
    height: '',
    currentWeight: '',
    goalWeight: '',
    mainGoal: '',
    activityLevel: '',
    source: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const totalSteps = 14
  const progress = (step / totalSteps) * 100

  const updateData = (field: keyof QuizData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step === 11) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep(step + 1)
      }, 2500)
    } else if (step === 14) {
      // Redireciona para o app principal
      router.push('/')
    } else {
      setStep(step + 1)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 2: return data.name.trim() !== ''
      case 3: return data.gender !== ''
      case 4: return data.age !== '' && parseInt(data.age) > 0
      case 5: return data.height !== '' && parseInt(data.height) > 0
      case 6: return data.currentWeight !== '' && parseFloat(data.currentWeight) > 0
      case 7: return data.goalWeight !== '' && parseFloat(data.goalWeight) > 0
      case 8: return data.mainGoal !== ''
      case 9: return data.activityLevel !== ''
      case 10: return data.source !== ''
      case 12: return data.email.includes('@') && data.email.includes('.')
      case 13: return data.password.length >= 6 && data.password === data.confirmPassword
      default: return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Progress Bar */}
      {step > 1 && step < 14 && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          
          {/* TELA 1 - Boas-vindas */}
          {step === 1 && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Bem-vindo ao CalPro
                </h1>
                <p className="text-xl text-gray-300">
                  Vamos personalizar seu plano em menos de 1 minuto
                </p>
              </div>
              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Começar
              </button>
            </div>
          )}

          {/* TELA 2 - Nome */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Como podemos te chamar?</h2>
                <p className="text-sm text-gray-400">Usaremos seu nome para personalizar sua experiência</p>
              </div>
              <input
                type="text"
                value={data.name}
                onChange={(e) => updateData('name', e.target.value)}
                placeholder="Digite seu nome"
                className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-green-500 text-white placeholder-gray-500 px-6 py-4 rounded-2xl text-lg outline-none transition-all duration-300"
                autoFocus
              />
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-xl"
              >
                Continuar
              </button>
            </div>
          )}

          {/* TELA 3 - Sexo */}
          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Qual é o seu sexo?</h2>
              <div className="space-y-4">
                {['Masculino', 'Feminino', 'Prefiro não informar'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      updateData('gender', option)
                      setTimeout(nextStep, 300)
                    }}
                    className={`w-full py-5 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      data.gender === option
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl'
                        : 'bg-gray-800/50 border-2 border-gray-700 hover:border-green-500 text-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TELA 4 - Idade */}
          {step === 4 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Qual é a sua idade?</h2>
              <input
                type="number"
                value={data.age}
                onChange={(e) => updateData('age', e.target.value)}
                placeholder="Ex: 25"
                className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-green-500 text-white placeholder-gray-500 px-6 py-4 rounded-2xl text-lg outline-none transition-all duration-300"
                autoFocus
              />
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-xl"
              >
                Continuar
              </button>
            </div>
          )}

          {/* TELA 5 - Altura */}
          {step === 5 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Qual é a sua altura?</h2>
              <div className="relative">
                <input
                  type="number"
                  value={data.height}
                  onChange={(e) => updateData('height', e.target.value)}
                  placeholder="175"
                  className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-green-500 text-white placeholder-gray-500 px-6 py-4 rounded-2xl text-lg outline-none transition-all duration-300"
                  autoFocus
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg">cm</span>
              </div>
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-xl"
              >
                Continuar
              </button>
            </div>
          )}

          {/* TELA 6 - Peso Atual */}
          {step === 6 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Qual é o seu peso atual?</h2>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={data.currentWeight}
                  onChange={(e) => updateData('currentWeight', e.target.value)}
                  placeholder="70.5"
                  className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-green-500 text-white placeholder-gray-500 px-6 py-4 rounded-2xl text-lg outline-none transition-all duration-300"
                  autoFocus
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg">kg</span>
              </div>
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-xl"
              >
                Continuar
              </button>
            </div>
          )}

          {/* TELA 7 - Objetivo de Peso */}
          {step === 7 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Qual peso você quer alcançar?</h2>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={data.goalWeight}
                  onChange={(e) => updateData('goalWeight', e.target.value)}
                  placeholder="65.0"
                  className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-green-500 text-white placeholder-gray-500 px-6 py-4 rounded-2xl text-lg outline-none transition-all duration-300"
                  autoFocus
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg">kg</span>
              </div>
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-xl"
              >
                Continuar
              </button>
            </div>
          )}

          {/* TELA 8 - Objetivo Principal */}
          {step === 8 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Qual é seu principal objetivo?</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Emagrecer', emoji: '🔥' },
                  { label: 'Ganhar massa muscular', emoji: '💪' },
                  { label: 'Manter o peso', emoji: '⚖️' },
                  { label: 'Melhorar saúde', emoji: '❤️' }
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => {
                      updateData('mainGoal', option.label)
                      setTimeout(nextStep, 300)
                    }}
                    className={`p-6 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
                      data.mainGoal === option.label
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-2xl'
                        : 'bg-gray-800/50 border-2 border-gray-700 hover:border-green-500 text-white'
                    }`}
                  >
                    <div className="text-4xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-semibold">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TELA 9 - Nível de Atividade */}
          {step === 9 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Qual seu nível de atividade física?</h2>
              <div className="space-y-4">
                {['Sedentário', 'Levemente ativo', 'Ativo', 'Muito ativo'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      updateData('activityLevel', option)
                      setTimeout(nextStep, 300)
                    }}
                    className={`w-full py-5 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      data.activityLevel === option
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl'
                        : 'bg-gray-800/50 border-2 border-gray-700 hover:border-green-500 text-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TELA 10 - Onde Conheceu */}
          {step === 10 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Onde você conheceu o CalPro?</h2>
              <div className="space-y-4">
                {['Instagram', 'TikTok', 'Indicação de amigo', 'Anúncio', 'Outro'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      updateData('source', option)
                      setTimeout(nextStep, 300)
                    }}
                    className={`w-full py-5 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      data.source === option
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl'
                        : 'bg-gray-800/50 border-2 border-gray-700 hover:border-green-500 text-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TELA 11 - Mensagem Motivadora */}
          {step === 11 && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-white">
                  Perfeito, {data.name} 🔥
                </h1>
                <p className="text-xl text-gray-300">
                  Estamos criando um plano personalizado para você no CalPro
                </p>
              </div>
              <div className="flex justify-center">
                <Loader2 className="w-16 h-16 text-green-500 animate-spin" />
              </div>
            </div>
          )}

          {/* TELA 12 - Email */}
          {step === 12 && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Crie sua conta</h2>
                <p className="text-gray-400">Salve seu progresso e acompanhe sua evolução</p>
              </div>
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateData('email', e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-green-500 text-white placeholder-gray-500 px-6 py-4 rounded-2xl text-lg outline-none transition-all duration-300"
                autoFocus
              />
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-xl"
              >
                Continuar
              </button>
            </div>
          )}

          {/* TELA 13 - Senha */}
          {step === 13 && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Crie uma senha segura</h2>
                <p className="text-sm text-gray-400">Use no mínimo 6 caracteres</p>
              </div>
              <div className="space-y-4">
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => updateData('password', e.target.value)}
                  placeholder="Senha"
                  className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-green-500 text-white placeholder-gray-500 px-6 py-4 rounded-2xl text-lg outline-none transition-all duration-300"
                  autoFocus
                />
                <input
                  type="password"
                  value={data.confirmPassword}
                  onChange={(e) => updateData('confirmPassword', e.target.value)}
                  placeholder="Confirmar senha"
                  className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-green-500 text-white placeholder-gray-500 px-6 py-4 rounded-2xl text-lg outline-none transition-all duration-300"
                />
              </div>
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-xl"
              >
                Entrar no CalPro
              </button>
            </div>
          )}

          {/* TELA 14 - Final */}
          {step === 14 && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Tudo pronto, {data.name} 🚀
                </h1>
                <p className="text-xl text-gray-300">
                  Bem-vindo ao CalPro. Seu plano personalizado está pronto.
                </p>
              </div>
              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Acessar App
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Step Indicator */}
      {step > 1 && step < 14 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          Passo {step - 1} de {totalSteps - 2}
        </div>
      )}
    </div>
  )
}
