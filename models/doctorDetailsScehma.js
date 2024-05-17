import mongoose from "mongoose";
// import { captureRejectionSymbol } from "nodemailer/lib/xoauth2";

const doctorDetailsSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  education: { type: String, required: true },
  speciality: { type: String, required: true },
  phone_number: { type: Number, required: true },
  city: { type: String, required: true },
  cnic_number: { type: Number, required: true, maxLength: 13 },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  //   pmcCertificate: { type: string, required: true, maxLength: 13 },
});

export const DoctorDetails = mongoose.model(
  "DoctorDetails",
  doctorDetailsSchema
);
