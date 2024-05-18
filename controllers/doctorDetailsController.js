import { DoctorDetails } from "../models/doctorDetailsScehma.js";

export const doctorDetails = async (req, res, next) => {
  const {
    first_name,
    last_name,
    education,
    speciality,
    phone_number,
    city,
    cnic_number,
    gender,
    pmcCertificate,
  } = req.body;

  try {
    const doctorDetails = new DoctorDetails({
      first_name,
      last_name,
      education,
      speciality,
      phone_number,
      city,
      cnic_number,
      gender,
      pmcCertificate: req.file.path,
    });

    await doctorDetails.save();
    res.status(201).json({ message: "doctor registered", doctorDetails });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
