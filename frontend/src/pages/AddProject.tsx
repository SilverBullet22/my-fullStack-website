import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore'; 
import { db } from "../firebase";
import { DatabaseBackup, Edit, Plus, X } from 'lucide-react';
import imageCompression from "browser-image-compression";
import FeaturedToggle from '../components/FeaturedToggle';
import { useToast } from '../contexts/Toast';
import GitHubRepoSelector from '../components/GitHubRepoSelector';
import { useProjects } from '../contexts/ProjectsContext';

const AddProject = () => {
  const { metadata, loading } = useProjects()
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false)

  const [metaData, setMetaData] = useState({
    tags: [] as string[],
    technologies: [] as string[],
    categories: [] as string[],
  });

  useEffect(() => {
    setMetaData(metadata)
  }, [metadata]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    tags: [] as string[],
    live_url: '',
    github_url: '',
    features: [] as string[],
    technologies: [] as string[],
    date: '',
    duration: '',
    role: '',
    category: '',
    images: [] ,
    featured: false,
  });



  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [extraImageFiles, setExtraImageFiles] = useState<File[]>([]);
  const [currentFeature, setCurrentFeature] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);


  // ========== دوال تعديل النصوص ==========
  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addToArray = ( value: string, reset: () => void) => {
    if (value.trim()) {
      setFormData({ ...formData, features: [...formData.features, value.trim()] });
      reset();
    }
  };

  const removeFromArray = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };


  // 🔹 دالة لضغط الصور
  const compressImage = async (file: File): Promise<File> => {
    console.log("uty", bytesToMB(file.size))

    try {
      if(bytesToMB(file.size) < 1) return file
      return await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
    } catch (err) {
      console.error("❌ خطأ أثناء ضغط الصورة:", err);
      return file;
    }
  };

  function bytesToMB(bytes: number): number {
    const mb = bytes / (1024 * 1024);
    return Number(mb.toFixed(1));
  }



  const uploadImageToCloudinary = async (file: File) => {
    
    const compressedFile = await compressImage(file);

    const formData = new FormData();
    formData.append("file", compressedFile);
    const response = await fetch(`/upload-image`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.url;
  };


const uploadAllImages = async () => {
    let mainUrl = "";
    let extraUrls: string[] = [];

    if (mainImageFile) {
      const url = await uploadImageToCloudinary(mainImageFile);
      
      if (url) mainUrl = url;
    }

    if (extraImageFiles.length > 0) {
      const urls = await Promise.all(extraImageFiles.map(f => uploadImageToCloudinary(f)));
      extraUrls = urls.filter((u): u is string => Boolean(u));
    }

    return { mainUrl, extraUrls };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const { mainUrl, extraUrls } = await uploadAllImages();
       await addDoc(collection(db, "projects"), {
          ...formData,
          image: mainUrl,
          images: extraUrls,
          createdAt: serverTimestamp(),
        })

        navigate("/");
      showToast("تم رفع المشروع بنجاح!", "success");

    } catch (err) {
      console.error(err);
      showToast("!حدث خطأ أثناء حفظ المشروع", "error");      
    }finally{
      setIsLoading(false)
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 text-right">
      <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <div className="bg-white mt-10 dark:bg-gray-800 rounded-xl shadow-sm md:shadow-md border border-gray-100 dark:border-gray-700 p-4 md:p-8">
            <div className="flex flex-row justify-center items-center gap-3 mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">إضافة مشروع جديد</h1>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* العنوان والفئة */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">عنوان المشروع *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full text-right px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
                    placeholder="اسم المشروع"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الفئة *</label>
                 <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full text-right px-4 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {metaData.categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                </div>
              </div>

              {/* الوصف */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الوصف *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full text-right px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
                  placeholder="وصف مختصر للمشروع"
                  required
                />
              </div>

              {/* الصورة الرئيسية */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الصورة الرئيسية *</label>
                <input type="file" accept="image/*" id='mainImage' hidden onChange={e => setMainImageFile(e.target.files?.[0] || null)}  className="w-full text-right" />
                {mainImageFile ?
                 <img src={URL.createObjectURL(mainImageFile)} alt="Main Preview" className="mt-2 w-40 h-40 object-cover rounded-md" />
                 :<label htmlFor='mainImage' className="mt-2 w-40 md:text-base text-md h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                    لا توجد صورة
                  </label>
                }
              </div>

              {/* الصور الإضافية */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الصور الإضافية</label>
                <input type="file" hidden id='extraImage' multiple accept="image/*" onChange={e => {
                  if(e.target.files.length)
                    setExtraImageFiles(Array.from(e.target.files || []))}
                  } 
                  className="w-full text-right" />
                <div className="flex flex-wrap gap-2 mt-2">
                   <label htmlFor='extraImage' className="w-32 md:text-base text-md h-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                    اضف صور
                  </label>
                  {extraImageFiles.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={URL.createObjectURL(img)} alt={`Preview ${i}`} className="w-32 h-32 object-cover rounded-md" />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, idx) => idx !== i),
                          }))
                        }
                        className="absolute top-1 left-1 p-1 bg-red-500 text-white rounded-full md:opacity-0 md:group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* الروابط */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رابط المشروع المباشر</label>
                  <input
                    type="url"
                    name="live_url"
                    value={formData.live_url}
                    onChange={handleInputChange}
                    className="w-full text-right px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <GitHubRepoSelector
                    value={formData.github_url}
                    onChange={(url) => setFormData({ ...formData, github_url: url })}
                  />
                </div>
              </div>

              {/* الدور، المدة، التاريخ */}
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الدور</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full text-right px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
                    placeholder="تطوير كامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">المدة</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full text-right px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
                    placeholder="3 أسابيع"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      التاريخ
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full text-right px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

              </div>

              <div> 
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">  المميزات </label> 
                <div className="flex flex-row-reverse items-center gap-2 mb-2"> 
                  <input type="text" 
                    ref={inputRef}
                    value={ currentFeature } 
                    onChange={(e) => {setCurrentFeature( e.target.value) }} 
                    onKeyPress={(e) => { if (e.key === 'Enter') { 
                      e.preventDefault(); 
                      addToArray( currentFeature  , () => setCurrentFeature(''))
                      inputRef.current?.focus();

                    }} 
                    }

                    className="flex-1 w-full text-right px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500" /> 
                    <button type="button" 
                      onClick={() => {
                        addToArray( currentFeature , () => setCurrentFeature(''))
                        inputRef.current?.focus();
                      } } 
                      className="p-2.5 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition" > 
                        <Plus className="w-4 h-4" /> 
                        </button> 
                    </div> 
                    <div className="flex flex-wrap justify-end gap-2"> {
                      formData.features.map((item, idx) => (
                         <span key={idx} 
                          className="flex flex-row-reverse items-center gap-1 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-md text-sm" > 
                            <span>{item}</span> 
                              <button type="button" 
                                onClick={() => {
                                  removeFromArray( idx)
                                  inputRef.current?.focus();
                                }} className="hover:text-accent-900 dark:hover:text-accent-100" >
                                  <X className="w-3 h-3" /> 
                              </button> 
                          </span> ))} 
                      </div> 
                  </div> 
             
             
              {(['tags', 'technologies'] as const).map((field) => (
                  <div key={field} className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {field === 'tags' ? 'الوسوم (Tags)' : 'التقنيات (Technologies)'}
                    </label>

                    {/* الأزرار */}
                    <div className="flex flex-wrap justify-start gap-2">

                      {
                    !loading ?
                      metaData[field].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            // إذا كان العنصر موجود في selectedArray نحذفه، وإذا لا نضيفه
                            setFormData((prev) => {
                              const isSelected = prev[field].includes(item);
                              const updatedArray = isSelected
                                ? prev[field].filter((i) => i !== item)
                                : [...prev[field], item];
                              return { ...prev, [field]: updatedArray };
                            });
                          }}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border 
                            ${
                              formData[field].includes(item)
                                ? 'bg-accent-500 text-white border-accent-500 shadow-md scale-105'
                                : 'bg-accent-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-accent-200 hover:bg-accent-100 dark:hover:bg-accent-800'
                            }`}
                        >
                          {item}
                        </button>
                      )):
                      Array.from({ length:5 }).map((_, idx) => (
                          <div
                          key={idx}
                          className="relative h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                        >
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/30 to-transparent animate-shimmer" />
                        </div>
                        ))
                    
                    }
                    </div>
                  </div>
                ))}


            <FeaturedToggle
              value={formData.featured}
              onChange={(next) => setFormData({ ...formData, featured: next })}
            />

              {/* أزرار الحفظ */}
              <div className="flex flex-row-reverse items-center justify-between md:justify-end gap-4 pt-5 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-2.5 bg-gradient-to-l from-accent-500 to-primary-500 text-white font-semibold rounded-md hover:shadow-lg hover:shadow-accent-500/25 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'جاري الحفظ...' : 'حفظ المشروع'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
        <motion.div className='flex md:flex-row w-full flex-col items-center flex-wrap mt-6 justify-center gap-3' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

         <button
            onClick={() => navigate("/projects-list")}
            className="flex items-center gap-2 w-fit px-6 text-[15px] md:text-md py-2.5 bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            <Edit className="w-5 h-5" />
            <span>قائمة جميع المشاريع</span>
          </button>
        <button
            onClick={() => navigate("/manage-metadata")}
            className="flex items-center gap-2 w-fit px-6 text-[15px] md:text-md py-2.5 bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            <DatabaseBackup className="w-5 h-5" />
            <span>إدارة بيانات الموقع</span>
          </button>
        </motion.div>
      </div>
        
     
      
    </div>
  );
};

export default AddProject;
