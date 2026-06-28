import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'faisnuramrulloh@gmail.com',
    href: 'mailto:faisnuramrulloh@gmail.com',
  },
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: 'Tegal, Indonesia',
    href: 'https://maps.google.com/?q=Tegal,Jawa+Tengah,Indonesia',
  },
  {
    icon: <Phone size={18} />,
    label: 'WhatsApp',
    value: '+62 896-8623-9860',
    href: 'https://wa.me/6289686239860',
  },
];

const fieldStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  background: '#f8fafc',
  border: '1px solid rgba(0,0,0,0.08)',
  fontSize: '13px',
  color: '#0f172a',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const handleFocus = (e) => {
  e.target.style.borderColor = '#3b82f6';
  e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
  e.target.style.background = '#fff';
};

const handleBlur = (e) => {
  e.target.style.borderColor = 'rgba(0,0,0,0.08)';
  e.target.style.boxShadow = 'none';
  e.target.style.background = '#f8fafc';
};

function FormField({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: '#94a3b8',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  // status: 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to send message.');
      }

      setStatus('sent');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  return (
    <section
      id="contact"
      className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300"
      style={{ position: 'relative', overflow: 'hidden', padding: '7rem 0' }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '-5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

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
            CONTACT
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
            Let's Work{' '}
            <span
              className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent text-6xl sm:text-7xl lg:text-8xl"
              style={{ fontFamily: 'YouthTouch', fontWeight: 'normal' }}
            >
              Together
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 dark:text-neutral-400"
            style={{ marginTop: '12px', fontSize: '14px', maxWidth: '420px', margin: '12px auto 0' }}
          >
            Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '960px',
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          {/* LEFT — Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="dark:bg-neutral-900/50 dark:border-white/[0.06]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  borderRadius: '13px',
                  background: '#fafafa',
                  border: '1px solid rgba(0,0,0,0.07)',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.08)';
                  e.currentTarget.style.background = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = '#fafafa';
                }}
              >
                {/* Icon */}
                <div
                  className="text-blue-600 dark:text-blue-400"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '9px',
                    background: 'rgba(37,99,235,0.06)',
                    border: '1px solid rgba(37,99,235,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {info.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    className="text-neutral-400 dark:text-neutral-500"
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    {info.label}
                  </span>
                  <span
                    className="text-neutral-800 dark:text-neutral-200"
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {info.value}
                  </span>
                </div>

                {/* Arrow */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ flexShrink: 0, color: '#cbd5e1' }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}

            {/* Tip box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="dark:bg-blue-500/[0.04] dark:border-blue-500/20"
              style={{
                padding: '14px 16px',
                borderRadius: '13px',
                background: 'rgba(37,99,235,0.03)',
                border: '1px solid rgba(37,99,235,0.1)',
                borderLeft: '3px solid #3b82f6',
                marginTop: '2px',
              }}
            >
              <p className="text-neutral-600 dark:text-neutral-300" style={{ fontSize: '13px', lineHeight: 1.65, margin: 0 }}>
                💡 Prefer a quick chat? Reach me on{' '}
                <a
                  href="https://wa.me/6289686239860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400"
                  style={{ fontWeight: 600 }}
                >
                  WhatsApp
                </a>{' '}
                or send an{' '}
                <a href="mailto:faisnuramrulloh@gmail.com" className="text-blue-600 dark:text-blue-400" style={{ fontWeight: 600 }}>
                  Email
                </a>{' '}
                — I usually respond within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="dark:bg-neutral-900/50 dark:border-white/[0.07]"
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: '18px',
              padding: '26px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            }}
          >
            {/* Form header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Send size={14} color="white" />
              </div>
              <div>
                <h3 className="text-neutral-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                  Send a Message
                </h3>
                <p className="text-neutral-400 dark:text-neutral-500" style={{ fontSize: '12px', margin: 0 }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="dark:bg-white/[0.06]" style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '20px' }} />

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <FormField label="Name">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    disabled={isSending}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={fieldStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </FormField>
                <FormField label="Email">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    required
                    disabled={isSending}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={fieldStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </FormField>
              </div>

              {/* Subject */}
              <FormField label="Subject">
                <input
                  type="text"
                  placeholder="What's this about?"
                  required
                  disabled={isSending}
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  style={fieldStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </FormField>

              {/* Message */}
              <FormField label="Message">
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  required
                  disabled={isSending}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{ ...fieldStyle, resize: 'none' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </FormField>

              {/* Error message */}
              {status === 'error' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(239,68,68,0.06)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#dc2626',
                    fontSize: '12px',
                  }}
                >
                  <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSending}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '11px',
                  background: isSent
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #2563eb, #6366f1)',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: isSending ? 'not-allowed' : 'pointer',
                  opacity: isSending ? 0.75 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s',
                  boxShadow: isSent ? '0 4px 14px rgba(16,185,129,0.25)' : '0 4px 14px rgba(37,99,235,0.25)',
                  marginTop: '2px',
                }}
                onMouseEnter={(e) => {
                  if (!isSending) {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSending) {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isSending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Sending...
                  </>
                ) : isSent ? (
                  <>
                    <CheckCircle size={15} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}