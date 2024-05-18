import express from "express";
import { doctorDetails } from "../controllers/doctorDetailsController.js";
import { fileUpload } from "../middlewares/file-upload.js";

export const router = express.Router();

router.post("/details", fileUpload.single("image"), doctorDetails);
