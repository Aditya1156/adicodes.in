import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../lib/data';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { SearchIcon, FilterIcon, GridIcon, ListIcon, CloseIcon } from './icons/UIIcons';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Project } from '../types';

interface FilterState {
  category: string;
  technology: string;
  status: string;
  featured: boolean | null;
}

type SortOption = 'date' | 'name' | 'popularity' | 'status';
type ViewMode = 'grid' | 'list';

const EnhancedProjectGallery: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    technology: '',
    status: '',
    featured: null
  });
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle project click to open modal
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  // Handle modal close
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = Array.from(new Set(['Web App', 'AI/ML', 'Mobile', 'API', 'Tool'])); // Static categories
    const technologies = Array.from(new Set(PROJECTS.flatMap((p: Project) => p.tags || [])));
    const statuses = Array.from(new Set(PROJECTS.map((p: Project) => p.status).filter(Boolean)));
    
    return { categories, technologies, statuses };
  }, []);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = PROJECTS.filter((project: Project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tags?.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !filters.category; // Skip category filtering for now since it's not in the data
      
      const matchesTechnology = !filters.technology || 
                               (project.tags && project.tags.includes(filters.technology));
      
      const matchesStatus = !filters.status || project.status === filters.status;
      
      const matchesFeatured = filters.featured === null || project.featured === filters.featured;

      return matchesSearch && matchesCategory && matchesTechnology && matchesStatus && matchesFeatured;
    });

    // Sort projects
    filtered.sort((a: Project, b: Project) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return (a.featured ? 1 : 0) - (b.featured ? 1 : 0); // Use featured as popularity indicator
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        case 'date':
        default:
          return a.title.localeCompare(b.title); // Fallback to name sorting
      }
    });

    return filtered;
  }, [searchTerm, filters, sortBy]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({
      category: '',
      technology: '',
      status: '',
      featured: null
    });
    setSortBy('date');
  }, []);

  // Update filter
  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.5 }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.3 }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.2 }
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Modern Header with Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        {/* Enhanced Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/5 backdrop-blur-sm text-slate-100 placeholder-slate-400 transition-all duration-300 hover:bg-white/10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Modern View Mode Toggle */}
          <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              title="Grid view"
            >
              <GridIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              title="List view"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Enhanced Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-slate-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-white/10"
          >
            <option value="date">Latest First</option>
            <option value="name">Name A-Z</option>
            <option value="popularity">Most Popular</option>
            <option value="status">By Status</option>
          </select>

          {/* Modern Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-sm border ${
              showFilters
                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FilterIcon className="w-4 h-4" />
            Filters
            {Object.values(filters).some(v => v !== '' && v !== null) && (
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Modern Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <FilterIcon className="w-5 h-5 text-blue-400" />
                Advanced Filters
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-slate-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-white/10"
                >
                  <option value="">All Categories</option>
                  {filterOptions.categories.map((category: string) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Technology Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Technology
                </label>
                <select
                  value={filters.technology}
                  onChange={(e) => updateFilter('technology', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-slate-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-white/10"
                >
                  <option value="">All Technologies</option>
                  {filterOptions.technologies.map((tech: string) => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-slate-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-white/10"
                >
                  <option value="">All Statuses</option>
                  {filterOptions.statuses.map((status: string) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Featured Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Featured
                </label>
                <select
                  value={filters.featured === null ? '' : filters.featured.toString()}
                  onChange={(e) => updateFilter('featured', e.target.value === '' ? null : e.target.value === 'true')}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-slate-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-white/10"
                >
                  <option value="">All Projects</option>
                  <option value="true">Featured Only</option>
                  <option value="false">Non-Featured</option>
                </select>
              </div>
            </div>

            {/* Active Filters Summary */}
            {Object.values(filters).some(v => v !== '' && v !== null) && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {filters.category && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm border border-indigo-500/30">
                      Category: {filters.category}
                      <button
                        onClick={() => updateFilter('category', '')}
                        className="p-0.5 hover:bg-indigo-400/20 rounded-full transition-colors duration-200"
                      >
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.technology && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm border border-purple-500/30">
                      Tech: {filters.technology}
                      <button
                        onClick={() => updateFilter('technology', '')}
                        className="p-0.5 hover:bg-purple-400/20 rounded-full transition-colors duration-200"
                      >
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.status && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-300 rounded-lg text-sm border border-green-500/30">
                      Status: {filters.status}
                      <button
                        onClick={() => updateFilter('status', '')}
                        className="p-0.5 hover:bg-green-400/20 rounded-full transition-colors duration-200"
                      >
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.featured !== null && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm border border-yellow-500/30">
                      {filters.featured ? 'Featured' : 'Non-Featured'}
                      <button
                        onClick={() => updateFilter('featured', null)}
                        className="p-0.5 hover:bg-yellow-400/20 rounded-full transition-colors duration-200"
                      >
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-slate-300 font-medium">
            Showing <span className="text-white font-bold">{filteredAndSortedProjects.length}</span> of{' '}
            <span className="text-white font-bold">{PROJECTS.length}</span> projects
          </p>
          {searchTerm && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30">
              Search: "{searchTerm}"
            </span>
          )}
        </div>
        
        {searchTerm && (
          <motion.button
            onClick={() => setSearchTerm('')}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Clear search
          </motion.button>
        )}
      </div>

      {/* Modern Projects Grid/List */}
      <motion.div
        className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedProjects.length > 0 ? (
            filteredAndSortedProjects.map((project: Project, index: number) => (
              <motion.div
                key={`${project.title}-${index}`}
                variants={itemVariants}
                layout={!prefersReducedMotion}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={viewMode === 'list' ? 'w-full' : ''}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => handleProjectClick(project)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center py-16"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-slate-400 mb-6">
                <SearchIcon className="w-20 h-20 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                No projects found
              </h3>
              <p className="text-slate-400 text-center max-w-md mb-6">
                {searchTerm 
                  ? `No projects match "${searchTerm}". Try different keywords or reset filters.`
                  : 'No projects match the current filters. Try adjusting your criteria.'
                }
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Load More Section */}
      {filteredAndSortedProjects.length > 9 && (
        <motion.div
          className="flex justify-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl transition-all duration-200 font-medium backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg">
            Load More Projects
          </button>
        </motion.div>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default EnhancedProjectGallery;
