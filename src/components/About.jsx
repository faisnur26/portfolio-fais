import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="pt-24 pb-36 lg:pt-28 lg:pb-44 relative overflow-hidden bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent dark:via-blue-500/[0.04]" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

          {/* Header */}
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 text-xs font-extrabold tracking-[4px] uppercase text-blue-600 dark:text-blue-400 mb-4"
            >
              <span className="w-8 h-[1px] bg-blue-600/40 dark:bg-blue-400/40" />
              <span>ABOUT ME</span>
              <span className="w-8 h-[1px] bg-blue-600/40 dark:bg-blue-400/40" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white"
            >
              Fullstack{' '}
              <span
                className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent text-6xl sm:text-7xl lg:text-8xl"
                style={{ fontFamily: 'YouthTouch', fontWeight: 'normal' }}
              >
                Developer
              </span>
            </motion.h2>
          </div>

          {/* Paragraphs */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-4xl text-center text-lg text-text-secondary dark:text-[#94a3b8] leading-[2] mb-5"
          >
            I am Fais Nur Amrulloh, a Fullstack Developer and Informatics Engineering student at Dian Nuswantoro University. I have experience developing web applications, working on both frontend interfaces and backend systems to create complete and functional solutions.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-4xl text-center text-lg text-text-secondary dark:text-[#94a3b8] leading-[2]"
          >
            I enjoy turning ideas into practical applications and continuously improving my technical skills through academic and personal projects. My focus is on building applications that are reliable, user-friendly, and maintainable.
          </motion.p>

        </div>
      </div>
    </section>
  )
}