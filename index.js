import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "uploads/" });

app.post("/upload-pdf", upload.single("file"), async (req, res) => {
  try {
    const { oldPublicId } = req.body;

    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId, { resource_type: "raw" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "pdfs",
    });

    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/upload-image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "لم يتم اختيار أي صورة" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
      resource_type: "image",
    });

    fs.unlinkSync(req.file.path);

    res.json({
      message: "تم رفع الصورة بنجاح ✅",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete-image/:public_id", async (req, res) => {
  try {
    const { public_id } = req.params;
    if (!public_id) return res.status(400).json({ error: "يجب إرسال public_id لحذف الصورة" });

    const result = await cloudinary.uploader.destroy(`images/${public_id}`, {
      resource_type: "image",
    });

    if (result.result === "not found") {
      return res.status(404).json({ error: "الصورة غير موجودة" });
    }

    res.json({
      message: "🗑️ تم حذف الصورة بنجاح",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
