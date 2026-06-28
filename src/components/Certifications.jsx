import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    logo: '/logo-bnsp.png',
    title: 'Web Developer Certification of Competence',
    org: 'BNSP (LSP Dian Nuswantoro)',
    date: 'Jan, 2025',
    color: '#2563eb',
    pdfUrl: '/licenses/bnsp-web-developer.pdf',
  },
  {
    logo: '/logo-bnsp.png',
    title: 'Junior Mobile Programmer Certification of Competence',
    org: 'BNSP (LSP Dian Nuswantoro)',
    date: 'Sep, 2025',
    color: '#6366f1',
    pdfUrl: '/licenses/bnsp-mobile-programmer.pdf',
  },
  {
    logo: '/logo-coursera.png',
    title: 'Generative AI: Introduction and Applications',
    org: 'IBM (via Coursera)',
    date: 'May, 2026',
    color: '#0891b2',
    pdfUrl: '/licenses/coursera-genai.pdf',
  },
  {
    logo: '/logo-coursera.png',
    title: 'Software Developer Career Guide and Interview Prep',
    org: 'IBM (via Coursera)',
    date: 'May, 2026',
    color: '#0891b2',
    pdfUrl: '/licenses/coursera-career-guide.pdf',
  },
  {
    logo: '/logo-pertamina.png',
    title: 'Software Engineer Internship Certificate',
    org: 'PT Pertamina Lubricants',
    date: 'Jan, 2026',
    color: '#16a34a',
    pdfUrl: '/certificates/pertamina-internship.pdf',
  },
];

export default function Certifications() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const prev = () => {
    if (index > 0) goTo(index - 1);
  };
  const next = () => {
    if (index < certifications.length - 1) goTo(index + 1);
  };

  const cert = certifications[index];

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section
      id="certifications"
      className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300"
      style={{ position: 'relative', overflow: 'hidden', padding: '7rem 0' }}
    >
      {/* Blob bg */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '-5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-main" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 dark:text-blue-400"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <span style={{ width: '28px', height: '1px', background: 'currentColor', opacity: 0.5 }} />
            CREDENTIALS
            <span style={{ width: '28px', height: '1px', background: 'currentColor', opacity: 0.5 }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white"
          >
            <span style={{ display: 'inline-block', marginRight: '10px' }}>Licenses</span>
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
              Certifications
            </span>
          </motion.h2>
        </div>

        {/* Main Card Area */}
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {/* Featured Card */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="dark:bg-neutral-900/50 dark:border-white/[0.07]"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent bar top */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)`,
                  }}
                />

                {/* Faint bg glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '200px',
                    height: '200px',
                    background: `radial-gradient(circle, ${cert.color}10 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Top row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                    }}
                  >
                    {/* Logo */}
                    <div
                      className="dark:bg-neutral-800 dark:border-white/10"
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '13px',
                        background: '#f8fafc',
                        border: '1px solid rgba(0,0,0,0.07)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={cert.logo}
                        alt={cert.org}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: `${cert.color}10`,
                        border: `1px solid ${cert.color}25`,
                      }}
                    >
                      <Award size={13} style={{ color: cert.color }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: cert.color, letterSpacing: '0.5px' }}>
                        Certified
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-neutral-900 dark:text-white"
                    style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.3, marginBottom: '10px' }}
                  >
                    {cert.title}
                  </h3>

                  {/* Org */}
                  <p style={{ fontSize: '13px', fontWeight: 600, color: cert.color, marginBottom: '20px' }}>
                    {cert.org}
                  </p>

                  {/* Divider */}
                  <div
                    className="dark:bg-white/[0.06]"
                    style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '16px' }}
                  />

                  {/* Footer row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: cert.color,
                        }}
                      />
                      <span
                        className="text-neutral-500 dark:text-neutral-400"
                        style={{ fontSize: '12px', fontWeight: 500 }}
                      >
                        Issued {cert.date}
                      </span>
                    </div>

                    {/* View Certificate — now a real link that opens the PDF in a new tab */}
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                      }}
                    >
                      <ExternalLink size={12} />
                      <span style={{ fontSize: '11px', fontWeight: 500 }}>View Certificate</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Counter + Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            {/* Counter */}
            <span className="text-neutral-400 dark:text-neutral-500" style={{ fontSize: '13px', fontWeight: 500 }}>
              <span className="text-neutral-900 dark:text-white" style={{ fontWeight: 700 }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              {' / '}
              {String(certifications.length).padStart(2, '0')}
            </span>

            {/* Progress bar */}
            <div
              style={{
                flex: 1,
                margin: '0 16px',
                height: '2px',
                background: 'rgba(0,0,0,0.07)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
              className="dark:bg-white/[0.07]"
            >
              <motion.div
                animate={{ width: `${((index + 1) / certifications.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #2563eb, #6366f1)',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={prev}
                disabled={index === 0}
                className="dark:border-white/[0.08] dark:text-neutral-300 dark:hover:bg-neutral-900/50"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: index === 0 ? 'not-allowed' : 'pointer',
                  opacity: index === 0 ? 0.35 : 1,
                  transition: 'all 0.2s',
                  color: '#64748b',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={index === certifications.length - 1}
                className="dark:border-white/[0.08] dark:text-neutral-300 dark:hover:bg-neutral-900/50"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: index === certifications.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: index === certifications.length - 1 ? 0.35 : 1,
                  transition: 'all 0.2s',
                  color: '#64748b',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Dot thumbnails */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {certifications.map((c, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                title={c.title}
                style={{
                  width: i === index ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  background: i === index ? c.color : 'rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  padding: 0,
                }}
                className={i !== index ? 'dark:bg-white/[0.12]' : ''}
              />
            ))}
          </div>

          {/* Mini list - semua cert */}
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {certifications.map((c, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                whileHover={{ x: 3 }}
                className="dark:border-white/[0.05]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '11px',
                  border: i === index ? `1px solid ${c.color}35` : '1px solid rgba(0,0,0,0.06)',
                  background: i === index ? `${c.color}06` : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                {/* Color dot */}
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: c.color,
                    flexShrink: 0,
                    opacity: i === index ? 1 : 0.35,
                  }}
                />

                {/* Logo */}
                <div
                  className="dark:bg-neutral-800"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img src={c.logo} alt={c.org} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className={i === index ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}
                    style={{
                      fontSize: '12px',
                      fontWeight: i === index ? 600 : 400,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      margin: 0,
                    }}
                  >
                    {c.title}
                  </p>
                </div>

                {/* Date */}
                <span className="text-neutral-400 dark:text-neutral-500" style={{ fontSize: '11px', fontWeight: 500, flexShrink: 0 }}>
                  {c.date}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}