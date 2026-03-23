'use client';
// app/projects/[slug]/page.tsx
// Project detail: gallery, description, tech stack, links.

import { useParams, useRouter } from 'next/navigation';
import { projects, type ProjectType, TYPE_COLOR } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, Github, CalendarDays,
  ChevronLeft, ChevronRight, X, ZoomIn, Layers,
  Globe, Smartphone, Monitor, Clock, Users,
} from 'lucide-react';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SITE } from '@/data/config';

// ── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images, index, onClose, onPrev, onNext, onThumbClick,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onThumbClick?: (i: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/96 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <motion.button
        onClick={onClose}
        className="fixed top-4 right-4 glass p-2 rounded-lg z-10"
        whileHover={{ scale: 1.1, rotate: 90 }}
      >
        <X size={20} />
      </motion.button>

      {/* Counter */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-sm font-medium z-10">
        <span className="text-white/80">{index + 1} / {images.length}</span>
      </div>

      {/* Image */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt=""
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <motion.button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 glass p-3 rounded-lg z-10"
              whileHover={{ scale: 1.05 }}
            >
              <ChevronLeft size={24} className="text-white/80" />
            </motion.button>
            <motion.button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 glass p-3 rounded-lg z-10"
              whileHover={{ scale: 1.05 }}
            >
              <ChevronRight size={24} className="text-white/80" />
            </motion.button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/40 rounded-xl p-3 z-10 max-w-lg w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => onThumbClick?.(i)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  index === i ? 'border-purple-400 scale-110' : 'border-white/20 hover:border-white/40'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const router = useRouter();
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  const [imgIndex, setImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const images = project
    ? Array.from({ length: project.imageCount ?? 1 }, (_, i) =>
        `/project/${project.type}/${project.slug}/${i + 1}.jpg`,
      )
    : [];

  const prev = useCallback(() => setImgIndex((n) => (n - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setImgIndex((n) => (n + 1) % images.length), [images.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const el = thumbsRef.current?.children[imgIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [imgIndex]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Layers size={40} className="mx-auto mb-3 text-purple-400" />
          <h1 className="heading text-2xl mb-4">Projet non trouvé</h1>
          <button onClick={() => router.back()} className="glass px-4 py-2 rounded-lg flex items-center gap-2 mx-auto hover:bg-white/10 transition-all text-sm">
            <ArrowLeft size={16} /> Retour
          </button>
        </div>
      </div>
    );
  }

  const typeIcon = project.type === 'web' ? Globe : project.type === 'mobile' ? Smartphone : Monitor;
  const TypeIcon = typeIcon;

  return (
    <>
      <div className="min-h-screen text-white relative">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        {/* Back button */}
        <motion.button
          onClick={() => router.back()}
          className="fixed top-4 left-4 z-50 glass px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-white/10 transition-all group"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ x: -2 }}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Retour
        </motion.button>

        <div className="pt-4 pb-12 px-8 relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="heading text-3xl md:text-4xl">{project.title}</h1>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full capitalize font-medium border border-white/10 bg-gradient-to-r ${TYPE_COLOR[project.type]} backdrop-blur-md text-xs flex items-center gap-1`}>
                  <TypeIcon size={12} className="text-white/80" />
                  {project.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium">
                  {['Freelance', 'Open Source', 'Projet Personnel'].includes(project.company)
                    ? project.company
                    : `chez ${project.company}`}
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl">{project.desc}</p>
          </motion.div>

          {/* ── Single row: Gallery+Tech (left) + Sidebar (right) ── */}
          <div className="grid lg:grid-cols-3 gap-4 items-start">

            {/* Left column: Gallery + Technologies */}
            <div className="lg:col-span-2 space-y-4">

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Main image */}
              <div
                className="relative aspect-video bg-black/30 cursor-pointer group"
                onClick={() => setLightbox(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIndex}
                    src={images[imgIndex]}
                    alt={`${project.title} — ${imgIndex + 1}`}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </AnimatePresence>

                {/* Zoom hint */}
                <div className="absolute top-3 right-3 glass p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <ZoomIn size={16} className={project.type === 'web' ? 'text-cyan-400' : project.type === 'mobile' ? 'text-green-400' : 'text-purple-400'} />
                </div>

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 glass p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <ChevronLeft size={18} className="text-white/70" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); next(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 glass p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <ChevronRight size={18} className="text-white/70" />
                    </button>
                    <div className="absolute bottom-3 right-3 glass px-3 py-1 rounded-full text-xs font-medium">
                      <span className="text-white/70">{imgIndex + 1} / {images.length}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div ref={thumbsRef} className="flex gap-2 p-3 overflow-x-auto scrollbar-hide bg-black/10">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        imgIndex === i ? 'border-purple-400 scale-105' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

              {/* Technologies — below gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-4"
              >
                <h3 className="heading text-base mb-2 gradient-text">Technologies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <motion.span
                      key={t}
                      className="px-1.5 py-0.5 bg-white/5 rounded-md text-xs border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

            </div>{/* end left column */}

            {/* Sidebar — Description + Actions */}
            <div className="space-y-3">

              {/* Description */}
              {(project.fullDescription || project.desc) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="glass rounded-2xl p-4"
                >
                  <h2 className="heading text-base flex items-center gap-2 mb-2">
                    <Layers size={16} className="text-purple-400" />
                    <span className="gradient-text">Description</span>
                  </h2>
                  <p className="text-white/60 leading-relaxed text-xs">
                    {project.fullDescription ?? project.desc}
                  </p>
                </motion.div>
              )}

              {/* Actions / Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="glass rounded-2xl p-4 space-y-0.5"
              >
                <h3 className="heading text-base gradient-text">Actions</h3>

                {project.live && project.live !== '#' && (
                  <LinkButton
                    href={project.live}
                    icon={<ExternalLink size={16} />}
                    label="Voir le projet"
                    gradient="from-cyan-500 to-blue-600"
                  />
                )}
                {project.code && project.code !== '#' && (
                  <LinkButton
                    href={project.code}
                    icon={<Github size={16} />}
                    label="Code source"
                    gradient="from-purple-600 to-pink-600"
                  />
                )}
                <LinkButton
                  href={SITE.contact.cal}
                  icon={<CalendarDays size={16} />}
                  label="Discuter du projet"
                  sublabel="15-30 min"
                  gradient="from-pink-600 via-purple-600 to-indigo-700"
                />
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={images}
            index={imgIndex}
            onClose={() => setLightbox(false)}
            onPrev={prev}
            onNext={next}
            onThumbClick={setImgIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Helper ────────────────────────────────────────────────────────────────────

function LinkButton({
  href, icon, label, sublabel, gradient,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  gradient: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r ${gradient} hover:shadow-lg transition-all overflow-hidden relative group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2 relative z-10">
        <div className="bg-white/20 p-1 rounded-md">{icon}</div>
        <div>
          <div className="font-semibold text-xs">{label}</div>
          {sublabel && <div className="text-xs opacity-80">{sublabel}</div>}
        </div>
      </div>
      <ArrowLeft size={12} className="rotate-180 group-hover:translate-x-0.5 transition-transform relative z-10" />
    </motion.a>
  );
}