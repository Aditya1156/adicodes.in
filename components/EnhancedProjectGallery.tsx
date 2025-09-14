import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../lib/data';
import ProjectCard from './ProjectCard';
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
    <div className="w-full space-y-6">
      {/* Header with Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-800 text-gray-100 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-gray-700 text-indigo-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              title="Grid view"
            >
              <GridIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-gray-700 text-indigo-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              title="List view"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          >
            <option value="date">Latest First</option>
            <option value="name">Name A-Z</option>
            <option value="popularity">Most Popular</option>
            <option value="status">By Status</option>
          </select>

          {/* Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              showFilters
                ? 'bg-indigo-900/30 text-indigo-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FilterIcon className="w-4 h-4" />
            Filters
            {Object.values(filters).some(v => v !== '' && v !== null) && (
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">Advanced Filters</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Categories</option>
                  {filterOptions.categories.map((category: string) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Technology Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Technology
                </label>
                <select
                  value={filters.technology}
                  onChange={(e) => updateFilter('technology', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Technologies</option>
                  {filterOptions.technologies.map((tech: string) => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Statuses</option>
                  {filterOptions.statuses.map((status: string) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Featured Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Featured
                </label>
                <select
                  value={filters.featured === null ? '' : filters.featured.toString()}
                  onChange={(e) => updateFilter('featured', e.target.value === '' ? null : e.target.value === 'true')}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Projects</option>
                  <option value="true">Featured Only</option>
                  <option value="false">Non-Featured</option>
                </select>
              </div>
            </div>

            {/* Active Filters Summary */}
            {Object.values(filters).some(v => v !== '' && v !== null) && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {filters.category && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-300 rounded-full text-sm">
                      Category: {filters.category}
                      <button
                        onClick={() => updateFilter('category', '')}
                        className="p-0.5 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-full transition-colors duration-200"
                      >
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.technology && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                      Tech: {filters.technology}
                      <button
                        onClick={() => updateFilter('technology', '')}
                        className="p-0.5 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full transition-colors duration-200"
                      >
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.status && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                      Status: {filters.status}
                      <button
                        onClick={() => updateFilter('status', '')}
                        className="p-0.5 hover:bg-green-200 dark:hover:bg-green-800 rounded-full transition-colors duration-200"
                      >
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.featured !== null && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm">
                      {filters.featured ? 'Featured' : 'Non-Featured'}
                      <button
                        onClick={() => updateFilter('featured', null)}
                        className="p-0.5 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-full transition-colors duration-200"
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

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold">{filteredAndSortedProjects.length}</span> of{' '}
          <span className="font-semibold">{PROJECTS.length}</span> projects
        </p>
        
        {searchTerm && (
          <motion.button
            onClick={() => setSearchTerm('')}
            className="text-sm text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Clear search
          </motion.button>
        )}
      </div>

      {/* Projects Grid/List */}
      <motion.div
        className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
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
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => {
                    // Handle project click - could open modal or navigate
                    console.log('Project clicked:', project.title);
                  }}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center py-12"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <SearchIcon className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                {searchTerm 
                  ? `No projects match "${searchTerm}". Try different keywords or reset filters.`
                  : 'No projects match the current filters. Try adjusting your criteria.'
                }
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Load More / Pagination could go here */}
      {filteredAndSortedProjects.length > 9 && (
        <motion.div
          className="flex justify-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="px-6 py-3 bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
            Load More Projects
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedProjectGallery;
