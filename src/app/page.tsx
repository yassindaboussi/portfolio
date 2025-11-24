'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Github, ExternalLink, Mail, Download, Sparkles, Globe, 
  Smartphone, Monitor, Calendar, Phone
} from 'lucide-react';

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'desktop'>('all');
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    ['home', 'profile', 'skills', 'projects', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const projects = [
    { id: 1, title: 'Cotakwira', company: 'Freelance', type: 'web', desc: 'Plateforme de gestion d\'équipes sportives avec réservation de terrains et matchs en temps réel.', tech: ['Symfony', 'MySQL', 'Twig', 'Bootstrap'], live: '#', code: '#' },
    { id: 2, title: 'Allgo RH', company: 'Allence', type: 'mobile', desc: 'App RH native avec Jetpack Compose, AWS et synchronisation temps réel.', tech: ['Kotlin', 'Jetpack Compose', 'AWS'], live: '#', code: '#' },
    { id: 3, title: 'EasyData', company: 'Freelance', type: 'web', desc: 'Solution EPM avec pipeline automatisé et intégration Google Sheets.', tech: ['Node.js', 'React', 'PostgreSQL'], live: '#', code: '#' },
    { id: 4, title: 'Plateforme Ticketing', company: 'Kleos', type: 'web', desc: 'Système de billetterie avec QR codes et validation instantanée.', tech: ['Symfony', 'Twig', 'TCPDF'], live: '#', code: '#' },
    { id: 5, title: 'Gestionnaire de Parc', company: 'Prologic', type: 'desktop', desc: 'App desktop de suivi matériel avec permissions avancées.', tech: ['Flutter Desktop', 'SQLite'], live: '#', code: '#' },
  ];

  const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);

  const filters = [
    { key: 'all', label: 'Tous', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { key: 'web', label: 'Web', icon: Globe, color: 'from-violet-500 to-purple-600' },
    { key: 'mobile', label: 'Mobile', icon: Smartphone, color: 'from-blue-500 to-cyan-500' },
    { key: 'desktop', label: 'Desktop', icon: Monitor, color: 'from-indigo-500 to-purple-600' },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          background: #0f0f1a;
          color: #fff;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
        .gradient-text { background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* Mouse trail */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-400/30 pointer-events-none z-50 blur-xl"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Nav */}
      <motion.nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-8 backdrop-blur-xl">

          <div className="hidden md:flex items-center gap-1">
            {['home', 'profile', 'skills', 'projects', 'contact'].map((id) => (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeSection === id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                whileHover={{ scale: 1.05 }}
              >
                {id === 'home' ? 'Accueil' : 
                 id === 'profile' ? 'Profil' :
                 id === 'skills' ? 'Compétences' :
                 id === 'projects' ? 'Projets' : 'Contact'}
              </motion.button>
            ))}
          </div>

          <motion.a
            href="/data/CV_Daboussi_Yassin.pdf"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2.5 rounded-full font-medium flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Download size={16} /> CV
          </motion.a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
              {['home', 'profile', 'skills', 'projects', 'contact'].map(id => (
                <motion.button key={id} onClick={() => scrollTo(id)} className="hover:text-cyan-400 transition" whileTap={{ scale: 0.9 }}>
                  {id === 'home' ? 'Accueil' : 
                   id === 'profile' ? 'Profil' :
                   id === 'skills' ? 'Compétences' :
                   id === 'projects' ? 'Projets' : 'Contact'}
                </motion.button>
              ))}
              <a href="/data/CV_Daboussi_Yassin.pdf" className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-full">
                Télécharger CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="text-cyan-400 font-medium text-lg">Ingénieur Full-Stack • One-man army</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-6"
          >
            Yassin <span className="gradient-text">Daboussi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Je transforme des idées en applications performantes, du concept à la production.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/data/CV_Daboussi_Yassin.pdf" className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 shadow-xl">
              <Download size={20} /> Télécharger mon CV
            </a>
            <button onClick={() => scrollTo('projects')} className="glass px-8 py-4 rounded-full font-medium">
              Voir mes projets →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1">
            <h2 className="text-5xl font-bold mb-6">
              À propos de <span className="gradient-text">moi</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Ingénieur Full-Stack passionné, je construis des applications robustes et scalables de A à Z. 
              Que ce soit du web moderne avec React/Next.js, du backend performant avec Symfony ou Node.js, 
              ou des apps mobiles natives (Kotlin, Flutter), j’adore relever des défis techniques complexes.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              J’ai une approche "one-man army" : je maîtrise tout le cycle de vie d’un produit – 
              du design à la mise en production, en passant par l’architecture, le DevOps et le déploiement continu.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">2+</div>
                <div className="text-sm text-gray-400">Ans d’expérience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">30+</div>
                <div className="text-sm text-gray-400">Projets livrés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-400">Autonome</div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-3xl p-2">
                <div className="w-full h-full glass rounded-3xl flex items-center justify-center text-9xl font-bold text-white/20">
                  YD
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Technos que je <span className="gradient-text">maîtrise</span>
          </h2>
          <p className="text-xl text-gray-400">Full-Stack • Mobile • DevOps • Cloud</p>
        </motion.div>

<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
  {[
    { name: 'Symfony', icon: 'symfony' },
    { name: 'React', icon: 'react' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Kotlin', icon: 'kotlin' },
    { name: 'Flutter', icon: 'flutter' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'SnowFlake', icon: 'snowflake' },
    { name: 'AWS', icon: 'aws' },
    { name: 'Docker', icon: 'docker' }
  ].map((tech, i) => (
    <motion.div
      key={tech.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="group"
    >
      <div className="glass rounded-2xl p-6 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-purple-500/20 flex flex-col items-center justify-center gap-3 min-h-32">
        <img 
          src={`/icons/${tech.icon}.svg`}
          alt={tech.name}
          className="w-16 h-16 object-contain"
        />
        <p className="text-xs text-gray-400 font-medium">{tech.name}</p>
      </div>
    </motion.div>
  ))}
</div>

</section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-bold text-center mb-4">
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">Des solutions complètes, livrées avec passion</p>

          {/* Filtres compacts */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((f) => {
              const Icon = f.icon;
              const active = filter === f.key;
              return (
                <motion.button
                  key={f.key}
                  onClick={() => setFilter(f.key as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    active
                      ? `bg-gradient-to-r ${f.color} text-white shadow-lg`
                      : 'glass hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                  {f.label}
                  {f.key !== 'all' && <span className="ml-1 opacity-70">({projects.filter(p => p.type === f.key).length})</span>}
                </motion.button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
                  whileHover={{ y: -8 }}
                >
                  <div className="h-48 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
                    <div className="text-5xl font-bold text-white/30">{project.title[0]}</div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="text-xs px-2 py-1 bg-white/10 rounded-full">{project.type}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">chez {project.company}</p>
                    <p className="text-gray-300 text-sm mb-6 line-clamp-3">{project.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && <span className="text-xs text-gray-500">+{project.tech.length - 3}</span>}
                    </div>

                    <div className="flex gap-3">
                      <a href={project.live} className="flex-1 glass text-center py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                        <ExternalLink size={14} /> Live
                      </a>
                      <a href={project.code} className="flex-1 glass text-center py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                        <Github size={14} /> Code
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-5xl font-bold mb-6">
            On travaille <span className="gradient-text">ensemble ?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Disponible pour des missions freelance ou un poste en CDI.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:yassin.daboussi@esprit.tn" className="glass p-8 rounded-2xl hover:bg-white/10 transition">
              <Mail className="mx-auto mb-4 text-purple-400" size={32} />
              <p className="font-medium">yassin.daboussi@esprit.tn</p>
            </a>
            <a
              href="https://cal.com/yassin-daboussi"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-8 rounded-2xl hover:bg-white/10 transition"
            >
              <Calendar className="mx-auto mb-4 text-cyan-400" size={32} />
              <p className="font-medium">Réserver un call</p>
            </a>
            <div className="glass p-8 rounded-2xl">
              <Phone className="mx-auto mb-4 text-green-400" size={32} />
              <p className="font-medium">+216 29 670 343</p>
            </div>
          </div>

          <a href="/data/CV_Daboussi_Yassin.pdf" className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-cyan-500 px-10 py-5 rounded-full text-lg font-semibold shadow-2xl">
            <Download /> Télécharger mon CV
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Yassin Daboussi — Fait avec Next.js, Tailwind & amour
      </footer>
    </>
  );
}