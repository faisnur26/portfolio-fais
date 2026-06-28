import { useEffect, useState } from 'react'

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [statusText, setStatusText] = useState('INITIALIZING PORTFOLIO...')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8 + 2
        if (next >= 100) {
          clearInterval(interval)
          setStatusText('READY')
          setTimeout(() => setFadeOut(true), 400)
          setTimeout(() => onFinish(), 1100)
          return 100
        }
        
        // Update status text dynamically based on progress
        if (next < 25) {
          setStatusText('INITIALIZING PORTFOLIO...')
        } else if (next < 55) {
          setStatusText('LOADING CREATIVE MODULES...')
        } else if (next < 80) {
          setStatusText('OPTIMIZING STYLES & INTERACTIONS...')
        } else {
          setStatusText('RENDERING EXPERIENCE...')
        }
        
        return next
      })
    }, 60)

    return () => clearInterval(interval)
  }, [onFinish])

  const displayProgress = Math.min(Math.round(progress), 100)

  // Circular progress calculation
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#07070a] transition-all duration-700 ease-in-out ${
        fadeOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />

      {/* Main loading container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* SVG Circular Progress & Logo */}
        <div className="relative w-44 h-44 flex items-center justify-center mb-8">
          {/* Progress Circle SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Outer track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-neutral-200/50 dark:stroke-neutral-800/40 fill-none"
              strokeWidth="1.5"
            />
            {/* Animated active progress stroke */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-blue-600 dark:stroke-blue-500 fill-none transition-all duration-150 ease-out"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Glowing background behind logo */}
          <div className="absolute w-24 h-24 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-xl animate-pulse" />

          {/* Hexagonal FS Logo */}
          <div className="relative z-10 w-16 h-16 transform transition-transform duration-300 hover:scale-105">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-neutral-900 dark:text-white drop-shadow-[0_4px_12px_rgba(37,99,235,0.15)]"
              fill="currentColor"
            >
              {/* F Part */}
              <path d="M 14,30 L 50,9 L 50,21 L 26,35 L 26,49 L 44,38.5 L 44,50.5 L 26,61 L 26,71 L 14,64 Z" />
              {/* S Part */}
              <path d="M 56,12 L 86,29.5 L 86,63 L 50,84 L 38,77 L 38,65 L 50,72 L 74,58 L 74,46 L 50,60 L 50,48 L 74,34 L 74,22.5 L 56,12 Z" />
            </svg>
          </div>
        </div>

        {/* Counter Text */}
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white flex items-baseline">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              {displayProgress}
            </span>
            <span className="text-xl sm:text-2xl text-neutral-400 dark:text-neutral-600 font-bold ml-0.5">%</span>
          </div>
          
          {/* Status Indicator */}
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase h-4">
            {statusText}
          </p>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-[10px] font-medium tracking-[0.25em] text-neutral-300 dark:text-neutral-700 uppercase">
          FAIS NUR AMRULLOH © 2026
        </p>
      </div>
    </div>
  )
}
