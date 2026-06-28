import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    role: 'Software Engineer Intern',
    company: 'PT Pertamina Lubricants',
    duration: '2025 - 2026',
    location: 'Jakarta, Indonesia',
    logo: '/logo-pertamina-lubricants.png',
    description: [
      'Developed and maintained enterprise web applications to support asset management and operational workflows.',
      'Contributed to the development of the General Loan System for hardware allocation, tracking, and return management.',
      'Collaborated with cross-functional teams to analyze requirements, implement features, and improve user experience.',
      'Participated in system testing, debugging, and performance optimization.',
    ],
  },
  {
    role: 'Member of Reasoning Division',
    company: 'HMDTI (Himpunan Mahasiswa D3 Teknik Informatika)',
    duration: '2024 - 2025',
    location: 'Semarang, Indonesia',
    logo: '/logo-hmdti.png',
    description: [
      'Organized workshops, discussions, and knowledge-sharing sessions related to technology and innovation.',
      'Assisted in planning and executing organizational events and competitions.',
    ],
  },
  {
    role: 'Administrative Intern',
    company: 'Politeknik Harapan Bersama',
    duration: '2021 - 2022',
    location: 'Tegal, Indonesia',
    logo: '/logo-phb.png',
    description: [
      'Managed administrative records and institutional documentation.',
      'Assisted in organizing operational and academic documents to ensure data accuracy and accessibility.',
      'Coordinated with multiple departments to support daily institutional activities.',
      'Maintained document filing systems and provided administrative support for campus operations.',
    ],
  },
];

function SpotlightCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group dark:bg-neutral-900/40 dark:border-white/[0.07] hover:border-blue-400/40"
      style={{
        position: 'relative',
        borderRadius: '16px',
        background: 'white',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        width: '100%',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(37,99,235,0.06), transparent 45%)',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '20px 22px' }}>
        {children}
      </div>
    </div>
  );
}

function CardContent({ exp }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
        <div
          className="dark:bg-neutral-800 dark:border-white/10"
          style={{
            width: '44px', height: '44px',
            borderRadius: '10px',
            background: '#f8fafc',
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden', padding: '6px',
          }}
        >
          <img src={exp.logo} alt={exp.company}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="text-neutral-900 dark:text-white"
            style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.3, margin: '0 0 3px' }}>
            {exp.role}
          </h3>
          <p className="text-blue-600 dark:text-blue-400"
            style={{ fontSize: '12px', fontWeight: 600, margin: '0 0 5px' }}>
            {exp.company}
          </p>
          <div className="text-neutral-500 dark:text-neutral-400"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 12px', fontSize: '11px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Calendar size={11} />{exp.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <MapPin size={11} />{exp.location}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="dark:bg-white/[0.06]"
        style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0 0 12px' }} />

      {/* Bullet list */}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {exp.description.map((desc, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}
          >
            <span style={{
              width: '5px', height: '5px',
              borderRadius: '50%',
              background: '#3b82f6',
              flexShrink: 0, marginTop: '6px', display: 'block',
            }} />
            <span className="text-neutral-600 dark:text-neutral-400"
              style={{ fontSize: '12.5px', lineHeight: 1.65 }}>
              {desc}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// ✅ Animated dot dengan efek scroll
function TimelineDot({ index }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
      style={{ position: 'relative', zIndex: 10, flexShrink: 0 }}
    >
      {/* Outer ring animasi */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-6px',
          borderRadius: '50%',
          border: '1.5px solid #3b82f6',
          pointerEvents: 'none',
        }}
      />
      {/* Dot utama */}
      <div
        className="dark:bg-[#0a0a0f]"
        style={{
          width: '26px', height: '26px',
          borderRadius: '50%',
          background: 'white',
          border: '2.5px solid #3b82f6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 4px rgba(59,130,246,0.12)',
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
          style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
          }}
        />
      </div>
    </motion.div>
  );
}

// ✅ Animated progress line saat scroll
function TimelineLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} style={{
      position: 'absolute',
      top: 0, bottom: 0,
      width: '2px',
      background: 'rgba(59,130,246,0.1)',
    }}>
      <motion.div
        style={{
          scaleY,
          transformOrigin: 'top',
          width: '100%', height: '100%',
          background: 'linear-gradient(to bottom, #2563eb, #6366f1, #06b6d4)',
        }}
      />
    </div>
  );
}

