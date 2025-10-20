import React from "react";
import { motion } from "framer-motion";

const ProjectCardSkeleton: React.FC<{ featured?: boolean }> = ({ featured }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* تأثير التدرج المتحرك */}
      <div className="relative overflow-hidden">
        <div className="w-full h-48 md:h-56 bg-gray-200 dark:bg-gray-700 relative rounded-t-xl overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/30 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-6 space-y-4">
        {/* العنوان */}
        <div className="relative h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/30 to-transparent animate-shimmer" />
        </div>

        {/* الوصف */}
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="relative h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/30 to-transparent animate-shimmer" />
            </div>
          ))}
        </div>

        {/* التاغات */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="relative h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/30 to-transparent animate-shimmer" />
            </div>
          ))}
        </div>

        {/* الروابط */}
        <div className="flex items-center space-x-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="relative h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/30 to-transparent animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCardSkeleton;
