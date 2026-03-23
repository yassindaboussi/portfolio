'use client';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { SKILLS } from '@/data/config';

// Brand colors per icon — used for hover glow + text tint
const BRAND: Record<string, { glow: string; border: string; text: string; bg: string }> = {
  nextjs:  { glow: '255,255,255',   border: 'rgba(255,255,255,0.35)', text: '#ffffff',  bg: 'rgba(255,255,255,0.07)' },
  react:   { glow: '97,218,251',    border: 'rgba(97,218,251,0.40)',  text: '#61dafb',  bg: 'rgba(97,218,251,0.07)'  },
  nodejs:  { glow: '104,160,99',    border: 'rgba(104,160,99,0.40)',  text: '#68a063',  bg: 'rgba(104,160,99,0.07)'  },
  kotlin:  { glow: '127,82,255',    border: 'rgba(127,82,255,0.40)',  text: '#7F52FF',  bg: 'rgba(127,82,255,0.07)'  },
  flutter: { glow: '84,182,246',    border: 'rgba(84,182,246,0.40)',  text: '#54B6F6',  bg: 'rgba(84,182,246,0.07)'  },
  mongodb: { glow: '0,237,100',     border: 'rgba(0,237,100,0.35)',   text: '#00ed64',  bg: 'rgba(0,237,100,0.07)'   },
  mysql:   { glow: '0,117,143',     border: 'rgba(0,117,143,0.40)',   text: '#00778F',  bg: 'rgba(0,117,143,0.07)'   },
  aws:     { glow: '255,153,0',     border: 'rgba(255,153,0,0.40)',   text: '#FF9900',  bg: 'rgba(255,153,0,0.07)'   },
  git:     { glow: '240,80,50',     border: 'rgba(240,80,50,0.40)',   text: '#F05032',  bg: 'rgba(240,80,50,0.07)'   },
};

const IMPORTANCE: Record<string, number> = {
  nextjs: 0, react: 1, nodejs: 2, kotlin: 3,
  flutter: 4, mongodb: 5, mysql: 6, aws: 7, git: 8,
};

const sorted = [...SKILLS].sort(
  (a, b) => (IMPORTANCE[a.icon] ?? 99) - (IMPORTANCE[b.icon] ?? 99),
);

function SkillPill({ tech, index }: { tech: typeof SKILLS[0]; index: number }) {
  const brand = BRAND[tech.icon] ?? {
    glow: '168,85,247', border: 'rgba(168,85,247,0.35)',
    text: '#a855f7', bg: 'rgba(168,85,247,0.07)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
      whileHover={{ y: -6, scale: 1.08 }}
      className="group relative cursor-default"
      style={
        {
          '--brand-glow': brand.glow,
          '--brand-border': brand.border,
          '--brand-text': brand.text,
          '--brand-bg': brand.bg,
        } as React.CSSProperties
      }
    >
      {/* Glow layer — only visible on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
        style={{ background: `rgba(${brand.glow}, 0.18)` }}
      />

      {/* Card */}
      <div
        className="relative flex flex-col items-center justify-center gap-2.5 rounded-2xl transition-all duration-300 w-20 h-20 border"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.09)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = brand.bg;
          el.style.borderColor = brand.border;
          el.style.boxShadow = `0 8px 32px rgba(${brand.glow}, 0.22), inset 0 1px 0 rgba(255,255,255,0.06)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = 'rgba(255,255,255,0.04)';
          el.style.borderColor = 'rgba(255,255,255,0.09)';
          el.style.boxShadow = '';
        }}
      >
        <img
          src={`/icons/${tech.icon}.svg`}
          alt={tech.name}
          className="w-8 h-8 object-contain flex-shrink-0"
        />
        <span
          className="text-[11px] font-semibold text-white/50 group-hover:text-white/90 transition-colors duration-300 leading-none text-center px-1 whitespace-nowrap"
          style={{ '--brand-text': brand.text } as React.CSSProperties}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = brand.text; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ''; }}
        >
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="heading text-5xl md:text-6xl mb-3">
          Technos que je <span className="gradient-text">maîtrise</span>
        </h2>
        <p className="text-white/40 text-base">Full-Stack · Mobile · Cloud</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4">
        {sorted.map((tech, i) => (
          <SkillPill key={tech.name} tech={tech} index={i} />
        ))}
      </div>
    </section>
  );
}
