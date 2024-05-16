import express from "express";
import jwt from "jsonwebtoken";
import { Users } from "../models/userSchema.js";
import {
  loginValidation,
  signupValidation,
} from "../validation/doctorValidation.js";
export const router = express.Router();
import { login, signup } from "../controllers/userController.js";

router.post("/signup", signup);

router.post("/login", login);
