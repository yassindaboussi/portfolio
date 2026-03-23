'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Globe, Smartphone, Monitor, CodeXml, Eye, Github, ExternalLink, Search } from 'lucide-react';
import { projects, type ProjectType } from '@/data/projects';

const FILTERS = [
  { key: 'all',     label: 'Tous',    icon: CodeXml,    color: 'from-purple-500 to-pink-500' },
  { key: 'web',     label: 'Web',     icon: Globe,      color: 'from-blue-500 to-cyan-500' },
  { key: 'mobile',  label: 'Mobile',  icon: Smartphone, color: 'from-emerald-500 to-green-500' },
  { key: 'desktop', label: 'Desktop', icon: Monitor,    color: 'from-indigo-500 to-purple-600' },
] as const;

const TYPE_COLOR: Record<ProjectType, string> = {
  web:     'from-blue-400/50 to-cyan-400/50',
  mobile:  'from-emerald-400/50 to-green-400/50',
  desktop: 'from-indigo-400/50 to-purple-400/50',
};

const TYPE_PLACEHOLDER: Record<ProjectType, string> = {
  web:     'from-blue-900/40 to-cyan-900/40',
  mobile:  'from-emerald-900/40 to-green-900/40',
  desktop: 'from-indigo-900/40 to-purple-900/40',
};

export default function Projects() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | ProjectType>('all');

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="heading text-5xl text-center mb-3">
          Mes <span className="gradient-text">Projets</span>
        </h2>
        <p className="text-center text-white/50 mb-10">Des solutions complètes, livrées avec passion</p>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map(({ key, label, icon: Icon, color }) => {
            const active = filter === key;
            const count = key === 'all' ? projects.length : projects.filter((p) => p.type === key).length;
            return (
              <motion.button
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active
                    ? `bg-gradient-to-r ${color} text-white shadow-lg`
                    : 'glass hover:bg-white/10 text-white/70'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
                {label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${active ? 'bg-white/20' : 'bg-white/5'}`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
                  whileHover={{ y: -7 }}
                >
                  {/* Banner image — 16:9 aspect ratio */}
                  <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${TYPE_PLACEHOLDER[project.type]}`}>
                    <img
                      src={`/project/${project.type}/${project.slug}/1.jpg`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Placeholder letter shown behind image */}
                    <div className="absolute inset-0 flex items-center justify-center -z-0">
                      <span className="text-8xl font-black text-white/5 select-none">
                        {project.title[0]}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full capitalize font-medium border border-white/10 bg-gradient-to-r ${TYPE_COLOR[project.type]} backdrop-blur-md`}>
                      {project.type}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <h3 className="heading text-xl mb-1">{project.title}</h3>
                    <p className="text-xs text-purple-300 font-medium mb-3">
                      {['Freelance', 'Open Source', 'Projet Personnel'].includes(project.company)
                        ? project.company
                        : `chez ${project.company}`}
                    </p>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.desc}</p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs text-white/50 self-center font-medium">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t border-white/8">
                      <motion.button
                        onClick={() => router.push(`/projects/${project.slug}`)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        whileTap={{ scale: 0.97 }}
                      >
                        <Eye size={15} /> Voir le détail
                      </motion.button>

                      {project.code && project.code !== '#' && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass px-3 py-2.5 rounded-lg hover:bg-white/15 transition-all flex items-center justify-center"
                          title="Code source"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.live && project.live !== '#' && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass px-3 py-2.5 rounded-lg hover:bg-white/15 transition-all flex items-center justify-center"
                          title="Démo en direct"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center py-16 text-center gap-4"
              >
                <Search size={40} className="mx-auto mb-4 text-white/30" />
                <h3 className="heading text-2xl">Aucun projet trouvé</h3>
                <p className="text-white/50">Essayez un autre filtre.</p>
                <button
                  onClick={() => setFilter('all')}
                  className="mt-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full font-medium text-sm"
                >
                  Voir tous les projets
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
