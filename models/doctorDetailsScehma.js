import mongoose from "mongoose";
import { captureRejectionSymbol } from "nodemailer/lib/xoauth2";

const doctorDetailsSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  education: { type: String, required: true },
  speciality: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  city: { type: String, required: true },
  cnicNumber: { type: Number, required: true, maxLength: 13 },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  //   pmcCertificate: { type: string, required: true, maxLength: 13 },
});

export const DoctorDetails = mongoose.model(
  "DoctorDetails",
  doctorDetailsSchema
);
