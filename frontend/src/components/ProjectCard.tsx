import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Star } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies?: string[]; 
  live_url?: string;
  github_url?:string;
  featured?: boolean;
}


const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  live_url,
  github_url,
  featured = true,
  
}) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className={`group relative bg-white dark:bg-gray-950/20 rounded-xl overflow-hidden shadow-lg hover:shadow-lg transition-all duration-300 flex flex-col ${
      featured ? 'md:col-span-2 md:row-span-2' : ''
    }`}
    style={{ height: '520px' }} // ارتفاع موحد لجميع البطاقات
  >
    {/* الصورة */}
    <div className="relative overflow-hidden h-48 md:h-56 flex-shrink-0">
      <img
        src={image || "react-min.png"}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* روابط في الزاوية */}
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {live_url && (
          <motion.a
            href={live_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full shadow-lg hover:bg-accent-500 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}
        {github_url && (
          <motion.a
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full shadow-lg hover:bg-accent-500 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </motion.a>
        )}
      </div>

      {featured && (
          <span className="absolute flex gap-1 top-3 left-3 bg-yellow-400 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-full shadow">
            مميز <Star color="#733e0a" size={18} />
          </span>
        )}
    </div>

    {/* المحتوى النصي */}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
        {title}
      </h3>

      {/* الوصف يأخذ المساحة المتبقية */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow overflow-hidden line-clamp-4">
        {description}
      </p>

      {/* الوسوم */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-accent-100 dark:hover:bg-accent-900/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* الروابط في الأسفل */}
      <div className="flex items-center space-x-4 mt-auto">
        {live_url && (
          <a
            href={live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Live Demo</span>
          </a>
        )}
        {github_url && (
          <a
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">Code</span>
          </a>
        )}
      </div>
    </div>
  </motion.div>

  );
};

export default ProjectCard;