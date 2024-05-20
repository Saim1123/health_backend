// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// console.log("email>>", process.env.EMAIL_USER);
// console.log("pass>>", process.env.EMAIL_PASS);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendOTPEmail = (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${otp}`,
//   };

//   return transporter.sendMail(mailOptions);
// };

// export { sendOTPEmail };
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.zoho.com",
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: "bilal@theoneclickdigital.com", // your Zoho email address
//     pass: "khalakijan123456", // your Zoho email password
//   },
//   tls: {
//     // do not fail on invalid certs
//     rejectUnauthorized: false,
//   },
// });

// export const sendOTPEmail = async (to, subject, text) => {
//   const mailOptions = {
//     from: "bilal@theoneclickdigital.com",
//     to,
//     subject,
//     text,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);
//   } catch (error) {
//     console.error("Error sending email: " + error);
//   }
// };
