import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadImages = async (imageUrls: string[], zipFileName: string = "images.zip") => {
  const zip = new JSZip();

  for (let i = 0; i < imageUrls.length; i++) {
    try {
      const url = imageUrls[i];
      const response = await fetch(url);
      const blob = await response.blob();

      // اسم الصورة كما في Cloudinary
      const fileName = url.split("/").pop()?.split("?")[0] || `image_${i + 1}.jpg`;

      zip.file(fileName, blob);
      console.log(` أضفنا الصورة ${i + 1}: ${fileName}`);
    } catch (error) {
      console.error(`خطأ أثناء إضافة الصورة ${i + 1}:`, error);
    }
  }

  // إنشاء ملف ZIP وتنزيله مباشرة
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, zipFileName);
  return true
};
