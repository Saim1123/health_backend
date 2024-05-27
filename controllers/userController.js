import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import HttpError from "../models/Http-error.js";
import { Otp, otpValidation } from "../models/otpSchema.js";
import { Users } from "../models/userSchema.js";
import {
  signupValidation,
  loginValidation,
} from "../validation/doctorValidation.js";
import { sendOtpEmail } from "../config/nodemailer.js";

export const signup = async (req, res, next) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log("error>>", error);

    const { name, email, password, phone_number, role } = req.body;
    const otp = Math.floor(1000 + Math.random() * 90000);

    const existingUser = await Users.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return next(new HttpError("User already exist", 400));
    }

    console.log("Creating new user>>");
    const user = new Users({ name, email, password, phone_number, role });
    await user.save({ session });

    console.log("Saving OTP>>");
    await Otp.create([{ email, otp }], { session });

    console.log(`your otp ${otp}`);
    await sendOtpEmail(email, user.name, otp);

    await session.commitTransaction();
    session.endSession();

    console.log("otp sent");
    res.status(201).json("otp sent.");
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(new HttpError("Signing up failed, try again", 500));
    console.log("err>>", err);
  }
};

export const verifyOTP = async (req, res, next) => {
  const { error } = otpValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, otp } = req.body;
  try {
    const user = await Users.findOne({ email });
    const otpRecord = await Otp.findOne({ email, otp });

    if (!user) {
      return res.status(400).send("User not found");
    }
    if (!otpRecord) {
      return res.status(400).send("Invalid OTP");
    }

    user.isVerified = true;
    await user.save();
    res.status(200).send("OTP verified successfully");
  } catch (err) {
    res.status(500).send("Error verifying OTP");
    console.error(">>err", err);
  }
};

export const login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const users = await Users.findOne({ email });
    if (!users) {
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
  const user = await Users.deleteMany({});
  const otp = await Otp.deleteMany({});

  res.status(200).send("user deleted successfully");
};

export const getDoctors = async (req, res, next) => {
  const users = await Users.find({ role: "doctor" });
  if (!users) res.status(400).send("doctors not found!");
  res.status(200).send(users);
};
