import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaFigma, FaJava, FaPhp, FaBootstrap } from 'react-icons/fa'
import {
  SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss,
  SiKotlin, SiMysql, SiPostgresql,
  SiPrisma, SiPostman, SiNestjs, SiAndroidstudio,
  SiCodeigniter,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { DiCss3, DiHtml5 } from 'react-icons/di'

const allSkills = [
  { name: 'HTML', icon: <DiHtml5 className="text-[#e34f26]" /> },
  { name: 'CSS', icon: <DiCss3 className="text-[#1572b6]" /> },
  { name: 'PHP', icon: <FaPhp className="text-[#777bb4]" /> },
  { name: 'Java', icon: <FaJava className="text-[#f89820]" /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-[#f7df1e]" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-[#3178c6]" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06b6d4]" /> },
  { name: 'Kotlin', icon: <SiKotlin className="text-[#7f52ff]" /> },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-[#7952b3]" /> },
  { name: 'CodeIgniter', icon: <SiCodeigniter className="text-[#ef4223]" /> },
  { name: 'React', icon: <FaReact className="text-[#61dafb]" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
  { name: 'NestJS', icon: <SiNestjs className="text-[#e0234e]" /> },
  { name: 'MySQL', icon: <SiMysql className="text-[#4479a1]" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#336791]" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-[#68a063]" /> },
  { name: 'Prisma', icon: <SiPrisma className="text-[#2d3748] dark:text-white" /> },
  { name: 'VS Code', icon: <VscVscode className="text-[#007acc]" /> },
  { name: 'Android Studio', icon: <SiAndroidstudio className="text-[#3ddc84]" /> },
  { name: 'Postman', icon: <SiPostman className="text-[#ff6c37]" /> },
  { name: 'Figma', icon: <FaFigma className="text-[#f24e1e]" /> },
]

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const pillVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 25 }
    }
  }

  return (
    <section id="skills" className="pt-28 lg:pt-36 pb-20 lg:pb-28 relative bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-600/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-xs font-extrabold tracking-[4px] uppercase text-blue-600 dark:text-blue-400 mb-4"
          >
            <span className="w-8 h-[1px] bg-blue-600/40 dark:bg-blue-400/40" />
            <span>ABILITIES</span>
            <span className="w-8 h-[1px] bg-blue-600/40 dark:bg-blue-400/40" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white"
          >
            <span style={{ display: 'inline-block', marginRight: '10px' }}>Skills</span>
            <span
              className="text-6xl sm:text-7xl lg:text-8xl"
              style={{ fontFamily: 'YouthTouch', fontWeight: 'normal', display: 'inline-block' }}
            >
              &amp;{' '}
            </span>
            <span
              className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent text-6xl sm:text-7xl lg:text-8xl"
              style={{ fontFamily: 'YouthTouch', fontWeight: 'normal' }}
            >
              Expertise
            </span>
          </motion.h2>
        </div>

        {/* Skills Pills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
        >
          {allSkills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={pillVariants}
              className="flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-8 sm:min-w-[160px] h-11 sm:h-12 rounded-full bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.08] shadow-sm hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
            >
              <span className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[0.9rem] sm:text-[1rem] flex-shrink-0">
                {skill.icon}
              </span>
              <span className="text-[0.8rem] sm:text-[0.88rem] font-semibold text-neutral-700 dark:text-[#94a3b8] whitespace-nowrap leading-none truncate">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}