import { useEffect, useState } from 'react'
import { FaMobileAlt, FaPaintBrush, FaLaptopCode, FaReact } from 'react-icons/fa'
import { generateCardBack } from '../utils/generateCardBack'
import Lanyard from './Lanyard.jsx'

const roles = ['Fullstack Developer', 'Software Engineer']

const floatingIcons = [
  { label: 'Mobile', icon: <FaMobileAlt className="text-[#a855f7]" />, pos: 'top-[50%] -right-2.5', delay: '1s' },
  { label: 'Design', icon: <FaPaintBrush className="text-[#f472b6]" />, pos: 'bottom-[10%] -right-2.5', delay: '2s' },
  { label: 'Code', icon: <FaLaptopCode className="text-[#38bdf8]" />, pos: 'bottom-[35%] -left-5', delay: '0.5s' },
  { label: 'React', icon: <FaReact className="text-[#61dafb]" />, pos: 'top-[20%] -left-5', delay: '1.5s' },
]

// ✅ generateCardTexture — untuk bagian DEPAN kartu (foto profil)
const generateCardTexture = (profileImgSrc, callback) => {
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 560
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = profileImgSrc
  img.onload = () => {
    const cardRadius = 24
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(0, 0, canvas.width, canvas.height, cardRadius)
    ctx.clip()

    // Background
    ctx.fillStyle = '#0D162B'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Glass reflection
    const reflectionGrad = ctx.createLinearGradient(canvas.width, 0, 0, canvas.height)
    reflectionGrad.addColorStop(0, 'rgba(255,255,255,0.05)')
    reflectionGrad.addColorStop(0.5, 'rgba(255,255,255,0.015)')
    reflectionGrad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = reflectionGrad
    ctx.beginPath()
    ctx.moveTo(canvas.width, 0)
    ctx.bezierCurveTo(canvas.width * 0.6, canvas.height * 0.25, canvas.width * 0.3, canvas.height * 0.55, canvas.width * 0.4, canvas.height)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.closePath()
    ctx.fill()

    // Logo text "Fais."
    ctx.font = 'bold 28px "Space Grotesk", sans-serif'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'left'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('Fais', 35, 75)
    const nameWidth = ctx.measureText('Fais').width
    ctx.fillStyle = '#2563EB'
    ctx.fillText('.', 35 + nameWidth, 75)

    // Tech pattern top-right
    ctx.font = 'bold 8px "Courier New", monospace'
    ctx.fillStyle = 'rgba(37,99,235,0.22)'
    ctx.textAlign = 'right'
    const techLines = ['X 7 8 A 0 9 4', 'N 4 F M 9 C E', '8 D L X 0 A 2', 'G L I D E 1 7', 'M 0 D E : L A', 'V E R S I O N']
    techLines.forEach((line, index) => {
      ctx.fillText(line, canvas.width - 35, 52 + index * 9)
    })

    // Profile photo
    const photoSize = 320
    const photoX = canvas.width / 2 - photoSize / 2
    const photoY = 130
    const photoRadius = 28
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.roundRect(photoX, photoY, photoSize, photoSize, photoRadius)
    ctx.stroke()
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(photoX, photoY, photoSize, photoSize, photoRadius)
    ctx.clip()
    const imgRatio = img.width / img.height
    let dw, dh, dx, dy
    if (imgRatio > 1) {
      dh = photoSize; dw = photoSize * imgRatio
      dx = photoX + (photoSize - dw) / 2; dy = photoY
    } else {
      dw = photoSize; dh = photoSize / imgRatio
      dx = photoX; dy = photoY + (photoSize - dh) / 2
    }
    ctx.drawImage(img, dx, dy, dw, dh)
    ctx.restore()

    // Name & title
    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 24px "Space Grotesk", sans-serif'
    ctx.fillText('Fais Nur Amrulloh', canvas.width / 2, 480)
    ctx.fillStyle = '#3b82f6'
    ctx.font = '600 15px "Space Grotesk", sans-serif'
    ctx.fillText('Fullstack Developer', canvas.width / 2, 510)

    // Border glow
    ctx.restore()
    ctx.save()
    ctx.strokeStyle = 'rgba(37,99,235,0.4)'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.roundRect(3, 3, canvas.width - 6, canvas.height - 6, cardRadius)
    ctx.stroke()
    ctx.strokeStyle = '#2563EB'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(4, 4, canvas.width - 8, canvas.height - 8, cardRadius - 1)
    ctx.stroke()
    ctx.restore()

    callback(canvas.toDataURL())
  }
}

