// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Mail,
  Download,
  Sparkles,
  Globe,
  Smartphone,
  Monitor,
  CalendarDays,
  Phone,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { projects } from '@/data/projects';

export default function Page() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'desktop'>('all');
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Section observer for active nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    ['home', 'profile', 'skills', 'projects', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  const filters = [
    { key: 'all', label: 'Tous', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { key: 'web', label: 'Web', icon: Globe, color: 'from-violet-500 to-purple-600' },
    { key: 'mobile', label: 'Mobile', icon: Smartphone, color: 'from-blue-500 to-cyan-500' },
    { key: 'desktop', label: 'Desktop', icon: Monitor, color: 'from-indigo-500 to-purple-600' },
  ];

  // Use slug for banner image
  const getProjectBanner = (project: typeof projects[0]) => {
    return `/project/${project.type}/${project.slug}/1.jpg`;
  };

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
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .gradient-text {
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Mouse trail */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-400/30 pointer-events-none z-50 blur-xl"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* Navigation */}
      <motion.nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-8 backdrop-blur-xl">
          <div className="hidden md:flex items-center gap-1">
            {['home', 'profile', 'skills', 'projects', 'contact'].map(id => (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === id ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {id === 'home'
                  ? 'Accueil'
                  : id === 'profile'
                  ? 'Profil'
                  : id === 'skills'
                  ? 'Compétences'
                  : id === 'projects'
                  ? 'Projets'
                  : 'Contact'}
              </motion.button>
            ))}
          </div>
          <motion.a
            href="https://cal.com/yassin-daboussi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 shadow-xl hover:shadow-purple-500/50 transition-all"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
          >
            <CalendarDays size={18} />
            Prendre RDV
          </motion.a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
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
              <a
                href="https://cal.com/yassin-daboussi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl"
              >
                <CalendarDays size={24} />
                Prendre RDV
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/data/CV_Daboussi_Yassin.pdf"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 shadow-xl"
            >
              <Download size={20} /> Télécharger mon CV
            </a>
            <button onClick={() => scrollTo('projects')} className="glass px-8 py-4 rounded-full font-medium">
              Voir mes projets
            </button>
          </motion.div>
        </div>
      </section>

      {/* Profile */}
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
              Ingénieur Full-Stack passionné, je construis des applications robustes et scalables de A à Z, en web, backend et mobile.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              J'adopte une approche "one-man army" : ma passion me pousse à aller au-delà du code, avec le souci du détail et d'une vraie expérience utilisateur.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">2+</div>
                <div className="text-sm text-gray-400">Ans d'expérience</div>
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
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative p-2 rounded-3xl bg-gradient-to-br from-purple-600/30 to-cyan-600/30 inline-block">
                <img src="/images/yassin.jpg" alt="Yassin Daboussi" className="rounded-3xl max-w-full h-auto block" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills */}
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
          <p className="text-xl text-gray-400">Full-Stack • Mobile • Cloud</p>
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
            { name: 'GIT', icon: 'git' },
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
                <img src={`/icons/${tech.icon}.svg`} alt={tech.name} className="w-16 h-16 object-contain" />
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
                  {f.key !== 'all' && (
                    <span className="ml-1 opacity-70">({projects.filter((p) => p.type === f.key).length})</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/30 transition-all cursor-pointer"
                  whileHover={{ y: -12 }}
                  onClick={() => router.push(`/projects/${project.slug}`)} // SLUG HERE
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={getProjectBanner(project)} // SLUG HERE
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
                      <div className="text-7xl font-black text-white/20">{project.title[0]}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="text-xs px-3 py-1 bg-white/10 rounded-full capitalize">{project.type}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {project.company === 'Freelance' ? 'Freelance' : `chez ${project.company}`}
                    </p>
                    <p className="text-gray-300 text-sm mb-6 line-clamp-2">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && <span className="text-xs text-gray-500">+{project.tech.length - 3}</span>}
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
            <a className="glass p-8 rounded-2xl hover:bg-white/10 transition">
              <Mail className="mx-auto mb-4 text-purple-400" size={32} />
              <p className="font-medium">yassin.daboussi@esprit.tn</p>
            </a>
            <a href="https://cal.com/yassin-daboussi" target="_blank" rel="noopener noreferrer" className="glass p-8 rounded-2xl hover:bg-white/10 transition">
              <CalendarDays className="mx-auto mb-4 text-cyan-400" size={32} />
              <p className="font-medium">Réserver un call</p>
            </a>
            <div className="glass p-8 rounded-2xl">
              <Phone className="mx-auto mb-4 text-green-400" size={32} />
              <p className="font-medium">+216 29 670 343</p>
            </div>
          </div>
          <a
            href="/data/CV_Daboussi_Yassin.pdf"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-cyan-500 px-10 py-5 rounded-full text-lg font-semibold shadow-2xl"
          >
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