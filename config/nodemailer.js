import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("email>>", process.env.EMAIL_USER);
console.log("pass>>", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

export { sendOTPEmail };
