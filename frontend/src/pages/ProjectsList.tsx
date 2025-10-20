import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, PlusCircle, Star } from "lucide-react";
import { useProjects } from "../contexts/ProjectsContext";
import { useNavigate } from "react-router-dom";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import { useToast } from "../contexts/Toast";
import Loader from "../components/Loader";

const api = import.meta.env.VITE_API_URL



const ProjectsList: React.FC = () => {
  const { projects, loading, deleteProject } = useProjects();
  const navigate = useNavigate();
  const { showToast } = useToast();


  const [allProjects, setAllProjects] = useState([])



  useEffect(()=>{
    setAllProjects(projects)
  }, [projects])


const getPublicIdFromUrl = (url: string): string => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1]; // "cfzr6cdqawmxokcgrsb4.png"

  // 2️⃣ نحذف الامتداد (.png, .jpg, ...)
  const publicId = filename.substring(0, filename.lastIndexOf("."));
  return publicId;
};


  // 🔹 حذف صورة من Cloudinary
  const deleteImage = async (public_id: string) => {
    const res = await fetch(`/api/delete-image/${public_id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("فشل حذف الصورة من Cloudinary");
    const data = await res.json();
    return data;
  };

  
  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف المشروع؟")) return;

    try {
      const project = projects.find((p) => p.id === id);
      if (!project) throw new Error("المشروع غير موجود");

      // جمع كل الصور (صورة واحدة + مصفوفة الصور)
      const images = [
        ...(project.image ? [project.image] : []),
        ...(Array.isArray(project.images) ? project.images : []),
      ];


      // استخراج الـ public_id من كل رابط
      const publicIds = images
        .map((url) => getPublicIdFromUrl(url))
        .filter(Boolean);

      // حذف كل الصور
      await Promise.all(publicIds.map((pid) => deleteImage(pid)));

      // حذف المشروع نفسه من قاعدة البيانات
      await deleteProject(id);
      navigate("/")

      showToast("✅ تم حذف المشروع بنجاح", "success");
    } catch (err) {
      showToast("حدث خطأ أثناء الحذف", "error");
    }
  };

  if(!allProjects.length) return <Loader/>
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="text-center w-full md:text-right">
            <h2 className="text-[26px] md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              جميع المشاريع
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              يمكنك هنا تعديل المشاريع أو حذفها.
            </p>
          </div>

          <button
            onClick={() => navigate("/add-project")}
            className=" hidden items-center md:flex w-[270px] gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            <PlusCircle className="w-5 h-5" />
            <span>إضافة مشروع جديد</span>
          </button>
        </motion.div>

        {/* شبكة المشاريع */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectCardSkeleton />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
           {allProjects && allProjects.length > 0 ? (
              allProjects.map((project, index) => (
                <motion.div
                onClick={()=>navigate(`/project/${project.id}`)}
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* صورة المشروع */}
                  <div
                    className="h-52 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(${project.image || "react-min.png"})`,
                    }}
                  >
                    {project.featured && (
                      <span className="absolute flex gap-1 top-3 left-3 bg-yellow-400 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-full shadow">
                        مميز <Star color="#733e0a" size={18} />
                      </span>
                    )}
                  </div>

                  {/* التفاصيل */}
                  <div className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-md md:text-base dark:text-gray-300 mb-4 leading-relaxed flex-grow overflow-hidden line-clamp-4">
                        {project.description || "لا يوجد وصف للمشروع"}
                      </p>

                      {/* الفئة */}
                      {project.category && (
                        <p className="text-sm text-accent-500 font-semibold mb-2">
                          الفئة: {project.category}
                        </p>
                      )}


                      {/* التقنيات */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-400/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                    
                    </div>

                    
                  </div>

                  {/* أزرار التحكم */}
                  <div className="absolute top-3 right-3 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit-project/${project.id}`)}
                      }
                      className="p-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-full transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) =>{
                        e.stopPropagation();
                        handleDelete(project.id)}
                      }
                      className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center col-span-full text-gray-500 dark:text-gray-300">
                لا توجد مشاريع بعد.
              </div>
            )}

          </motion.div>
          
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
