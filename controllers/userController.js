import HttpError from "../models/Http-error.js";
import { Otp, otpValidation } from "../models/otpSchema.js";
import { Users } from "../models/userSchema.js";
import {
  signupValidation,
  loginValidation,
} from "../validation/doctorValidation.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

console.log(process.env.EMAIL_USER);

export const signup = async (req, res, next) => {
  const { error } = signupValidation(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  console.log(error);

  const { name, email, password } = req.body;
  const otp = otpGenerator.generate(5, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return next(new HttpError(" User already exist", 400));
    }

    console.log("Creating new user");
    const users = new Users({ name, email, password });
    await users.save();

    console.log("Saving OTP");
    await Otp.create({ email, otp });

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465, // Use port 465 for secure connection
      secure: true, // Use true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Sending OTP email");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`,
    });

    res.status(201).json("otp sent.");
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signing up failed, try again", 500));
  }
};

export const verifyOTP = async (req, res, next) => {
  const { error } = otpValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, otp } = req.body;
  try {
    const otpRecord = await Otp.findOne({ email, otp }).exec();
    if (!otpRecord) {
      return res.status(400).send("Invalid OTP");
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    user.isVerified = true;
    await user.save();
    res.status(200).send("OTP verified successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error verifying OTP");
  }
};

export const login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const users = await Users.findOne({ email });
    if (!users) {
      // return res.status(400).json({ message: "Invalid email or password" });
      return next(new HttpError("Invalid email or password", 400));
    }

    const isMatch = await users.comparePassword(password);
    if (!isMatch) {
      return next(new HttpError("Invalid email or password", 400));
    }

    const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    // res.status(500).json({ message: err.message });
    return next(new HttpError("Loggig up failed , try gain ", 500));
  }
};

export const deleteUsers = async (req, res, next) => {
  await Users.deleteMany({})
    .then(() => {
      res.send("All users deleted");
    })
    .catch((err) => console.error("Error deleting users:", err));
};
