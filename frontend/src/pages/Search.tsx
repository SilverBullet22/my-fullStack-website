

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, SortAsc, Grid, List } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectsContext';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  const {projects,loading, metadata} = useProjects()

 


 const [categories, setCategories] = useState([]);
 
   useEffect(() => {
     setCategories(["الكل",...metadata.categories]);
   }, [metadata]);


  const allTags = [...new Set(projects.flatMap(project => project.tags))];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => project.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div dir="rtl" className="pt-16">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className=" text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              البحث في{' '}
              <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
                المشاريع
              </span>
            </h1>
            <p className="text-md md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              استعرض كامل محفظة مشاريعي. استخدم الفلاتر للعثور على ما تبحث عنه بالضبط.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث في المشاريع أو التقنيات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 md:rounded-xl rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-lg transition-colors"
            />
          </motion.div>

          {/* Filters */}
          <div className="space-y-6">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-md md:text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Filter className="w-5 h-5 ml-2" />
                التصنيفات
              </h3>
              <div className="flex overflow-x-scroll w-full gap-3">
                {
                !loading?
                categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 min-w-fit text-sm md:text-[16px] rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-accent-500 to-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                )):
                 Array.from({ length:5 }).map((_, idx) => (
                    <div
                    key={idx}
                    className="relative h-10 w-26 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/30 to-transparent animate-shimmer" />
                  </div>
                  ))}
              
              
              </div>
            </motion.div>

            {/* Tags Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-md md:text-lg font-semibold text-gray-900 dark:text-white mb-3 flex">
                التقنيات
              </h3>
              <div className="flex overflow-x-scroll w-full gap-2 ">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-sm md:text-[16px] min-w-fit font-medium transition-all duration-300 ${
                      selectedTags.includes(tag)
                        ? 'bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 border-2 border-accent-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Sort and View Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4 justify-end">
                <div className="flex text-sm items-center space-x-2">
                  <SortAsc className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  >
                    <option value="newest">الأحدث أولاً</option>
                    <option value="oldest">الأقدم أولاً</option>
                    <option value="name">حسب الاسم A-Z</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-4 md:py-10 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-right"
          >
            <p className="text-md md:text-lg text-gray-600 dark:text-gray-300">
              تم العثور على <span className="font-semibold text-accent-600 dark:text-accent-400">
                {filteredProjects.length}
              </span> مشروع{filteredProjects.length !== 1 ? 'ات' : ''}
              {searchQuery && ` لـ "${searchQuery}"`}
            </p>
          </motion.div>

          {loading?
          <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
            {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectCardSkeleton />
                </motion.div>
              ))}
            </motion.div>
            :
          (filteredProjects.length > 0 ? (
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {filteredProjects.map((project, index) => (
              <Link to={`/project/${project.id}`} key={project.id} style={{cursor: 'pointer'}}>
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProjectCard 
                    title={project.title || ""}
                    description={project.description || ""}
                    live_url={project.live_url}
                    github_url={project.github_url}
                    featured={true}
                    image={project.image || ""}
                    technologies={project.technologies || []}  
                  />
                </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                لم يتم العثور على مشاريع
              </h3>
              <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mb-6">
                حاول تعديل معايير البحث أو الفلاتر
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTags([]);
                }}
                className="px-6 py-2 md:py-4 text-md md:text-lg bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                مسح جميع الفلاتر
              </button>
            </motion.div>
          ))
            
            }
        </div>
      </section>
    </div>
  );
};

export default Search;
