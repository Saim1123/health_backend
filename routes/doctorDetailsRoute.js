import express from "express";
import { doctorDetails } from "../controllers/doctorDetailsController.js";
import { fileUpload } from "../middlewares/file-upload.js";
import upload from "../config/multerConfig.js";

export const router = express.Router();

router.post("/details", upload.single("pmcCertificate"), doctorDetails);
