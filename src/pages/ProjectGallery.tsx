import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NEWS_ARTICLES } from '../newsData';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';

type ProjectCategory = 'All' | 'Healthcare' | 'Data Center' | 'Infrastructure' | 'Life Sciences' | 'Technology';

const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = ['All', 'Healthcare', 'Data Center', 'Infrastructure', 'Life Sciences', 'Technology'];

  // Filter projects based on category and search query
  const filteredProjects = NEWS_ARTICLES.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-slate-50 min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-1 w-12 bg-blue-700" />
            <span className="uppercase tracking-[0.3em] text-xs font-bold text-blue-700">
              DPR Portfolio
            </span>
            <div className="h-1 w-12 bg-blue-700" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Explore Our Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg"
          >
            Discover how we deliver complex, sustainable, and high-impact engineering solutions across the globe.
          </motion.p>
        </div>

        {/* Filter Controls & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm mb-12 flex flex-col md:flex-row gap-6 justify-between items-center"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${selectedCategory === category
                    ? 'bg-blue-700 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search projects, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-700 transition-all bg-slate-50"
            />
          </div>
        </motion.div>

        {/* Grid and Animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-slate-200/80 flex flex-col h-full"
                onClick={() => {
                  window.history.pushState({}, '', `/projects/${project.slug}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
              >
                {/* Image Section */}
                <div className="h-56 overflow-hidden relative bg-slate-100 shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback image if source fails
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-blue-50">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-slate-400 text-xs font-semibold mb-2 flex items-center justify-between">
                    <span>{project.location}</span>
                    <span>{project.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow text-justify">
                    {project.overview}
                  </p>
                  <div className="flex items-center text-blue-700 font-bold text-sm tracking-wide group-hover:gap-2 transition-all duration-300 mt-auto">
                    View Project Details
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300"
          >
            <SlidersHorizontal className="mx-auto text-slate-400 mb-4" size={40} />
            <h3 className="text-lg font-bold text-slate-700 mb-1">No Projects Found</h3>
            <p className="text-slate-500 text-sm">Try resetting filters or adjusting search terms.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
