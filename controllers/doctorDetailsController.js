import { DoctorDetails } from "../models/doctorDetailsScehma.js";
import { Users } from "../models/userSchema.js";
import { uploadOnCloudinary } from "../config/cloudinaryConfig.js";

export const doctorDetails = async (req, res, next) => {
  console.log("working...");
  const {
    first_name,
    last_name,
    education,
    speciality,
    city,
    cnic_number,
    gender,
  } = req.body;

  try {
    const pmcCertificatePath = req.file?.path;
    console.log("pmc file path", pmcCertificatePath);

    if (!pmcCertificatePath) {
      return res.status(400).send("pmcCertificate is required");
    }

    const pmcCertificate = await uploadOnCloudinary(pmcCertificatePath);
    console.log("upload on cloudinary", pmcCertificate);

    if (!pmcCertificate)
      return res.status(400).send("pmcCertificate is required");

    const docotorDetail = await DoctorDetails.create({
      first_name,
      last_name,
      education,
      speciality,
      city,
      cnic_number,
      gender,
      pmcCertificate: pmcCertificate.url,
    });
    console.log("doctor created.");

    if (!docotorDetail) return res.status(400).send("something went wrong");

    res.status(201).send("ok");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
