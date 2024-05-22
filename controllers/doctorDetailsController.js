import { DoctorDetails } from "../models/doctorDetailsScehma.js";
import { Users } from "../models/userSchema.js";

export const doctorDetails = async (req, res, next) => {
  const {
    doctor_id,
    first_name,
    last_name,
    education,
    speciality,
    city,
    cnic_number,
    gender,
  } = req.body;

  try {
    const pmcCertificate = req.file.path;

    const user = await Users.findById(doctor_id);
    if (!user) res.status(400).send("user not found");

    const doctorDetails = new DoctorDetails({
      doctor_id,
      first_name,
      last_name,
      education,
      speciality,
      city,
      cnic_number,
      gender,
      pmcCertificate,
    });

    await doctorDetails.save();
    res.status(201).json({ message: "doctor registered", doctorDetails });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
