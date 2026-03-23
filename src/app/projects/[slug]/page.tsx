'use client';

import { useParams, useRouter } from 'next/navigation';
import { projects, TYPE_COLOR } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Layers,
  Globe,
  Smartphone,
  Monitor,
  Building2,
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { SITE } from '@/data/config';

// ── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  onThumbClick,
  hasMoreThumbs,
  thumbStartIndex,
  visibleThumbs,
  scrollThumbsLeft,
  scrollThumbsRight,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onThumbClick?: (i: number) => void;
  hasMoreThumbs: boolean;
  thumbStartIndex: number;
  visibleThumbs: number;
  scrollThumbsLeft: () => void;
  scrollThumbsRight: () => void;
}) {
  const visibleImages = hasMoreThumbs
    ? images.slice(thumbStartIndex, thumbStartIndex + visibleThumbs)
    : images;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      <motion.button
        onClick={onClose}
        className="fixed top-4 right-4 z-20 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-3 text-white/80 hover:text-white hover:bg-white/15 transition-all"
        whileHover={{ scale: 1.05, rotate: 90 }}
      >
        <X size={18} />
      </motion.button>

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-20 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-2 text-sm text-white/80">
        {index + 1} / {images.length}
      </div>

      <div
        className="relative flex h-full w-full items-center justify-center p-4 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt=""
            className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <motion.button
              onClick={onPrev}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-3 text-white/80 hover:text-white hover:bg-white/15 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <ChevronLeft size={22} />
            </motion.button>

            <motion.button
              onClick={onNext}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-3 text-white/80 hover:text-white hover:bg-white/15 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <ChevronRight size={22} />
            </motion.button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-2xl border border-white/20 bg-white/20 p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            {hasMoreThumbs && thumbStartIndex > 0 && (
              <motion.button
                onClick={scrollThumbsLeft}
                className="rounded-xl border border-white/10 bg-white/10 p-1.5 text-white/80 hover:text-white hover:bg-white/15 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <ChevronLeft size={14} />
              </motion.button>
            )}

            <div className="flex gap-2">
              {visibleImages.map((src, i) => {
                const actualIndex = hasMoreThumbs ? thumbStartIndex + i : i;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => onThumbClick?.(actualIndex)}
                    className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      index === actualIndex
                        ? 'border-purple-400 scale-105'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>

            {hasMoreThumbs && thumbStartIndex + visibleThumbs < images.length && (
              <motion.button
                onClick={scrollThumbsRight}
                className="rounded-xl border border-white/10 bg-white/10 p-1.5 text-white/80 hover:text-white hover:bg-white/15 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <ChevronRight size={14} />
              </motion.button>
            )}
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

  // Thumbnail pagination state
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const visibleThumbs = 6;
  const hasMoreThumbs = project ? (project.imageCount ?? 1) > visibleThumbs : false;

  const images = project
    ? Array.from({ length: project.imageCount ?? 1 }, (_, i) =>
        `/project/${project.type}/${project.slug}/${i + 1}.jpg`,
      )
    : [];

  // ── Navigation with thumbnail sync ───────────────────────────────────────

  const prev = useCallback(() => {
    const newIndex = (imgIndex - 1 + images.length) % images.length;

    if (hasMoreThumbs) {
      if (imgIndex === 0) {
        // Wrapping from first → last: scroll thumbnails to show last image
        setThumbStartIndex(Math.max(0, images.length - visibleThumbs));
      } else if (newIndex < thumbStartIndex) {
        // Stepped behind the visible window
        setThumbStartIndex(Math.max(0, thumbStartIndex - visibleThumbs));
      }
    }

    setImgIndex(newIndex);
  }, [imgIndex, images.length, hasMoreThumbs, thumbStartIndex, visibleThumbs]);

  const next = useCallback(() => {
    const newIndex = (imgIndex + 1) % images.length;

    if (hasMoreThumbs) {
      if (imgIndex === images.length - 1) {
        // Wrapping from last → first: scroll thumbnails back to start
        setThumbStartIndex(0);
      } else if (newIndex >= thumbStartIndex + visibleThumbs) {
        // Stepped beyond the visible window
        setThumbStartIndex(
          Math.min(images.length - visibleThumbs, thumbStartIndex + visibleThumbs),
        );
      }
    }

    setImgIndex(newIndex);
  }, [imgIndex, images.length, hasMoreThumbs, thumbStartIndex, visibleThumbs]);

  const scrollThumbsLeft = () => {
    setThumbStartIndex(Math.max(0, thumbStartIndex - visibleThumbs));
  };

  const scrollThumbsRight = () => {
    setThumbStartIndex(
      Math.min(images.length - visibleThumbs, thumbStartIndex + visibleThumbs),
    );
  };

  // ── Side effects ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (lightbox) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (images.length <= 1) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (lightbox && e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, prev, next, lightbox]);

  useEffect(() => {
    const el = thumbsRef.current?.children[imgIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [imgIndex]);

  // ── Not found ─────────────────────────────────────────────────────────────

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <Layers size={40} className="mx-auto mb-3 text-purple-400" />
          <h1 className="heading mb-4 text-2xl">Projet non trouvé</h1>
          <button
            onClick={() => router.back()}
            className="mx-auto flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl transition-all hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Retour
          </button>
        </div>
      </div>
    );
  }

  const TypeIcon =
    project.type === 'web' ? Globe : project.type === 'mobile' ? Smartphone : Monitor;

  const companyLabel = ['Freelance', 'Open Source', 'Projet Personnel'].includes(project.company)
    ? project.company
    : `chez ${project.company}`;

  // Visible thumbnails slice
  const visibleImages = hasMoreThumbs
    ? images.slice(thumbStartIndex, thumbStartIndex + visibleThumbs)
    : images;

  return (
    <>
      <div className="relative min-h-screen overflow-hidden text-white">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />
          <div className="absolute right-[-120px] top-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[-120px] left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        {/* Floating back */}
        <motion.button
          onClick={() => router.back()}
          className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-medium text-white/80 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-white"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ x: -2 }}
        >
          <ArrowLeft size={14} />
          Retour
        </motion.button>

        <main className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
          {/* Unified shell */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-2xl"
          >
            {/* Top header strip */}
            <div className="border-b border-white/10 px-5 py-5 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <h1 className="heading text-2xl sm:text-3xl lg:text-4xl leading-tight">
                    {project.title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-[15px]">
                    {project.desc}
                  </p>
                </div>

                {/* Desktop CTA cluster */}
                <div className="hidden lg:block flex-shrink-0">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-2">
                    {project.live && project.live !== '#' && (
                      <ActionButton
                        href={project.live}
                        icon={<ExternalLink size={16} />}
                        label="Voir le projet"
                        sublabel="Live / Preview"
                        variant="primary"
                      />
                    )}
                    {project.code && project.code !== '#' && (
                      <ActionButton
                        href={project.code}
                        icon={<Github size={16} />}
                        label="Code source"
                        sublabel="Repository"
                        variant="secondary"
                      />
                    )}
                    <ActionButton
                      href={SITE.contact.cal}
                      icon={<CalendarDays size={16} />}
                      label="Discuter du projet"
                      sublabel="15–30 min"
                      variant="ghost"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
              {/* Visual zone */}
              <div className="border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
                {/* Main image */}
                <div
                  className="group relative h-[400px] w-full cursor-pointer overflow-hidden bg-black/25"
                  onClick={() => setLightbox(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={images[imgIndex]}
                      alt={`${project.title} — ${imgIndex + 1}`}
                      className="h-full w-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  <div className="absolute right-4 top-4 rounded-2xl border border-white/10 bg-black/20 p-2 text-white/80 backdrop-blur-xl opacity-0 transition-all group-hover:opacity-100">
                    <ZoomIn size={16} />
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prev();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/20 p-2.5 text-white/80 backdrop-blur-xl opacity-0 transition-all hover:text-white group-hover:opacity-100"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          next();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/20 p-2.5 text-white/80 backdrop-blur-xl opacity-0 transition-all hover:text-white group-hover:opacity-100"
                      >
                        <ChevronRight size={18} />
                      </button>

                      <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-medium text-white/75 backdrop-blur-xl">
                        {imgIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                <div className="space-y-4 px-5 py-5 sm:px-6 lg:px-8">
                  {images.length > 1 && (
                    <div className="flex items-center gap-2">
                      {/* Left scroll button — only show when there are hidden thumbs to the left */}
                      {hasMoreThumbs && thumbStartIndex > 0 && (
                        <button
                          onClick={scrollThumbsLeft}
                          className="rounded-xl border border-white/10 bg-white/10 p-1.5 text-white/80 hover:text-white hover:bg-white/15 transition-all flex-shrink-0"
                        >
                          <ChevronLeft size={14} />
                        </button>
                      )}

                      <div
                        ref={thumbsRef}
                        className="flex gap-2 overflow-x-auto scrollbar-hide"
                      >
                        {visibleImages.map((src, i) => {
                          const actualIndex = hasMoreThumbs ? thumbStartIndex + i : i;
                          return (
                            <button
                              key={actualIndex}
                              onClick={() => setImgIndex(actualIndex)}
                              className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-2xl border transition-all ${
                                imgIndex === actualIndex
                                  ? 'border-purple-400/80 ring-1 ring-purple-400/30'
                                  : 'border-white/10 hover:border-white/25'
                              }`}
                            >
                              <img src={src} alt="" className="h-full w-full object-cover" />
                            </button>
                          );
                        })}
                      </div>

                      {/* Right scroll button — only show when there are hidden thumbs to the right */}
                      {hasMoreThumbs && thumbStartIndex + visibleThumbs < images.length && (
                        <button
                          onClick={scrollThumbsRight}
                          className="rounded-xl border border-white/10 bg-white/10 p-1.5 text-white/80 hover:text-white hover:bg-white/15 transition-all flex-shrink-0"
                        >
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Info rail */}
              <aside className="flex flex-col">
                <div className="flex-1 px-5 py-5 sm:px-6 lg:px-8">
                  <div className="space-y-6">
                    <section>
                      <h2 className="mb-3 text-sm font-semibold tracking-wide text-white/90">
                        À propos du projet
                      </h2>

                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-gradient-to-r px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${TYPE_COLOR[project.type]}`}
                        >
                          <TypeIcon size={12} />
                          {project.type}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70">
                          <Building2 size={12} />
                          {companyLabel}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-white/65">
                        {project.fullDescription ?? project.desc}
                      </p>

                      <div className="mt-2">
                        <div className="mb-2 flex items-center gap-2">
                          <Layers size={15} className="text-purple-400" />
                          <h2 className="text-sm font-semibold tracking-wide text-white/90">
                            Technologies
                          </h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 transition-all hover:border-white/20 hover:bg-white/8"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Mobile/tablet actions */}
                    <section className="lg:hidden">
                      <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/90">
                        Actions
                      </h3>

                      <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-2">
                        {project.live && project.live !== '#' && (
                          <ActionButton
                            href={project.live}
                            icon={<ExternalLink size={16} />}
                            label="Voir le projet"
                            sublabel="Live / Preview"
                            variant="primary"
                          />
                        )}
                        {project.code && project.code !== '#' && (
                          <ActionButton
                            href={project.code}
                            icon={<Github size={16} />}
                            label="Code source"
                            sublabel="Repository"
                            variant="secondary"
                          />
                        )}
                        <ActionButton
                          href={SITE.contact.cal}
                          icon={<CalendarDays size={16} />}
                          label="Discuter du projet"
                          sublabel="15–30 min"
                          variant="ghost"
                        />
                      </div>
                    </section>
                  </div>
                </div>
              </aside>
            </div>
          </motion.section>
        </main>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={images}
            index={imgIndex}
            onClose={() => setLightbox(false)}
            onPrev={prev}
            onNext={next}
            onThumbClick={(i) => {
              setImgIndex(i);
              // When clicking a thumb in lightbox, also sync the main strip
              if (hasMoreThumbs) {
                const batchStart = Math.floor(i / visibleThumbs) * visibleThumbs;
                setThumbStartIndex(Math.min(batchStart, images.length - visibleThumbs));
              }
            }}
            hasMoreThumbs={hasMoreThumbs}
            thumbStartIndex={thumbStartIndex}
            visibleThumbs={visibleThumbs}
            scrollThumbsLeft={scrollThumbsLeft}
            scrollThumbsRight={scrollThumbsRight}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── UI Helpers ───────────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-2">
      <div className="flex min-w-0 items-center gap-1.5 text-white/70">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          {icon}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wide text-white/45">
          {label}
        </span>
      </div>
      <span className="truncate text-right text-xs font-medium text-white/85">{value}</span>
    </div>
  );
}

function ActionButton({
  href,
  icon,
  label,
  sublabel,
  variant,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  variant: 'primary' | 'secondary' | 'ghost';
}) {
  const styles =
    variant === 'primary'
      ? 'border-cyan-400/20 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 hover:from-cyan-500/20 hover:to-blue-500/20'
      : variant === 'secondary'
      ? 'border-purple-400/20 bg-gradient-to-r from-purple-500/15 to-fuchsia-500/15 hover:from-purple-500/20 hover:to-fuchsia-500/20'
      : 'border-white/10 bg-white/5 hover:bg-white/10';

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`group flex items-center justify-center rounded-lg border px-4 py-2 backdrop-blur-xl transition-all min-w-40 h-16 ${styles}`}
    >
      <div className="flex items-center gap-2 text-left">
        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/8 text-white/85">
          {icon}
        </div>
        <div>
          <div className="text-xs font-semibold text-white/90">{label}</div>
          {sublabel && <div className="text-[10px] text-white/50">{sublabel}</div>}
        </div>
      </div>
    </motion.a>
  );
}