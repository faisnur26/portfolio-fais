import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaReact, FaFigma, FaJava, FaHtml5, FaCss3Alt, FaBootstrap } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import {
  SiTypescript, SiPostgresql, SiTailwindcss, SiKotlin,
  SiAndroidstudio, SiNextdotjs, SiNestjs, SiPrisma,
  SiJavascript, SiMysql, SiPhp, SiPostman,
} from 'react-icons/si';

const projects = [
  {
    image: '/project-pertamina.png',
    category: 'Enterprise App',
    title: 'General Loan System',
    description: 'An enterprise asset management and loan tracking system built for PT Pertamina Lubricants to manage hardware allocation and transaction workflows.',
    layout: 'wide',
    tags: [
      { name: 'React', icon: <FaReact className="text-[#61dafb] text-lg" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white text-lg" /> },
      { name: 'NestJS', icon: <SiNestjs className="text-[#e0234e] text-lg" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#336791] text-lg" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-[#3178c6] text-lg" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06b6d4] text-lg" /> },
      { name: 'JavaScript', icon: <SiJavascript className="text-[#f7df1e] bg-black rounded-sm text-lg" /> },
      { name: 'VS Code', icon: <VscCode className="text-[#007acc] text-lg" /> },
      { name: 'Prisma', icon: <SiPrisma className="text-neutral-800 dark:text-white text-lg" /> },
    ],
  },
  {
    image: '/project-gajahmotor.png',
    category: 'Mobile App',
    title: 'GajahMotorSemarang',
    description: 'A mobile app developed for a motorcycle parts and service shop in Semarang, featuring product catalogs, stock levels, and store recommendation lists.',
    layout: 'tall',
    tags: [
      { name: 'Kotlin', icon: <SiKotlin className="text-[#7f52ff] text-lg" /> },
      { name: 'Android Studio', icon: <SiAndroidstudio className="text-[#3ddc84] text-lg" /> },
      { name: 'MySQL', icon: <SiMysql className="text-[#00758f] text-lg" /> },
      { name: 'PHP', icon: <SiPhp className="text-[#777bb4] text-lg" /> },
      { name: 'Postman', icon: <SiPostman className="text-[#ff6c37] text-lg" /> },
      { name: 'Java', icon: <FaJava className="text-[#007396] text-lg" /> },
      { name: 'HTML', icon: <FaHtml5 className="text-[#e34f26] text-lg" /> },
      { name: 'VS Code', icon: <VscCode className="text-[#007acc] text-lg" /> },
    ],
  },
  {
    image: '/project-muliarentcar.png',
    category: 'Web Application',
    title: 'Mulia Rentcar Web',
    description: 'A responsive car rental platform designed for Mulia Rentcar, allowing users to browse vehicles, view rental specifications, and request bookings.',
    layout: 'wide',
    tags: [
      { name: 'HTML', icon: <FaHtml5 className="text-[#e34f26] text-lg" /> },
      { name: 'PHP', icon: <SiPhp className="text-[#777bb4] text-lg" /> },
      { name: 'JavaScript', icon: <SiJavascript className="text-[#f7df1e] bg-black rounded-sm text-lg" /> },
      { name: 'Bootstrap', icon: <FaBootstrap className="text-[#7952b3] text-lg" /> },
      { name: 'MySQL', icon: <SiMysql className="text-[#00758f] text-lg" /> },
      { name: 'CSS', icon: <FaCss3Alt className="text-[#1572b6] text-lg" /> },
      { name: 'VS Code', icon: <VscCode className="text-[#007acc] text-lg" /> },
    ],
  },
  {
    image: '/project-venue-new.png',
    category: 'UI/UX Design',
    title: 'venue.id UI/UX',
    description: 'A high-fidelity Figma UI/UX design prototype for a venue booking mobile app, streamlining sport field search and booking experience.',
    layout: 'tall',
    tags: [
      { name: 'Figma', icon: <FaFigma className="text-[#f24e1e] text-lg" /> },
    ],
  },
]

// ============================================================
// DESKTOP CARD — 100% sama dengan versi asli, tidak diubah
// ============================================================
function DesktopProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const isReversed = index % 2 === 1
  const isTall = project.layout === 'tall'

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 25, stiffness: 200 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 200 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height)
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0) }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white/40 dark:bg-neutral-900/20 backdrop-blur-md dark:backdrop-blur-xl border border-neutral-200/50 dark:border-white/5 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-shadow duration-700 ease-out overflow-hidden"
    >
      <span className={`absolute top-6 ${isReversed ? 'right-10' : 'right-10'} font-heading text-8xl font-black text-neutral-900/[0.04] dark:text-white/[0.04] select-none pointer-events-none leading-none z-0`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{ background: 'radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(37,99,235,0.08), transparent 40%)' }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px] border border-blue-500/20 z-[1]"
        style={{ maskImage: 'radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)' }}
      />
      <div className={`relative z-10 flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-center ${isTall ? 'gap-10 lg:gap-24' : 'gap-10 lg:gap-16'} p-8 sm:p-12 lg:py-16 lg:px-14 min-h-[420px] lg:min-h-[460px]`}>
        <div
          className={`w-full ${isTall ? 'lg:w-[30%] lg:max-w-[260px]' : 'lg:w-[50%]'} flex items-center justify-center relative z-10`}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            animate={{ y: hovered ? -8 : [0, -10, 0] }}
            transition={{ y: hovered ? { duration: 0.3, ease: 'easeOut' } : { repeat: Infinity, duration: 6, ease: 'easeInOut' } }}
            className="w-full relative overflow-hidden rounded-2xl cursor-pointer flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine z-20 pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <img
              src={project.image}
              alt={project.title}
              className={isTall
                ? 'w-full h-auto max-h-[420px] sm:max-h-[460px] object-contain rounded-xl relative z-10 transition-transform duration-700 ease-out group-hover:scale-105'
                : 'w-full h-auto max-h-[340px] object-contain rounded-xl relative z-10 transition-transform duration-700 ease-out group-hover:scale-105'}
              style={{ transform: 'translateZ(30px)' }}
            />
          </motion.div>
        </div>

        <div className={`w-full ${isTall ? 'lg:w-[64%]' : 'lg:w-[50%]'} flex flex-col items-start justify-center text-left relative z-10 gap-5`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.7rem] font-bold tracking-[3px] uppercase text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {project.category}
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white leading-tight tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[0.95rem] text-neutral-600 dark:text-[#94a3b8] leading-[1.8] max-w-lg">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2.5 w-full pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag.name}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-neutral-100/80 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-white/[0.06] shadow-sm hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                {tag.icon}<span>{tag.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
// MOBILE CARD — desain baru bersih, tidak ganggu desktop
// ============================================================
function MobileProjectCard({ project, index }) {
  const isTall = project.layout === 'tall'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
      }}
      className="bg-white dark:bg-neutral-900/50 dark:border-white/[0.07]"
    >
      {/* Image area — background abu terang */}
      <div
        style={{
          width: '100%',
          padding: '28px 28px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '190px',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="bg-neutral-50 dark:bg-neutral-800/40"
      >
        {/* Nomor dekoratif */}
        <span style={{
          position: 'absolute',
          top: '10px', right: '14px',
          fontSize: '52px', fontWeight: 900,
          color: 'rgba(0,0,0,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          fontFamily: 'inherit',
        }}
          className="dark:text-white/[0.04]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ y: [0, -7, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: index * 0.6 }}
          style={{
            width: isTall ? '52%' : '88%',
            height: 'auto',
            maxHeight: '170px',
            objectFit: 'contain',
            borderRadius: '10px',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>

      {/* Content area */}
      <div style={{ padding: '20px 22px 24px' }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '9.5px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '12px',
          background: 'rgba(37,99,235,0.06)',
          border: '1px solid rgba(37,99,235,0.12)',
        }}
          className="text-blue-600 dark:text-blue-400"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              width: '5px', height: '5px',
              borderRadius: '50%',
              background: '#3b82f6',
              display: 'block',
              flexShrink: 0,
            }}
          />
          {project.category}
        </div>

        {/* Title */}
        <h3
          className="text-neutral-900 dark:text-white font-heading"
          style={{ fontSize: '17px', fontWeight: 800, lineHeight: 1.3, margin: '0 0 8px' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-neutral-500 dark:text-neutral-400"
          style={{ fontSize: '12.5px', lineHeight: 1.7, margin: '0 0 16px' }}
        >
          {project.description}
        </p>

        {/* Divider */}
        <div
          className="dark:bg-white/[0.06]"
          style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '14px' }}
        />

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 600,
                border: '1px solid rgba(0,0,0,0.07)',
              }}
              className="bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 dark:border-white/[0.07]"
            >
              {tag.icon}
              <span>{tag.name}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
