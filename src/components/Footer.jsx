import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { HiHeart } from 'react-icons/hi'

const socials = [
  { label: 'GitHub', icon: <FaGithub />, href: 'https://github.com/faisnur26' },
  { label: 'LinkedIn', icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/fais-nur-amrulloh-20910a381' },
  { label: 'Instagram', icon: <FaInstagram />, href: 'https://www.instagram.com/faisnur_a?igsh=MWxsYmw5bTRpb252aQ%3D%3D&utm_source=qr' },
]

export default function Footer() {
  return (
    <footer className="py-10 border-t border-black/5 dark:border-white/5 relative z-10 transition-colors duration-300">
      <div className="container-main flex flex-col items-center gap-5">
        {/* Logo */}
        <a href="#home" className="font-heading text-xl font-bold tracking-tight mb-1">
          <span className="gradient-text">Fais</span>
          <span className="text-text-primary dark:text-white">.</span>
        </a>

        {/* Social Links */}
        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-[1.1rem] text-text-secondary dark:text-[#94a3b8] hover:text-accent dark:hover:text-blue-400 hover:border-accent/20 dark:hover:border-blue-400/20 hover:bg-accent/5 dark:hover:bg-blue-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Text */}
        <p className="text-[0.82rem] text-text-muted dark:text-[#64748b] text-center flex items-center gap-1.5">
          © {new Date().getFullYear()} Designed & Built with
          <HiHeart className="text-rose-500 text-sm" />
          by <span className="gradient-text font-semibold">Fais Nur Amrulloh</span>
        </p>
      </div>
    </footer>
  )
}
