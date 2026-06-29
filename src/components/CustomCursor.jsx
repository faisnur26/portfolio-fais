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

  // Pulls {x, y} out of either a mouse event or a touch event,
  // so the rest of the code doesn't need to care which one fired.
  const getPoint = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
    }
    return { x: e.clientX, y: e.clientY }
  }

  useEffect(() => {
    const handleMove = (e) => {
      const { x, y } = getPoint(e)
      clearTimeout(trailTimerRef.current)
      trailTimerRef.current = setTimeout(() => {
        const id = nextId.current++
        setTrails((prev) => [...prev.slice(-12), { id, x, y }])
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== id))
        }, 400)
      }, 30)
    }

    const handlePress = (e) => {
      const { x, y } = getPoint(e)
      playClickSound()

      const newSparks = Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * 360
        const distance = 30 + Math.random() * 30
        const id = nextId.current++
        return {
          id,
          x,
          y,
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

    // Mouse (desktop)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handlePress)

    // Touch (mobile/tablet) — passive:true keeps scrolling smooth
    window.addEventListener('touchstart', handlePress, { passive: true })
    window.addEventListener('touchmove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handlePress)
      window.removeEventListener('touchstart', handlePress)
      window.removeEventListener('touchmove', handleMove)
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

      {/* Sparks on click/tap */}
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