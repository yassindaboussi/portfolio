'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, ExternalLink, Mail, Phone, Download, Sparkles, Calendar } from 'lucide-react';

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'desktop'>('all');
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

    // Créer les particules
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
        
        // Rebond sur les bords
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

    const sections = ['home', 'about', 'projects', 'contact'];
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
      desc: 'Gestion d\'équipes, matchs et réservations.', 
      tech: ['Symfony', 'MySQL'],
      liveUrl: '#',
      codeUrl: '#'
    },
    { 
      id: 2, 
      title: 'Allgo RH', 
      company: 'Allence', 
      type: 'mobile', 
      desc: 'Application RH native (Jetpack Compose + AWS).', 
      tech: ['Kotlin', 'AWS'],
      liveUrl: '#',
      codeUrl: '#'
    },
    { 
      id: 3, 
      title: 'EasyData', 
      company: 'Freelance', 
      type: 'web', 
      desc: 'Pipeline EPM + intégration Sheets + RBAC.', 
      tech: ['Node', 'React'],
      liveUrl: '#',
      codeUrl: '#'
    },
    { 
      id: 4, 
      title: 'Plateforme de Ticketing', 
      company: 'Kleos', 
      type: 'web', 
      desc: 'Génération de PDF + QR code.', 
      tech: ['Symfony', 'Twig'],
      liveUrl: '#',
      codeUrl: '#'
    },
    { 
      id: 5, 
      title: 'Gestionnaire de Ressources', 
      company: 'Prologic', 
      type: 'desktop', 
      desc: 'Gestion matériel & rôles (Flutter Desktop).', 
      tech: ['Flutter'],
      liveUrl: '#',
      codeUrl: '#'
    }
  ];

  const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);

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
      className="w-full h-36 rounded-xl overflow-hidden relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`w-full h-full bg-gradient-to-r ${
        type === 'web' ? 'from-purple-600/30 to-cyan-400/30' :
        type === 'mobile' ? 'from-amber-600/30 to-pink-400/30' :
        'from-emerald-600/30 to-blue-400/30'
      } flex items-center justify-center`}>
        <span className="text-white/70 font-medium">{title}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="bg-white/20 backdrop-blur-sm rounded-full p-2"
        >
          <ExternalLink size={16} className="text-white" />
        </motion.div>
      </div>
    </motion.div>
  );

  const SkillBadge = ({ skill }: { skill: string }) => (
    <motion.span 
      className="px-4 py-2 glass rounded-full text-sm relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{skill}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-cyan-400/0 group-hover:from-purple-500/20 group-hover:to-cyan-400/20 transition-all duration-300"></div>
    </motion.span>
  );

  return (
    <>
      {/* Styles globaux améliorés */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
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
      `}</style>

      {/* Canvas d'arrière-plan animé */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Effet de traînée de souris */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-400/20 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation améliorée */}
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
              <div className="text-xs text-white/60 -mt-1">Ingénieur Full-Stack</div>
            </div>
          </motion.div>

          {/* Navigation desktop améliorée */}
          <div className="hidden md:flex items-center gap-2 glass-heavy px-6 py-2 rounded-full">
            {[
              { id: 'home', label: 'Accueil', icon: '⚡' },
              { id: 'about', label: 'Profil', icon: '👤' },
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

          {/* Bouton CV amélioré */}
          <motion.a
            href="/data/CV_Daboussi_Yassin.pdf"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-2.5 rounded-full font-semibold"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            CV
          </motion.a>

          {/* Bouton menu mobile */}
          <motion.button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden glass p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Menu mobile amélioré */}
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
                {['home', 'about', 'projects', 'contact'].map(id => (
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
                     id === 'about' ? 'Profil' : 
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

      {/* Section Hero améliorée */}
      <section id="home" className="min-h-screen flex items-center px-6 max-w-6xl mx-auto relative">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 text-sm text-cyan-300 mb-4"
          >
            <Sparkles size={16} />
            <span>Ingénieur Full-Stack & Spécialiste UI</span>
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
            Je crée des <span className="text-cyan-300 font-medium">expériences digitales futuristes</span> avec des technologies de pointe. 
            Spécialisé dans Next.js, Symfony, Kotlin et les architectures cloud.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="/mnt/data/CV_Daboussi_Yassin.pdf"
              className="bg-gradient-to-r from-purple-500 to-cyan-400 px-8 py-4 rounded-full font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)" }}
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

          {/* Défilement de la stack technique */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-12 flex items-center gap-4 overflow-hidden"
          >
            <div className="flex space-x-8 animate-marquee whitespace-nowrap">
              {['Symfony', 'React', 'Node.js', 'Flutter' ,'Kotlin', 'AWS', 'MySQL', 'MongoDB'].map((tech, index) => (
                <span key={index} className="text-white/40 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Éléments flottants */}
        <motion.div 
          className="absolute top-20 right-10 w-4 h-4 rounded-full bg-cyan-400/30"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 w-6 h-6 rounded-full bg-purple-400/20"
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>

      {/* Section À propos améliorée */}
      <section id="about" className="py-20 max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <span className="gradient-text">Profil</span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
          </h2>
          
          <div className="gradient-border">
            <div className="p-8">
              <p className="text-white/80 leading-relaxed text-lg">
                Ingénieur Full-Stack avec une expertise dans le développement d'applications web évolutives, 
                d'applications mobiles natives et de systèmes backend robustes. Passionné par la création 
                d'expériences utilisateur intuitives et la mise en œuvre de technologies de pointe.
              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-300">Maîtrise Frontend</h3>
                  <p className="text-white/70">
                    Création d'interfaces réactives et performantes avec React, Next.js et CSS moderne. 
                    Accent sur l'accessibilité, les animations fluides et l'expérience utilisateur optimale.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-300">Excellence Backend</h3>
                  <p className="text-white/70">
                    Développement d'API sécurisées et évolutives avec Symfony, Node.js et services cloud. 
                    Expertise en conception de bases de données, authentification et architecture système.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-12 mb-6">Compétences Techniques</h3>
              <div className="flex flex-wrap gap-3">
                {[
                   'Symfony', 'React', 'Node.js', 'Flutter', 'Kotlin', 'MySQL', 'MongoDB', 'AWS Cognito', 'S3', 'CI/CD'
                ].map(skill => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section Projets améliorée */}
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
          <p className="text-white/60 mb-8">Une collection de mes travaux récents et expérimentations</p>

          {/* Boutons de filtre améliorés */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { key: 'all', label: 'Tous les Projets', emoji: '🚀' },
              { key: 'web', label: 'Applications Web', emoji: '🌐' },
              { key: 'mobile', label: 'Mobile', emoji: '📱' },
              { key: 'desktop', label: 'Desktop', emoji: '💻' }
            ].map(({ key, label, emoji }) => (
              <motion.button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                  filter === key 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white' 
                    : 'glass hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{emoji}</span>
                {label}
              </motion.button>
            ))}
          </div>

          {/* Grille de projets améliorée */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map(project => (
                <motion.div
                  key={project.id}
                  className="glass rounded-2xl overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Logo seed={project.company} />
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.type === 'web' ? 'bg-purple-500/20 text-purple-300' :
                          project.type === 'mobile' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {project.type === 'web' ? 'Web' : 
                         project.type === 'mobile' ? 'Mobile' : 'Desktop'}
                      </motion.span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="text-white/50 text-sm mb-3">
                      {project.company}
                    </div>

                    <ProjectImage title={project.title} type={project.type} />

                    <p className="text-white/70 mt-4 mb-4 text-sm leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-white/10 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <motion.a 
                        href={project.liveUrl}
                        className="flex-1 glass text-center py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={14} />
                        Démo Live
                      </motion.a>
                      <motion.a 
                        href={project.codeUrl}
                        className="flex-1 glass text-center py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
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

      {/* Section Contact améliorée */}
      <section id="contact" className="py-20 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="gradient-border"
        >
          <div className="p-8 rounded-2xl">
            <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="gradient-text">Contact</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
            </h2>
            <p className="text-white/70 mb-8">
              Prêt à donner vie à votre prochain projet ? Créons ensemble quelque chose d'extraordinaire.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Me Contacter</h3>
                <div className="space-y-4">
                  <motion.a 
                    href="mailto:yassin.daboussi@esprit.tn"
                    className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/10 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Mail size={20} className="text-purple-400" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-white/70 text-sm">yassin.daboussi@esprit.tn</div>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="https://cal.com/yassin-daboussi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/10 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <Calendar size={20} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                    <div>
                      <div className="font-medium">Planifier un Rendez-vous</div>
                      <div className="text-white/70 text-sm">Organiser un appel via Cal.com</div>
                    </div>
                  </motion.a>
                  
                  <div className="flex items-center gap-3 p-3 glass rounded-xl">
                    <Phone size={20} className="text-green-400" />
                    <div>
                      <div className="font-medium">Téléphone</div>
                      <div className="text-white/70 text-sm">+216 29670343</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pied de page amélioré */}
      <footer className="text-center py-8 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-white/50"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg width="20" height="20" viewBox="0 0 100 100">
                  <path d="M50 20 L65 40 L85 45 L68 60 L72 80 L50 70 L28 80 L32 60 L15 45 L35 40 Z" fill="currentColor" />
                </svg>
              </motion.div>
              <span>© {new Date().getFullYear()} — Yassin Daboussi</span>
            </div>
            <p className="text-sm">Conçu avec passion en utilisant Next.js & Framer Motion</p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}