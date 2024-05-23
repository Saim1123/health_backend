import express from "express";
export const router = express.Router();
import {
  login,
  signup,
  verifyOTP,
  deleteUsers,
  getDoctors,
} from "../controllers/userController.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/delete", deleteUsers);
router.get("/doctors", getDoctors);
