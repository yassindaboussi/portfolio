'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CalendarDays, Phone, Download, Copy, Check } from 'lucide-react';
import { SITE } from '@/data/config';

function CopyCard({
  icon: Icon,
  color,
  label,
}: {
  icon: React.ElementType;
  color: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(label);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="glass p-6 rounded-2xl hover:bg-white/10 transition-all w-full relative group"
      whileHover={{ y: -5 }}
    >
      <Icon className={`mx-auto mb-3 ${color}`} size={28} />
      <p className="font-medium text-sm">{label}</p>

      <div className={`absolute top-3 right-3 flex items-center gap-1 text-xs transition-all duration-200 ${
        copied ? `${color} opacity-100` : 'text-white/30 opacity-0 group-hover:opacity-100'
      }`}>
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? 'Copié !' : 'Copier'}
      </div>
    </motion.button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="heading text-5xl mb-4">
          On travaille <span className="gradient-text">ensemble ?</span>
        </h2>
        <p className="text-lg text-white/50 mb-12">
          Disponible pour des missions freelance ou un poste en CDI.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <CopyCard icon={Mail}  color="text-purple-400" label={SITE.contact.email} />

          <motion.a
            href={SITE.contact.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-6 rounded-2xl hover:bg-white/10 transition-all"
            whileHover={{ y: -5 }}
          >
            <CalendarDays className="mx-auto mb-3 text-cyan-400" size={28} />
            <p className="font-medium text-sm">Réserver un call</p>
          </motion.a>

          <CopyCard icon={Phone} color="text-green-400" label={SITE.contact.phone} />
        </div>

        <motion.a
          href={SITE.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-5 rounded-full text-base font-semibold shadow-2xl hover:shadow-cyan-500/40 transition-all"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Download size={18} /> Télécharger mon CV
        </motion.a>
      </motion.div>
    </section>
  );
}
