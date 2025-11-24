// app/projects/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CalendarDays, Sparkles } from 'lucide-react';

export default function ProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const project = projects.find(p => p.id === Number(id));

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
                {/* Hero */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl overflow-hidden"
                >
                  <div className="h-64 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-cyan-900/30 relative overflow-hidden flex items-center justify-center">
                    <motion.div
                      className="text-9xl font-black opacity-10"
                      animate={{ y: [0, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 10 }}
                    >
                      {project.title[0]}
                    </motion.div>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-sm">
                        {project.company}
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
      </div>
    </>
  );
}