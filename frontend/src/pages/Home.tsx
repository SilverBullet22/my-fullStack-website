import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Palette, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from "react-router-dom";
import { useProjects } from '../contexts/ProjectsContext';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';
import Loader from '../components/Loader';
import { useTheme } from '../contexts/ThemeContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme()

  const { projects, metadata, loading } = useProjects();
  const featuredProjects = projects?.filter(project => project.featured === true);
  const services = [
    {
      icon: Code,
      title: "تطوير الويب",
      description: "تطبيقات ويب متكاملة باستخدام أحدث التقنيات وأفضل الممارسات."
    },
    {
      icon: Palette,
      title: "تصميم واجهات وتجربة المستخدم",
      description: "إنشاء تجارب رقمية جميلة وبديهية ومركزية حول المستخدم."
    },
    {
      icon: Zap,
      title: "تحسين الأداء",
      description: "تحسين التطبيقات للسرعة، تحسين محركات البحث، وتجربة مستخدم استثنائية."
    }
  ];




  if(!projects) return <Loader/>

  return (
    <div className="min-h-screen">
      {/* قسم البداية */}
      <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 to-accent-900/80" />
        
        {/* عناصر الخلفية المتحركة */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full opacity-20"
              />
              <div className="absolute inset-2 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
                <Code className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r  from-white to-gray-300 bg-clip-text text-transparent">
              مرحباً، أنا{' '}
            </span>
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              محمد ناصر
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[17px] md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            مبدع في تطوير وتصميم التطبيقات والمواقع،
            <br />
            أبتكر تجارب رقمية عصرية تمزج بين الفن والتكنولوجيا
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center  justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <Link
              to="/projects"
              className="group relative px-8 py-3 md:py-4 text-[15px] md:text-lg bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-accent-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">مشاهدة أعمالي</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <a
              href={metadata?.cv?.url || "#"}
              download
              className="flex items-center space-x-2 px-8 py-3 md:py-4 text-[15px] md:text-lg border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>تحميل السيرة الذاتية</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-center justify-center space-x-6"
          >
            {[
              { icon: Github, href: "https://github.com/SilverBullet22", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:moh.mn148bh@gmail.com", label: "البريد الإلكتروني" }
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-accent-500/20 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-white/70" />
        </motion.div>
      </section>

      {/* قسم الخدمات */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ماذا أفعل
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              أتخصص في إنشاء حلول رقمية تجمع بين التصميم الجميل والوظائف القوية.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group p-6 md:p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gradient-to-br hover:from-accent-50 hover:to-primary-50 dark:hover:from-accent-900/20 dark:hover:to-primary-900/20 transition-all duration-300"
              >
                <div className='md:block flex items-center gap-3'>
                  <div className="min-w-11 min-h-11 md:size-16 bg-gradient-to-r rounded-full from-accent-500 to-primary-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="size-6 md:size-8 text-white" />
                  </div>
                  <h3 className="md:text-2xl text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المشاريع المميزة */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              المشاريع المميزة
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              عرض لأحدث أعمالي، يتميز بالحلول المبتكرة والتنفيذ الإبداعي.
            </p>
          </motion.div>

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
            featuredProjects?.map((project, index) => (
              <Link to={`/project/${project.id}`} key={project.id} style={{cursor: 'pointer'}}>
              <motion.div
                key={`${project.title}}`}
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
                  featured={true}
                  image={project.image || ""}
                  technologies={project.technologies || []}  
                />
              </motion.div>
              </Link>
            ))}
          </motion.div>
          

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center mt-12 px-8 py-3 bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-accent-500/25 transition-all duration-300 transform hover:scale-105"
            >
              عرض جميع المشاريع
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
