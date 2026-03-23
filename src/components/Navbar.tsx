'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CalendarDays } from 'lucide-react';
import { SITE, NAV_ITEMS } from '@/data/config';

interface Props { activeSection: string }

export default function Navbar({ activeSection }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const BookBtn = ({ className = '' }: { className?: string }) => (
    <motion.a
      href={SITE.contact.cal}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 shadow-xl hover:shadow-purple-500/50 transition-all ${className}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
    >
      <CalendarDays size={16} />
      Prendre RDV
    </motion.a>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="glass px-5 py-3 rounded-full flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeSection === id ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <BookBtn className="text-sm" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/80"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-2xl font-semibold hover:text-purple-400 transition-colors"
              >
                {label}
              </button>
            ))}
            <BookBtn className="mt-4 text-base px-8 py-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
