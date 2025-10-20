import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from "react-router-dom";
import { Calendar, Clock, User, Tag, Layers, Download } from 'lucide-react';
import { useProjects } from '../contexts/ProjectsContext';
import Loader from '../components/Loader';
import { Project } from '../types';
import ProjectGallery from '../components/ProjectGalary';
import { downloadImages } from '../config/downloadImage';
import { useToast } from '../contexts/Toast';

const ProjectDetails: React.FC = () => {
  const {id} = useParams();
  const { getProjectById } = useProjects();
  const { showToast } = useToast();

  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

   const [isGalleryOpen, setIsGalleryOpen] = useState(false);
   const [index, setIndex] = useState(0)

  useEffect(() => {
    const handlePop = () => {
      setIsGalleryOpen(false);
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const openGallery = () => {
    setIsGalleryOpen(true);
    window.history.pushState({}, "", "#gallery"); // إضافة إلى history
  };

  useEffect(() => {
    if (project) setSelectedImage(project.image);
  }, [project]);


 
  useEffect(() => {
    const fetch = async () => {
      const data = await getProjectById(id!);
      if (data) {
        const fixedData = {
          ...data,
          featured: Boolean(data.featured),
        } as Project;
        setProject(fixedData);
      }
    };
    fetch();
  }, [id, getProjectById]);


  if (!project) return <Loader/>
 
  const allImages = [project?.image, ...(project.images || [])];
  
  return(
    <div dir="rtl" className="min-h-screen mt-10 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
     
        <div className="grid mt-10 grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 "
          >
            <div className={`relative w-full ${project.category === "تطبيق هاتف"&&"h-[50%]"} max-h-[70vh]`}>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-xl md:rounded-3xl transform rotate-2 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-xl md:rounded-3xl transform -rotate-2 z-20" />

              <AnimatePresence mode="wait">
                <motion.img
                  onClick={openGallery}
                  key={selectedImage}
                  src={selectedImage|| "react-min.png"}
                  alt={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-30 w-full h-full cursor-pointer object-contain rounded-xl md:rounded-3xl shadow-2xl"
                />
              </AnimatePresence>

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const currentIndex = allImages.indexOf(selectedImage);
                      const nextIndex = (currentIndex + 1) % allImages.length;
                      setSelectedImage(allImages[nextIndex]);
                    }}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition z-40"
                  >
                    &#10095;

                  </button>
                  <button
                    
                    onClick={() => {
                      const currentIndex = allImages.indexOf(selectedImage);
                      const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
                      setSelectedImage(allImages[prevIndex]);
                    }}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition z-40"
                  >
                    &#10094;

                  </button>
                </>
              )}
            </div>

            {/* الصور المصغرة (Thumbnails) */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto py-2 px-1">
                {allImages.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {setSelectedImage(img); setIndex(index)}}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === img
                        ? 'border-accent-500 ring-2 ring-offset-2 ring-accent-300 shadow-lg'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
              <p 
                onClick={openGallery}
                className="text-md md:text-lg cursor-pointer text-center font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
                اضغط على الصورة لرؤيتها بوضوح
              </p>
              <div
                onClick={()=> {
                  const res = downloadImages([project.image, ...project.images])
                  if(res) showToast("تم تحميل جميع الصور في ملف zip", "success");
                }}
                 className="flex items-center m-auto w-1/2 cursor-pointer justify-center space-x-3 p-3 md-p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Download className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  <p className="font-medium text-[14px] md:text-base text-gray-600 dark:text-white">تحميل الصور</p>
                </div>
          </motion.div>


          {/* قسم التفاصيل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 px-2 sm:px-0"
          >
            {/* عنوان المشروع */}
            <div>
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              <p className="text-[15px] md:text-lg font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* معلومات أساسية */}
            <div className="grid grid-cols-2 gap-4">
              {project.date && (
                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Calendar className="w-5 h-5 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">التاريخ</p>
                    <p className="md:font-semibold font-medium text-[14px] md:text-base text-gray-900 dark:text-white">{project.date}</p>
                  </div>
                </div>
              )}

              {project.duration && (
                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">المدة</p>
                    <p className="md:font-semibold font-medium text-[14px] md:text-base text-gray-900 dark:text-white">{project.duration}</p>
                  </div>
                </div>
              )}

              {project.role && (
                <div className="flex items-start space-x-3 overflow-hidden py-4 px-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <User className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">الدور</p>
                    <p className="md:font-semibold font-medium text-[14px] md:text-base text-gray-900 dark:text-white">{project.role}</p>
                  </div>
                </div>
              )}

              {project.category && (
                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Layers className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">الفئة</p>
                    <p className="md:font-semibold font-medium text-[14px] md:text-base text-gray-900 dark:text-white">{project.category}</p>
                  </div>
                </div>
              )}
            </div>

            {/* المميزات */}
            {project.features?.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">المميزات الرئيسية</h3>
                <ul className="space-y-3">
                  {project.features.map((feature: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 font-medium text-[14px] md:text-base dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* التقنيات */}
            {project.technologies?.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Tag className="w-6 h-6 text-accent-500" />
                  <span>التقنيات المستخدمة</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech:string, index:number) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="px-4 md:py-2 py-1.5 bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900/30 dark:to-primary-900/30 text-gray-800 dark:text-gray-200 rounded-full font-medium text-sm border border-accent-200 dark:border-accent-800"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
        {isGalleryOpen&& <ProjectGallery setIsGalleryOpen={setIsGalleryOpen} index={index} images={[project.image, ...project.images]}/>}
    </div>
  );
};

export default ProjectDetails;
