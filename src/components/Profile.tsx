'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Github, CheckCircle } from 'lucide-react';
import { SITE } from '@/data/config';

export default function Profile() {
  return (
    <section id="profile" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-14 items-center"
      >
        {/* Text */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="heading text-5xl">
              À propos de <span className="gradient-text">moi</span>
            </h2>
          </div>

          {/* Availability status */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-l-3 border-green-400 rounded-r-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <div>
                <span className="text-green-400 font-semibold text-sm">Ouvert aux opportunités</span>
                <span className="text-white/60 text-xs ml-2">• CDI • Freelance </span>
              </div>
            </div>
          </div>

          <p className="text-lg text-white/60 mb-5 leading-relaxed">{SITE.bio1}</p>
          <p className="text-lg text-white/60 mb-8 leading-relaxed">{SITE.bio2}</p>

          {/* Social links */}
          <div className="flex gap-4 mb-10">
            {[
              { href: SITE.contact.linkedin, label: 'LinkedIn', icon: <img src="/icons/linkedin.svg" alt="" className="w-5 h-5" /> },
              { href: SITE.contact.github,   label: 'GitHub',   icon: <Github size={18} /> },
            ].map(({ href, label, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all text-sm font-medium"
                whileHover={{ scale: 1.04 }}
              >
                {icon}
                {label}
                <ExternalLink size={12} className="text-white/40" />
              </motion.a>
            ))}
          </div>

          {/* Stats with dividers */}
          <div className="flex">
            {SITE.stats.map(({ value, label }, i) => (
              <div key={label} className="flex items-stretch">
                {i > 0 && <div className="w-px bg-white/10 mx-6 self-stretch" />}
                <div>
                  <div className="heading text-3xl gradient-text">{value}</div>
                  <div className="text-xs text-white/50 mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo — bigger */}
        <div className="order-1 md:order-2 flex justify-center">
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-40" />
            <div className="relative p-1.5 rounded-3xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30">
              <img
                src="/images/yassin.jpg"
                alt={SITE.name}
                className="rounded-3xl w-80 h-auto block"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
