'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, ExternalLink, Mail, Phone, Download, Sparkles, Calendar, Globe, Smartphone, Monitor } from 'lucide-react';

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'web' | 'mobile' | 'desktop'>('web');
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Effet de traînée de souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particules de fond
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${Math.random() > 0.5 ? '124, 58, 237' : '6, 182, 212'}, ${Math.random() * 0.3 + 0.1})`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Observer pour la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['home', 'projects', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const projects = [
    { 
      id: 1, 
      title: 'Cotakwira', 
      company: 'Freelance', 
      type: 'web', 
      desc: 'Plateforme complète de gestion d\'équipes sportives avec système de réservation de terrains et organisation de matchs en temps réel.', 
      tech: ['Symfony', 'MySQL', 'Twig', 'Bootstrap'],
      liveUrl: '#',
      codeUrl: '#'
    },
    { 
      id: 2, 
      title: 'Allgo RH', 
      company: 'Allence', 
      type: 'mobile', 
      desc: 'Application mobile RH native développée avec Jetpack Compose, intégrant AWS pour la gestion cloud et synchronisation en temps réel.', 
      tech: ['Kotlin', 'Jetpack Compose', 'AWS', 'REST API'],
      liveUrl: '#',
      codeUrl: '#'
    },
    { 
      id: 3, 
      title: 'EasyData', 
      company: 'Freelance', 
      type: 'web', 
      desc: 'Solution EPM avec pipeline de données automatisé, intégration Google Sheets et système RBAC pour la gestion des permissions.', 
      tech: ['Node.js', 'React', 'PostgreSQL', 'Google API'],
      liveUrl: '#',
      codeUrl: '#'
    },
    { 
      id: 4, 
      title: 'Plateforme de Ticketing', 
      company: 'Kleos', 
      type: 'web', 
      desc: 'Système de billetterie événementielle avec génération automatique de PDF et codes QR pour validation instantanée à l\'entrée.', 
      tech: ['Symfony', 'Twig', 'TCPDF', 'MySQL'],
      liveUrl: '#',
      codeUrl: '#'
    },
    { 
      id: 5, 
      title: 'Gestionnaire de Ressources', 
      company: 'Prologic', 
      type: 'desktop', 
      desc: 'Application desktop de gestion de parc informatique avec système de permissions et suivi en temps réel du matériel.', 
      tech: ['Flutter Desktop', 'SQLite', 'Provider'],
      liveUrl: '#',
      codeUrl: '#'
    }
  ];

  const filtered = projects.filter(p => p.type === filter);

  const filterCategories = [
    { 
      key: 'web', 
      label: 'Web', 
      icon: Globe,
      count: projects.filter(p => p.type === 'web').length,
      gradient: 'from-red-500 to-rose-600',
      bgGradient: 'from-red-500/10 to-rose-600/10'
    },
    { 
      key: 'mobile', 
      label: 'Mobile', 
      icon: Smartphone,
      count: projects.filter(p => p.type === 'mobile').length,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/10 to-indigo-600/10'
    },
    { 
      key: 'desktop', 
      label: 'Desktop', 
      icon: Monitor,
      count: projects.filter(p => p.type === 'desktop').length,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-500/10 to-violet-600/10'
    }
  ];

  const Logo = ({ seed }: { seed: string }) => {
    const colors = ['#7c3aed', '#06b6d4', '#f97316', '#ef4444'];
    const c = colors[seed.charCodeAt(0) % colors.length];
    return (
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg width="70" height="70" viewBox="0 0 100 100">
          <rect width="100" height="100" rx="16" fill={c} opacity="0.15" />
          <circle cx="50" cy="50" r="26" fill={c} />
          <path d="M42 40 L58 40 L50 62 Z" fill="white" opacity="0.9" />
        </svg>
      </motion.div>
    );
  };

  const ProjectImage = ({ title, type }: { title: string, type: string }) => (
    <motion.div 
      className="w-full h-40 rounded-xl overflow-hidden relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`w-full h-full bg-gradient-to-br ${
        type === 'web' ? 'from-purple-600/40 via-pink-500/30 to-cyan-400/40' :
        type === 'mobile' ? 'from-blue-600/40 via-indigo-500/30 to-purple-400/40' :
        'from-violet-600/40 via-purple-500/30 to-pink-400/40'
      } flex items-center justify-center backdrop-blur-sm`}>
        <div className="text-center p-4">
          <span className="text-white/90 font-semibold text-lg">{title}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="flex gap-3"
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-3">
            <ExternalLink size={18} className="text-white" />
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-full p-3">
            <Github size={18} className="text-white" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Styles globaux */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          background: radial-gradient(circle at 10% 10%, rgba(124,58,237,0.15), transparent 50%),
                      radial-gradient(circle at 90% 90%, rgba(6,182,212,0.12), transparent 50%),
                      #020617;
          color: #fff;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .glass-heavy {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .gradient-text {
          background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          padding: 1px;
          border-radius: 16px;
        }
        .gradient-border > div {
          background: #020617;
          border-radius: 15px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Canvas de fond animé */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Traînée de souris */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-400/20 pointer-events-none z-50 blur-sm"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-4 w-full z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollTo('home')}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg width="50" height="50" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="#7c3aed" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#g1)" opacity="0.15" />
                <path d="M50 20 L65 40 L85 45 L68 60 L72 80 L50 70 L28 80 L32 60 L15 45 L35 40 Z" fill="url(#g1)" />
              </svg>
            </motion.div>
            <div>
              <div className="font-bold text-lg">Yassin Daboussi</div>
            </div>
          </motion.div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-2 glass-heavy px-6 py-2 rounded-full">
            {[
              { id: 'home', label: 'Accueil', icon: '⚡' },
              { id: 'projects', label: 'Projets', icon: '🧪' },
              { id: 'contact', label: 'Contact', icon: '📡' }
            ].map(i => (
              <motion.button 
                key={i.id}
                onClick={() => scrollTo(i.id)}
                className={`px-4 py-2 text-sm rounded-full flex items-center gap-2 transition-all ${
                  activeSection === i.id 
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/20 text-cyan-300' 
                    : 'hover:text-cyan-300 hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{i.icon}</span>
                {i.label}
              </motion.button>
            ))}
          </div>

          <motion.a
            href="/data/CV_Daboussi_Yassin.pdf"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-purple-500/20"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            CV
          </motion.a>

          {/* Menu mobile */}
          <motion.button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden glass p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              className="md:hidden mt-3 max-w-6xl mx-auto px-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="glass-heavy rounded-2xl p-4 flex flex-col gap-2">
                {['home', 'projects', 'contact'].map(id => (
                  <motion.button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="py-3 px-4 rounded-xl hover:bg-white/10 text-left flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      activeSection === id ? 'bg-cyan-400' : 'bg-white/30'
                    }`} />
                    {id === 'home' ? 'Accueil' : 
                     id === 'projects' ? 'Projets' : 'Contact'}
                  </motion.button>
                ))}
                <motion.a
                  href="/data/CV_Daboussi_Yassin.pdf"
                  className="text-center bg-gradient-to-r from-purple-600 to-cyan-500 py-3 rounded-xl flex items-center justify-center gap-2 mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={16} />
                  Télécharger CV
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Section Hero */}
      <section id="home" className="min-h-screen flex items-center px-6 max-w-6xl mx-auto relative">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 text-sm text-cyan-300 mb-4"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>Ingénieur Full-Stack</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
          >
            Yassin <span className="gradient-text">Daboussi</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl text-white/70 max-w-2xl mt-6 leading-relaxed"
          >
            <span className="text-cyan-300 font-medium">One-man army</span> · 
            Toujours prêt à plonger dans de nouveaux défis. 
            Je livre des projets de A à Z, du concept à la mise en prod.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="/data/CV_Daboussi_Yassin.pdf"
              className="bg-gradient-to-r from-purple-500 to-cyan-400 px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-xl shadow-purple-500/30"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Télécharger CV
            </motion.a>

            <motion.button
              onClick={() => scrollTo('projects')}
              className="glass px-8 py-4 rounded-full font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={18} />
              Explorer les Projets
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-12 flex gap-4 overflow-hidden"
          >
            <div className="flex gap-8 animate-pulse">
              {['Symfony', 'React', 'Node.js', 'Flutter', 'Kotlin', 'AWS', 'MySQL', 'MongoDB'].map((tech, index) => (
                <span key={index} className="text-white/40 text-sm font-medium whitespace-nowrap">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Projets */}
      <section id="projects" className="py-20 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="gradient-text">Laboratoire d'Innovation</span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
          </h2>
          <p className="text-white/60 mb-12">Une collection de mes travaux récents et expérimentations</p>

          {/* Filtres avec design inspiré de l'image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {filterCategories.map((category) => {
              const IconComponent = category.icon;
              const isActive = filter === category.key;
              
              return (
                <motion.button
                  key={category.key}
                  onClick={() => setFilter(category.key as any)}
                  className={`relative group overflow-hidden rounded-3xl p-8 transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-br ${category.gradient} shadow-2xl` 
                      : 'glass hover:scale-[1.02]'
                  }`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: category.key === 'web' ? 0 : category.key === 'mobile' ? 0.1 : 0.2 }}
                >
                  {/* Background gradient overlay for non-active state */}
                  {!isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-50`} />
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <motion.div 
                      className={`mb-4 p-4 rounded-2xl ${
                        isActive 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-white/10'
                      }`}
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent size={40} className={isActive ? 'text-white' : 'text-white/80'} />
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-2 ${
                      isActive ? 'text-white' : 'text-white/90'
                    }`}>
                      {category.label}
                    </h3>
                    
                    {/* Project count badge */}
                    <motion.div 
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                        isActive 
                          ? 'bg-white/20 backdrop-blur-sm text-white' 
                          : 'bg-white/10 text-white/70'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {category.count} Projet{category.count > 1 ? 's' : ''}
                    </motion.div>
                  </div>
                  
                  {/* Hover effect shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  layout
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Logo seed={project.company} />
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.type === 'web' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          project.type === 'mobile' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {project.type === 'web' ? 'Web' : 
                         project.type === 'mobile' ? 'Mobile' : 'Desktop'}
                      </motion.span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <div className="text-white/50 text-sm mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      {project.company}
                    </div>

                    <ProjectImage title={project.title} type={project.type} />

                    <p className="text-white/70 mt-4 mb-4 text-sm leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(tech => (
                        <motion.span 
                          key={tech} 
                          className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium border border-white/10"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <motion.a 
                        href={project.liveUrl}
                        className="flex-1 glass text-center py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-white/10"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={14} />
                        Démo Live
                      </motion.a>
                      <motion.a 
                        href={project.codeUrl}
                        className="flex-1 glass text-center py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-white/10"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={14} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="gradient-border"
        >
          <div className="p-8 md:p-12 rounded-2xl">
            <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="gradient-text">Contact</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
            </h2>
            <p className="text-white/70 mb-8">
              Prêt à donner vie à votre prochain projet ? Créons ensemble quelque chose d'extraordinaire.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-cyan-300 flex items-center gap-2">
                  <Sparkles size={20} />
                  Me Contacter
                </h3>
                <div className="space-y-4">
                  <motion.a 
                    href="mailto:yassin.daboussi@esprit.tn"
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                      <Mail size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <div className="text-white/70 text-sm">yassin.daboussi@esprit.tn</div>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="https://cal.com/yassin-daboussi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                      <Calendar size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Planifier un Rendez-vous</div>
                      <div className="text-white/70 text-sm">Organiser un appel via Cal.com</div>
                    </div>
                  </motion.a>
                  
                  <motion.div 
                    className="flex items-center gap-4 p-4 glass rounded-xl"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-lg bg-green-500/20">
                      <Phone size={20} className="text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Téléphone</div>
                      <div className="text-white/70 text-sm">+216 29670343</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-48 h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl absolute -inset-8"></div>
                  <svg width="200" height="200" viewBox="0 0 200 200" className="relative">
                    <defs>
                      <linearGradient id="contact-gradient" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#7c3aed" />
                        <stop offset="1" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="80" fill="url(#contact-gradient)" opacity="0.2" />
                    <path d="M100 40 L130 70 L170 75 L135 110 L145 150 L100 125 L55 150 L65 110 L30 75 L70 70 Z" 
                          fill="url(#contact-gradient)" 
                          className="animate-pulse" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-white/50"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg width="24" height="24" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="footer-gradient" x1="0" x2="1">
                      <stop offset="0" stopColor="#7c3aed" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <path d="M50 20 L65 40 L85 45 L68 60 L72 80 L50 70 L28 80 L32 60 L15 45 L35 40 Z" 
                        fill="url(#footer-gradient)" />
                </svg>
              </motion.div>
              <span className="text-white/70 font-medium">© {new Date().getFullYear()} — Yassin Daboussi</span>
            </div>
            <p className="text-sm mb-6">Conçu avec passion en utilisant Next.js & Framer Motion</p>
            
            <div className="flex justify-center gap-6">
              <motion.a
                href="https://github.com/yassin-daboussi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} className="text-white/70" />
              </motion.a>
              <motion.a
                href="mailto:yassin.daboussi@esprit.tn"
                className="p-3 glass rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} className="text-white/70" />
              </motion.a>
              <motion.a
                href="tel:+21629670343"
                className="p-3 glass rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} className="text-white/70" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}