function ExperienceItem({ exp, index }) {
  const isLeft = index % 2 === 0;

  return (
    <>
      {/* ✅ DESKTOP: zigzag 3 kolom */}
      <div className="hidden md:grid" style={{
        gridTemplateColumns: '1fr 56px 1fr',
        alignItems: 'start',
        marginBottom: '2rem',
      }}>
        {/* Kiri */}
        <div style={{ paddingRight: '28px' }}>
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, type: 'spring', damping: 22 }}
              style={{ width: '100%' }}
            >
              <SpotlightCard><CardContent exp={exp} /></SpotlightCard>
            </motion.div>
          )}
        </div>

        {/* Tengah dot */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '18px' }}>
          <TimelineDot index={index} />
        </div>

        {/* Kanan */}
        <div style={{ paddingLeft: '28px' }}>
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, type: 'spring', damping: 22 }}
              style={{ width: '100%' }}
            >
              <SpotlightCard><CardContent exp={exp} /></SpotlightCard>
            </motion.div>
          )}
        </div>
      </div>

      {/* ✅ MOBILE: vertikal, dot di kiri */}
      <div className="flex md:hidden" style={{
        gap: '0',
        marginBottom: '1.5rem',
        alignItems: 'flex-start',
      }}>
        {/* Dot kolom kiri */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: '40px',
          paddingTop: '16px',
        }}>
          <TimelineDot index={index} />
        </div>

        {/* Card */}
        <div style={{ flex: 1, paddingLeft: '12px' }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, type: 'spring', damping: 22 }}
            style={{ width: '100%' }}
          >
            <SpotlightCard><CardContent exp={exp} /></SpotlightCard>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function Experience() {
  const timelineRef = useRef(null);

  return (
    <section
      id="experience"
      className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300"
      style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0' }}
    >
      {/* Blobs */}
      <div style={{
        position: 'absolute', top: '30%', right: '10%',
        width: '300px', height: '300px',
        background: 'rgba(59,130,246,0.04)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '30%', left: '10%',
        width: '300px', height: '300px',
        background: 'rgba(139,92,246,0.04)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="container-main" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            <span style={{ width: '28px', height: '1px', background: 'currentColor', opacity: 0.5 }} />
            JOURNEY
            <span style={{ width: '28px', height: '1px', background: 'currentColor', opacity: 0.5 }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-neutral-900 dark:text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15 }}
          >
            Work{' '}
            <span
              className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'YouthTouch', fontWeight: 'normal', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Experience
            </span>
          </motion.h2>
        </div>

        {/* Timeline wrapper */}
        <div ref={timelineRef} style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>

          {/* Garis desktop — tengah */}
          <div className="hidden md:block" style={{
            position: 'absolute',
            left: 'calc(50%)',
            top: 0, bottom: 0,
            width: '2px',
            transform: 'translateX(-50%)',
            zIndex: 0,
          }}>
            <TimelineLine />
          </div>

          {/* Garis mobile — kiri (20px = setengah lebar kolom dot 40px) */}
          <div className="flex md:hidden" style={{
            position: 'absolute',
            left: '20px',
            top: 0, bottom: 0,
            width: '2px',
            transform: 'translateX(-50%)',
            zIndex: 0,
          }}>
            <TimelineLine />
          </div>

          <div>
            {experiences.map((exp, index) => (
              <ExperienceItem key={exp.role} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}