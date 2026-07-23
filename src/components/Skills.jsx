import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaReact, FaNodeJs, FaFigma, FaJava, FaPhp, FaBootstrap } from 'react-icons/fa'
import {
  SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss,
  SiKotlin, SiMysql, SiPostgresql,
  SiPrisma, SiPostman, SiNestjs, SiAndroidstudio,
  SiCodeigniter,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { DiCss3, DiHtml5 } from 'react-icons/di'

const nodes = [
  { name: 'Figma', x: 100, y: 280, icon: <FaFigma className="text-[#f24e1e]" />, category: 'Design', level: 'Advanced', desc: 'User experience wireframing, high-fidelity layouts, design components, and developer handoffs.' },
  { name: 'HTML', x: 220, y: 140, icon: <DiHtml5 className="text-[#e34f26]" />, category: 'Frontend', level: 'Expert', desc: 'Semantic markup, HTML5 accessibility, SEO optimization, and structured DOM layouts.' },
  { name: 'CSS', x: 220, y: 280, icon: <DiCss3 className="text-[#1572b6]" />, category: 'Frontend', level: 'Expert', desc: 'Modern layouts (Flexbox, CSS Grid), responsive design, animations, and custom theme systems.' },
  { name: 'Bootstrap', x: 340, y: 210, icon: <FaBootstrap className="text-[#7952b3]" />, category: 'Styling', level: 'Advanced', desc: 'Rapid prototype rendering, customized Sass theme variables, and grid components.' },
  { name: 'Tailwind CSS', x: 340, y: 320, icon: <SiTailwindcss className="text-[#06b6d4]" />, category: 'Styling', level: 'Expert', desc: 'Utility-first CSS styling, customization configurations, responsive design, and design systems.' },
  { name: 'JavaScript', x: 460, y: 190, icon: <SiJavascript className="text-[#f7df1e]" />, category: 'Frontend/Backend', level: 'Expert', desc: 'Modern ES6+ syntax, asynchronous operations, event loops, and DOM interaction.' },
  { name: 'TypeScript', x: 460, y: 90, icon: <SiTypescript className="text-[#3178c6]" />, category: 'Frontend/Backend', level: 'Advanced', desc: 'Static type checking, interfaces, decorators, compiler configurations, and safe code practices.' },
  { name: 'React', x: 580, y: 140, icon: <FaReact className="text-[#61dafb]" />, category: 'Frontend Library', level: 'Expert', desc: 'Component life cycles, custom hooks, context state management, and virtual DOM performance.' },
  { name: 'Next.js', x: 700, y: 100, icon: <SiNextdotjs className="text-black dark:text-white" />, category: 'Fullstack Framework', level: 'Advanced', desc: 'Server-side rendering, static site generation, React server components, and route optimization.' },
  { name: 'Node.js', x: 580, y: 350, icon: <FaNodeJs className="text-[#68a063]" />, category: 'Backend Runtime', level: 'Advanced', desc: 'Asynchronous event-driven backend runtimes, custom package scripting, and REST APIs.' },
  { name: 'NestJS', x: 700, y: 210, icon: <SiNestjs className="text-[#e0234e]" />, category: 'Backend Framework', level: 'Intermediate', desc: 'Modular Node.js architecture, dependency injection patterns, typescript configurations, and APIs.' },
  { name: 'Prisma', x: 580, y: 455, icon: <SiPrisma className="text-[#2d3748] dark:text-white" />, category: 'Database ORM', level: 'Advanced', desc: 'Type-safe database interaction, relational mappings, active migrations, and automated schema generation.' },
  { name: 'MySQL', x: 700, y: 320, icon: <SiMysql className="text-[#4479a1]" />, category: 'Database', level: 'Advanced', desc: 'Relational query execution, schema relationships, indices, and data storage integrity.' },
  { name: 'PostgreSQL', x: 700, y: 430, icon: <SiPostgresql className="text-[#336791]" />, category: 'Database', level: 'Advanced', desc: 'Advanced object-relational database structures, joins, database functions, and JSONB document support.' },
  { name: 'PHP', x: 220, y: 420, icon: <FaPhp className="text-[#777bb4]" />, category: 'Backend', level: 'Advanced', desc: 'Server-side execution, REST APIs, session management, and MVC structure development.' },
  { name: 'CodeIgniter', x: 340, y: 430, icon: <SiCodeigniter className="text-[#ef4223]" />, category: 'Backend Framework', level: 'Advanced', desc: 'Lightweight PHP MVC architecture, database migrations, and active records query builders.' },
  { name: 'Java', x: 340, y: 100, icon: <FaJava className="text-[#f89820]" />, category: 'Backend', level: 'Intermediate', desc: 'Object-oriented application building, core algorithms, and enterprise logic systems.' },
  { name: 'Kotlin', x: 460, y: 290, icon: <SiKotlin className="text-[#7f52ff]" />, category: 'Mobile', level: 'Intermediate', desc: 'Modern Android applications, null-safety architectures, coroutines, and jetpack compose.' },
  { name: 'Android Studio', x: 580, y: 245, icon: <SiAndroidstudio className="text-[#3ddc84]" />, category: 'Tools/Mobile', level: 'Intermediate', desc: 'Android SDK environment configurations, emulator management, gradle builds, and layouts.' },
  { name: 'VS Code', x: 460, y: 390, icon: <VscVscode className="text-[#007acc]" />, category: 'Tools', level: 'Expert', desc: 'Workspace configurations, advanced debugging utilities, snippets, and Git terminal command systems.' },
  { name: 'Postman', x: 460, y: 490, icon: <SiPostman className="text-[#ff6c37]" />, category: 'Tools', level: 'Advanced', desc: 'API endpoint querying, automatic testing suites, environments variables, and mock requests.' },
];

const connections = [
  { from: 'Figma', to: 'HTML' },
  { from: 'HTML', to: 'CSS' },
  { from: 'HTML', to: 'JavaScript' },
  { from: 'CSS', to: 'Bootstrap' },
  { from: 'CSS', to: 'Tailwind CSS' },
  { from: 'JavaScript', to: 'TypeScript' },
  { from: 'JavaScript', to: 'React' },
  { from: 'JavaScript', to: 'Node.js' },
  { from: 'TypeScript', to: 'NestJS' },
  { from: 'React', to: 'Next.js' },
  { from: 'React', to: 'Tailwind CSS' },
  { from: 'Node.js', to: 'NestJS' },
  { from: 'Node.js', to: 'Prisma' },
  { from: 'Prisma', to: 'MySQL' },
  { from: 'Prisma', to: 'PostgreSQL' },
  { from: 'PHP', to: 'CodeIgniter' },
  { from: 'Java', to: 'Kotlin' },
  { from: 'Kotlin', to: 'Android Studio' },
  { from: 'Android Studio', to: 'React' },
  { from: 'VS Code', to: 'JavaScript' },
  { from: 'VS Code', to: 'Postman' },
  { from: 'Postman', to: 'Node.js' },
];

export default function Skills() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState('React');

  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Center scroll on load for mobile devices (with brief delay to ensure DOM dimensions are computed)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const clientWidth = scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Drag to scroll handlers for desktop mouse interaction
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const activeNodeName = hoveredNode || selectedNode;
  const activeSkill = nodes.find(n => n.name === activeNodeName) || nodes[0];

  // Helper to check if a connection is highlighted
  const isLineHighlighted = (conn) => {
    if (!hoveredNode) return false;
    return conn.from === hoveredNode || conn.to === hoveredNode;
  };

  // Helper to check if a node is a neighbor of the hovered node
  const isNodeNeighbor = (nodeName) => {
    if (!hoveredNode) return false;
    if (nodeName === hoveredNode) return true;
    return connections.some(
      (c) =>
        (c.from === hoveredNode && c.to === nodeName) ||
        (c.to === hoveredNode && c.from === nodeName)
    );
  };

  // Generate cubic Bezier S-curve path between nodes
  const getBezierPath = (conn) => {
    const fromNode = nodes.find(n => n.name === conn.from);
    const toNode = nodes.find(n => n.name === conn.to);
    if (!fromNode || !toNode) return '';
    const dx = Math.abs(toNode.x - fromNode.x) * 0.5;
    return `M ${fromNode.x} ${fromNode.y} C ${fromNode.x + dx} ${fromNode.y}, ${toNode.x - dx} ${toNode.y}, ${toNode.x} ${toNode.y}`;
  };

  return (
    <section id="skills" className="py-16 lg:py-20 relative bg-white dark:bg-[#0a0a0f] transition-colors duration-300 overflow-hidden">
      {/* Background cyber gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-600/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10 flex flex-col items-center">
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
          <p className="text-sm text-center text-text-secondary dark:text-text-muted mt-6 max-w-md mx-auto">
            Interactive skill network tree. Hover or click on nodes to explore connected pathways and competencies.
          </p>
        </div>

        {/* Network Canvas Section */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="max-w-[800px] mx-auto w-full overflow-x-auto no-scrollbar py-6 cursor-grab active:cursor-grabbing border border-black/5 dark:border-white/[0.05] rounded-3xl bg-neutral-50/50 dark:bg-black/30 backdrop-blur-sm relative"
        >
          {/* Subtle Cyber Dot Grid Layer */}
          <div className="absolute inset-0 cyber-grid pointer-events-none rounded-3xl" />

          {/* Scrolling Canvas */}
          <div className="relative w-[800px] h-[610px] mx-auto select-none overflow-hidden">
            {/* SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Inactive connection lines rendered first (z-index lower) */}
              {connections.map((conn, idx) => {
                if (isLineHighlighted(conn)) return null;
                const pathD = getBezierPath(conn);
                return (
                  <path
                    key={`line-inactive-${idx}`}
                    d={pathD}
                    fill="none"
                    stroke="currentColor"
                    className="text-neutral-200 dark:text-neutral-800/70"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Glowing Active/Hovered Connection Lines rendered on top */}
              {connections.map((conn, idx) => {
                if (!isLineHighlighted(conn)) return null;
                const pathD = getBezierPath(conn);
                return (
                  <g key={`line-active-${idx}`}>
                    {/* Glowing background blur line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="rgba(6, 182, 212, 0.4)"
                      strokeWidth={4.5}
                      filter="url(#neon-glow)"
                      strokeLinecap="round"
                    />
                    {/* Pulsing front running line */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="url(#glow-grad)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeDasharray="6, 6"
                      animate={{ strokeDashoffset: [-24, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Circular Nodes Layer */}
            {nodes.map((node) => {
              const isSelected = selectedNode === node.name;
              const isHovered = hoveredNode === node.name;
              const isActive = isHovered || isSelected;
              const isNeighbor = isNodeNeighbor(node.name);

              return (
                <motion.div
                  key={node.name}
                  className="absolute"
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isActive ? 30 : isNeighbor ? 20 : 10,
                  }}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => setSelectedNode(node.name)}
                  onMouseEnter={() => setHoveredNode(node.name)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Node Circle Outer Glow when hovered or active */}
                  {isActive && (
                    <motion.div
                      layoutId="glow-ring"
                      className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-[8px] opacity-60"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}

                  {/* Core Node Circle Container */}
                  <div
                    className={`w-13 h-13 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 relative ${isActive
                      ? 'bg-neutral-900 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.45)] dark:bg-black'
                      : isNeighbor
                        ? 'bg-white border-2 border-blue-500/40 dark:bg-neutral-950 dark:border-blue-400/30'
                        : 'bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/[0.08] shadow-sm hover:border-blue-500/30'
                      }`}
                  >
                    <span className="text-xl flex items-center justify-center">{node.icon}</span>
                  </div>

                  {/* Skill Text Label */}
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-2 pointer-events-none">
                    <span
                      className={`text-[9.5px] font-bold tracking-wide uppercase px-2 py-0.5 rounded border shadow-sm transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/20'
                        : 'bg-white/80 dark:bg-[#0a0a0f]/80 text-neutral-600 dark:text-[#94a3b8] border-black/5 dark:border-white/[0.05]'
                        }`}
                    >
                      {node.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Skill Details Panel (Responsive Bento Card) */}
        <div className="max-w-[800px] mx-auto mt-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass p-6 sm:p-8 rounded-[24px] border border-black/5 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col sm:flex-row items-center sm:items-start gap-6 text-left relative overflow-hidden"
            >
              {/* Decorative radial background grid path */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/[0.05] to-transparent rounded-bl-full pointer-events-none" />

              {/* Large Icon Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] bg-neutral-100 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.05] flex items-center justify-center text-4xl sm:text-5xl flex-shrink-0 shadow-inner">
                {activeSkill.icon}
              </div>

              {/* Content Panel */}
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
                {/* Title and Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h3 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white leading-none">
                    {activeSkill.name}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    {/* Category Badge */}
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-blue-50/80 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-500/10">
                      {activeSkill.category}
                    </span>
                    {/* Level Badge */}
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50/80 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-500/10">
                      {activeSkill.level}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[0.92rem] text-text-secondary dark:text-[#94a3b8] leading-relaxed">
                  {activeSkill.desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}