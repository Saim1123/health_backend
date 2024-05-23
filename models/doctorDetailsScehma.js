import mongoose from "mongoose";

const doctorDetailsSchema = new mongoose.Schema({
  // doctor_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Users",
  //   required: true,
  // },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  education: { type: String, required: true },
  speciality: { type: String, required: true },
  city: { type: String, required: true },
  cnic_number: { type: Number, required: true, unique: true, maxLength: 13 },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  pmcCertificate: { type: String, required: true },
});

export const DoctorDetails = mongoose.model(
  "DoctorDetails",
  doctorDetailsSchema
);
