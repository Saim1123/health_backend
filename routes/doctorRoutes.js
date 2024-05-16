import express from "express";
import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctorSchema.js";
import {
  loginValidation,
  signupValidation,
} from "../validation/doctorValidation.js";
export const router = express.Router();

router.post("/signup", async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor)
      return res.status(400).json({ message: "Doctor already exists." });

    const doctor = new Doctor({ name, email, password });
    await doctor.save();

    res.status(201).json({ message: "Doctor registered ", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
