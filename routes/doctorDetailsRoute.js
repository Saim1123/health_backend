import { Router } from "express";
import { doctorDetails } from "../controllers/doctorDetailsController.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/details", upload.single("pmcCertificate"), doctorDetails);

export { router };
