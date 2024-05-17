import express from "express";
import { doctorDetails } from "../controllers/doctorDetailsController.js";

export const router = express.Router();

router.post("/details", doctorDetails);
