import { useState, useEffect, useRef } from 'react'
import { HiMenuAlt3, HiX, HiArrowRight } from 'react-icons/hi'
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'

export default function Navbar({ darkMode, toggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  const linkRefs = useRef({})
  const navRowRef = useRef(null)

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    for (const s of sections) observer.observe(s)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const moveIndicator = () => {
      const activeEl = linkRefs.current[activeSection]
      const container = navRowRef.current
      if (!activeEl || !container) return
      const elRect = activeEl.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setIndicator({ left: elRect.left - containerRect.left, width: elRect.width, opacity: 1 })
    }
    moveIndicator()
    window.addEventListener('resize', moveIndicator)
    return () => window.removeEventListener('resize', moveIndicator)
  }, [activeSection])

  const handleLinkClick = () => setMenuOpen(false)
  const setLinkRef = (id) => (el) => { linkRefs.current[id] = el }

  const navBgClass = scrolled
    ? 'bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl py-3 shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
    : 'py-5 bg-transparent'

  return (
    <>
      <nav className={'fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ' + navBgClass}>
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent transition-opacity duration-500"
          style={{ opacity: scrolled ? 1 : 0 }}
        />

        <div className="container-main flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight select-none group">
            <div className="w-7 h-7 text-neutral-900 dark:text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M 14,30 L 50,9 L 50,21 L 26,35 L 26,49 L 44,38.5 L 44,50.5 L 26,61 L 26,71 L 14,64 Z" />
                <path d="M 56,12 L 86,29.5 L 86,63 L 50,84 L 38,77 L 38,65 L 50,72 L 74,58 L 74,46 L 50,60 L 50,48 L 74,34 L 74,22.5 L 56,12 Z" />
              </svg>
            </div>
            <span className="gradient-text font-bold">Fais</span>
            <span className="text-neutral-900 dark:text-white -ml-2.5">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            <div ref={navRowRef} className="relative flex items-center gap-7">
              {links.map((item) => {
                const id = item.href.slice(1)
                const isActive = activeSection === id
                const linkColorClass = isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-neutral-500 dark:text-[#94a3b8] hover:text-blue-600 dark:hover:text-blue-400'
                return (
                  <a
                    key={item.name}
                    ref={setLinkRef(id)}
                    href={item.href}
                    className={'text-[0.88rem] font-medium transition-colors duration-300 relative py-1 ' + linkColorClass}
                  >
                    {item.name}
                  </a>
                )
              })}
              <span
                className="absolute -bottom-1 h-[2.5px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(37,99,235,0.6)] transition-all duration-300 ease-out"
                style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
              />
            </div>

            <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800" />

            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 cursor-pointer hover:rotate-12"
              aria-label="Toggle theme"
            >
              {darkMode
                ? <BsSunFill className="text-amber-500 w-4 h-4 animate-pulse" />
                : <BsMoonStarsFill className="text-[#475569] w-4 h-4" />
              }
            </button>
            <a

              href="#contact"
              onClick={handleLinkClick}
              className="inline-flex h-5 min-w-[90px] items-center justify-center gap-1.5 px-6 rounded-full gradient-bg text-sm font-semibold !text-white hover:!text-white dark:!text-white shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 hover:gap-2.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.35)] transition-all duration-300 group"
            >
              Hire Me
              <HiArrowRight className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {darkMode
                ? <BsSunFill className="text-amber-500 w-4 h-4" />
                : <BsMoonStarsFill className="text-neutral-600 w-4 h-4" />
              }
            </button>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white text-xl transition-colors duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>

        </div >
      </nav >

      {/* Backdrop */}
      {
        menuOpen && (
          <div
            className="fixed inset-0 z-[9997] bg-black/20 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )
      }

      {/* Side panel */}
      {
        menuOpen && (
          <div className="fixed top-0 right-0 h-full w-[280px] z-[9998] bg-white dark:bg-[#0a0a0f] border-l border-black/[0.06] dark:border-white/[0.06] shadow-2xl flex flex-col justify-center items-center gap-6 md:hidden">


            <div className="absolute top-5 left-5 font-heading text-lg font-bold gradient-text">Fais.</div>

            <div className="flex flex-col items-center gap-5 w-full px-8">
              {links.map((item) => {
                const id = item.href.slice(1)
                const isActive = activeSection === id
                const linkColorClass = isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400'
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={'flex items-center gap-2 text-[0.95rem] font-semibold tracking-wide transition-colors duration-300 ' + linkColorClass}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
                    )
                    }
                    {item.name}
                  </a>
                )
              })}
            </div>
            <a

              href="#contact"
              onClick={handleLinkClick}
              className="inline-flex h-9 min-w-[120px] items-center justify-center gap-1.5 px-6 rounded-full gradient-bg text-sm font-semibold !text-white hover:!text-white dark:!text-white shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 hover:gap-2.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.35)] transition-all duration-300 group"
            >
              Hire Me
            </a >
          </div >
        )
      }
    </>
  )
}