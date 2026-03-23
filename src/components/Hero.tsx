'use client';
import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { SITE } from '@/data/config';

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cyan-400 font-medium text-lg mb-5"
        >
          {SITE.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="heading text-6xl md:text-8xl mb-6"
        >
          Yassin <span className="gradient-text">Daboussi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/50 mb-12 max-w-xl mx-auto"
        >
          Je transforme des idées en applications performantes, du concept à la production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href={SITE.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-5 rounded-full font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-cyan-500/40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={18} /> Télécharger mon CV
          </motion.a>

          <button
            onClick={() => scrollTo('projects')}
            className="glass px-8 py-5 rounded-full font-medium hover:bg-white/10 transition-all w-60"
          >
            Voir mes projets
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('profile')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
