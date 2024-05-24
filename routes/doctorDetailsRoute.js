import { Router } from "express";
import { doctorDetails } from "../controllers/doctorDetailsController.js";
import upload from "../config/multerConfig.js";

const router = Router();

router.post("/details", upload.single("pmcCertificate"), doctorDetails);

export { router };
