'use client';

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '@/data/config';

const BRAND: Record<string, { glow: string; border: string; text: string; bg: string }> = {
  nextjs:  { glow: '255,255,255', border: 'rgba(255,255,255,0.35)', text: '#ffffff', bg: 'rgba(255,255,255,0.07)' },
  react:   { glow: '97,218,251',  border: 'rgba(97,218,251,0.40)',  text: '#61dafb', bg: 'rgba(97,218,251,0.07)' },
  nodejs:  { glow: '104,160,99',  border: 'rgba(104,160,99,0.40)',  text: '#68a063', bg: 'rgba(104,160,99,0.07)' },
  kotlin:  { glow: '127,82,255',  border: 'rgba(127,82,255,0.40)',  text: '#7F52FF', bg: 'rgba(127,82,255,0.07)' },
  flutter: { glow: '84,182,246',  border: 'rgba(84,182,246,0.40)',  text: '#54B6F6', bg: 'rgba(84,182,246,0.07)' },
  mongodb: { glow: '0,237,100',   border: 'rgba(0,237,100,0.35)',   text: '#00ed64', bg: 'rgba(0,237,100,0.07)' },
  mysql:   { glow: '0,117,143',   border: 'rgba(0,117,143,0.40)',   text: '#00778F', bg: 'rgba(0,117,143,0.07)' },
  aws:     { glow: '255,153,0',   border: 'rgba(255,153,0,0.40)',   text: '#FF9900', bg: 'rgba(255,153,0,0.07)' },
  git:     { glow: '240,80,50',   border: 'rgba(240,80,50,0.40)',   text: '#F05032', bg: 'rgba(240,80,50,0.07)' },
};

const IMPORTANCE: Record<string, number> = {
  nextjs: 0, react: 1, nodejs: 2, kotlin: 3,
  flutter: 4, mongodb: 5, mysql: 6, aws: 7, git: 8,
};

const BASE_CARD_BG     = 'rgba(255,255,255,0.04)';
const BASE_CARD_BORDER = 'rgba(255,255,255,0.09)';

const INITIAL_DELAY   = 400;
const STEP_INTERVAL   = 260;
const HOLD_LAST       = 300;
// Short pause after hover ends before the sequence resumes — feels intentional
const RESUME_DELAY    = 180;

const CARD_TRANSITION = { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] } as const;
const GLOW_TRANSITION = { duration: 0.26, ease: 'easeInOut' } as const;

type Skill = (typeof SKILLS)[0];

function SkillPill({
  tech,
  index,
  isActive,
  onHoverStart,
  onHoverEnd,
}: {
  tech: Skill;
  index: number;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const brand = BRAND[tech.icon] ?? {
    glow: '168,85,247', border: 'rgba(168,85,247,0.35)',
    text: '#a855f7', bg: 'rgba(168,85,247,0.07)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
      className="relative"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl -z-10"
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.15 : 0.9 }}
        transition={GLOW_TRANSITION}
        style={{ background: `rgba(${brand.glow}, 0.20)` }}
      />

      <motion.div
        className="relative flex h-20 w-20 cursor-default flex-col items-center justify-center gap-2.5 rounded-2xl border will-change-transform"
        animate={{
          y:               isActive ? -7 : 0,
          scale:           isActive ? 1.09 : 1,
          backgroundColor: isActive ? brand.bg    : BASE_CARD_BG,
          borderColor:     isActive ? brand.border : BASE_CARD_BORDER,
          boxShadow:       isActive
            ? `0 10px 36px rgba(${brand.glow}, 0.25), inset 0 1px 0 rgba(255,255,255,0.07)`
            : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={CARD_TRANSITION}
      >
        <img
          src={`/icons/${tech.icon}.svg`}
          alt={tech.name}
          className="h-8 w-8 flex-shrink-0 object-contain"
          loading="lazy"
          draggable={false}
        />
        <motion.span
          className="px-1 text-center text-[11px] font-semibold leading-none whitespace-nowrap"
          animate={{ color: isActive ? brand.text : 'rgba(255,255,255,0.5)' }}
          transition={CARD_TRANSITION}
        >
          {tech.name}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView   = useInView(sectionRef, { amount: 0.35 });

  const sorted = useMemo(
    () => [...SKILLS].sort((a, b) => (IMPORTANCE[a.icon] ?? 99) - (IMPORTANCE[b.icon] ?? 99)),
    [],
  );

  const [seqIndex,     setSeqIndex]     = useState<number>(-1);   // auto-sequence cursor
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasPlayed,    setHasPlayed]    = useState(false);

  // Mutable refs so interval/timeout callbacks always see fresh values
  const timers      = useRef<{ interval?: number; timeout?: number }>({});
  const seqCursor   = useRef<number>(-1);   // mirrors seqIndex without closure staleness
  const isPaused    = useRef<boolean>(false);
  const isRunning   = useRef<boolean>(false);

  const clearTimers = useCallback(() => {
    window.clearInterval(timers.current.interval);
    window.clearTimeout(timers.current.timeout);
  }, []);

  // Advance one step — shared by both initial run and resume
  const step = useCallback(() => {
    seqCursor.current += 1;

    if (seqCursor.current >= sorted.length) {
      // Reached the end
      clearTimers();
      timers.current.timeout = window.setTimeout(() => {
        setSeqIndex(-1);
        isRunning.current = false;
        setHasPlayed(true);
      }, HOLD_LAST);
      return;
    }

    setSeqIndex(seqCursor.current);
  }, [sorted.length, clearTimers]);

  // Start (or resume) the interval from the current seqCursor position
  const startInterval = useCallback(() => {
    clearTimers();
    timers.current.interval = window.setInterval(step, STEP_INTERVAL);
  }, [step, clearTimers]);

  // ── Initial trigger ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isInView || hasPlayed || isRunning.current) return;

    isRunning.current = true;
    seqCursor.current = 0;
    setSeqIndex(0);

    timers.current.timeout = window.setTimeout(() => {
      startInterval();
    }, INITIAL_DELAY);

    return clearTimers;
  }, [isInView, hasPlayed, startInterval, clearTimers]);

  // ── Pause / resume on hover ──────────────────────────────────────────────
  useEffect(() => {
    if (!isRunning.current) return;

    if (hoveredIndex !== null) {
      // User is hovering — pause the sequence
      isPaused.current = true;
      clearTimers();
    } else if (isPaused.current) {
      // User left — wait a beat, then resume from where we left off
      isPaused.current = false;
      timers.current.timeout = window.setTimeout(() => {
        if (!hasPlayed) startInterval();
      }, RESUME_DELAY);
    }
  }, [hoveredIndex, hasPlayed, startInterval, clearTimers]);

  // ── Reset on scroll away ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isInView) {
      clearTimers();
      isRunning.current = false;
      isPaused.current  = false;
      seqCursor.current = -1;
      setSeqIndex(-1);
      setHoveredIndex(null);
      setHasPlayed(false);
    }
  }, [isInView, clearTimers]);

  // Hovered pill takes visual priority; sequence highlight shows when not hovering
  const displayIndex = hoveredIndex ?? seqIndex;

  return (
    <section id="skills" ref={sectionRef} className="mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-14 text-center"
      >
        <h2 className="heading mb-3 text-5xl md:text-6xl">
          Technos que je <span className="gradient-text">maîtrise</span>
        </h2>
        <p className="text-base text-white/40">Full-Stack · Mobile · Cloud</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4">
        {sorted.map((tech, i) => (
          <SkillPill
            key={tech.name}
            tech={tech}
            index={i}
            isActive={displayIndex === i}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={()  => setHoveredIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}