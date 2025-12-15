// app/projects/[slug]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
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
  Codesandbox,
  Layers,
  Zap,
  Globe,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function ProjectPage() {
  const router = useRouter();
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for scrolling thumbnails into view
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const lightboxThumbnailsContainerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for gradient effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center animate-pulse">
              <Layers size={64} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Projet non trouvé
          </h1>
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 mx-auto backdrop-blur-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} /> Retour
          </motion.button>
        </div>
      </div>
    );
  }

  const imageCount = project.imageCount || 1;
  const images = Array.from({ length: imageCount }, (_, i) => 
    `/project/${project.type}/${project.slug}/${i + 1}.jpg`
  );

  // Function to scroll thumbnails into view
  const scrollThumbnailIntoView = useCallback((index: number) => {
    if (thumbnailRefs.current[index] && thumbnailsContainerRef.current) {
      const thumbnail = thumbnailRefs.current[index];
      const container = thumbnailsContainerRef.current;
      const thumbnailWidth = thumbnail?.offsetWidth || 100;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      
      const thumbnailLeft = (thumbnail?.offsetLeft || 0) - container.offsetLeft;
      const thumbnailRight = thumbnailLeft + thumbnailWidth;
      
      if (thumbnailLeft < scrollLeft || thumbnailRight > scrollLeft + containerWidth) {
        container.scrollTo({
          left: thumbnailLeft - (containerWidth - thumbnailWidth) / 2,
          behavior: 'smooth'
        });
      }
    }
    
    if (lightboxThumbnailsContainerRef.current && isLightboxOpen) {
      const container = lightboxThumbnailsContainerRef.current;
      const thumbnail = thumbnailRefs.current[index];
      if (thumbnail) {
        const thumbnailWidth = thumbnail.offsetWidth || 80;
        const containerWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;
        
        const thumbnailLeft = thumbnail.offsetLeft - container.offsetLeft;
        const thumbnailRight = thumbnailLeft + thumbnailWidth;
        
        if (thumbnailLeft < scrollLeft || thumbnailRight > scrollLeft + containerWidth) {
          container.scrollTo({
            left: thumbnailLeft - (containerWidth - thumbnailWidth) / 2,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [isLightboxOpen]);

  const nextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setTimeout(() => scrollThumbnailIntoView(nextIndex), 100);
  }, [currentImageIndex, images.length, scrollThumbnailIntoView]);

  const prevImage = useCallback(() => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
    setTimeout(() => scrollThumbnailIntoView(prevIndex), 100);
  }, [currentImageIndex, images.length, scrollThumbnailIntoView]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    setTimeout(() => scrollThumbnailIntoView(index), 150);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (images.length <= 1) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevImage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextImage();
        break;
      case 'Escape':
        if (isLightboxOpen) {
          closeLightbox();
        }
        break;
    }
  }, [prevImage, nextImage, isLightboxOpen, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, images.length);
  }, [images.length]);

  const setThumbnailRef = useCallback((index: number) => (el: HTMLButtonElement | null) => {
    thumbnailRefs.current[index] = el;
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(6, 182, 212, 0.4); }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ff6bcb 0%, #8b5cf6 50%, #06b6d4 100%);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        
        .glass-strong {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }
        
        .animated-gradient-border {
          position: relative;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1));
          border: 2px solid transparent;
        }
        
        .animated-gradient-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #8b5cf6);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          border-radius: inherit;
          z-index: -1;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          margin: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        
        .custom-scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        .custom-scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
          border-radius: 4px;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scroll-snap-x {
          scroll-snap-type: x mandatory;
        }
        
        .scroll-snap-align-start {
          scroll-snap-align: start;
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
        }
        
        .image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.15), transparent 50%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 1;
        }
        
        .image-container:hover::before {
          opacity: 1;
        }
      `}</style>

      <div className="min-h-screen bg-[#0a0a12] text-white relative overflow-hidden">
        {/* Animated background gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Fixed back button with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-6 z-50"
        >
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 glass-strong rounded-2xl hover:bg-white/10 transition-all duration-300 text-sm font-medium group"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            <span>Retour</span>
          </motion.button>
        </motion.div>

        <div className="pt-24 pb-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-strong rounded-3xl overflow-hidden group/card relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  
                  {/* Image Gallery */}
                  <div
                    className="relative h-[28rem] bg-gradient-to-br from-black via-purple-950/30 to-black overflow-hidden group cursor-pointer image-container"
                    onClick={() => openLightbox(currentImageIndex)}
                    style={{
                      '--mouse-x': `${mousePosition.x}px`,
                      '--mouse-y': `${mousePosition.y}px`,
                    } as React.CSSProperties}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain bg-black/50 relative z-0"
                        initial={{ opacity: 0, scale: 1.1, rotateY: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                        transition={{ duration: 0.5 }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </AnimatePresence>

                    <motion.div 
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <ZoomIn size={20} className="text-cyan-400" />
                    </motion.div>

                    {images.length > 1 && (
                      <>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-md p-4 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/10"
                          whileHover={{ scale: 1.1, x: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft size={28} className="text-purple-400" />
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-md p-4 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/10"
                          whileHover={{ scale: 1.1, x: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRight size={28} className="text-cyan-400" />
                        </motion.button>

                        <motion.div 
                          className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-bold border border-white/10"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {currentImageIndex + 1} / {images.length}
                          </span>
                        </motion.div>
                      </>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Enhanced Thumbnails */}
                  {images.length > 1 && (
                    <div className="p-5 bg-gradient-to-r from-black/30 via-purple-950/20 to-black/30">
                      <div className="relative">
                        <div 
                          ref={thumbnailsContainerRef}
                          className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar scroll-snap-x"
                        >
                          {images.map((img, idx) => (
                            <motion.button
                              key={idx}
                              ref={setThumbnailRef(idx)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(idx);
                                scrollThumbnailIntoView(idx);
                              }}
                              className={`flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden border-2 transition-all duration-300 relative group/thumbnail scroll-snap-align-start ${
                                currentImageIndex === idx
                                  ? 'border-purple-500 scale-110 shadow-2xl shadow-purple-500/50'
                                  : 'border-white/20 hover:border-white/40 hover:scale-105'
                              }`}
                              whileHover={{ y: -5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover group-hover/thumbnail:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent transition-opacity duration-300 ${
                                currentImageIndex === idx ? 'opacity-100' : 'opacity-0 group-hover/thumbnail:opacity-100'
                              }`} />
                              <motion.div 
                                className={`absolute inset-0 flex items-center justify-center ${
                                  currentImageIndex === idx ? 'opacity-100' : 'opacity-0 group-hover/thumbnail:opacity-100'
                                } transition-opacity duration-300`}
                                whileHover={{ scale: 1.1 }}
                              >
                                <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center border border-purple-500/50">
                                  <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    {idx + 1}
                                  </span>
                                </div>
                              </motion.div>
                            </motion.button>
                          ))}
                        </div>
                        
                        {images.length > 6 && (
                          <motion.div 
                            className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none flex items-center justify-center"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ChevronRight size={24} className="text-white/60" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Project Info */}
                  <div className="p-8 relative">
                    <motion.div 
                      className="flex flex-wrap gap-3 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.span 
                        className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm font-medium backdrop-blur-sm"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}
                      >
                        {project.company === 'Freelance' ? 'Freelance' : project.company}
                      </motion.span>
                      <motion.span
                        className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider border backdrop-blur-sm font-bold flex items-center gap-1.5 transition-all duration-300 ${
                          project.type === 'web'
                            ? 'bg-cyan-500/10 border-cyan-500/30'
                            : project.type === 'mobile'
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-purple-500/10 border-purple-500/30'
                        }`}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: project.type === 'web' 
                            ? 'rgba(34, 211, 238, 0.15)' 
                            : project.type === 'mobile'
                            ? 'rgba(34, 197, 94, 0.15)'
                            : 'rgba(168, 85, 247, 0.15)'
                        }}
                      >
                        {project.type === 'web' && <Globe size={12} className="text-cyan-400" />}
                        {project.type === 'mobile' && <Smartphone size={12} className="text-green-400" />}
                        {project.type === 'desktop' && <Monitor size={12} className="text-purple-400" />}
                        <span>{project.type}</span>
                      </motion.span>
                    </motion.div>
                    <motion.h1 
                      className="text-4xl md:text-6xl font-black mb-6 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.title.split(' ').map((word, i) => (
                        <motion.span 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          {i === 1 ? <span className="gradient-text">{word} </span> : word + ' '}
                        </motion.span>
                      ))}
                    </motion.h1>
                    <motion.p 
                      className="text-lg text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {project.desc}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Enhanced Full description */}
                {(project.fullDescription || project.desc) && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-strong rounded-3xl p-8 relative overflow-hidden group/desc"
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover/desc:opacity-100 transition-opacity duration-500" />
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 relative z-10">
                      <Layers className="text-purple-400" size={28} />
                      <span className="gradient-text">À propos</span>
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-base custom-scrollbar-thin max-h-96 overflow-y-auto pr-4 relative z-10">
                      {project.fullDescription || project.desc}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-8">
                {/* Enhanced Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-strong rounded-3xl p-8 relative overflow-hidden group/tech"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
                    <Codesandbox size={24} className="text-pink-400" />
                    <span className="gradient-text">Technologies</span>
                  </h3>
                  <div className="flex flex-wrap gap-3 max-h-80 overflow-y-auto custom-scrollbar-thin pr-2 relative z-10">
                    {project.tech.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2.5 bg-white/5 rounded-xl text-xs border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 font-medium backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2, boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Links */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-strong rounded-3xl p-8 space-y-5 relative overflow-hidden"
                >
                  <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                    <ExternalLink className="text-cyan-400" size={24} />
                    <span className="gradient-text">Liens</span>
                  </h3>
                  {project.live && project.live !== '#' && (
                    <motion.a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block"
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 relative overflow-hidden group/link">
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/link:translate-x-[200%] transition-transform duration-1000" />

                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm flex-shrink-0">
                            <ExternalLink size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-base leading-tight">Voir le projet</div>
                          </div>
                        </div>

                        <ArrowLeft className="rotate-180 group-hover/link:translate-x-1 transition-transform flex-shrink-0" size={20} />
                      </div>
                    </motion.a>
                  )}
                  {project.code && project.code !== '#' && (
                    <motion.a 
                      href={project.code} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block"
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group/link">
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/link:translate-x-[200%] transition-transform duration-1000" />

                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm flex-shrink-0">
                            <Github size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-base leading-tight">Code source</div>
                          </div>
                        </div>

                        <ArrowLeft className="rotate-180 group-hover/link:translate-x-1 transition-transform flex-shrink-0" size={20} />
                      </div>
                    </motion.a>
                  )}
                <motion.a
                  href="https://cal.com/yassin-daboussi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 p-4 rounded-2xl text-center transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/50 relative overflow-hidden group/cal flex items-center justify-center gap-3">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/cal:translate-x-[200%] transition-transform duration-1000" />

                    {/* Icône animée à gauche */}
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="flex-shrink-0"
                    >
                      <CalendarDays size={24} />
                    </motion.div>

                    {/* Texte principal */}
                    <div className="text-left">
                      <div className="font-bold text-base leading-tight">Discuter du projet</div>
                      <div className="text-xs opacity-90">15–30 min</div>
                    </div>
                  </div>
                </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/97 backdrop-blur-xl flex items-center justify-center"
              onClick={closeLightbox}
            >
              <motion.button
                onClick={closeLightbox}
                className="fixed top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-2xl transition-all duration-300 z-[101] border border-white/10 group/close"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} className="group-hover/close:text-red-400 transition-colors" />
              </motion.button>

              {/* Enhanced Keyboard hint */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed top-6 left-6 glass-strong px-5 py-3 rounded-2xl text-sm z-[101] flex items-center gap-3 border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <kbd className="px-3 py-2 bg-white/10 rounded-lg text-xs font-bold border border-white/20">←</kbd>
                  <span className="text-xs opacity-75">/</span>
                  <kbd className="px-3 py-2 bg-white/10 rounded-lg text-xs font-bold border border-white/20">→</kbd>
                </div>
                <span className="text-xs opacity-90 ml-1">pour naviguer</span>
                <div className="w-px h-4 bg-white/20 mx-1" />
                <kbd className="px-3 py-2 bg-white/10 rounded-lg text-xs font-bold border border-white/20">ESC</kbd>
              </motion.div>

              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed top-6 left-1/2 -translate-x-1/2 glass-strong px-8 py-4 rounded-full text-xl font-bold z-[101] border border-white/10"
                >
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                </motion.div>
              )}

              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-5 rounded-2xl transition-all duration-300 z-[101] group border border-white/10"
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={36} className="text-purple-400" />
                      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/90 text-white px-4 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm border border-white/10">
                        Précédent (←)
                      </div>
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-5 rounded-2xl transition-all duration-300 z-[101] group border border-white/10"
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={36} className="text-cyan-400" />
                      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 text-white px-4 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm border border-white/10">
                        Suivant (→)
                      </div>
                    </motion.button>
                  </>
                )}
              </div>

              {/* Enhanced Lightbox Thumbnails */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 p-5 z-[101] w-full max-w-5xl px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div 
                    ref={lightboxThumbnailsContainerRef}
                    className="glass-strong rounded-3xl p-5 custom-scrollbar overflow-x-auto scroll-snap-x border border-white/10"
                  >
                    <div className="flex gap-4 min-w-max">
                      {images.map((img, idx) => (
                        <motion.button
                          key={idx}
                          ref={setThumbnailRef(idx)}
                          onClick={() => {
                            setCurrentImageIndex(idx);
                            scrollThumbnailIntoView(idx);
                          }}
                          className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 relative group/lightbox-thumb scroll-snap-align-start ${
                            currentImageIndex === idx
                              ? 'border-purple-500 scale-110 shadow-2xl shadow-purple-500/60'
                              : 'border-white/30 hover:border-white/60 hover:scale-105'
                          }`}
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img 
                            src={img} 
                            alt={`Thumbnail ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover/lightbox-thumb:scale-110 transition-transform duration-500" 
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent ${
                            currentImageIndex === idx ? 'opacity-100' : 'opacity-0 group-hover/lightbox-thumb:opacity-100'
                          } transition-opacity duration-300`} />
                          <motion.div 
                            className={`absolute inset-0 flex items-center justify-center ${
                              currentImageIndex === idx ? 'opacity-100' : 'opacity-0 group-hover/lightbox-thumb:opacity-100'
                            } transition-opacity duration-300`}
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center border-2 border-purple-500/50">
                              <span className="text-xs font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                {idx + 1}
                              </span>
                            </div>
                          </motion.div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}