// ============================================================
// ✅ SINGLE export default — tidak ada duplikasi
// ============================================================
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [frontImage, setFrontImage] = useState(null)  // foto profil
  const [backImage, setBackImage] = useState(null)    // logo + desain

  // Generate DEPAN kartu — foto profil
  useEffect(() => {
    generateCardTexture('/profilefais.png', setFrontImage)
  }, [])

  // Generate BELAKANG kartu — logo FS + desain modern
  useEffect(() => {
    generateCardBack({
      name: 'Fais Nur Amrulloh',
      title: 'Fullstack Developer',
      logoSrc: '/logo-fs.png',  // ← logo FS kamu di /public/logo-fs.png
    }).then(setBackImage)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        )
      }, isDeleting ? 50 : 100)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-blue-500/12 dark:bg-blue-500/20 rounded-full blur-[130px] -top-[250px] right-[-150px] animate-float" />
        <div className="absolute w-[500px] h-[500px] bg-cyan/8 dark:bg-cyan/15 rounded-full blur-[130px] -bottom-[200px] left-[-150px] animate-float [animation-direction:reverse] [animation-delay:2s]" />
        <div className="absolute w-[350px] h-[350px] bg-pink/5 dark:bg-pink/10 rounded-full blur-[130px] top-[40%] left-[40%] animate-float [animation-delay:4s]" />
      </div>
      <div className="absolute inset-0 grid-bg" />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Text content */}
          <div className="lg:order-1 order-2 animate-[slide-in-left_1s_ease-out] max-lg:text-center flex flex-col justify-center">
            <div className="inline-flex items-center self-center lg:self-start gap-2 px-4 py-1.5 mx-4 max-w-[calc(100%-2rem)] glass rounded-full text-xs font-semibold text-text-secondary dark:text-[#94a3b8] mb-6 text-left">
              <span className="w-2 h-2 shrink-0 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span>Based in Semarang, Indonesia • Open to Work </span>
            </div>

            <h1 className="font-heading text-[clamp(2.75rem,6vw,4.25rem)] font-extrabold leading-[1.08] tracking-tight mb-6">
              <span className="text-neutral-400 dark:text-neutral-500 font-medium">Hi, I'm</span>
              <br />
              <span className="gradient-text">Fais Nur Amrulloh</span>
            </h1>

            <p className="text-[clamp(1.1rem,2vw,1.35rem)] text-neutral-500 dark:text-neutral-400 mb-6 font-medium">
              I am a{' '}
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-tight">
                {text}
                <span className="inline-block w-[1.5px] h-[1.1em] bg-blue-600/70 dark:bg-blue-400/70 ml-1.5 animate-pulse align-middle" />
              </span>
            </p>

            <p className="text-base text-text-muted dark:text-[#64748b] leading-[1.8] mb-8 max-w-[500px] max-lg:mx-auto text-justify">
              focused on building beautiful, performant, and user-friendly digital products.
            </p>

            <br />

            <div className="flex gap-4 flex-wrap max-lg:justify-center mb-10">
              <a
                href="/licenses/CV_Fais_Nur_Amrulloh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex h-[42px] min-w-[190px] items-center justify-center px-8 gradient-bg rounded-full text-center font-semibold text-[0.95rem] shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all duration-300"
                style={{ color: '#ffffff' }}
              >
                <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ color: '#ffffff' }}>
                  Get My Resume
                </span>
              </a>
            </div>

            <br />

            <div className="flex flex-row gap-6 sm:gap-10 mt-6 pt-8 border-t border-black/5 dark:border-white/5 max-lg:justify-center">
              {[
                { number: '10+', label: 'Completed Projects' },
                { number: '3+', label: 'Years Coding' },
                { number: '5+', label: 'Tech Stacks' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-heading text-[1.5rem] sm:text-[1.85rem] font-bold gradient-text leading-none">
                    {stat.number}
                  </div>
                  <div className="text-[0.7rem] sm:text-[0.82rem] text-text-muted dark:text-[#64748b] mt-1.5 whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Lanyard card */}
          <div className="lg:order-2 order-1 flex items-center justify-center relative w-full min-h-[500px] md:min-h-[550px] overflow-visible">
            {frontImage ? (
              <Lanyard
                frontImage={frontImage}   // ✅ depan: foto profil
                backImage={backImage}     // ✅ belakang: logo FS + desain
                lanyardWidth={1.45}
                fov={22}
                position={[0, 0, 13]}
              />
            ) : (
              <div className="w-[280px] aspect-[1/1.4] bg-neutral-900/5 dark:bg-neutral-800/10 border border-neutral-200 dark:border-neutral-800 rounded-2xl animate-pulse flex items-center justify-center text-text-muted text-sm">
                Generating card...
              </div>
            )}

            {floatingIcons.map((item) => (
              <div
                key={item.label}
                className={`absolute ${item.pos} px-3 py-2 text-[0.8rem] font-semibold text-text-secondary dark:text-[#94a3b8] animate-float bg-transparent border-none shadow-none`}
                style={{ animationDelay: item.delay }}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}