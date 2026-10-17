import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// ==================== ANIMATED PARTICLES BACKGROUND ====================
function ParticlesBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 80, 80, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[40%] right-[20%] w-[50%] h-[50%] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)' }}
      />

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// ==================== SCROLL PROGRESS ====================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

// ==================== NAVIGATION ====================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Abdelhalim
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, color: '#06b6d4' }}
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-300 hover:text-cyan-400"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// ==================== HERO ====================
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <motion.section
      ref={ref}
      id="home"
      style={{ y, opacity, scale }}
      className="min-h-screen flex items-center justify-center relative px-4"
    >
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
          />
          <span className="text-cyan-400 text-sm font-medium">Available for opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Abdelhalim<br />
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_200%]"
          >
            OUAMMOU
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Industrial & Logistics Engineer — Industry 4.0 & MES
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          ENSA Marrakech graduate specializing in the digitalization of production processes: real-time monitoring, MES and ERP integration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Get in Touch</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            href="#experience"
            className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
          >
            View Experience
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
        >
          <a href="mailto:abdelhalimouammou@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            abdelhalimouammou@gmail.com
          </a>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +212 641 595 275
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Casablanca, Morocco
          </span>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.section>
  );
}

// ==================== ABOUT ====================
function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-2xl"
                  >
                    🎓
                  </motion.span>
                  Education
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Graduate in <span className="text-cyan-400 font-semibold">Industrial Engineering and Logistics</span> from ENSA Marrakech, specializing in the digitalization of production processes.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-2xl"
                  >
                    🏭
                  </motion.span>
                  Expertise
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Experience leading digital transformation projects, tracking performance indicators (OEE) and providing application support. Proficient in <span className="text-cyan-400 font-semibold">Industry 4.0 tools</span> (OPC UA, MQTT, Node-RED, Grafana) and <span className="text-cyan-400 font-semibold">Lean Six Sigma</span> methods.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-2xl"
                  >
                    🤝
                  </motion.span>
                  Collaboration
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Working closely with production, maintenance, quality and IT teams to bridge the gap between industrial operations and digital solutions.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '10+', label: 'Certifications', gradient: 'from-cyan-500/10 to-blue-500/10', border: 'border-cyan-500/20' },
                { value: '3', label: 'Languages', gradient: 'from-blue-500/10 to-purple-500/10', border: 'border-blue-500/20' },
                { value: '4.0', label: 'Industry Focus', gradient: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/20' },
                { value: 'MES', label: 'Expertise', gradient: 'from-green-500/10 to-cyan-500/10', border: 'border-green-500/20' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-sm border ${stat.border} rounded-2xl p-6 text-center`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.1, type: 'spring' }}
                    className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== SKILLS ====================
function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      title: 'Industry 4.0 & Industrial Systems',
      icon: '🏭',
      skills: ['MES', 'PLC', 'OPC UA', 'MQTT', 'Node-RED', 'Real-time monitoring'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Data & Reporting',
      icon: '📊',
      skills: ['SQL', 'InfluxDB', 'Grafana', 'Power BI', 'Excel'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Development & Automation',
      icon: '💻',
      skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Express', 'HTML/CSS', 'API', 'n8n', 'Git/GitHub'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'ERP',
      icon: '⚙️',
      skills: ['Odoo', 'SAGE 100', 'SAP Business One'],
      color: 'from-pink-500 to-red-500'
    },
    {
      title: 'Industrial Performance',
      icon: '📈',
      skills: ['Lean Six Sigma', 'DMAIC', 'PDCA', '5S', 'VSM', 'FMEA', 'KPIs', 'OEE'],
      color: 'from-green-500 to-cyan-500'
    },
    {
      title: 'Project Management',
      icon: '📋',
      skills: ['Planning', 'PERT', 'CPM', 'Agile methods', 'Cost control'],
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="skills" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            Technical <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-20 flex items-center justify-center text-2xl`}
                    style={{ background: `linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))` }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-white font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== EXPERIENCE ====================
function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      title: 'Project Manager',
      company: 'BETAP',
      location: 'Casablanca, Morocco',
      period: '02/2025 – 06/2025',
      highlights: [
        'Led digital transformation projects in an industrial environment: implemented real-time tracking of OEE and production rates to identify bottlenecks (Grafana, InfluxDB, OPC UA, MQTT).',
        'Deployed and supported an MES (traceability, production management): analyzed and resolved incidents, developed and deployed fixes and enhancements, performed technical and functional impact analyses.',
        'Ensured data consistency between the MES, the ERP and third-party systems (API); coordinated with maintenance, quality, production and IT teams.',
        'Designed a centralized web application connected to the ERP via API: multi-department data entry (quality, production, maintenance), Grafana monitoring and an AI chatbot for decision support.'
      ],
      tags: ['MES', 'Grafana', 'InfluxDB', 'OPC UA', 'MQTT', 'ERP', 'API', 'AI']
    },
    {
      title: 'R&D Engineer — Final-Year Project: Design and Implementation of IoT Applications for Industry 4.0',
      company: 'Cité de l\'Innovation de Marrakech',
      location: 'Marrakech, Morocco',
      period: '02/2023 – 07/2023',
      highlights: [
        'Optimized the management of critical resources (water) by implementing a real-time monitoring and control system.',
        'Improved flow accuracy and parts-sorting quality through automation and interconnection (PLC, OPC UA), reducing inventory errors.'
      ],
      tags: ['IoT', 'PLC', 'OPC UA', 'Real-time', 'R&D']
    },
    {
      title: 'End-of-Semester Internship: Productivity Improvement',
      company: 'MENARA PREFA',
      location: 'Marrakech, Morocco',
      period: '11/2021 – 01/2022',
      highlights: [
        'Conducted a targeted machine FMEA study on the press to identify the critical causes of downtime.',
        'Developed and implemented a preventive maintenance plan to reduce downtime, improve reliability and optimize overall plant performance.'
      ],
      tags: ['FMEA', 'Maintenance', 'Productivity', 'Lean']
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />

          <div className="relative">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute left-0 md:left-8 top-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500"
            />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative pl-8 md:pl-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
                    className="absolute left-0 md:left-8 top-2 w-4 h-4 -translate-x-[7px] rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50"
                  />

                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                        <p className="text-cyan-400 font-semibold text-lg">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-400 font-medium">{exp.period}</span>
                        <p className="text-xs text-gray-500">{exp.location}</p>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-5">
                      {exp.highlights.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.7 + index * 0.2 + i * 0.1 }}
                          className="text-gray-300 flex gap-3"
                        >
                          <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                          <span className="leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.9 + index * 0.2 + i * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== EDUCATION ====================
function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const certifications = [
    {
      category: 'Industry 4.0 and AI',
      items: [
        'Industrial Internet of Things (IIoT) — 02/2024',
        'Digital Technologies Case Studies: AI, IoT, Robotics, Blockchain — 09/2024',
        'Generative AI Overview for Project Managers — 07/2025'
      ]
    },
    {
      category: 'Supply Chain and Project Management',
      items: [
        'Supply Chain Foundations: Analytics — 05/2024',
        'Project Management Foundations — 09/2024',
        'Digital Transformation in Supply Chains — 10/2024',
        'Master Digital Transformation — 10/2024',
        'Supply Chain Foundations: Project Management — 11/2025'
      ]
    },
    {
      category: 'Data and Development',
      items: [
        'Power BI Mastery: Zero to Hero Data Skills — 04/2026',
        'IBM Software Development, Coursera (08/2026 – 10/2026): Node.js and Express, React, HTML/CSS/JavaScript, Git and GitHub, Cloud Computing, Software Engineering, Agile',
      ]
    }
  ];

  return (
    <section id="education" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            Education & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Engineering Degree (Master's level)</h3>
                <p className="text-cyan-400 font-semibold text-lg mb-1">Industrial Engineering and Logistics</p>
                <p className="text-gray-300">National School of Applied Sciences (ENSA) — Marrakech, Morocco</p>
                <p className="text-gray-400 text-sm mt-2">09/2017 – 07/2023</p>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-2xl"
                  >
                    🎓
                  </motion.div>
                  <h4 className="text-white font-semibold">{cert.category}</h4>
                </div>
                <ul className="space-y-3">
                  {cert.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 + i * 0.05 }}
                      className="text-gray-300 text-sm flex gap-2 leading-relaxed"
                    >
                      <span className="text-cyan-400 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-3xl"
              >
                🌍
              </motion.span>
              Languages
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { code: 'EN', name: 'English', level: 'Fluent', width: '90%', gradient: 'from-cyan-500 to-blue-500' },
                { code: 'FR', name: 'French', level: 'Fluent', width: '90%', gradient: 'from-blue-500 to-purple-500' },
                { code: 'AR', name: 'Arabic', level: 'Native', width: '100%', gradient: 'from-purple-500 to-pink-500' },
              ].map((lang, i) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br border flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))`,
                        border: '1px solid rgba(6, 182, 212, 0.3)'
                      }}
                    >
                      <span className="text-cyan-400 font-bold">{lang.code}</span>
                    </motion.div>
                    <div>
                      <div className="text-white font-semibold">{lang.name}</div>
                      <div className="text-gray-400 text-sm">{lang.level}</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: lang.width } : {}}
                      transition={{ duration: 1, delay: 1.2 + i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${lang.gradient} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== CONTACT ====================
function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            Get in <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto text-lg">
            I'm always open to discussing new opportunities, projects, or collaborations. Feel free to reach out!
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              {
                type: 'Email',
                value: 'abdelhalimouammou@gmail.com',
                href: 'mailto:abdelhalimouammou@gmail.com',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: 'from-cyan-500/20 to-blue-500/20'
              },
              {
                type: 'Phone',
                value: '+212 641 595 275',
                href: 'tel:+212641595275',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                color: 'from-blue-500/20 to-purple-500/20'
              },
              {
                type: 'LinkedIn',
                value: 'www.linkedin.com/in/abdelhalim-ouammou',
                href: 'https://www.linkedin.com/in/abdelhalim-ouammou',
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                color: 'from-purple-500/20 to-pink-500/20'
              },
              {
                type: 'GitHub',
                value: 'OUAMM123',
                href: 'https://github.com/OUAMM123',
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ),
                color: 'from-green-500/20 to-cyan-500/20'
              }
            ].map((contact, i) => (
              <motion.a
                key={contact.type}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-all duration-300 group block"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contact.color} border border-white/10 flex items-center justify-center mx-auto mb-3 text-cyan-400 group-hover:text-cyan-300`}
                >
                  {contact.icon}
                </motion.div>
                <div className="text-white font-semibold mb-1">{contact.type}</div>
                <div className="text-gray-400 text-sm break-all">{contact.value}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Abdelhalim OUAMMOU. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/in/abdelhalim-ouammou" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/OUAMM123" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="mailto:abdelhalimouammou@gmail.com" className="text-gray-500 hover:text-cyan-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-white relative">
      <ParticlesBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
