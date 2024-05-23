import nodemailer from "nodemailer";
import { emailMessage } from "../html/emailMessage.js";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465, // Use port 465 for secure connection
  secure: true, // Use true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, name, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    html: emailMessage(name, otp),
  };

  await transporter.sendMail(mailOptions);
};
