import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "doctor_certificates", // Folder where files will be stored in Cloudinary
    allowed_formats: ["jpg", "png", "pdf"], // Allowed file formats
  },
});

const upload = multer({ storage: storage });

export default upload;
