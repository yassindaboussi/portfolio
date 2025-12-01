// app/projects/[id]/page.tsx
'use client';
import { useParams, useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CalendarDays, Sparkles, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

export default function ProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const project = projects.find(p => p.id === Number(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Projet non trouvé
          </h1>
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
            whileHover={{ scale: 1.05 }}
          >
            <ArrowLeft size={18} /> Retour
          </motion.button>
        </div>
      </div>
    );
  }

  const imageCount = project.imageCount || 1;
  const images = Array.from({ length: imageCount }, (_, i) => 
    `/project/${project.type}/${project.id}/${i + 1}.jpg`
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #ff6bcb 0%, #8b5cf6 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>

      <div className="min-h-screen bg-[#0a0a12] text-white">
        {/* Fixed back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-6 z-50"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-sm font-medium"
          >
            <ArrowLeft size={16} /> Retour
          </button>
        </motion.div>

        <div className="pt-24 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content - 2/3 */}
              <div className="lg:col-span-2 space-y-10">
                {/* Hero with Image Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl overflow-hidden"
                >
                  {/* Image Gallery */}
                  <div className="relative h-96 bg-black overflow-hidden group cursor-pointer"
                       onClick={() => openLightbox(currentImageIndex)}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain bg-black"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        onError={(e) => {
                          // Fallback to gradient if image doesn't exist
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </AnimatePresence>

                    {/* Zoom Icon Hint */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                      <ZoomIn size={20} />
                    </div>

                    {/* Navigation Arrows - Only show if multiple images */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight size={24} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Thumbnail Navigation - Only show if multiple images */}
                  {images.length > 1 && (
                    <div className="p-4 bg-black/20 flex gap-2 overflow-x-auto">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                            currentImageIndex === idx 
                              ? 'border-purple-500 scale-105' 
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="p-8">
                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-sm">
                        {project.company === 'Freelance' ? 'Freelance' : project.company}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white/5 text-xs uppercase tracking-wider">
                        {project.type}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                      {project.title.split(' ').map((word, i) => (
                        <span key={i}>
                          {i === 1 ? <span className="gradient-text">{word} </span> : word + ' '}
                        </span>
                      ))}
                    </h1>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Description */}
                {(project.fullDescription || project.desc) && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-8"
                  >
                    <h2 className="text-2xl font-bold mb-5">À propos</h2>
                    <p className="text-gray-300 leading-relaxed text-base">
                      {project.fullDescription || project.desc}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Sidebar - 1/3 */}
              <div className="space-y-8">
                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl p-7"
                >
                  <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                    <Sparkles size={20} className="text-pink-400" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white/5 rounded-lg text-xs border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Links */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-2xl p-7 space-y-5"
                >
                  <h3 className="text-lg font-bold">Liens</h3>
                  {project.live && project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-xl flex items-center justify-between hover:scale-105 transition">
                        <div className="flex items-center gap-3">
                          <ExternalLink size={20} />
                          <span className="font-medium">Voir le projet</span>
                        </div>
                        <ArrowLeft className="rotate-180" size={18} />
                      </div>
                    </a>
                  )}
                  {project.code && project.code !== '#' && (
                    <a href={project.code} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl flex items-center justify-between hover:scale-105 transition">
                        <div className="flex items-center gap-3">
                          <Github size={20} />
                          <span className="font-medium">Code source</span>
                        </div>
                        <ArrowLeft className="rotate-180" size={18} />
                      </div>
                    </a>
                  )}
                  <a
                    href="https://cal.com/yassin-daboussi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-6"
                  >
                    <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 p-6 rounded-2xl text-center hover:scale-105 transition shadow-lg">
                      <CalendarDays className="mx-auto mb-2" size={28} />
                      <div className="font-bold">Discuter du projet</div>
                      <div className="text-xs opacity-80 mt-1">15–30 min</div>
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={closeLightbox}
                className="fixed top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition z-[101]"
              >
                <X size={24} />
              </motion.button>

              {/* Image Counter */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-medium z-[101]"
                >
                  {currentImageIndex + 1} / {images.length}
                </motion.div>
              )}

              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition z-[101]"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition z-[101]"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-4 bg-black/60 backdrop-blur-sm rounded-2xl max-w-[90vw] overflow-x-auto z-[101]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition ${
                        currentImageIndex === idx
                          ? 'border-purple-500 scale-110'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}