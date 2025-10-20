import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../contexts/ProjectsContext';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';
import { Link, useNavigate } from 'react-router-dom';


const Projects: React.FC = () => {
    const navigate = useNavigate();
  
  const [activeFilter, setActiveFilter] = useState('الكل');
  const {projects, loading, metadata} = useProjects()
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(["الكل",...metadata.categories]);
  }, [metadata]);

  const filteredProjects = activeFilter === 'الكل' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl h-auto lg:h-18 font-bold bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent dark:text-white mb-4 md:mb-6">
              مشاريعي
            </h1>
            <p className="md:text-xl text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              مجموعة من أعمالي تشمل تطبيقات الويب، التطبيقات المحمولة، والحلول الإبداعية.
              كل مشروع يمثل تحديًا فريدًا ونهجًا مبتكرًا.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 md:py-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <div className="md:flex items-center hidden  space-x-2 text-gray-600 dark:text-gray-300">
              <Filter className="w-5 h-5" />
              <span className="font-medium">تصفية حسب:</span>
            </div>
            {
          !loading?
            
            categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
               className={`px-4 py-2 min-w-fit text-sm md:text-[16px] rounded-full font-medium transition-all duration-300 ${
                      activeFilter === category
                        ? 'bg-gradient-to-r from-accent-500 to-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </motion.button>
              ))
            :
             Array.from({ length:5 }).map((_, idx) => (
              <div
              key={idx}
              className="relative h-10 w-26 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/30 to-transparent animate-shimmer" />
            </div>
            ))}
                  
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
             {
            loading
          ? 
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProjectCardSkeleton />
              </motion.div>
            ))
          :
            filteredProjects.map((project, index) => (
              <Link to={`/project/${project.id}`} key={project.id} style={{cursor: 'pointer'}}>

              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard 
                  title={project.title || ""}
                  description={project.description || ""}
                  live_url={project.live_url}
                  github_url={project.github_url}
                  featured={!!project.featured}
                  image={project.image || ""}
                  technologies={project.technologies || []}          
                />
              </motion.div>
            </Link>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg md:text-xl  text-gray-500 dark:text-gray-400">
                لم يتم العثور على مشاريع في هذه الفئة.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent md:text-4xl font-bold dark:text-white mb-6">
              هل أعجبك ما تراه؟
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              أنا دائمًا متحمس للعمل على مشاريع جديدة وتحويل الأفكار المبتكرة إلى واقع.
              دعونا نبتكر شيئًا رائعًا معًا!
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex text-md md:text-lg items-center px-8 md:py-4 py-3 bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-accent-500/25 transition-all duration-300"
            >
              ابدأ مشروعًا
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
