'use client';
// app/page.tsx
// ─────────────────────────────────────────────
// Main portfolio page.
// To add/remove sections, just add/remove the
// component here. Section content lives in
// src/components/* and config in src/data/*.
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Navbar  from '@/components/Navbar';
import Hero    from '@/components/Hero';
import Profile from '@/components/Profile';
import Skills  from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { SITE } from '@/data/config';

export default function Page() {
  const [activeSection, setActiveSection] = useState('home');
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse for ambient glow cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Highlight active nav item while scrolling.
  // rootMargin '-40% 0px -55% 0px' creates a narrow detection band in the
  // middle of the viewport — works for both short and very tall sections.
  useEffect(() => {
    const ids = ['home', 'profile', 'skills', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Ambient cursor glow */}
      <motion.div
        className="fixed w-10 h-10 rounded-full pointer-events-none z-50 blur-xl bg-gradient-to-r from-purple-500/25 to-cyan-400/25"
        animate={{ x: mouse.x - 20, y: mouse.y - 20 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-700/15 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-cyan-700/15 blur-3xl" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
      </div>

      <Navbar  activeSection={activeSection} />
      <Hero    />
      <Profile />
      <Skills  />
      <Projects />
      <Contact />

      <footer className="py-10 border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Yassin Daboussi — Fait avec Next.js & Tailwind
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/70 transition-colors text-sm font-medium"
            >
              LinkedIn
            </a>
            <span className="text-white/10">·</span>
            <a
              href={SITE.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/70 transition-colors text-sm font-medium"
            >
              GitHub
            </a>
            <span className="text-white/10">·</span>
            <a
              href={SITE.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/70 transition-colors text-sm font-medium"
            >
              CV
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
