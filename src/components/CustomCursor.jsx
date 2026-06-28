import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [sparks, setSparks] = useState([])
  const [trails, setTrails] = useState([])
  const audioCtxRef = useRef(null)
  const nextId = useRef(0)
  const trailTimerRef = useRef(null)

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (AC) audioCtxRef.current = new AC()
    }
  }

  const playClickSound = () => {
    try {
      initAudio()
      const ctx = audioCtxRef.current
      if (!ctx) return
      if (ctx.state === 'suspended') ctx.resume()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1000, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1)
      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } catch (e) {
      console.warn('Audio click failed:', e)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      clearTimeout(trailTimerRef.current)
      trailTimerRef.current = setTimeout(() => {
        const id = nextId.current++
        setTrails((prev) => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== id))
        }, 400)
      }, 30)
    }

    const handleMouseDown = (e) => {
      playClickSound()

      const newSparks = Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * 360
        const distance = 30 + Math.random() * 30
        const id = nextId.current++
        return {
          id,
          x: e.clientX,
          y: e.clientY,
          angle,
          distance,
          color: ['#f97316', '#facc15', '#fb923c', '#ef4444', '#fde68a'][Math.floor(Math.random() * 5)],
        }
      })

      setSparks((prev) => [...prev, ...newSparks])
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => !newSparks.find((ns) => ns.id === s.id)))
      }, 700)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return (
    <>
      {/* Trail */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none z-[99998] rounded-full"
            style={{
              left: trail.x,
              top: trail.y,
              x: '-50%',
              y: '-50%',
              width: 4,
              height: 4,
              background: '#f97316',
            }}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </AnimatePresence>

      {/* Sparks on click */}
      <AnimatePresence>
        {sparks.map((spark) => {
          const rad = (spark.angle * Math.PI) / 180
          const tx = Math.cos(rad) * spark.distance
          const ty = Math.sin(rad) * spark.distance
          return (
            <motion.div
              key={spark.id}
              className="fixed pointer-events-none z-[99999] rounded-full"
              style={{
                left: spark.x,
                top: spark.y,
                width: 5,
                height: 5,
                background: spark.color,
                x: '-50%',
                y: '-50%',
              }}
              initial={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
              animate={{ opacity: 0, scale: 0, translateX: tx, translateY: ty }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )
        })}
      </AnimatePresence>
    </>
  )
}