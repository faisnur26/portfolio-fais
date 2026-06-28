import { useState, useEffect, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Certifications from './components/Certifications.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Particles from './components/Particles.jsx'
import CustomCursor from './components/CustomCursor.jsx'


function App() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  useEffect(() => {
    if (loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [loading])

  const toggleDark = () => setDarkMode(!darkMode)
  const handleLoadingFinish = useCallback(() => setLoading(false), [])

  if (loading) {
    return <LoadingScreen onFinish={handleLoadingFinish} />
  }

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#0a0a0f] transition-colors duration-300 overflow-x-hidden">
      <CustomCursor />
      <Particles darkMode={darkMode} />
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />
      <main className="relative z-[1] w-full">
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
