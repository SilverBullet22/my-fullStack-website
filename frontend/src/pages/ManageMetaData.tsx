import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Plus, X, Save, FileText } from "lucide-react";
import { useToast } from "../contexts/Toast";
 
const api = import.meta.env.VITE_API_URL


const ManageMetaData = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const [data, setData] = useState({
    tags: [] as string[],
    technologies: [] as string[],
    categories: [] as string[],
    cv: { url: "", public_id: "" }, 
  });

  const [inputs, setInputs] = useState({
    tags: "",
    technologies: "",
    categories: "",
  });

  const [newCV, setNewCV] = useState<File | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(collection(db, "config"), "metadata");
      const snap = await getDoc(docRef);
      if (snap.exists()) setData(snap.data() as any);
    };
    fetchData();
  }, []);

 
 const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const formData = new FormData();
    formData.append("file", file); // ملف PDF
    formData.append("oldPublicId", data.cv.public_id); // اختياري

    const res = await fetch(`/api/upload-pdf`, {
      method: "POST",
      body: formData,
    });

    const uploaded = await res.json();
    return uploaded;
  } catch (error) {
    //console.log("🚀 ~ uploadToCloudinary ~ error:", error);
  }
};

  // 🔹 حفظ التعديلات في Firestore
  const saveData = async () => {
    setLoading(true);
    setUploading(true);

    try {
      let newCvData = data.cv;

      if (newCV) {
        const uploaded = await uploadToCloudinary(newCV);
        if (uploaded.url && uploaded.public_id) {
          newCvData = {
            url: uploaded.url,
            public_id: uploaded.public_id,
          };
          showToast("تم رفع السيرة الذاتية الجديدة ✅", "success");
        } else {
          showToast("فشل رفع السيرة الذاتية ❌", "error");
        }
      }

      // 3. حفظ البيانات مع الرابط الجديد (إن وُجد)
      await setDoc(doc(collection(db, "config"), "metadata"), {
        ...data,
        cv: newCvData,
      });

      showToast("تم حفظ جميع التعديلات بنجاح ✅", "success");
      setNewCV(null);
    } catch (err) {
      console.error(err);
      showToast("حدث خطأ أثناء الحفظ ❌", "error");
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  // 🔹 إضافة عنصر جديد
  const addItem = (field: "tags" | "technologies" | "categories") => {
    const val = inputs[field].trim();
    if (val && !data[field].includes(val)) {
      setData({ ...data, [field]: [...data[field], val] });
      setInputs({ ...inputs, [field]: "" });
    }
  };

  // 🔹 حذف عنصر
  const removeItem = (
    field: "tags" | "technologies" | "categories",
    index: number
  ) => {
    setData({ ...data, [field]: data[field].filter((_, i) => i !== index) });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 text-right">
      <div className="max-w-4xl mt-12 mx-auto px-2 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 md:p-8"
        >
          <h1 className="text-2xl bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent md:text-3xl font-bold mb-6 dark:text-white text-center">
            إدارة البيانات
          </h1>

          {(["categories", "tags", "technologies"] as const).map((field) => (
            <div key={field} className="mb-8">
              <label className="block text-md md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {field === "categories"
                  ? "الفئات (Categories)"
                  : field === "tags"
                  ? "الوسوم (Tags)"
                  : "التقنيات (Technologies)"}
              </label>

              <div className="flex  gap-2 mb-3">
                 <button
                  type="button"
                  onClick={() => addItem(field)}
                  className="p-2.5 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputs[field]}
                  onChange={(e) =>
                    setInputs({ ...inputs, [field]: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && addItem(field)}
                  className="flex-1 text-right px-4 text-sm md:text-md py-2 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-accent-500"
                  placeholder={`أضف ${
                    field === "categories"
                      ? "فئة"
                      : field === "tags"
                      ? "وسم"
                      : "تقنية"
                  }`}
                />
               
              </div>

              <div className="flex flex-wrap gap-2">
                {data[field].map((item, idx) => (
                  <span
                    key={idx}
                    className="flex flex-row-reverse items-center gap-1 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-md text-sm"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(field, idx)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* 🔹 رفع السيرة الذاتية */}
          <div className="mb-10">
            <label className="block text-md md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              السيرة الذاتية (CV)
            </label>
            <div className="flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setNewCV(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent-500 file:text-white hover:file:bg-accent-600"
              />
             {data?.cv?.url && (
                <a
                  href={data?.cv?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center  gap-2 text-accent-600 hover:underline"
                >
                  <FileText className="size-5 md:size-6" />
                  عرض السيرة الذاتية الحالية
                </a>
              )}
            </div>
            {newCV && (
              <p className="text-sm text-gray-500 mt-2">
                سيتم رفع الملف الجديد عند حفظ التعديلات.
              </p>
            )}
          </div>

          {/* 🔹 زر الحفظ */}
          <div className="flex justify-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={saveData}
              disabled={loading || uploading}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-accent-500 to-primary-500 text-white rounded-md hover:scale-105 transition disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageMetaData;
