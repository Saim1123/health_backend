import { Users } from "../models/userSchema.js";
import {
  signupValidation,
  loginValidation,
} from "../validation/doctorValidation.js";
import jwt from "jsonwebtoken";
// import { sendOTPEmail } from "../config/nodemailer.js";

export const signup = async (req, res, next) => {
  const { error } = signupValidation(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const users = new Users({ name, email, password });
    await users.save();

    res.status(201).json({ message: "User registered ", users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const users = await Users.findOne({ email });
    if (!users) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await users.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
