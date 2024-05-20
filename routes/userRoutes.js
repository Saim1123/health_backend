import express from "express";
export const router = express.Router();
import { login, signup, verifyOTP } from "../controllers/userController.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