// MAIN EXPORT
// ============================================================
export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300"
      style={{ position: 'relative', overflow: 'hidden', padding: '7rem 0' }}
    >
      {/* Blobs */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl mix-blend-screen pointer-events-none animate-morph" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-3xl mix-blend-screen pointer-events-none animate-morph" style={{ animationDelay: '-4s' }} />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="container-main" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-blue-600 dark:text-blue-400"
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '12px',
              fontSize: '11px', fontWeight: 800,
              letterSpacing: '4px', textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <span style={{ width: '28px', height: '1px', background: 'currentColor', opacity: 0.4 }} />
            PORTFOLIO
            <span style={{ width: '28px', height: '1px', background: 'currentColor', opacity: 0.4 }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white"
          >
            Featured{' '}
            <span
              className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent text-6xl sm:text-7xl lg:text-8xl"
              style={{ fontFamily: 'YouthTouch', fontWeight: 'normal' }}
            >
              Projects
            </span>
          </motion.h2>
        </div>

        {/* ✅ DESKTOP — hanya tampil di lg ke atas */}
        <div className="hidden lg:flex flex-col gap-16 lg:gap-20 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <DesktopProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* ✅ MOBILE — hanya tampil di bawah lg */}
        <div
          className="flex lg:hidden flex-col"
          style={{ gap: '20px', maxWidth: '480px', margin: '0 auto' }}
        >
          {projects.map((project, i) => (
            <MobileProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}